"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, X, Film, ArrowUpLeft } from "lucide-react";

/**
 * About Gohar Zamin — editorial visual introduction.
 * The customer-supplied factory photo is reusable from the hero. If the original
 * hero asset is installed later, the existing client-side fallback will still work.
 * Set NEXT_PUBLIC_GOHAR_INTRO_VIDEO_URL to a verified playable company video URL
 * when available; no video or streaming destination is invented.
 */
const introVideoUrl = process.env.NEXT_PUBLIC_GOHAR_INTRO_VIDEO_URL?.trim() ?? "";

export function AboutSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openVideo = () => {
    dialogRef.current?.showModal();
  };

  const closeVideo = () => {
    videoRef.current?.pause();
    dialogRef.current?.close();
  };

  return (
    <section className="about-showcase" aria-labelledby="about-showcase-title" id="about-company">
      <div className="about-showcase__inner">
        <div className="about-showcase__copy">
          <span className="about-showcase__number" aria-hidden="true">01</span>
          <div className="about-showcase__text">
            <p className="about-showcase__eyebrow">نگاهی به فولاد گهرزمین</p>
            <h2 id="about-showcase-title">درباره گهرزمین</h2>
            <p className="about-showcase__tagline">پیوند دانش، صنعت و توسعه پایدار</p>
            <p className="about-showcase__description">
              فولاد گهرزمین در شهرستان بردسیر استان کرمان، با تمرکز بر تولید
              آهن اسفنجی و ارتقای کیفیت، در مسیر توسعه زنجیره فولاد کشور فعالیت می‌کند.
            </p>
            <Link className="about-showcase__link" href="/about">
              مشاهده بیشتر درباره گهرزمین
              <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="about-showcase__visual">
          <Image
            src="/hero/gohar-factory.avif"
            alt="نمای هوایی از تجهیزات و تأسیسات کارخانه فولاد گهرزمین"
            fill
            sizes="(max-width: 720px) 100vw, (max-width: 1100px) 60vw, 58vw"
            className="about-showcase__image"
          />
          <div className="about-showcase__tint" aria-hidden="true" />
          <div className="about-showcase__pattern" aria-hidden="true" />
          <button
            type="button"
            className="about-showcase__play"
            aria-label="مشاهده وضعیت ویدیوی معرفی فولاد گهرزمین"
            onClick={openVideo}
          >
            <span className="about-showcase__play-circle"><Play size={22} fill="currentColor" strokeWidth={1.2} aria-hidden="true" /></span>
            <span className="about-showcase__play-hint">معرفی تصویری شرکت</span>
          </button>
          <div className="about-showcase__caption" aria-hidden="true">
            <strong>روایتی از مسیر ما</strong>
            <span>در قلب صنعت، رو به آینده</span>
          </div>
        </div>
      </div>

      <dialog className="about-showcase__dialog" ref={dialogRef} onClose={() => videoRef.current?.pause()} onClick={(event) => {
        if (event.target === event.currentTarget) closeVideo();
      }} aria-labelledby="about-video-heading">
        <div className="about-showcase__dialog-inner" dir="rtl">
          <div className="about-showcase__dialog-header">
            <h2 id="about-video-heading">ویدیوی معرفی فولاد گهرزمین</h2>
            <button type="button" onClick={closeVideo} aria-label="بستن پنجره معرفی"><X size={21}/></button>
          </div>
          {introVideoUrl ? (
            <video ref={videoRef} className="about-showcase__video" src={introVideoUrl} controls playsInline preload="none" />
          ) : (
            <div className="about-showcase__video-empty">
              <Film size={34} strokeWidth={1.5} aria-hidden="true" />
              <strong>ویدیوی رسمی معرفی هنوز اضافه نشده است</strong>
              <p>بعد از دریافت فایل یا لینک تأییدشده شرکت، ویدیوی معرفی در همین بخش نمایش داده می‌شود.</p>
              <Link href="/about" onClick={closeVideo}>آشنایی با فولاد گهرزمین <ArrowUpLeft size={15} aria-hidden="true" /></Link>
            </div>
          )}
        </div>
      </dialog>
    </section>
  );
}
