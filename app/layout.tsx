import type { Metadata } from "next";
import localFont from "next/font/local";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import NavbarWrapper from "@/components/NavbarWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fudemy",
  description: "A platform for learning and sharing knowledge",
  creator: "Fud00 Technologies",
  publisher: "Fud00 Technologies",
  authors: [
    {
      name: "Kenneth Jr. O. Dean",
      url: "https://www.facebook.com/k.dean.1420354/",
    },
  ],
  icons: {
    icon: [
      { url: "/faviconlogo.ico", media: "(prefers-color-scheme: light)" },
      { url: "/faviconlogo.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang='en'>
        <body className={`${geistSans.variable} ${geistMono.variable} `}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange>
            <div className={"min-h-screen"}>
              <NavbarWrapper />
              <main className={""}> {children} </main>
            </div>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
