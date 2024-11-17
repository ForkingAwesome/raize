// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CardLib.sol";
import "./PlayLib.sol";
import "./PokerLib.sol";
import "./GameLogic.sol";

contract PokerOld is Pausable, ReentrancyGuard, Ownable {
    using PokerLib for PokerLib.Player;
    using GameLogic for GameLogic.GameState;
    using GameLogic for GameLogic.PlayerAction;

    /* ========== CONSTANTS ========== */

    uint256 private constant MIN_BUY_IN = 1000;
    uint256 private constant SMALL_BLIND = 10;
    uint256 private constant BIG_BLIND = 20;
    uint256 private constant TIMEOUT_PERIOD = 1 weeks;
    uint256 private constant MIN_RAISE = BIG_BLIND;

    /* ========== STATE VARIABLES ========== */

    GameLogic.GameState public gameState;
    uint256 public pot;
    uint256 public currentBet;
    uint256 public lastActionTime;
    address public currentPlayer;
    CardLib.Card[5] private communityCards;
    uint256 public revealCount;

    PokerLib.Player public player1;
    PokerLib.Player public player2;
    mapping(address => uint256) public pendingWithdrawals;

    GameLogic.PlayerAction public lastAction;

    /* ========== EVENTS ========== */

    event GameStateChanged(
        GameLogic.GameState oldState,
        GameLogic.GameState newState
    );
    event GameStarted(address indexed player1, address indexed player2);
    event PlayerActionTaken(
        address indexed player,
        GameLogic.PlayerAction action,
        uint256 amount
    );
    event HandRevealed(
        address indexed player,
        string card1Rank,
        string card1Suit,
        string card2Rank,
        string card2Suit
    );
    event WinnerDeclared(address indexed winner, uint256 amount);
    event CommunityCardsDealt(uint8 stage, string[] ranks, string[] suits);

    /* ========== CONSTRUCTOR ========== */

    constructor(
        address _player1Address,
        address _player2Address,
        uint256 _player1Balance,
        uint256 _player2Balance,
        address initialOwner
    ) Ownable(initialOwner) {
        require(
            _player1Address != address(0) && _player2Address != address(0),
            "Invalid addresses"
        );
        require(
            _player1Balance >= MIN_BUY_IN && _player2Balance >= MIN_BUY_IN,
            "Invalid balances"
        );

        player1 = PokerLib.createPlayer(_player1Address, _player1Balance);
        player2 = PokerLib.createPlayer(_player2Address, _player2Balance);
        gameState = GameLogic.GameState.Waiting;
    }

    /* ========== GETTER FUNCTIONS ========== */

    function getDealerCommunityCards()
        public
        view
        returns (CardLib.Card[5] memory)
    {
        return communityCards;
    }

    function getDealerCardAt(
        uint8 index
    ) public view returns (CardLib.Card memory) {
        require(index < 5, "Invalid card index");
        return communityCards[index];
    }

    function getVisibleCommunityCards()
        public
        view
        returns (CardLib.Card[] memory visibleCards)
    {
        uint8 visibleCount = uint8(gameState) -
            uint8(GameLogic.GameState.PreFlop) +
            2;
        require(visibleCount > 0, "No community cards visible yet");

        visibleCards = new CardLib.Card[](visibleCount);
        for (uint8 i = 0; i < visibleCount; i++) {
            visibleCards[i] = communityCards[i];
        }
    }

    function getCommunityCardsByStage()
        public
        view
        returns (
            CardLib.Card[3] memory flopCards,
            CardLib.Card memory turnCard,
            CardLib.Card memory riverCard
        )
    {
        if (gameState >= GameLogic.GameState.Flop) {
            for (uint8 i = 0; i < 3; i++) {
                flopCards[i] = communityCards[i];
            }
        }

        if (gameState >= GameLogic.GameState.Turn) {
            turnCard = communityCards[3];
        }

        if (gameState >= GameLogic.GameState.River) {
            riverCard = communityCards[4];
        }
    }

    /* ========== GAME ACTIONS ========== */

    function startGame() external whenNotPaused {
        require(gameState == GameLogic.GameState.Waiting, "Game in progress");
        require(
            msg.sender == player1.addr || msg.sender == player2.addr,
            "Not a player"
        );

        _dealCards();
        _postBlinds();

        gameState = GameLogic.GameState.PreFlop;
        currentPlayer = player1.addr;
        lastActionTime = block.timestamp;

        emit GameStarted(player1.addr, player2.addr);
    }

    function check() external whenNotPaused {
        _validatePlayerTurn();
        require(getCurrentPlayer().currentBet == currentBet, "Must match bet");

        _recordAction(GameLogic.PlayerAction.Check);
        _nextTurn();
    }

    function call() external whenNotPaused {
        _validatePlayerTurn();
        PokerLib.Player storage player = getCurrentPlayer();
        uint256 callAmount = currentBet - player.currentBet;

        require(callAmount <= player.chips, "Insufficient chips");
        player.placeBet(callAmount);
        pot += callAmount;

        _recordAction(GameLogic.PlayerAction.Call);
        _nextTurn();
    }

    function bet(uint256 amount) external whenNotPaused {
        _validatePlayerTurn();
        require(amount >= MIN_RAISE && amount > currentBet, "Invalid bet");

        PokerLib.Player storage player = getCurrentPlayer();
        require(amount <= player.chips, "Insufficient chips");

        player.placeBet(amount);
        pot += amount;
        currentBet = amount;

        _recordAction(GameLogic.PlayerAction.Bet);
        _nextTurn();
    }

    function fold() external whenNotPaused {
        _validatePlayerTurn();
        getCurrentPlayer().hasFolded = true;

        _recordAction(GameLogic.PlayerAction.Fold);
        _handleWinner(msg.sender == player1.addr ? player2.addr : player1.addr);
    }

    function revealHand() external whenNotPaused {
        require(gameState == GameLogic.GameState.Showdown, "Not showdown");
        PokerLib.Player storage player = getCurrentPlayer();
        require(!player.hasRevealed && !player.hasFolded, "Invalid reveal");

        player.hasRevealed = true;
        revealCount++;

        emit HandRevealed(
            msg.sender,
            player.hand0.rank,
            player.hand0.suit,
            player.hand1.rank,
            player.hand1.suit
        );

        if (revealCount == 2) {
            _determineWinner();
        }
    }

    function withdraw() external nonReentrant {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "Nothing to withdraw");

        pendingWithdrawals[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }

    /* ========== INTERNAL FUNCTIONS ========== */

    function _validatePlayerTurn() internal view {
        require(msg.sender == currentPlayer, "Not your turn");
        require(block.timestamp <= lastActionTime + TIMEOUT_PERIOD, "Timeout");
    }

    function _dealCards() internal {
        CardLib.Card[52] memory deck = CardLib.createDeck();

        player1.hand0 = deck[0];
        player1.hand1 = deck[1];
        player2.hand0 = deck[2];
        player2.hand1 = deck[3];

        for (uint8 i = 0; i < 5; i++) {
            communityCards[i] = deck[i + 4];
        }
    }

    function _postBlinds() internal {
        player1.placeBet(SMALL_BLIND);
        player2.placeBet(BIG_BLIND);

        pot = SMALL_BLIND + BIG_BLIND;
        currentBet = BIG_BLIND;
    }

    function _nextTurn() internal {
        if (_shouldAdvanceStage()) {
            _advanceStage();
        } else {
            currentPlayer = (currentPlayer == player1.addr)
                ? player2.addr
                : player1.addr;
            lastActionTime = block.timestamp;
        }
    }

    function _shouldAdvanceStage() internal view returns (bool) {
        return
            player1.currentBet == player2.currentBet &&
            ((player1.currentBet > 0 && player2.currentBet > 0) ||
                (player1.hasFolded || player2.hasFolded));
    }

    function _advanceStage() internal {
        player1.currentBet = 0;
        player2.currentBet = 0;
        currentBet = 0;

        if (gameState == GameLogic.GameState.PreFlop) {
            gameState = GameLogic.GameState.Flop;
        } else if (gameState == GameLogic.GameState.Flop) {
            gameState = GameLogic.GameState.Turn;
        } else if (gameState == GameLogic.GameState.Turn) {
            gameState = GameLogic.GameState.River;
        } else if (gameState == GameLogic.GameState.River) {
            gameState = GameLogic.GameState.Showdown;
        }

        _emitCommunityCards();
        currentPlayer = player1.addr;
        lastActionTime = block.timestamp;
    }

    function _determineWinner() internal {
        require(gameState == GameLogic.GameState.Showdown, "Not showdown");
        bool player1Wins = PlayLib.chooseWinner(
            player1,
            player2,
            communityCards
        );
        _handleWinner(player1Wins ? player1.addr : player2.addr);
    }

    function _handleWinner(address winner) internal {
        pendingWithdrawals[winner] += pot;
        emit WinnerDeclared(winner, pot);
        _resetGame();
    }

    function _resetGame() internal {
        PokerLib.resetPlayer(player1);
        PokerLib.resetPlayer(player2);

        pot = 0;
        currentBet = 0;
        revealCount = 0;
        lastAction = GameLogic.PlayerAction.None;
        currentPlayer = address(0);

        for (uint8 i = 0; i < 5; i++) {
            communityCards[i] = CardLib.Card("", "");
        }

        gameState = GameLogic.GameState.Waiting;
    }

    function _recordAction(GameLogic.PlayerAction action) internal {
        lastAction = action;
        emit PlayerActionTaken(msg.sender, action, 0);
    }

    function _emitCommunityCards() internal {
        uint8 count = uint8(gameState) - uint8(GameLogic.GameState.PreFlop) + 2;
        string[] memory ranks = new string[](count);
        string[] memory suits = new string[](count);

        for (uint8 i = 0; i < count; i++) {
            ranks[i] = communityCards[i].rank;
            suits[i] = communityCards[i].suit;
        }

        emit CommunityCardsDealt(count, ranks, suits);
    }

    function getCurrentPlayer()
        internal
        view
        returns (PokerLib.Player storage)
    {
        return msg.sender == player1.addr ? player1 : player2;
    }

    receive() external payable {
        revert("Use startGame()");
    }
}
