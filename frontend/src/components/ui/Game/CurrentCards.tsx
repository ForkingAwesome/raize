import Image from "next/image";

interface Props {
  card1: null | string;
  card2: null | string;
  card3: null | string;
  card4: null | string;
  card5: null | string;
}

const CurrentCards = ({ card1, card2, card3, card4, card5 }: Props) => {
  return (
    <div className="flex flex-row">
      {card1 ? (
        <Image
          src={"/cards/" + card1.toLocaleLowerCase() + ".png"}
          alt="Card"
          width={53}
          height={73}
        />
      ) : (
        <Image
          src="/game_empty_card.png"
          alt="Empty Card"
          width={53}
          height={73}
        />
      )}
      {card2 ? (
        <Image
          src={"/cards/" + card2.toLocaleLowerCase() + ".png"}
          alt="Card"
          width={53}
          height={73}
        />
      ) : (
        <Image
          src="/game_empty_card.png"
          alt="Empty Card"
          width={53}
          height={73}
        />
      )}
      {card3 ? (
        <Image
          src={"/cards/" + card3.toLocaleLowerCase() + ".png"}
          alt="Card"
          width={53}
          height={73}
        />
      ) : (
        <Image
          src="/game_empty_card.png"
          alt="Empty Card"
          width={53}
          height={73}
        />
      )}
      {card4 ? (
        <Image
          src={"/cards/" + card4.toLocaleLowerCase() + ".png"}
          alt="Card"
          width={53}
          height={73}
        />
      ) : (
        <Image
          src="/game_empty_card.png"
          alt="Empty Card"
          width={53}
          height={73}
        />
      )}
      {card5 ? (
        <Image
          src={"/cards/" + card5.toLocaleLowerCase() + ".png"}
          alt="Card"
          width={53}
          height={73}
        />
      ) : (
        <Image
          src="/game_empty_card.png"
          alt="Empty Card"
          width={53}
          height={73}
        />
      )}
    </div>
  );
};

export default CurrentCards;
