export const POKER_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "bet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "call",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "check",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fold",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player1Address",
        type: "address",
      },
      {
        internalType: "address",
        name: "_player2Address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_player1Balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_player2Balance",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "stage",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "ranks",
        type: "string[]",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "suits",
        type: "string[]",
      },
    ],
    name: "CommunityCardsDealt",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player1",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player2",
        type: "address",
      },
    ],
    name: "GameStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum GameLogic.GameState",
        name: "oldState",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum GameLogic.GameState",
        name: "newState",
        type: "uint8",
      },
    ],
    name: "GameStateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "card1Rank",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "card1Suit",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "card2Rank",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "card2Suit",
        type: "string",
      },
    ],
    name: "HandRevealed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum GameLogic.PlayerAction",
        name: "action",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PlayerActionTaken",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "revealHand",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WinnerDeclared",
    type: "event",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "currentBet",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentPlayer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gameState",
    outputs: [
      {
        internalType: "enum GameLogic.GameState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastAction",
    outputs: [
      {
        internalType: "enum GameLogic.PlayerAction",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastActionTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pendingWithdrawals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "player1",
    outputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "chips",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "rank",
            type: "string",
          },
          {
            internalType: "string",
            name: "suit",
            type: "string",
          },
        ],
        internalType: "struct CardLib.Card",
        name: "hand0",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "rank",
            type: "string",
          },
          {
            internalType: "string",
            name: "suit",
            type: "string",
          },
        ],
        internalType: "struct CardLib.Card",
        name: "hand1",
        type: "tuple",
      },
      {
        internalType: "bool",
        name: "hasFolded",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "hasRevealed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "currentBet",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalBet",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "player2",
    outputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "chips",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "rank",
            type: "string",
          },
          {
            internalType: "string",
            name: "suit",
            type: "string",
          },
        ],
        internalType: "struct CardLib.Card",
        name: "hand0",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "rank",
            type: "string",
          },
          {
            internalType: "string",
            name: "suit",
            type: "string",
          },
        ],
        internalType: "struct CardLib.Card",
        name: "hand1",
        type: "tuple",
      },
      {
        internalType: "bool",
        name: "hasFolded",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "hasRevealed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "currentBet",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalBet",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "revealCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
