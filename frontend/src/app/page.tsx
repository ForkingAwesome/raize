"use client";

import { Page } from "@/components/Page";
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
    </Page>
  );
}
