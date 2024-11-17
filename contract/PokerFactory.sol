// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Poker.sol";

contract PokerFactory {
    event PokerTableCreated(
        address indexed creator,
        uint indexed tableId,
        address pokerContract
    );

    struct PokerTable {
        address creator;
        address pokerAddress;
        uint256 buyInAmount;
        uint256 maxPlayers;
    }

    uint256 public totalTables;
    mapping(uint256 => PokerTable) public tables;

    function createPokerTable(
        address player1Address,
        address player2Address,
        uint256 player1Balance,
        uint256 player2Balance
    ) external {
        require(player1Balance > 0 && player2Balance > 0, "Invalid balances");
        require(player1Address != player2Address, "Players must be distinct");

        Poker poker = new Poker(msg.sender);

        poker.setup(
            player1Address,
            player2Address,
            player1Balance,
            player2Balance
        );

        tables[totalTables] = PokerTable({
            creator: msg.sender,
            pokerAddress: address(poker),
            buyInAmount: player1Balance, // Example
            maxPlayers: 2 // Fixed for now
        });

        emit PokerTableCreated(msg.sender, totalTables, address(poker));
        totalTables++;
    }

    function getPokerTable(
        uint256 tableId
    ) external view returns (PokerTable memory) {
        require(tableId < totalTables, "Table does not exist");
        return tables[tableId];
    }
}
