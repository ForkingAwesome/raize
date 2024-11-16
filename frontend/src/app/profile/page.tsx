import Image from "next/image";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#89BDB1] gap-12 items-center p-2">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col">
          <div className="flex gap-32">
            <Image
              src="/nft_profile_user_yellow.svg"
              alt="Profile"
              width={30}
              height={30}
            />
            <div className="flex flex-row items-center justify-center">
              <h1 className="text-xl font-abhaya mb-2">
                R<span className="text-[#EDFF7C]">ai</span>ze
              </h1>
              <Image src="/star.png" width="8" height="17" alt="star"></Image>
            </div>
            <Image
              src="/annotation_star.svg"
              alt="Profile"
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <div className="font-abhaya text-xl">Your balance</div>
            <div className="font-londrina font-bold text-3xl">$2000</div>
          </div>
          <button className="bg-[#EDFF7C] border border-black px-3 py-2 rounded-full">
            Connect a different account
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="font-abhaya text-xl">Your agents</div>
          <div className="flex flex-row gap-2">
            <Image
              src="/profile_nft_1.png"
              alt="Your NFT"
              width={44}
              height={44}
            />
            <Image
              src="/profile_nft_2.png"
              alt="Your NFT"
              width={44}
              height={44}
            />
            <Image
              src="/profile_nft_3.png"
              alt="Your NFT"
              width={44}
              height={44}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-abhaya text-xl">Buy more agents</div>
          <div className="flex flex-row gap-4">
            <Image
              src="/profile_big_nft_1.png"
              alt="Buy these NFTs!"
              width={127}
              height={175}
            />
            <Image
              src="/profile_big_nft_2.png"
              alt="Buy these NFTs!"
              width={127}
              height={175}
            />
            <Image
              src="/profile_big_nft_3.png"
              alt="Buy these NFTs!"
              width={127}
              height={175}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-80 mt-32 mr-10">
        <button>
          <Image
            src="/exit_button.png"
            alt="Exit Button"
            width="48"
            height="36"
          />
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default page;
