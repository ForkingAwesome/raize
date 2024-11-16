import Image from "next/image";
import React from "react";

interface WinningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WinningModal = ({ isOpen, onClose }: WinningModalProps) => {
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
                You win!
              </h2>
              <p className="text-xl text-gray-900 font-abhaya">
                brain.ai flipped{" "}
                <span className="font-bold font-londrina">2x</span>
              </p>
            </div>
            <div>
              <button
                onClick={onClose}
                className="w-2/3 px-6 py-2 bg-[#DDF25B] rounded-full hover:bg-yellow-400 transition-colors border border-black"
              >
                Play another game
              </button>
              <button onClick={onClose} className="px-6 py-2 underline">
                buy another agent
              </button>
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
