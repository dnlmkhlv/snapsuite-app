import "./globals.css";
import {
  Inter,
  Roboto,
  Open_Sans,
  Lato,
  Poppins,
  Montserrat,
} from "next/font/google";
import Header from "./components/Header";
import TabNav from "./components/TabNav";
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

export const metadata = {
  title: {
    default: "SnapSuite - Turn Content into Beautiful Visuals Instantly",
    template: "%s | SnapSuite",
  },
  description:
    "Create beautiful visuals from your tweets, code snippets, and quotes instantly. Transform your content into shareable graphics with our easy-to-use online editor.",
  keywords: [
    "visual content creator",
    "tweet to image",
    "code snippet generator",
    "quote maker",
    "social media graphics",
    "content visualization",
    "image generator",
    "social media tools",
    "content marketing",
    "visual design",
  ],
  authors: [{ name: "Daniil Mikhailov" }],
  creator: "Daniil Mikhailov",
  publisher: "Daniil Mikhailov",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://snapsuite.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://snapsuite.app",
    title: "SnapSuite - Turn Content into Beautiful Visuals Instantly",
    description:
      "Create beautiful visuals from your tweets, code snippets, and quotes instantly. Transform your content into shareable graphics with our easy-to-use online editor.",
    siteName: "SnapSuite",
    images: [
      {
        url: "/snapsuite-og.png",
        width: 1200,
        height: 630,
        alt: "SnapSuite - Visual Content Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapSuite - Turn Content into Beautiful Visuals Instantly",
    description:
      "Create beautiful visuals from your tweets, code snippets, and quotes instantly. Transform your content into shareable graphics.",
    images: ["/snapsuite-og.png"],
    creator: "@snapsuite",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5170FF" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "SnapSuite",
              description:
                "Create beautiful visuals from your tweets, code snippets, and quotes instantly. Transform your content into shareable graphics with our easy-to-use online editor.",
              url: "https://snapsuite.app",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "SnapSuite",
              },
              featureList: [
                "Tweet to Image Converter",
                "Code Snippet Generator",
                "Quote Maker",
                "Social Media Graphics",
                "Visual Content Creator",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} ${openSans.variable} ${lato.variable} ${poppins.variable} ${montserrat.variable} min-h-screen flex flex-col`}
      >
        <Header />
        <TabNav />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
