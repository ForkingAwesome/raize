import Image from "next/image";

interface Props {
  card1: null | string | undefined;
  card2: null | string | undefined;
}

const User = ({ card1, card2 }: Props) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-row">
        {card1 ? (
          <div className="transform -rotate-12">
            <img
              src={"/cards/" + card1?.toLowerCase() + ".png"}
              alt="Card"
              width={53}
              height={73}
            />
          </div>
        ) : (
          <div>
            <Image
              src="/game_empty_card.png"
              alt="Empty Card"
              width={53}
              height={73}
            />
          </div>
        )}

        {card2 ? (
          <div className="transform rotate-12">
            <Image
              src={"/cards/" + card2 + ".png"}
              alt="Card"
              width={53}
              height={73}
            />
          </div>
        ) : (
          <div>
            <Image
              src="/game_empty_card.png"
              alt="Empty Card"
              width={53}
              height={73}
            />
          </div>
        )}
      </div>
      <div className="relative inline-block">
        <div>
          <Image src="/nft.png" alt="nft" width={44} height={44} />
        </div>
        <div className="font-londrina absolute bottom-6 left-4 transform translate-x-1/4 -translate-y-1/4 rotate-12 bg-[#EDFF7C] border border-black rounded-full w-8 h-6 flex items-center justify-center font-bold text-sm">
          $0
        </div>
      </div>
      <div className="bg-[#FF9DB7]  border border-black border-1 rounded-full p-1.5">
        User Name - AI NFT Name
      </div>
    </div>
  );
};

export default User;
