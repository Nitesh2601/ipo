import { Geist, Geist_Mono,Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import SessionWrapper from "./sessionWrapper";
import { Toaster } from "@/components/ui/sonner"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* 👉 Inter ONLY for headlines */
const interHeadline = Inter({
  variable: "--font-inter-headline",
  subsets: ["latin"],
  weight: ["700", "800"],
});


export const metadata = {
        title: {
          default: "IPO Hunters – Live IPO GMP, Upcoming & SME IPOs in India",
          template: "%s | IPO Hunters",
        },
        description:
          "IPO Hunters provides live IPO GMP, current IPOs, upcoming IPOs, SME IPOs, subscription status and allotment details in India.",
        keywords: [
          "IPO GMP",
          "IPO Grey Market Premium",
          "Current IPOs India",
          "Upcoming IPOs",
          "SME IPO GMP",
          "IPO Hunters",
          "IPO subscription status",
          "IPO allotment"
        ],
        authors: [{ name: "IPO Hunters" }],
        creator: "IPO Hunters",
        publisher: "IPO Hunters",

        robots: {
          index: true,
          follow: true,
        },

        alternates: {
          canonical: "https://ipohunters.com",
        },

        openGraph: {
          title: "IPO Hunters – Live IPO GMP & Upcoming IPOs",
          description:
            "Track live IPO GMP today, upcoming IPOs, SME IPOs and subscription status with IPO Hunters.",
          url: "https://ipohunters.com",
          siteName: "IPO Hunters",
          locale: "en_IN",
          type: "website",
        },

        twitter: {
          card: "summary_large_image",
          title: "IPO Hunters – Live IPO GMP & IPO Calendar",
          description:
            "Live IPO GMP today, upcoming IPOs, SME IPOs and allotment details in one place.",
        },
      };


export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${interHeadline.variable} antialiased`}
      >   
        <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  name: "IPO Hunters",
                  url: "https://ipohunters.com",
                  description:
                    "IPO Hunters provides live IPO GMP, upcoming IPOs, SME IPOs and subscription insights in India.",
                  sameAs: [],
                }),
              }}
            />
        
          <SessionWrapper>
            <Providers>
              {children}
              <Toaster />
            </Providers>
          </SessionWrapper>

          

        
      </body>
    </html>
  );
}
