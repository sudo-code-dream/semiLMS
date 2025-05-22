// app/hero/layout.tsx
import type { ReactNode } from "react";

export default function HeroLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Just render children, no html/body */}
      <main>{children}</main>
    </>
  );
}