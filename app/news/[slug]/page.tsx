import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "../../../components/SiteHeader";
import { editorialNews } from "../../../data/editorial-news";

type PageProps = {params:Promise<{slug:string}>};
export function generateStaticParams() {return editorialNews.map(item=>({slug:item.slug}));}
export async function generateMetadata({params}:PageProps):Promise<Metadata>{
  const {slug}=await params;
  const item=editorialNews.find(article=>article.slug===slug);
  return {title:item?`${item.headline} | فولاد گهرزمین`:"مطلب یافت نشد",description:item?.teaser,robots:{index:false,follow:true}};
}
export default async function StoryPage({params}:PageProps){
  const {slug}=await params;
  const item=editorialNews.find(article=>article.slug===slug);
  if(!item)notFound();
  return <>
    <SiteHeader/>
    <main id="main-content" className="editorial-page">
      <article className="end-sections-container editorial-article">
        <Link href="/news" className="editorial-page__back"><ArrowLeft size={16}/> بازگشت به مطالب</Link>
        <header>
          <span>{item.category}</span><h1>{item.headline}</h1><p>{item.teaser}</p>
        </header>
        <div className="editorial-article__image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 960px) 100vw, 920px"/></div>
        <div className="editorial-article__body">
          {item.body.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
          <p className="editorial-article__note">این صفحه محتوای معرفی است و خبر رسمی تاریخ‌دار یا بیانیه شرکت محسوب نمی‌شود.</p>
        </div>
        <Link href="/news" className="editorial-article__back">مشاهده سایر مطالب <ArrowLeft size={17}/></Link>
      </article>
    </main>
  </>;
}
