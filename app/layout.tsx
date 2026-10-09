import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "شرکت فولاد گهرزمین", description: "وب‌سایت رسمی فولاد گهرزمین؛ تولیدکننده آهن اسفنجی", robots: { index: false, follow: false } };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fa" dir="rtl"><body>{children}</body></html>}
