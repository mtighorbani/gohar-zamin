import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { editorialNews } from "../../data/editorial-news";

export const metadata: Metadata = {
  title:"مطالب و گزارش‌های تصویری | فولاد گهرزمین",
  description:"معرفی مدیرعامل، تأسیسات کارخانه و محصول آهن اسفنجی در فولاد گهرزمین.",
};

export default function NewsPage(){
  return <>
    <SiteHeader/>
    <main id="main-content" className="editorial-page">
      <div className="end-sections-container">
        <header className="editorial-page__header">
          <Link href="/" className="editorial-page__back"><ArrowLeft size={16}/> بازگشت به صفحه اصلی</Link>
          <p>مجله تصویری فولاد گهرزمین</p>
          <h1>مطالب و گزارش‌های تصویری</h1>
          <span>مطالب معرفی مجموعه؛ تاریخ و اخبار رسمی پس از تأیید منتشر می‌شوند.</span>
        </header>
        <div className="editorial-page__grid">
          {editorialNews.map(item=><Link className="editorial-page__card" key={item.slug} href={`/news/${item.slug}`}>
            <span className="editorial-page__image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 47vw" /></span>
            <span className="editorial-page__content"><small>{item.category}</small><strong>{item.headline}</strong><span>{item.teaser}</span><b>مشاهده مطلب <ArrowLeft size={15}/></b></span>
          </Link>)}
        </div>
      </div>
    </main>
  </>;
}
