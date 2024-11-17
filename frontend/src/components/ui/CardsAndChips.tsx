import Image from "next/image";
import { motion } from "framer-motion";

const CardsAndChips = () => {
  return (
    <div className="relative flex flex-col justify-center items-center h-[400px]">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 20, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 3,
        }}
      >
        <Image
          src="/loading_cards.png"
          alt="Loading Cards"
          width={280}
          height={150}
          className="relative z-10"
        />
      </motion.div>
      <motion.div
        initial={{ x: 65, y: 100, opacity: 0 }}
        animate={{ x: 65, y: -85, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 3,
          delay: 0.1,
        }}
      >
        <Image src="/chips.png" alt="chips" width={120} height={100} />
      </motion.div>
    </div>
  );
};

export default CardsAndChips;
