"use client";

import { Page } from "@/components/Page";
import { useRouter } from "next/navigation";

export default function Home() {
  return <Page back={true}>Landing Page</Page>;
}
