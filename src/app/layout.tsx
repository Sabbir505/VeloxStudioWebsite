import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Velox Studio | Digital Excellence",
  description: "We build innovative software products, foster collaborative partnerships, and deliver exceptional digital solutions. Custom web & app development, UI/UX design, and marketing services.",
  keywords: ["software development", "web development", "mobile apps", "UI/UX design", "digital marketing", "Velox Studio"],
  authors: [{ name: "Velox Studio" }],
  icons: {
    icon: "/vs-dark.png",
    apple: "/vs-dark.png",
  },
  openGraph: {
    title: "Velox Studio | Digital Excellence",
    description: "We build innovative software products and deliver exceptional digital solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-text-primary`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
