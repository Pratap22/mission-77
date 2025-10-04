import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mission 77 - Explore All 77 Districts of Nepal | #77DistrictsOfNepal",
  description: "Join the journey to explore all 77 districts of Nepal. Track your progress, plan itineraries, and discover the beauty of Nepal one district at a time. Interactive map with district tracking and community features.",
  keywords: [
    "Nepal travel",
    "77 districts Nepal",
    "Nepal adventure",
    "district exploration",
    "Nepal tourism",
    "travel tracking",
    "Nepal map",
    "adventure travel",
    "Nepal districts",
    "travel community",
    "Mission 77",
    "77DistrictsOfNepal"
  ],
  authors: [{ name: "Explore with Pratap" }],
  creator: "Explore with Pratap",
  publisher: "Mission 77",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mission77.pratapsharma.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mission 77 - Explore All 77 Districts of Nepal",
    description: "Join the journey to explore all 77 districts of Nepal. Track your progress, plan itineraries, and discover the beauty of Nepal one district at a time.",
    url: 'https://mission77.pratapsharma.io',
    siteName: 'Mission 77',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 1200,
        alt: 'Mission 77 - Explore All 77 Districts of Nepal',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mission 77 - Explore All 77 Districts of Nepal",
    description: "Join the journey to explore all 77 districts of Nepal. Track your progress, plan itineraries, and discover the beauty of Nepal one district at a time.",
    images: ['/logo.png'],
    creator: '@explorewithpratap',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
