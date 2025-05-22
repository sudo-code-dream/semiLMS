// app/hero/layout.tsx
import type { ReactNode } from "react";

export default function HeroLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* No Navbar here */}
        <main>{children}</main>
      </body>
    </html>
  );
}