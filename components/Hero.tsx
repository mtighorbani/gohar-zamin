"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Factory, MapPin, ShieldCheck } from "lucide-react";

const highlights = [
  { label: "محصول اصلی", value: "آهن اسفنجی", Icon: Factory },
  { label: "موقعیت کارخانه", value: "نگار، بردسیر، کرمان", Icon: MapPin },
  { label: "رویکرد مجموعه", value: "کیفیت و توسعه پایدار", Icon: ShieldCheck },
];

export function Hero() {
  // The full-resolution client-supplied photograph lives at the path below.
  // While it is being transferred, fall back to the previously committed asset.
  const [photo, setPhoto] = useState("/hero/gohar-factory.jpg");

  return (
    <section id="home-hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <Image
          src={photo}
          onError={() => {
            if (photo !== "/hero/gohar-factory.avif") setPhoto("/hero/gohar-factory.avif");
          }}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero__photo"
        />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__line hero__line--one" aria-hidden="true" />
      <div className="hero__line hero__line--two" aria-hidden="true" />

      <div className="hero__container">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-rule" aria-hidden="true"/>
            شرکت فولاد گهرزمین
          </p>
          <h1 id="hero-title" className="hero__title">
            <span>در قلب صنعت،</span>
            <strong>در مسیر آینده فولاد ایران</strong>
          </h1>
          <p className="hero__description">
            فولاد گهرزمین با تمرکز بر تولید آهن اسفنجی، کیفیت محصول و توسعه مسئولانه،
            در مسیر تقویت زنجیره ارزش فولاد کشور گام برمی‌دارد.
          </p>
          <div className="hero__actions">
            <Link className="hero__button hero__button--primary" href="/about">
              آشنایی با فولاد گهرزمین <ArrowLeft size={16} aria-hidden="true" />
            </Link>
            <a className="hero__button hero__button--ghost" href="tel:41190">
              تماس با ما <span dir="ltr">41190</span>
            </a>
          </div>
        </div>

        <div className="hero__bottom">
          <div className="hero__highlights" aria-label="اطلاعات کلیدی شرکت">
            {highlights.map(({ label, value, Icon }) => (
              <div className="hero__highlight" key={label}>
                <span className="hero__highlight-icon"><Icon size={23} strokeWidth={1.55} aria-hidden="true" /></span>
                <span className="hero__highlight-text">
                  <small>{label}</small>
                  <strong>{value}</strong>
                </span>
              </div>
            ))}
          </div>
          <span className="hero__serial" aria-hidden="true">GOHAR ZAMIN STEEL CO. / 01</span>
        </div>
      </div>
    </section>
  );
}
