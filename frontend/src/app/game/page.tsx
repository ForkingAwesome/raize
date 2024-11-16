"use client";

import DottedLine from "@/components/ui/DottedLine";
import OpponentData from "@/components/ui/GameMatching/OpponentData";
import SendButton from "@/components/ui/GameMatching/SendButton";
import UserData from "@/components/ui/GameMatching/UserData";
import Image from "next/image";
import { useState } from "react";

const page = () => {
  const [currentScreen, setCurrentScreen] = useState(2);
  const [isPoolingStart, setPoolingStart] = useState(true);
  const [isSmallBind, setSmallBind] = useState(true);

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
    </div>
  );
};

export default page;
