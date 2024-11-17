import Image from "next/image";

const UserData = ({ onTest }: { onTest: () => void }) => {
  return (
    <div className="flex flex-col items-center gap-2" onClick={onTest}>
      <div className="relative inline-block">
        <div>
          <Image src="/nft.png" alt="nft" width={44} height={44} />
        </div>
        <div className="font-londrina absolute bottom-6 left-4 transform translate-x-1/4 -translate-y-1/4 rotate-12 bg-[#EDFF7C] border border-black rounded-full w-8 h-6 flex items-center justify-center font-bold text-sm">
          $0
        </div>
      </div>
      <div className="bg-[#FF9DB7] border border-black border-1 rounded-full p-1.5">
        Player Name - AI NFT Name
      </div>
    </div>
  );
};

export default UserData;
