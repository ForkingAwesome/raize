import Image from "next/image";

const Traits = () => {
  return (
    <div className="flex flex-row items-center">
      <Image src="/traits_line_left.png" alt="line" width={20} height={20} />
      <div className="flex space-x-2 px-2">
        <span className="bg-[#DDF25B] px-3 py-1 font-abhaya rounded-full border border-black">
          Long-term
        </span>
        <span className="bg-[#FF9DB7] px-3 py-1 font-abhaya rounded-full border border-black">
          Safe
        </span>
        <span className="bg-[#5BBDF2] px-3 py-1 font-abhaya rounded-full border border-black">
          Secure
        </span>
      </div>
      <Image src="/traits_line_right.png" alt="line" width={20} height={20} />
    </div>
  );
};

export default Traits;
