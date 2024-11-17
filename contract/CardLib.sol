// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

library CardLib {
    struct Card {
        string rank;
        string suit;
    }

    function createCard(
        string memory _rank,
        string memory _suit
    ) public pure returns (Card memory) {
        return Card({rank: _rank, suit: _suit});
    }

    function createDeck() public view returns (Card[52] memory) {
        Card[52] memory deck;

        string[13] memory ranks = [
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "Jack",
            "Queen",
            "King",
            "Ace"
        ];

        string[4] memory suits = ["Diamonds", "Spades", "Clubs", "Hearts"];

        uint256 count = 0;

        // Generate 52 cards with all ranks and suits
        for (uint256 i = 0; i < ranks.length; i++) {
            for (uint256 j = 0; j < suits.length; j++) {
                deck[count] = createCard(ranks[i], suits[j]);
                count += 1;
            }
        }

        // Shuffle the deck
        shuffleDeck(deck);
        return deck;
    }

    // Function to shuffle the deck using Fisher-Yates algorithm
    function shuffleDeck(Card[52] memory deck) internal view {
        uint256 n = deck.length;
        for (uint256 i = n - 1; i > 0; i--) {
            uint256 j = uint256(
                keccak256(abi.encodePacked(block.timestamp, i))
            ) % (i + 1);
            // Swap the elements at indices i and j
            Card memory temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
    }
}
