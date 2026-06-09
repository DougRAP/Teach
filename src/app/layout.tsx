import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TriviaMate — learn anything, then prove it",
  description:
    "Your AI study mate. Get any topic explained at your level and learning style, lock it in with trivia, and turn learning into a game with friends.",
};

export const viewport: Viewport = {
  themeColor: "#0f1117",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="mx-auto min-h-dvh w-full max-w-md px-5 pb-28 pt-6 sm:max-w-lg">
          {children}
        </div>
      </body>
    </html>
  );
}
