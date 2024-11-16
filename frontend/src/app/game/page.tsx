"use client";

import DottedLine from "@/components/ui/DottedLine";
import Opponent from "@/components/ui/Game/Opponent";
import OpponentData from "@/components/ui/GameMatching/OpponentData";
import SendButton from "@/components/ui/GameMatching/SendButton";
import UserData from "@/components/ui/GameMatching/UserData";
import Image from "next/image";
import { useEffect, useState } from "react";
import CurrentCards from "../../components/ui/Game/CurrentCards";
import User from "@/components/ui/Game/User";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import {
  FLOW_POKER_FACTORY,
  FLOW_POKER_FACTORY_ADDRESS,
  FLOW_POKER_OLD_ABI,
  FLOW_POKER_OLD_ADDRESS,
} from "@/lib/flow-abi";
import { QuittingModal } from "@/components/ui/Modals/QuittingModal";
import { WinningModal } from "@/components/ui/Modals/WinningModal";
import { getCardImage } from "@/lib/utils";

export type PlayerData = {
  address: string;
  pot: BigInt;
  hand0: {
    rank: string;
    suit: string;
  };
  hand1: {
    rank: string;
    suit: string;
  };
  hadFolded: boolean;
  hasRevealed: boolean;
  currentBet: BigInt;
  totalBet: BigInt;
};

const Page = () => {
  const [currentScreen, setCurrentScreen] = useState(3);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const [player1Parsed, setPlayer1Parsed] = useState<PlayerData | null>(null);
  const [player2Parsed, setPlayer2Parsed] = useState<PlayerData | null>(null);

  const { writeContractAsync, data, error } = useWriteContract();

  const { data: gameState, refetch: refetchGameState } = useReadContract({
    abi: FLOW_POKER_OLD_ABI,
    address: FLOW_POKER_OLD_ADDRESS,
    functionName: "gameState",
  });

  const { data: currentPlayer, refetch: setCurrentPlayer } = useReadContract({
    abi: FLOW_POKER_OLD_ABI,
    address: FLOW_POKER_OLD_ADDRESS,
    functionName: "currentPlayer",
  });

  const isMyTurn = currentPlayer === address;

  const { data: player1, refetch: refetchPlayer1 } = useReadContract({
    abi: FLOW_POKER_OLD_ABI,
    address: FLOW_POKER_OLD_ADDRESS,
    functionName: "player1",
  });

  const { data: player2, refetch: refetchPlayer2 } = useReadContract({
    abi: FLOW_POKER_OLD_ABI,
    address: FLOW_POKER_OLD_ADDRESS,
    functionName: "player2",
  });

  const { data: currentBet, refetch: setCurrentBet } = useReadContract({
    abi: FLOW_POKER_OLD_ABI,
    address: FLOW_POKER_OLD_ADDRESS,
    functionName: "currentBet",
  });

  const [isPoolingStart, setPoolingStart] = useState(true);
  const [isSmallBind, setSmallBind] = useState(true);
  const [isGameStarted, setGameStarted] = useState(false);
  const [cardStates, setCardStates] = useState<Array<null | string>>([
    "9,spades",
    "king,club",
    "ace,hearts",
    null,
    null,
  ]);
  const [userCards, setUserCards] = useState<Array<string>>([
    "9,club",
    "ace,spades",
  ]);

  const [isQuittingModalOpen, setQuittingModalOpen] = useState(false);
  const [isWinningModalOpen, setWinningModalOpen] = useState(false);

  const goToNextScreen = () => {
    setCurrentScreen((prevScreen) => (prevScreen + 1) % 4);
  };

  useEffect(() => {
    console.log("readData");
    console.log(gameState);
  }, [gameState]);

  useEffect(() => {
    if (!player1) return;

    const data = {
      address: player1[0],
      pot: BigInt(player1[1]),
      hand0: {
        rank: player1[2].rank,
        suit: player1[2].suit,
      },
      hand1: {
        rank: player1[3].rank,
        suit: player1[3].suit,
      },
      hadFolded: player1[4],
      hasRevealed: player1[5],
      currentBet: player1[6],
      totalBet: player1[7],
    };

    setPlayer1Parsed(data);
    console.log("player1", data);
  }, [player1]);

  useEffect(() => {
    if (!player2) return;

    const data = {
      address: player2[0],
      pot: BigInt(player2[1]),
      hand0: {
        rank: player2[2].rank,
        suit: player2[2].suit,
      },
      hand1: {
        rank: player2[3].rank,
        suit: player2[3].suit,
      },
      hadFolded: player2[4],
      hasRevealed: player2[5],
      currentBet: player2[6],
      totalBet: player2[7],
    };

    setPlayer2Parsed(data);
    console.log("player2", data);
  }, [player2]);

  async function onGameStart() {
    try {
      console.log("onGameStart");

      const res = await writeContractAsync({
        abi: FLOW_POKER_OLD_ABI,
        address: FLOW_POKER_OLD_ADDRESS,
        functionName: "startGame",
        args: [],
      });

      if (res) {
        console.log("Settled", data);
        goToNextScreen();
        goToNextScreen();
        goToNextScreen();
      }
    } catch (error) {
      console.log("onGameStart Error", error);
    }
  }

  async function onBet() {
    console.log("onBet");

    const res = await writeContractAsync(
      {
        abi: FLOW_POKER_OLD_ABI,
        address: FLOW_POKER_OLD_ADDRESS,
        functionName: "bet",
        args: [100],
      },
      {
        onSuccess: (data) => {
          console.log("Success", data);
        },
        onSettled: (data) => {
          console.log("Settled", data);
        },
        onError: (error) => {
          console.log("Error", error);
        },
      }
    );
  }

  async function onCall() {
    console.log("onCall");

    const res = await writeContractAsync(
      {
        abi: FLOW_POKER_OLD_ABI,
        address: FLOW_POKER_OLD_ADDRESS,
        functionName: "call",
      },
      {
        onSuccess: (data) => {
          console.log("Success", data);
        },
        onSettled: (data) => {
          console.log("Settled", data);
        },
        onError: (error) => {
          console.log("Error", error);
        },
      }
    );
  }

  async function onCheck() {
    console.log("onCall");

    const res = await writeContractAsync(
      {
        abi: FLOW_POKER_OLD_ABI,
        address: FLOW_POKER_OLD_ADDRESS,
        functionName: "check",
      },
      {
        onSuccess: (data) => {
          console.log("Success", data);
        },
        onSettled: (data) => {
          console.log("Settled", data);
        },
        onError: (error) => {
          console.log("Error", error);
        },
      }
    );
  }

  async function onFold() {
    console.log("fold");

    const res = await writeContractAsync(
      {
        abi: FLOW_POKER_OLD_ABI,
        address: FLOW_POKER_OLD_ADDRESS,
        functionName: "check",
      },
      {
        onSuccess: (data) => {
          console.log("Success", data);
        },
        onSettled: (data) => {
          console.log("Settled", data);
        },
        onError: (error) => {
          console.log("Error", error);
        },
      }
    );
  }

  function onTest() {
    // onBet();
    // onCall();
    // onCheck();
    // onFold();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#89BDB1] items-center p-2 gap-10">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-xl font-abhaya mb-2">
          R<span className="text-[#EDFF7C]">ai</span>ze
        </h1>
        <Image src="/star.png" width="8" height="17" alt="star"></Image>
      </div>
      <button onClick={() => setQuittingModalOpen(true)}>
        Open Quitting Modal
      </button>
      <button onClick={() => setWinningModalOpen(true)}>
        Open Winning Modal
      </button>

      <QuittingModal
        isOpen={isQuittingModalOpen}
        onClose={() => setQuittingModalOpen(false)}
        amount={10}
      ></QuittingModal>

      <WinningModal
        isOpen={isWinningModalOpen}
        onClose={() => setWinningModalOpen(false)}
      ></WinningModal>

      {currentScreen === 0 && (
        <div className="flex flex-col gap-24">
          <div className="flex flex-col items-center gap-4">
            <div className="text-4xl font-abhaya">Did you know?</div>
            <div className="text-center text-xl">
              Your chances of winning are much higher with our{" "}
              <span className="font-bold">ai agents</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button
              className="bg-[url('/loading_screen_button_bg.png')] bg-no-repeat bg-cover px-14 py-6 font-bold font-abhaya"
              onClick={onGameStart}
            >
              Play with brain.ai
            </button>
            <button
              className="bg-[url('/button_bg_2.png')] bg-no-repeat bg-cover px-16 py-6 font-bold font-abhaya"
              onClick={onGameStart}
            >
              Play yourself
            </button>
          </div>
          <div className="">
            <Image
              src="/cards-illustration.png"
              alt="cards"
              width={400}
              height={200}
            />
          </div>
        </div>
      )}

      {currentScreen === 1 && (
        <div className="flex flex-col items-center gap-44">
          <div className="flex flex-col gap-16 items-center">
            <div className="text-2xl font-abhaya text-center w-64">
              We're matching you with other players...
            </div>
            <UserData />
            <DottedLine />
            <OpponentData />
          </div>
          <div>
            <Image
              src="/searching_button.png"
              alt="searching"
              width="200"
              height="75"
            />
          </div>
        </div>
      )}

      {currentScreen === 2 && (
        <div className="flex flex-col items-center gap-44">
          <div className="flex flex-col gap-16 items-center">
            <div className="text-2xl font-abhaya text-center w-64">
              Your ape.ai plays against brain.ai
            </div>
            <UserData />
            <DottedLine />
            <OpponentData />
          </div>
          {isPoolingStart ? (
            isSmallBind ? (
              <SendButton smallBind={true} />
            ) : (
              <SendButton smallBind={false} />
            )
          ) : (
            <div>
              <Image
                src="/searching_button.png"
                alt="searching"
                width="200"
                height="75"
              />
            </div>
          )}
        </div>
      )}

      {currentScreen === 3 && (
        <div className="flex flex-col gap-10 items-center">
          {/* <div className="flex flex-row">
            <Image
              src="/nft_profile_user.svg"
              alt="Profile"
              width={24}
              height={24}
            />
            <Image
              src="/annotation_star.svg"
              alt="Profile"
              width={24}
              height={24}
            />
          </div> */}
          <div className="font-abhaya text-4xl">brain.ai called!</div>
          <button onClick={onTest}>Test</button>
          <Opponent />
          <CurrentCards
            card1={cardStates[0]}
            card2={cardStates[1]}
            card3={cardStates[2]}
            card4={cardStates[3]}
            card5={cardStates[4]}
          />
          {player1Parsed && (
            <User
              card1={`${player1Parsed?.hand0.rank},${player1Parsed?.hand0.suit}`}
              card2={`${player1Parsed?.hand1.rank},${player1Parsed?.hand1.suit}`}
            />
          )}
          <div className="flex gap-48">
            <button>
              <Image
                src="/exit_button.png"
                alt="Exit Button"
                width="48"
                height="36"
              />
            </button>
            <button className="text-2xl font-bold font-abhaya">03:01</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
