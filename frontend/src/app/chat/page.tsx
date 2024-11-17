"use client";

import DottedLine from "@/components/ui/DottedLine";
import Messages, { Message } from "@/components/ui/Message";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [isChatEmpty, setChatEmpty] = useState(false);
  const [messages, setMessages] = useState<Array<Message>>([
    { message: "Hey", self: false },
    { message: "Hello!", self: true },
    { message: "Nice game bruhhh", self: false },
    { message: "Thanks!", self: true },
    { message: "You should improve! lol", self: true },
    { message: "You should improve! lol", self: true },
    { message: "You should improve! lol", self: true },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#89BDB1] items-center p-2 gap-6">
      <div className="flex flex-col">
        <div className="flex gap-32">
          <Image
            src="/nft_profile_user.svg"
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
            src="/annotation_star_yellow.svg"
            alt="Profile"
            width={30}
            height={30}
          />
        </div>
      </div>

      <div className="font-bold font-abhaya text-4xl w-40">
        Chat with @sarthak
      </div>

      {!isChatEmpty && (
        <div className="flex flex-col gap-4">
          <Messages messages={messages} />
          <DottedLine width={380} height={2} />
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <textarea
          className="font-abhaya border border-black bg-white rounded-xl p-2 w-96 h-28"
          placeholder="Type a message..."
        />
        <div className="bg-[#EDFF7C] border border-black font-abhaya rounded-full p-2 text-center text-lg w-96">
          <button className="font-abhaya">Send</button>
        </div>
      </div>

      <div>
        <div className="flex gap-80">
          <button>
            <Link href={"/game"}>
              <Image
                src="/exit_button.png"
                alt="Exit Button"
                width="48"
                height="36"
              />
            </Link>
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
