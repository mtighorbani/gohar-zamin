import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";
import { NoticesBoard } from "../../components/NoticesBoard";
import "../notices.css";

export const metadata: Metadata = {
  title: "مناقصات، مزایدات و فراخوان‌ها | فولاد گهرزمین",
  description: "جست‌وجو و فیلتر مناقصات، مزایدات و فراخوان‌ها. اطلاعات فعلی نمایشی هستند و به سامانه آگهی رسمی متصل نیستند.",
};

export default function TendersPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content"><NoticesBoard archive /></main>
    </>
  );
}
