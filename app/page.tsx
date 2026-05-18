import type { Metadata } from "next";
import { HomePage } from "./home-page";
import { SITE_URL, defaultDescription } from "./site-config";

export const metadata: Metadata = {
  title: "Chenran Ning / 宁晨然 | AI Video Product Lead",
  description: defaultDescription,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "zh-CN": "/zh",
      "x-default": "/",
    },
  },
  openGraph: {
    url: SITE_URL,
    title: "Chenran Ning / 宁晨然 | AI Video Product Lead",
    description: defaultDescription,
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    images: ["/assets/chenran-qcon.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chenran Ning / 宁晨然 | AI Video Product Lead",
    description: defaultDescription,
    images: ["/assets/chenran-qcon.jpg"],
  },
};

export default function Home() {
  return <HomePage initialLocale="en" />;
}
