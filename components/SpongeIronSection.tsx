import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Stage 04 — Sponge iron product introduction.
 * The image path is deliberately stable so the original customer image can be
 * installed without changing component code.
 */
export function SpongeIronSection() {
  return (
    <section className="sponge-section" id="sponge-iron" aria-labelledby="sponge-section-title">
      <div className="sponge-section__inner">
        <div className="sponge-section__copy">
          <span className="sponge-section__number" aria-hidden="true">03</span>
          <div className="sponge-section__text">
            <p className="sponge-section__eyebrow">محصول استراتژیک گهرزمین</p>
            <h2 id="sponge-section-title">آهن اسفنجی</h2>
            <p className="sponge-section__description">
              آهن اسفنجی، محصول استراتژیک فولاد گهرزمین؛ با تمرکز بر کیفیت،
              پایداری و ارزش‌آفرینی در زنجیره صنعت فولاد کشور.
            </p>
            <Link className="sponge-section__link" href="/products">
              مشاهده محصولات
              <ArrowLeft size={17} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="sponge-section__visual">
          <Image
            src="/sections/sponge-iron.webp"
            alt="نمای نزدیک از گندله‌های آهن اسفنجی"
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1080px) 60vw, 58vw"
            className="sponge-section__image"
          />
          <span className="sponge-section__image-tint" aria-hidden="true"/>
        </div>
      </div>
    </section>
  );
}
