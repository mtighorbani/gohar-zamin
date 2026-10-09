import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Factory, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "درباره فولاد گهرزمین | معرفی شرکت",
  description:
    "معرفی شرکت فولاد گهرزمین، تولیدکننده آهن اسفنجی در شهر نگار، شهرستان بردسیر استان کرمان.",
};

const companyInfo = [
  { label: "محصول اصلی", value: "آهن اسفنجی", icon: Factory },
  {
    label: "آدرس کارخانه",
    value: "استان کرمان، شهرستان بردسیر، شهر نگار",
    icon: MapPin,
  },
  { label: "شماره تماس", value: "۴۱۱۹۰", icon: Phone },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        style={{ background: "#f8f9fb", minHeight: "calc(100svh - 114px)" }}
      >
        <div
          style={{
            maxWidth: 1320,
            padding: "clamp(24px,5vw,68px)",
            margin: "0 auto",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#293b84",
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 20,
            }}
          >
            بازگشت به صفحه اصلی <ArrowLeft size={16} />
          </Link>
          <section
            aria-labelledby="about-page-title"
            style={{ display: "grid", gap: 28 }}
          >
            <header style={{ maxWidth: 760 }}>
              <p style={{ color: "#293b84", fontSize: 13, fontWeight: 700 }}>
                معرفی شرکت
              </p>
              <h1
                id="about-page-title"
                style={{
                  color: "#17253a",
                  fontSize: "clamp(28px,4vw,48px)",
                  lineHeight: 1.5,
                  margin: "10px 0",
                }}
              >
                درباره فولاد گهرزمین
              </h1>
              <p
                style={{
                  color: "#566477",
                  fontSize: "clamp(13px,1.15vw,16px)",
                  lineHeight: 2.2,
                  margin: 0,
                }}
              >
                شرکت فولاد گهرزمین در استان کرمان، شهرستان بردسیر، شهر نگار قرار
                دارد. فعالیت شرکت با محوریت تولید آهن اسفنجی و حضور در زنجیره
                صنعت فولاد کشور است.
              </p>
            </header>
            <div
              style={{
                position: "relative",
                height: "clamp(240px,33vw,440px)",
                borderRadius: 14,
                overflow: "hidden",
                background: "#25344b",
              }}
            >
              <Image
                src="/hero/gohar-factory-new.avif"
                alt="تأسیسات کارخانه فولاد گهرزمین در استان کرمان"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: "contrast(1.08) brightness(.85)",
                }}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
                gap: 15,
              }}
            >
              {companyInfo.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: 20,
                    border: "1px solid #e3e8f0",
                    borderRadius: 10,
                    background: "white",
                  }}
                >
                  <Icon size={25} color="#293b84" aria-hidden="true" />
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: 11,
                        color: "#7c8899",
                      }}
                    >
                      {label}
                    </span>
                    <strong
                      style={{
                        display: "block",
                        marginTop: 6,
                        color: "#233248",
                        fontSize: 14,
                        lineHeight: 1.8,
                      }}
                    >
                      {value}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "#718095", margin: 0 }}>
              شماره ثبت: ۱۰۷۶ | شناسه ملی: ۱۴۰۱۵۳۶۷۸۲۸
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
