import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Chenran Ning | AI Video Product Lead",
  description:
    "Chenran Ning is an AI video product lead, full-stack engineer, and AI filmmaker building Medeo and AI-native creative workflows.",
  openGraph: {
    title: "Chenran Ning | AI Video Product Lead",
    description:
      "AI video product lead, full-stack engineer, and AI filmmaker working across AI video, agentic workflows, creator tools, and AI-native storytelling.",
    images: ["/assets/chenran-qcon.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
