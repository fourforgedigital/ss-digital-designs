import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const founderStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lakshya Acharya",
  jobTitle: "Founder & CEO",
  worksFor: {
    "@type": "Organization",
    name: "SS Digital & Designs",
  },
};

export const metadata: Metadata = {
  title: "SS Digital & Designs",
  description: "Premium Digital Agency",
  verification: {
    google: "UdDf-DPHUonKrBBbI4094OCrj5y5dFHCj5ETVNMbs44",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(founderStructuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
