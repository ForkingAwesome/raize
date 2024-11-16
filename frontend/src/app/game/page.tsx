"use client";

import DottedLine from "@/components/ui/DottedLine";
import Opponent from "@/components/ui/Game/Opponent";
import OpponentData from "@/components/ui/GameMatching/OpponentData";
import SendButton from "@/components/ui/GameMatching/SendButton";
import UserData from "@/components/ui/GameMatching/UserData";
import Image from "next/image";
import { useState } from "react";
import CurrentCards from "../../components/ui/Game/CurrentCards";
import User from "@/components/ui/Game/User";

const page = () => {
  const [currentScreen, setCurrentScreen] = useState(3);
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

  const goToNextScreen = () => {
    setCurrentScreen((prevScreen) => (prevScreen + 1) % 4);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#89BDB1] items-center p-2 gap-10">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-xl font-abhaya mb-2">
          R<span className="text-[#EDFF7C]">ai</span>ze
        </h1>
        <Image src="/star.png" width="8" height="17" alt="star"></Image>
      </div>
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
              onClick={goToNextScreen}
            >
              Play with brain.ai
            </button>
            <button
              className="bg-[url('/button_bg_2.png')] bg-no-repeat bg-cover px-16 py-6 font-bold font-abhaya"
              onClick={goToNextScreen}
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
          <Opponent />
          <CurrentCards
            card1={cardStates[0]}
            card2={cardStates[1]}
            card3={cardStates[2]}
            card4={cardStates[3]}
            card5={cardStates[4]}
          />
          <User card1={userCards[0]} card2={userCards[1]} />
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

export default page;
