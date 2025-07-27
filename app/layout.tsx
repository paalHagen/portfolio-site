import type { Metadata } from "next";
import "../styles/globals.css";
import ThemeRegistry from "./components/ThemeRegistry";
import { PortfolioProvider } from "./context/PortfolioContext";
import { ThemeProviderCustom } from "./context/ThemeContext";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Load Inter font (used across the site, sans-serif by Google)
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

// Global Page Metadata and SEO Tags (title, description, OpenGraph, etc.)
export const metadata: Metadata = {
  title: "Pål Hagen Størksen | Portfolio",
  description:
    "Portfolio of Pål Hagen Størksen – Computer Science graduate with a background in social work. Showcasing projects, skills, and a passion for building digital solutions with a human touch.",
  keywords: [
    "Pål Hagen Størksen",
    "Computer Science",
    "Portfolio",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Social Work",
    "Information Science",
    "University of Bergen",
  ],
  authors: [{ name: "Pål Hagen Størksen" }],
  creator: "Pål Hagen Størksen",
  publisher: "Pål Hagen Størksen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://localhost:3000"), // Replace with your actual domain when deployed
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000", // Replace with your actual domain when deployed
    title: "Pål Hagen Størksen | Portfolio",
    description:
      "Portfolio of Pål Hagen Størksen – Computer Science graduate with a background in social work. Showcasing projects, skills, and a passion for building digital solutions with a human touch.",
    siteName: "Pål Hagen Størksen Portfolio",
    images: [
      {
        url: "/og-image.png", // You can create a custom OG image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "Pål Hagen Størksen - Computer Science Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pål Hagen Størksen | Portfolio",
    description:
      "Portfolio of Pål Hagen Størksen – Computer Science graduate with a background in social work. Showcasing projects, skills, and a passion for building digital solutions with a human touch.",
    images: ["/og-image.png"], // Same image as Open Graph
    // creator: '@your_twitter_handle', // Uncomment and add your Twitter handle if you have one
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
  verification: {
    // Add these when you have your domain and Google Search Console set up
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

// Define the root HTML structure, set viewport for responsiveness,
// and preconnect to Google Fonts for improved performance.
// The font itself is loaded via next/font/google.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Font is handled by next/font/google */}
      </head>
      <body className={inter.variable}>
        <ThemeProviderCustom>
          <ThemeRegistry>
            <PortfolioProvider>{children}</PortfolioProvider>
          </ThemeRegistry>
        </ThemeProviderCustom>
        {/* Speed Insights on Vercel (tracks how users experience your site over time) */}
        <SpeedInsights />
      </body>
    </html>
  );
}
