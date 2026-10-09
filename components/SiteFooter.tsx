import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Globe2, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

const quick = [
  {label:"درباره ما",href:"/about"},
  {label:"مناقصات و مزایدات",href:"/tenders"},
  {label:"اخبار و رویدادها",href:"/news"},
  {label:"آهن اسفنجی",href:"/#sponge-iron"},
  {label:"گواهینامه‌ها و استانداردها",href:"/#certificates"},
];
const resources = [
  {label:"معرفی شرکت",href:"/about"},
  {label:"چرا گهرزمین؟",href:"/#why-gohar"},
  {label:"مطالب معرفی و گزارش تصویری",href:"/news"},
  {label:"دسترسی به مناقصات",href:"/tenders"},
];

export function SiteFooter() {
  return (
    <footer className="gz-footer" id="contact-company">
      <div className="gz-footer__background" aria-hidden="true"/>
      <div className="gz-footer__line" aria-hidden="true"/>
      <div className="end-sections-container">
        <div className="gz-footer__main">
          <div className="gz-footer__brand">
            <Link href="/" className="gz-footer__brand-link">
              <Image src="/brand/gohar-mark.svg" width={64} height={64} alt="نشان شرکت فولاد گهرزمین"/>
              <span><strong>شرکت فولاد گهرزمین</strong><small dir="ltr">GOHAR ZAMIN STEEL CO.</small></span>
            </Link>
            <p>تولیدکننده آهن اسفنجی و فعال در زنجیره صنعت فولاد کشور، در شهرستان بردسیر استان کرمان.</p>
            <span className="gz-footer__registration">شماره ثبت: ۱۰۷۶ | شناسه ملی: ۱۴۰۱۵۳۶۷۸۲۸</span>
          </div>

          <nav className="gz-footer__links" aria-label="دسترسی سریع فوتر">
            <h2>دسترسی سریع</h2>
            <ul>{quick.map((item) => <li key={item.href}><Link href={item.href}><ArrowUpLeft size={13} aria-hidden="true"/>{item.label}</Link></li>)}</ul>
          </nav>
          <nav className="gz-footer__links" aria-label="اطلاعات بیشتر">
            <h2>اطلاعات و معرفی</h2>
            <ul>{resources.map((item) => <li key={item.href}><Link href={item.href}><ArrowUpLeft size={13} aria-hidden="true"/>{item.label}</Link></li>)}</ul>
          </nav>
          <div className="gz-footer__contact">
            <h2>تماس با ما</h2>
            <address>
              <div><MapPin size={18} aria-hidden="true"/><span>استان کرمان، شهرستان بردسیر، شهر نگار</span></div>
              <a href="tel:41190" dir="ltr"><Phone size={17} aria-hidden="true"/><span>41190</span></a>
              <a href="https://goharzaminsteel.ir/" target="_blank" rel="noopener noreferrer" dir="ltr"><Globe2 size={17} aria-hidden="true"/><span>goharzaminsteel.ir</span></a>
            </address>
            <p className="gz-footer__email-note"><Mail size={14} aria-hidden="true"/> ایمیل سازمانی پس از تأیید شرکت اضافه خواهد شد.</p>
          </div>
        </div>
        <div className="gz-footer__bottom">
          <p>© {new Date().getFullYear()} شرکت فولاد گهرزمین. تمامی حقوق محفوظ است.</p>
          <span><ShieldCheck size={15} aria-hidden="true"/> سایت در مرحله تکمیل و بررسی محتوا است.</span>
          <a href="#top">بازگشت به بالا <ArrowUpLeft size={14} aria-hidden="true"/></a>
        </div>
      </div>
    </footer>
  );
}
