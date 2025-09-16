import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next/React - Shatterdex | A Shatterpoint App",
  description: "A Shatterpoint App created with NextJs, React, and Laravel",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/deathstar.svg',
        href: '/images/deathstar.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/deathstar-white.svg',
        href: '/images/deathstar-white.svg',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
