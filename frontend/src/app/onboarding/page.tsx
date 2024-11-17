"use client";

import { useEffect, useState } from "react";
import { Page } from "@/components/Page";
import Image from "next/image";
import CardsAndChips from "@/components/ui/CardsAndChips";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Traits from "@/components/ui/Traits";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function Home() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const [currentScreen, setCurrentScreen] = useState(0);

  const { setShowAuthFlow } = useDynamicContext();

  const goToNextScreen = () => {
    setCurrentScreen((prevScreen) => (prevScreen + 1) % 3);
  };

  const [frontImageIndex, setFrontImageIndex] = useState(0);
  const [backImageIndex, setBackImageIndex] = useState(1);

  const images = [
    "/minted_nft_1.png",
    "/minted_nft_2.png",
    "/minted_nft_3.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrontImageIndex((prev) => (prev + 1) % images.length);
      setBackImageIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Page back={true}>
      <div className="min-h-screen bg-[#89BDB1] flex flex-col items-center">
        <div className="text-center mb-12">
          <div className="flex flex-row items-center justify-center">
            <h1 className="text-6xl font-abhaya mb-2">
              R<span className="text-[#EDFF7C]">ai</span>ze
            </h1>
            <Image src="/star.png" width="17" height="17" alt="star"></Image>
          </div>
          <p className="text-xl text-gray-700 font-abhaya">
            Let the AI agent win for you
          </p>
        </div>

        {currentScreen === 0 && (
          <div className="flex flex-col items-center">
            <CardsAndChips />

            <div className="w-96 h-4 bg-gray-200 rounded-md p-0.5">
              <motion.div
                className="h-full bg-[#DDF25B] rounded-md"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                onAnimationComplete={goToNextScreen}
              />
            </div>
          </div>
        )}

        {currentScreen === 1 && (
          <div className="flex flex-col items-center gap-12">
            <h2 className="text-2xl font-bold mb-4">Mint your Agent</h2>
            <div className="relative w-[200px] h-[250px]">
              <div className="absolute top-0 left-4 transform perspective-1000">
                <motion.div
                  className="relative w-[180px] h-[220px]"
                  animate={{
                    rotateY: [0, 0, 360],
                  }}
                  transition={{
                    duration: 2,
                    times: [0, 0.1, 1],
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front of card */}
                  <motion.div
                    className="absolute w-full h-full backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image
                      src={images[frontImageIndex]}
                      alt="Card Front"
                      width={180}
                      height={220}
                      className="rounded-xl shadow-lg"
                      priority
                    />
                  </motion.div>

                  {/* Back of card */}
                  <motion.div
                    className="absolute w-full h-full backface-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <Image
                      src={images[backImageIndex % images.length]}
                      alt="Card Back"
                      width={180}
                      height={220}
                      className="rounded-xl shadow-lg"
                      priority
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
            <button
              className="bg-[url('/loading_screen_button_bg.png')] bg-no-repeat bg-cover px-12 py-5 font-bold font-abhaya"
              onClick={goToNextScreen}
            >
              Mint poker agent
            </button>
          </div>
        )}

        {currentScreen === 2 && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-abhaya mb-4">
              Woah! You minted <span className="font-bold">Sarthak</span>
            </h2>
            <Image
              src="/minted_nft_1.png"
              alt="Minted agent"
              width={200}
              height={300}
            />
            <Traits />
            <button
              className="bg-[url('/loading_screen_button_bg.png')] bg-no-repeat bg-cover px-14 py-5 font-bold font-abhaya"
              onClick={() => {
                if (isConnected) {
                  router.push("/game");
                } else {
                  setShowAuthFlow(true);
                }
              }}
            >
              {isConnected ? "Continue" : "Login to play"}
            </button>
          </div>
        )}
      </div>
    </Page>
  );
}
