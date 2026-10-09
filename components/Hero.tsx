import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Factory, MapPin, ShieldCheck } from "lucide-react";

const facts = [
  { label: "محصول محوری", value: "آهن اسفنجی", Icon: Factory },
  { label: "موقعیت کارخانه", value: "شهر نگار، بردسیر، کرمان", Icon: MapPin },
  { label: "رویکرد تولید", value: "کیفیت و توسعه پایدار", Icon: ShieldCheck },
];

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero__media" aria-hidden="true">
      <Image src="/hero/gohar-factory.avif" alt="" fill priority sizes="100vw" className="hero__photo"/>
    </div>
    <div className="hero__shade" aria-hidden="true"/>
    <div className="hero__line hero__line--one" aria-hidden="true"/>
    <div className="hero__line hero__line--two" aria-hidden="true"/>
    <div className="hero__container">
      <div className="hero__content">
        <p className="hero__eyebrow"><span/> شرکت فولاد گهرزمین <i aria-hidden="true">/</i> پیشرو در تولید آهن اسفنجی</p>
        <h1 id="hero-title" className="hero__title"><span>در قلب صنعت،</span><strong>در مسیر آینده فولاد ایران</strong></h1>
        <p className="hero__description">فولاد گهرزمین با تمرکز بر تولید آهن اسفنجی، کیفیت محصول و توسعه مسئولانه، در مسیر تقویت زنجیره ارزش فولاد کشور گام برمی‌دارد.</p>
        <div className="hero__actions">
          <Link className="hero__button hero__button--primary" href="/about">آشنایی با فولاد گهرزمین <ArrowUpLeft size={18} strokeWidth={2} aria-hidden="true"/></Link>
          <a className="hero__button hero__button--ghost" href="tel:41190">تماس با ما <span dir="ltr">41190</span></a>
        </div>
      </div>
      <div className="hero__bottom">
        <div className="hero__highlights" aria-label="اطلاعات کلیدی شرکت">
          {facts.map(({label,value,Icon})=><div className="hero__highlight" key={label}>
            <span className="hero__highlight-icon"><Icon size={27} strokeWidth={1.5} aria-hidden="true"/></span>
            <span className="hero__highlight-text"><small>{label}</small><strong>{value}</strong></span>
          </div>)}
        </div>
        <div className="hero__visual-label" aria-hidden="true"><b>GZ</b><span>GOHAR ZAMIN<br/>STEEL CO.</span></div>
      </div>
    </div>
    <div className="hero__corner" aria-hidden="true"/>
  </section>;
}
