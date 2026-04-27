import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Moon Steel",
  description: "Moon Steel fabrication website",
  icons: {
    icon: "/ms3-logo.svg",
    shortcut: "/ms3-logo.svg",
    apple: "/ms3-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
