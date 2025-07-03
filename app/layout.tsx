import "../styles/globals.css";
// import ThemeRegistry from "./components/ThemeRegistry";
// import { PortfolioProvider } from "./context/PortfolioContext";
// import { ThemeProviderCustom } from "./context/ThemeContext";
import { Inter } from "next/font/google";

// Load Inter font (used across the site, sans-serif by Google)
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

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
      </body>
    </html>
  );
}
