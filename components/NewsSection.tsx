"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { editorialNews } from "../data/editorial-news";

export function NewsSection() {
  const [selected, setSelected] = useState(0);
  const highlighted = editorialNews[selected];
  const otherStories = editorialNews.map((story, index) => ({ story, index })).filter(({ index }) => index !== selected).slice(0, 3);

  const change = (direction: -1 | 1) => {
    setSelected((current) => (current + direction + editorialNews.length) % editorialNews.length);
  };

  return (
    <section className="news-showcase" id="company-news" aria-labelledby="news-showcase-title">
      <div className="end-sections-container">
        <header className="end-section-heading">
          <div className="end-section-heading__main">
            <span className="end-section-heading__number" aria-hidden="true">05</span>
            <div>
              <h2 id="news-showcase-title">اخبار و رویدادهای گهرزمین</h2>
              <p>نگاهی تصویری به مجموعه — مطالب معرفی، نه اخبار رسمی تاریخ‌دار</p>
            </div>
          </div>
          <Link href="/news" className="news-showcase__all">مشاهده همه مطالب <ArrowLeft size={16} aria-hidden="true"/></Link>
        </header>

        <div className="news-showcase__layout">
          <article className="news-featured" key={highlighted.slug}>
            <Image
              src={highlighted.image}
              alt={highlighted.alt}
              fill
              sizes="(max-width: 800px) 100vw, 59vw"
              className="news-featured__image"
            />
            <div className="news-featured__shade" aria-hidden="true"/>
            <div className="news-featured__top">
              <span>{highlighted.category}</span>
              <span className="news-featured__counter" dir="ltr">{String(selected + 1).padStart(2, "0")} / {String(editorialNews.length).padStart(2, "0")}</span>
            </div>
            <div className="news-featured__bottom">
              <div className="news-featured__copy">
                <h3>{highlighted.headline}</h3>
                <p>{highlighted.teaser}</p>
              </div>
              <Link href={`/news/${highlighted.slug}`} className="news-featured__open" aria-label={`مطالعه: ${highlighted.headline}`}>
                <ArrowLeft size={23} aria-hidden="true"/>
              </Link>
            </div>
            <div className="news-featured__nav" aria-label="جابجایی مطالب">
              <button type="button" aria-label="مطلب قبلی" onClick={() => change(-1)}><ChevronRight size={17}/></button>
              <button type="button" aria-label="مطلب بعدی" onClick={() => change(1)}><ChevronLeft size={17}/></button>
            </div>
          </article>

          <div className="news-list" aria-label="دیگر مطالب مجموعه">
            {otherStories.map(({ story, index }) => (
              <article className="news-list__item" key={story.slug}>
                <button type="button" className="news-list__select" aria-label={`نمایش مطلب ${story.headline} در کارت بزرگ`} onClick={() => setSelected(index)}>
                  <Image src={story.image} alt={story.alt} fill sizes="(max-width: 580px) 35vw, 170px" className="news-list__image"/>
                  <span className="news-list__overlay" aria-hidden="true"/>
                </button>
                <div className="news-list__copy">
                  <span className="news-list__label">{story.category}</span>
                  <button className="news-list__headline" type="button" onClick={() => setSelected(index)}>{story.headline}</button>
                  <p>{story.teaser}</p>
                </div>
                <Link className="news-list__open" href={`/news/${story.slug}`} aria-label={`مشاهده مطلب ${story.headline}`}>
                  <ArrowLeft size={18} aria-hidden="true"/>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
