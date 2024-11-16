interface Props {
  smallBind: boolean;
}

const SendButton = ({ smallBind }: Props) => {
  if (smallBind) {
    return (
      <button className="bg-[url('/loading_screen_button_bg.png')] bg-no-repeat bg-cover px-20 py-6 font-bold font-abhaya">
        Send <span className="font-bold">1$</span>
      </button>
    );
  }
  return (
    <button className="bg-[url('/loading_screen_button_bg.png')] bg-no-repeat bg-cover px-20 py-6 font-bold font-abhaya">
      Send <span className="font-bold">2$</span>
    </button>
  );
};

export default SendButton;
