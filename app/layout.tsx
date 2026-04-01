import type { Metadata } from "next";
import "./globals.css";
import { TransitionOverlay } from "./components/TransitionLink";
import AppWrapper from "./components/AppWrapper";

export const metadata: Metadata = {
  title: "Sai · Portfolio",
  description: "Designer & Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <TransitionOverlay />
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
