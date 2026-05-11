import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DR AI 企业转型合作方案 | 晨然",
  description: "面向 DR 多团队的 AI 企业应用培训、线上辅导与长期合作报价计算器",
};

export default function DrAiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
