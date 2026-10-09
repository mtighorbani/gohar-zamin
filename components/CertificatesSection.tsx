"use client";

import { useRef, useState } from "react";
import { ArrowLeft, Award, CheckCircle2, FileText, Leaf, ShieldCheck, X } from "lucide-react";

type Standard = {
  code: string;
  title: string;
  scope: string;
  description: string;
  Icon: typeof ShieldCheck;
};

const standards: Standard[] = [
  { code: "ISO 9001", title: "مدیریت کیفیت", scope: "کیفیت", description: "چارچوب سیستم‌های مدیریت کیفیت", Icon: Award },
  { code: "ISO 14001", title: "مدیریت محیط‌زیست", scope: "محیط‌زیست", description: "چارچوب مدیریت اثرات زیست‌محیطی", Icon: Leaf },
  { code: "ISO 45001", title: "ایمنی و بهداشت", scope: "ایمنی", description: "چارچوب مدیریت ایمنی و بهداشت شغلی", Icon: ShieldCheck },
];

/**
 * ISO labels describe relevant standard categories, not verified issued
 * certificates. Official documents must be independently provided/verified.
 */
export function CertificatesSection() {
  const [selected, setSelected] = useState<Standard | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = (item: Standard) => {
    setSelected(item);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  return (
    <section className="certificates-section" id="certificates" aria-labelledby="certificates-title">
      <div className="end-sections-container">
        <header className="end-section-heading">
          <div className="end-section-heading__main">
            <span className="end-section-heading__number" aria-hidden="true">04</span>
            <div>
              <h2 id="certificates-title">گواهینامه‌ها و استانداردها</h2>
              <p>معرفی حوزه‌های استاندارد؛ مدارک رسمی پس از تأیید بارگذاری می‌شوند.</p>
            </div>
          </div>
        </header>
        <div className="certificates-section__grid">
          {standards.map((standard) => (
            <article className="certificate-card" key={standard.code}>
              <span className="certificate-card__symbol" aria-hidden="true"><standard.Icon size={38} strokeWidth={1.4}/></span>
              <div className="certificate-card__content">
                <h3>استاندارد {standard.title}</h3>
                <strong dir="ltr">{standard.code}</strong>
                <button type="button" onClick={() => open(standard)}>
                  وضعیت مدرک <ArrowLeft size={15} aria-hidden="true"/>
                </button>
              </div>
              <div className="certificate-card__preview" aria-hidden="true">
                <FileText size={15} strokeWidth={1.3}/>
                <span>STANDARD</span>
                <strong>{standard.code}</strong>
                <i>PREVIEW</i>
                <small>تأیید نشده</small>
              </div>
            </article>
          ))}
        </div>
      </div>
      <dialog className="certificates-dialog" ref={dialogRef} aria-labelledby="certificate-dialog-title" onClose={() => setSelected(null)}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
        {selected && (
          <div className="certificates-dialog__inside" dir="rtl">
            <div className="certificates-dialog__top">
              <span><CheckCircle2 size={18} aria-hidden="true" /> معرفی استاندارد</span>
              <button type="button" onClick={close} aria-label="بستن"><X size={19}/></button>
            </div>
            <h2 id="certificate-dialog-title">{selected.title} — {selected.code}</h2>
            <p>{selected.description}</p>
            <p className="certificates-dialog__disclaimer">این مورد برای معرفی حوزه‌های استاندارد نمایش داده می‌شود. وجود گواهینامه معتبر برای شرکت تأیید نشده و هنوز نسخه رسمی مدرک در سایت بارگذاری نشده است.</p>
            <button type="button" className="certificates-dialog__close" onClick={close}>متوجه شدم</button>
          </div>
        )}
      </dialog>
    </section>
  );
}
