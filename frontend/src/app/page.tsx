"use client";

import { Page } from "@/components/Page";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Page back={true}>
      <div>
        <DynamicWidget />
        <button onClick={() => router.push("/onboarding")}>Go to Game</button>
      </div>
    </Page>
  );
}
