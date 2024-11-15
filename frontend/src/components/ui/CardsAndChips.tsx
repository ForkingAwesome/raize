import Image from "next/image";

const CardsAndChips = () => {
  return (
    <div className="relative flex flex-col justify-center items-center h-[400px] space-y-[-10px]">
      <Image
        src="/loading_cards.png"
        alt="Loading Cards"
        width={280}
        height={150}
      />
      <Image src="/chips.png" alt="chips" width={120} height={100} />
    </div>
  );
};

export default CardsAndChips;
