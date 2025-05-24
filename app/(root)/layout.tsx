"use client";
import React from "react";
import StreamClientProvider from "@/components/providers/StreamClientProvider";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <StreamClientProvider>{children}</StreamClientProvider>;
};

export default Layout;
