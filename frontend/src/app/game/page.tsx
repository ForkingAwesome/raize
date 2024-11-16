"use client";

import Image from "next/image";
import { useState } from "react";

const page = () => {
  const [currentScreen, setCurrentScreen] = useState(1);

  const goToNextScreen = () => {
    setCurrentScreen((prevScreen) => (prevScreen + 1) % 4);
  };

  return (
    <div className="flex flex-col bg-[#89BDB1] items-center gap-20 p-2">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-xl font-abhaya mb-2">
          R<span className="text-[#EDFF7C]">ai</span>ze
        </h1>
        <Image src="/star.png" width="8" height="17" alt="star"></Image>
      </div>
      {currentScreen === 0 && (
        <div>
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
              className="bg-[url('/button_bg_2.png')] bg-no-repeat bg-cover px-16 py-5 font-bold font-abhaya"
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
        <div className="flex flex-col items-center">
          <div className="text-2xl font-abhaya text-center w-60">
            We're matching you with other players...
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
    </div>
  );
};

export default page;
