import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import "./globals.css";
import "./ending-sections.css";

export const metadata: Metadata = {
  title: "شرکت فولاد گهرزمین",
  description: "وب‌سایت شرکت فولاد گهرزمین؛ معرفی آهن اسفنجی، مجموعه صنعتی و اطلاعات سازمانی.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body id="top">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
