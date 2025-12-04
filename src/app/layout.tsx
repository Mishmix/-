import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CTR Studio | YouTube Обложки, Которые Взрывают Просмотры",
  description: "Создаём обложки для YouTube с A/B тестированием. +400% CTR гарантированно. Более 10,000 обложек для топовых блогеров.",
  keywords: "youtube обложки, youtube thumbnails, CTR, A/B тестирование, дизайн обложек",
  openGraph: {
    title: "CTR Studio | YouTube Обложки, Которые Взрывают Просмотры",
    description: "A/B тестирование каждой обложки. Гарантированный рост просмотров.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased font-sans">
        <div className="gradient-mesh" />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
