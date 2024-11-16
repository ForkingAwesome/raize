"use client";

import { Page } from "@/components/Page";
import { DynamicConnectButton } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Page back={true}>
      Landing Page
      <button onClick={() => router.push("/onboarding")}>
        Go to Onboarding
      </button>
      <button onClick={() => router.push("/game")}>Go to Game</button>
      {/* <DynamicConnectButton>Connect</DynamicConnectButton> */}
    </Page>
  );
}
