// components/NavbarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Hide navbar if path starts with /hero
  if (pathname.startsWith("/hero")) return null;

  return <Navbar />;
}
