// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./CardLib.sol";

library PokerLib {
    struct Player {
        address addr;
        uint256 chips;
        CardLib.Card hand0;
        CardLib.Card hand1;
        bool hasFolded;
        bool hasRevealed;
        uint256 currentBet;
        uint256 totalBet;
    }

    function createPlayer(
        address _addr,
        uint256 _chips
    ) internal pure returns (Player memory) {
        return
            Player({
                addr: _addr,
                chips: _chips,
                hand0: CardLib.Card("", ""),
                hand1: CardLib.Card("", ""),
                hasFolded: false,
                hasRevealed: false,
                currentBet: 0,
                totalBet: 0
            });
    }

    function placeBet(Player storage player, uint256 amount) internal {
        player.chips -= amount;
        player.currentBet += amount;
        player.totalBet += amount;
    }

    function resetPlayer(Player storage player) internal {
        player.hasFolded = false;
        player.hasRevealed = false;
        player.currentBet = 0;
        player.totalBet = 0;
        player.hand0 = CardLib.Card("", "");
        player.hand1 = CardLib.Card("", "");
    }
}
