"use client";

import { Page } from "@/components/Page";
import { DynamicConnectButton } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return <Page back={true}>Landing Page</Page>;
}
