import Image from "next/image";
import React from "react";

interface QuittingModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export const QuittingModal = ({
  isOpen,
  onClose,
  amount,
}: QuittingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-70 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-60 transform overflow-hidden rounded-xl bg-[#89BDB1] pt-3 text-center shadow-xl transition-all border border-black">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-medium font-abhaya text-gray-900">
              You're quitting!
            </h2>
            <p className="text-lg text-gray-900 font-abhaya">
              You'll lose{" "}
              <span className="font-bold font-londrina">${amount}</span>
            </p>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#FF5659] rounded-full hover:bg-red-500 transition-colors border border-black"
              >
                Quit
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#DDF25B] rounded-full hover:bg-yellow-400 transition-colors border border-black"
              >
                Stay
              </button>
            </div>
            <div>
              <Image
                src="/quitting_frog.png"
                alt="Quitting Frog"
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
