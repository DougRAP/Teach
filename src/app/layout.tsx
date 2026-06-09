import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teach — explain it to me like I am…",
  description:
    "A personal tutor that explains anything at your level and learning style. Build a library, take on challenges, and learn something new every day.",
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
