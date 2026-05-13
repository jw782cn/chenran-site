import type { Metadata } from "next";
import "./globals.css";
import { defaultDescription, personJsonLd, SITE_URL, siteName } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Chenran Ning / 宁晨然 | AI Video Product Lead",
    template: "%s",
  },
  description: defaultDescription,
  openGraph: {
    title: "Chenran Ning / 宁晨然 | AI Video Product Lead",
    description: defaultDescription,
    url: SITE_URL,
    siteName,
    type: "profile",
    images: [
      {
        url: "/assets/chenran-qcon.jpg",
        width: 1686,
        height: 2133,
        alt: "Chenran Ning speaking at QCon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chenran Ning / 宁晨然 | AI Video Product Lead",
    description: defaultDescription,
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
      <body>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
