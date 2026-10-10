"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, X } from "lucide-react";

type Certificate = {
  id: string;
  title: string;
  label: string;
  src: string;
  alt: string;
};

const certificates: Certificate[] = [
  {
    id: "excellence-5-star",
    title: "تندیس پنج‌ستاره تعالی",
    label: "INEA",
    src: "/certificates/excellence-5-star.png",
    alt: "تندیس پنج‌ستاره تعالی شرکت معدنی و صنعتی گهرزمین",
  },
  {
    id: "maintenance-award",
    title: "جایزه ملی تعالی نگهداری",
    label: "مدیریت دارایی‌های فیزیکی",
    src: "/certificates/maintenance-award.png",
    alt: "تقدیرنامه هفتمین دوره جایزه ملی تعالی نگهداری و مدیریت دارایی‌های فیزیکی برای شرکت گهرزمین",
  },
  {
    id: "excellence-5-star-repeat",
    title: "تندیس پنج‌ستاره تعالی",
    label: "INEA",
    src: "/certificates/excellence-5-star.png",
    alt: "تندیس پنج‌ستاره تعالی شرکت معدنی و صنعتی گهرزمین",
  },
];

export function CertificatesSection() {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = (item: Certificate) => {
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
              <p>تقدیرنامه‌ها و تندیس‌های دریافتی فولاد گهرزمین.</p>
            </div>
          </div>
        </header>
        <div className="certificates-section__grid">
          {certificates.map((certificate) => (
            <article className="certificate-card" key={certificate.id}>
              <div className="certificate-card__content">
                <h3>{certificate.title}</h3>
                <strong>{certificate.label}</strong>
                <button type="button" onClick={() => open(certificate)}>
                  مشاهده گواهینامه <ArrowLeft size={15} aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                className="certificate-card__frame"
                aria-label={`مشاهده ${certificate.title}`}
                onClick={() => open(certificate)}
              >
                <Image
                  src={certificate.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="certificate-card__image"
                />
              </button>
            </article>
          ))}
        </div>
      </div>
      <dialog
        className="certificates-dialog"
        ref={dialogRef}
        aria-labelledby="certificate-dialog-title"
        onClose={() => setSelected(null)}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
      >
        {selected && (
          <div className="certificates-dialog__inside" dir="rtl">
            <div className="certificates-dialog__top">
              <span id="certificate-dialog-title">{selected.title}</span>
              <button type="button" onClick={close} aria-label="بستن"><X size={19} /></button>
            </div>
            <div className="certificates-dialog__photo">
              <Image
                src={selected.src}
                alt={selected.alt}
                width={900}
                height={1200}
                className="certificates-dialog__image"
              />
            </div>
            <button type="button" className="certificates-dialog__close" onClick={close}>بستن</button>
          </div>
        )}
      </dialog>
    </section>
  );
}
