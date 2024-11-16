import { type Address, type Hash } from "viem";
import {
  useContractWrite,
  useWaitForTransactionReceipt,
  useAccount,
  useContractEvent,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { useState, useEffect } from "react";

import {
  FLOW_POKER_ADDRESS,
  FLOW_POKER_FACTORY_ADDRESS,
  FLOW_POKER,
  FLOW_POKER_FACTORY,
} from "./flow-abi";

// Types
export interface PlayerInfo {
  addr: Address;
  chips: bigint;
  hand0: { rank: string; suit: string };
  hand1: { rank: string; suit: string };
  hasFolded: boolean;
  hasRevealed: boolean;
  currentBet: bigint;
  totalBet: bigint;
}

export interface PokerTable {
  creator: Address;
  pokerAddress: Address;
  buyInAmount: bigint;
  maxPlayers: bigint;
}

// Poker Game Hooks
export function useGameState() {
  return useReadContract({
    address: FLOW_POKER_ADDRESS,
    abi: FLOW_POKER,
    functionName: "gameState",
  });
}

export function useCurrentPlayer() {
  return useReadContract({
    address: FLOW_POKER_ADDRESS,
    abi: FLOW_POKER,
    functionName: "currentPlayer",
  });
}

export function usePlayer1Info() {
  return useReadContract({
    address: FLOW_POKER_ADDRESS,
    abi: FLOW_POKER,
    functionName: "player1",
  });
}

export function usePlayer2Info() {
  return useReadContract({
    address: FLOW_POKER_ADDRESS,
    abi: FLOW_POKER,
    functionName: "player2",
  });
}

export function usePot() {
  return useReadContract({
    address: FLOW_POKER_ADDRESS,
    abi: FLOW_POKER,
    functionName: "pot",
  });
}

export function useCurrentBet() {
  return useReadContract({
    address: FLOW_POKER_ADDRESS,
    abi: FLOW_POKER,
    functionName: "currentBet",
  });
}

// Factory Hooks
export function useTotalTables() {
  return useReadContract({
    address: FLOW_POKER_FACTORY_ADDRESS,
    abi: FLOW_POKER_FACTORY,
    functionName: "totalTables",
  });
}

export function useGetPokerTable(tableId: bigint) {
  return useReadContract({
    address: FLOW_POKER_FACTORY_ADDRESS,
    abi: FLOW_POKER_FACTORY,
    functionName: "getPokerTable",
    args: [tableId],
  });
}

export function useCreatePokerTable() {
  const { data, writeContractAsync, ...rest } = useContractWrite({
    address: FLOW_POKER_FACTORY_ADDRESS,
    abi: FLOW_POKER_FACTORY,
    functionName: "createPokerTable",
  });

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data?.hash,
  });

  return {
    createTable: writeContractAsync,
    isLoading,
    isSuccess,
    ...rest,
  };
}

// Event Hooks
export function useGameStateChangedEvent(
  onGameStateChanged?: (oldState: number, newState: number) => void
) {
  useContractEvent({
    address: FLOW_POKER_ADDRESS,
    abi: FLOW_POKER,
    eventName: "GameStateChanged",
    listener(log) {
      const [oldState, newState] = log[0].args as [number, number];
      onGameStateChanged?.(oldState, newState);
    },
  });
}

export function useTableCreatedEvent(
  onTableCreated?: (
    creator: Address,
    tableId: bigint,
    pokerContract: Address
  ) => void
) {
  useContractEvent({
    address: FLOW_POKER_FACTORY_ADDRESS,
    abi: FLOW_POKER_FACTORY,
    eventName: "PokerTableCreated",
    listener(log) {
      const [creator, tableId, pokerContract] = log[0].args as [
        Address,
        bigint,
        Address
      ];
      onTableCreated?.(creator, tableId, pokerContract);
    },
  });
}

// Combined Game Hook
export function usePokerGame() {
  const { address } = useAccount();

  const { data: gameState, refetch: refetchGameState } = useGameState();
  const { data: pot, refetch: refetchPot } = usePot();
  const { data: currentBet, refetch: refetchCurrentBet } = useCurrentBet();
  const { data: player1Info, refetch: refetchPlayer1 } = usePlayer1Info();
  const { data: player2Info, refetch: refetchPlayer2 } = usePlayer2Info();
  const { data: currentPlayer, refetch: refetchCurrentPlayer } =
    useCurrentPlayer();

  const { bet, isLoading: isBetting } = useBet();
  const { call, isLoading: isCalling } = useCall();
  const { check, isLoading: isChecking } = useCheck();
  const { fold, isLoading: isFolding } = useFold();
  const { revealHand, isLoading: isRevealing } = useRevealHand();

  const refreshGameState = () => {
    refetchGameState();
    refetchPot();
    refetchCurrentBet();
    refetchPlayer1();
    refetchPlayer2();
    refetchCurrentPlayer();
  };

  useGameStateChangedEvent(() => {
    refreshGameState();
  });

  return {
    // Game State
    gameState,
    pot,
    currentBet,
    player1Info,
    player2Info,
    currentPlayer,

    // Player Status
    isPlayer1: address === player1Info?.addr,
    isPlayer2: address === player2Info?.addr,
    isCurrentTurn: address === currentPlayer,

    // Actions
    actions: {
      bet,
      call,
      check,
      fold,
      revealHand,
    },

    // Loading States
    loading: {
      isBetting,
      isCalling,
      isChecking,
      isFolding,
      isRevealing,
    },

    // Utilities
    refreshGameState,
  };
}
