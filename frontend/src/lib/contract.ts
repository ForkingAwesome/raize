import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useContractEvent,
  Address,
  useAccount,
} from "wagmi";
import { POKER_CONTRACT_ABI } from "./abi";
import { useCallback } from "react";

interface UsePokerContractProps {
  contractAddress: Address;
}

interface PlayerInfo {
  addr: string;
  chips: bigint;
  hand0: { rank: string; suit: string };
  hand1: { rank: string; suit: string };
  hasFolded: boolean;
  hasRevealed: boolean;
  currentBet: bigint;
  totalBet: bigint;
}

export function usePokerContract({ contractAddress }: UsePokerContractProps) {
  const { address: playerAddress } = useAccount();

  // Read Functions
  const { data: gameState } = useContractRead({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "gameState",
    watch: true,
  });

  const { data: currentPlayer } = useContractRead({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "currentPlayer",
    watch: true,
  });

  const { data: currentBet } = useContractRead({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "currentBet",
    watch: true,
  });

  const { data: pot } = useContractRead({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "pot",
    watch: true,
  });

  const { data: player1Info } = useContractRead({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "player1",
    watch: true,
  });

  const { data: player2Info } = useContractRead({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "player2",
    watch: true,
  });

  // Write Functions Preparation
  const { config: startGameConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "startGame",
  });

  const { config: betConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "bet",
  });

  const { config: callConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "call",
  });

  const { config: checkConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "check",
  });

  const { config: foldConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "fold",
  });

  const { config: revealHandConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "revealHand",
  });

  const { config: withdrawConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: POKER_CONTRACT_ABI,
    functionName: "withdraw",
  });

  // Write Functions
  const { write: startGame, isLoading: isStartingGame } =
    useContractWrite(startGameConfig);
  const { write: placeBet, isLoading: isBetting } = useContractWrite(betConfig);
  const { write: call, isLoading: isCalling } = useContractWrite(callConfig);
  const { write: check, isLoading: isChecking } = useContractWrite(checkConfig);
  const { write: fold, isLoading: isFolding } = useContractWrite(foldConfig);
  const { write: revealHand, isLoading: isRevealing } =
    useContractWrite(revealHandConfig);
  const { write: withdraw, isLoading: isWithdrawing } =
    useContractWrite(withdrawConfig);

  // Event Listeners
  const onGameStarted = useCallback(
    (callback: (player1: string, player2: string) => void) => {
      useContractEvent({
        address: contractAddress,
        abi: POKER_CONTRACT_ABI,
        eventName: "GameStarted",
        listener(player1, player2) {
          callback(player1, player2);
        },
      });
    },
    [contractAddress]
  );

  const onGameStateChanged = useCallback(
    (callback: (oldState: number, newState: number) => void) => {
      useContractEvent({
        address: contractAddress,
        abi: POKER_CONTRACT_ABI,
        eventName: "GameStateChanged",
        listener(oldState, newState) {
          callback(oldState, newState);
        },
      });
    },
    [contractAddress]
  );

  const onPlayerAction = useCallback(
    (callback: (player: string, action: number, amount: bigint) => void) => {
      useContractEvent({
        address: contractAddress,
        abi: POKER_CONTRACT_ABI,
        eventName: "PlayerActionTaken",
        listener(player, action, amount) {
          callback(player, action, amount);
        },
      });
    },
    [contractAddress]
  );

  const onHandRevealed = useCallback(
    (
      callback: (
        player: string,
        card1Rank: string,
        card1Suit: string,
        card2Rank: string,
        card2Suit: string
      ) => void
    ) => {
      useContractEvent({
        address: contractAddress,
        abi: POKER_CONTRACT_ABI,
        eventName: "HandRevealed",
        listener(player, card1Rank, card1Suit, card2Rank, card2Suit) {
          callback(player, card1Rank, card1Suit, card2Rank, card2Suit);
        },
      });
    },
    [contractAddress]
  );

  const onWinnerDeclared = useCallback(
    (callback: (winner: string, amount: bigint) => void) => {
      useContractEvent({
        address: contractAddress,
        abi: POKER_CONTRACT_ABI,
        eventName: "WinnerDeclared",
        listener(winner, amount) {
          callback(winner, amount);
        },
      });
    },
    [contractAddress]
  );

  return {
    // Contract State
    gameState,
    currentPlayer,
    currentBet,
    pot,
    player1Info,
    player2Info,
    playerAddress,

    // Actions
    startGame,
    placeBet,
    call,
    check,
    fold,
    revealHand,
    withdraw,

    // Loading States
    isStartingGame,
    isBetting,
    isCalling,
    isChecking,
    isFolding,
    isRevealing,
    isWithdrawing,

    // Event Listeners
    onGameStarted,
    onGameStateChanged,
    onPlayerAction,
    onHandRevealed,
    onWinnerDeclared,
  };
}
