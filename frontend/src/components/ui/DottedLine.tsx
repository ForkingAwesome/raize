import Image from "next/image";

interface Props {
  width: number;
  height: number;
}

const DottedLine = ({ width, height }: Props) => {
  return (
    <div>
      <Image
        src="/dotted_line.png"
        alt="dotted_line"
        width={width}
        height={height}
      />
    </div>
  );
};

export default DottedLine;
