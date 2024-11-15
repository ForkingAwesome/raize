import Image from "next/image";

const Traits = () => {
  return (
    <div className="flex flex-row items-center">
      <Image src="/traits_line_left.png" alt="line" width={20} height={20} />
      <div className="flex space-x-2 px-2">
        <span className="bg-green-200 px-2 py-1 rounded">Long-term</span>
        <span className="bg-red-200 px-2 py-1 rounded">Safe</span>
        <span className="bg-blue-200 px-2 py-1 rounded">Secure</span>
      </div>
      <Image src="/traits_line_right.png" alt="line" width={20} height={20} />
    </div>
  );
};

export default Traits;
