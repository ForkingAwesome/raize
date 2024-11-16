import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LosingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LosingModal = ({ isOpen, onClose }: LosingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-70 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-80 transform overflow-hidden rounded-xl bg-[#89BDB1] pt-3 text-center shadow-xl transition-all border border-black">
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col mb-6">
              <h2 className="text-3xl font-medium font-abhaya text-gray-900">
                You lose :{"("}
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={onClose}
                className="w-full px-6 py-2 bg-[#DDF25B] rounded-full hover:bg-yellow-400 transition-colors border border-black"
              >
                Play another game
              </button>
              <Link
                href="https://base-sepolia.blockscout.com/address/0xc1175D94162F212054a2D54b39B79e39bcea80e9"
                target="_blank"
                className="underline"
              >
                View transactions
              </Link>
            </div>

            <div>
              <Image
                src="/winning_octopus.png"
                alt="Winning Octopus"
                width={120}
                height={120}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
