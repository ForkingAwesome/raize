"use client";

import { useState } from "react";
import { Page } from "@/components/Page";
import Image from "next/image";
import CardsAndChips from "@/components/ui/CardsAndChips";
import { motion } from "framer-motion";
import Traits from "@/components/ui/Traits";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(0);

  const goToNextScreen = () => {
    setCurrentScreen((prevScreen) => (prevScreen + 1) % 3);
  };

  return (
    <Page back={true}>
      <div className="min-h-screen bg-[#89BDB1] flex flex-col items-center">
        <div className="text-center mb-12">
          <div className="flex flex-row items-center justify-center">
            <h1 className="text-6xl font-abhaya mb-2">Raize</h1>
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
            <Image
              src="/empty_card_stack.png"
              alt="Mint your agent"
              width={200}
              height={300}
            />
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
            <h2 className="text-2xl font-bold mb-4">
              Woah! You minted Sarthak
            </h2>
            <Image
              src="/minted_card.png"
              alt="Minted agent"
              width={200}
              height={300}
            />
            <Traits />
            <Wallet>
              <ConnectWallet
                text="Login to Play"
                onConnect={() => router.push("/game")}
              >
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownLink
                  icon="wallet"
                  href="https://keys.coinbase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wallet
                </WalletDropdownLink>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        )}
      </div>
    </Page>
  );
}
