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

export const metadata: Metadata = {
  title: {
    default: "SS Digital | Web Development, Marketing & Design Agency",
    template: "%s | SS Digital",
  },
  description:
    "SS Digital and SS Designs is a creative digital agency founded by Lakshya Acharya, Founder and CEO. We provide web development, app development, SEO, digital marketing, AI automation, graphic design, branding, video editing and reel editing.",
  keywords: [
    "SS Digital",
    "SS Designs",
    "Lakshya Acharya",
    "SS Digital founder",
    "SS Digital CEO",
    "web development agency",
    "app development",
    "digital marketing",
    "SEO services",
    "graphic design",
    "reel editing",
    "branding agency",
    "AI automation",
    "Rajasthan digital agency",
  ],
  authors: [{ name: "Lakshya Acharya" }],
  creator: "Lakshya Acharya",
  publisher: "SS Digital",
  openGraph: {
    title: "SS Digital | Web Development, Marketing & Design Agency",
    description:
      "Founded by Lakshya Acharya, Founder and CEO. SS Digital and SS Designs help brands grow with websites, apps, marketing, automation, branding and creative design.",
    siteName: "SS Digital",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SS Digital | Founded by Lakshya Acharya",
    description:
      "Web development, digital marketing, AI automation, graphic design, branding and reel editing by SS Digital and SS Designs.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
