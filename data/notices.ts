/**
 * Representative ONLY. These records are NOT live procurement notices.
 * Replace this module with the verified corporate API/CMS data source before launch.
 */
export type NoticeType = "tender" | "auction" | "call";
export type NoticeStatus = "active" | "closed" | "review";

export interface NoticeAttachment {
  title: string;
  url: string;
}

export interface Notice {
  id: string;
  subject: string;
  reference: string;
  kind: NoticeType;
  publishedAt: string; // Jalali YYYY/MM/DD with ASCII numerals for correct sorting
  deadline: string;
  status: NoticeStatus;
  summary: string;
  attachments: readonly NoticeAttachment[];
}

export const noticeTypeLabels: Record<NoticeType, string> = {
  tender: "مناقصه",
  auction: "مزایده",
  call: "فراخوان",
};

export const noticeStatusLabels: Record<NoticeStatus, string> = {
  active: "فعال",
  closed: "بسته",
  review: "در حال ارزیابی",
};

const demo = (
  id: string,
  subject: string,
  kind: NoticeType,
  publishedAt: string,
  deadline: string,
  status: NoticeStatus,
): Notice => ({
  id,
  subject,
  reference: `DEMO-${id}`,
  kind,
  publishedAt,
  deadline,
  status,
  summary:
    "این رکورد صرفاً برای نمایش طراحی و آزمایش عملکرد جست‌وجو، فیلتر و مشاهده جزئیات ساخته شده است. متن، تاریخ‌ها و وضعیت آن آگهی رسمی شرکت نیست.",
  attachments: [],
});

/** Clearly marked test fixtures. Never present these as real opportunities. */
export const demoNotices: readonly Notice[] = [
  demo("012", "تأمین مواد اولیه و اقلام مصرفی خط تولید", "tender", "1405/07/17", "1405/08/02", "active"),
  demo("011", "احداث بخش پشتیبان تأسیسات کارخانه", "call", "1405/07/16", "1405/08/01", "active"),
  demo("010", "فروش تجهیزات مستعمل و مازاد مجموعه", "auction", "1405/07/15", "1405/07/29", "active"),
  demo("009", "خدمات نگهداری و پشتیبانی تجهیزات", "tender", "1405/07/14", "1405/07/27", "review"),
  demo("008", "خرید تجهیزات آزمایشگاهی و کنترل کیفیت", "tender", "1405/07/13", "1405/07/25", "closed"),
  demo("007", "خدمات مشاوره فنی و مهندسی", "call", "1405/07/12", "1405/07/23", "active"),
  demo("006", "تأمین اقلام برق و ابزار دقیق", "tender", "1405/07/11", "1405/07/22", "active"),
  demo("005", "فروش اقلام و قطعات مازاد انبار", "auction", "1405/07/10", "1405/07/21", "closed"),
  demo("004", "خدمات سرویس و نگهداری سیستم‌های مکانیکی", "tender", "1405/07/09", "1405/07/20", "review"),
  demo("003", "شناسایی پیمانکاران واجد شرایط خدمات حمل", "call", "1405/07/08", "1405/07/19", "active"),
  demo("002", "تأمین قطعات و لوازم یدکی خطوط صنعتی", "tender", "1405/07/07", "1405/07/18", "closed"),
  demo("001", "واگذاری تجهیزات مستعمل از طریق مزایده", "auction", "1405/07/06", "1405/07/17", "closed"),
];

const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
export const localizeDigits = (text: string): string =>
  text.replace(/\d/g, (digit) => persianDigits[Number(digit)]);

export const normalizePersian = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/\s+/g, " ")
    .trim();
