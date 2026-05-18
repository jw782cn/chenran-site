import type { Metadata } from "next";
import { HomePage } from "../home-page";

export const metadata: Metadata = {
  title: "宁晨然 | Medeo AI 视频产品负责人",
  description:
    "宁晨然是 Medeo AI 视频产品负责人、全栈工程师和 AI 影像创作者，长期实践 AI 视频、创作者工具和 AI-native 内容工作流。",
  alternates: {
    canonical: "/zh",
    languages: {
      "en-US": "/",
      "zh-CN": "/zh",
      "x-default": "/",
    },
  },
  openGraph: {
    url: "/zh",
    title: "宁晨然 | Medeo AI 视频产品负责人",
    description:
      "Medeo AI 视频产品负责人、全栈工程师和 AI 影像创作者，连接产品体验、工程实现和影像叙事。",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    images: ["/assets/chenran-qcon.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "宁晨然 | Medeo AI 视频产品负责人",
    description:
      "宁晨然是 Medeo AI 视频产品负责人、全栈工程师和 AI 影像创作者，长期实践 AI 视频、创作者工具和 AI-native 内容工作流。",
    images: ["/assets/chenran-qcon.jpg"],
  },
};

export default function ZhHome() {
  return <HomePage initialLocale="zh" />;
}
