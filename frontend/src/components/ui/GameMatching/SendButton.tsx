import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";

const SendButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("eth");

  const cryptoOptions = [
    { value: "eth", label: "eth" },
    { value: "usdc", label: "usdc" },
    { value: "usdt", label: "usdt" },
    { value: "flow", label: "flow" },
    { value: "dai", label: "dai" },
    { value: "mantle", label: "mantle" },
  ];

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 right-0 mb-2"
          >
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              {cryptoOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedCrypto(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors
                    ${selectedCrypto === option.value ? "bg-gray-100" : ""}
                    ${
                      option.value === cryptoOptions[0].value
                        ? "rounded-t-lg"
                        : ""
                    }
                    ${
                      option.value ===
                      cryptoOptions[cryptoOptions.length - 1].value
                        ? "rounded-b-lg"
                        : ""
                    }
                  `}
                >
                  <div className="flex flex-row gap-2">
                    <Image
                      src={"/" + option.label + ".png"}
                      alt="logo"
                      width={20}
                      height={20}
                    />
                    {option.label}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[url('/loading_screen_button_bg.png')] bg-no-repeat bg-cover px-20 py-6 font-bold font-abhaya flex items-center gap-2"
      >
        Send <span className="font-bold">$1</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronUp className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default SendButton;
