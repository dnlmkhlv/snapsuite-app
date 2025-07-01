import type { Metadata } from "next";
import Image from "next/image";
import {
  Inter,
  Roboto,
  Open_Sans,
  Lato,
  Poppins,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});
const openSans = Open_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-open-sans",
});
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Tweet Image Generator - Create Instagram-Friendly Tweet Images",
  description:
    "Generate beautiful, customizable tweet images perfect for Instagram posts. Add your content, customize colors and fonts, and download high-quality images instantly.",
  keywords:
    "tweet generator, Instagram, social media, image creator, tweet image",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable} ${openSans.variable} ${lato.variable} ${poppins.variable} ${montserrat.variable} min-h-screen flex flex-col`}
      >
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
