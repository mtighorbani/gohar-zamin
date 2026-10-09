"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDownUp, ArrowLeft, ChevronLeft, ChevronRight, Download,
  FileSearch, RotateCcw, Search, X,
} from "lucide-react";
import {
  demoNotices,
  localizeDigits,
  normalizePersian,
  noticeStatusLabels,
  noticeTypeLabels,
  type Notice,
  type NoticeStatus,
  type NoticeType,
} from "../data/notices";

type NoticeFilter = NoticeType | "all";
type StatusFilter = NoticeStatus | "all";
type SortField = "publishedAt" | "deadline";
type SortDirection = "asc" | "desc";

const filters: { value: NoticeFilter; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "tender", label: "مناقصه" },
  { value: "auction", label: "مزایده" },
  { value: "call", label: "فراخوان" },
];

const PAGE_SIZE = 8;
const HOME_LIMIT = 6;

export function NoticesBoard({ archive = false }: { archive?: boolean }) {
  const [type, setType] = useState<NoticeFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("publishedAt");
  const [direction, setDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Notice | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = normalizePersian(query);
    const records = demoNotices.filter((notice) => {
      if (type !== "all" && notice.kind !== type) return false;
      if (status !== "all" && notice.status !== status) return false;
      if (!q) return true;
      return normalizePersian([
        notice.subject, notice.reference, notice.id,
        noticeTypeLabels[notice.kind], noticeStatusLabels[notice.status],
      ].join(" ")).includes(q);
    });
    return [...records].sort((a, b) => {
      const comparison = a[sortBy].localeCompare(b[sortBy]);
      return direction === "asc" ? comparison : -comparison;
    });
  }, [type, status, query, sortBy, direction]);

  const size = archive ? PAGE_SIZE : HOME_LIMIT;
  const pageCount = Math.max(1, Math.ceil(filtered.length / size));
  const pageNumber = Math.min(page, pageCount);
  const shown = archive ? filtered.slice((pageNumber - 1) * size, pageNumber * size) : filtered.slice(0, size);

  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);

  const openDetails = (notice: Notice) => setSelected(notice);
  const closeDetails = () => {
    dialog.current?.close();
    setSelected(null);
  };

  const changeType = (nextType: NoticeFilter) => {
    setType(nextType);
    setPage(1);
  };
  const changeStatus = (nextStatus: StatusFilter) => {
    setStatus(nextStatus);
    setPage(1);
  };
  const changeQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };
  const changeSort = (next: SortField) => {
    if (sortBy === next) setDirection((current) => current === "desc" ? "asc" : "desc");
    else {
      setSortBy(next);
      setDirection("desc");
    }
    setPage(1);
  };
  const clear = () => {
    changeType("all");
    changeStatus("all");
    changeQuery("");
    setSortBy("publishedAt");
    setDirection("desc");
    search.current?.focus();
  };

  return (
    <section className={`notices ${archive ? "notices--archive" : ""}`} id="tenders" aria-labelledby="notices-title">
      <div className="notices__container">
        <div className="notices__heading">
          <div className="notices__heading-main">
            <span className="notices__number" aria-hidden="true">02</span>
            <div>
              {archive && <span className="notices__eyebrow">مرکز اطلاعات تأمین و معاملات</span>}
              <h2 id="notices-title">مناقصات، مزایدات و فراخوان‌ها</h2>
              <p className="notices__sample"><span aria-hidden="true"/> داده‌های نمونه برای نمایش قابلیت‌ها؛ آگهی رسمی نیستند</p>
            </div>
          </div>
          {!archive && (
            <Link className="notices__all-link" href="/tenders">
              مشاهده همه <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          )}
          {archive && <Link className="notices__all-link" href="/">بازگشت به صفحه اصلی <ArrowLeft size={16} aria-hidden="true" /></Link>}
        </div>

        <div className="notices__toolbar">
          <div className="notices__tabs" role="group" aria-label="فیلتر نوع آگهی">
            {filters.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`notices__tab ${type === option.value ? "is-active" : ""}`}
                aria-pressed={type === option.value}
                onClick={() => changeType(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="notices__search-wrap">
            {archive && (
              <label className="notices__select-wrap">
                <span className="sr-only">وضعیت آگهی</span>
                <select value={status} onChange={(event) => changeStatus(event.target.value as StatusFilter)}>
                  <option value="all">همه وضعیت‌ها</option>
                  <option value="active">فعال</option>
                  <option value="review">در حال ارزیابی</option>
                  <option value="closed">بسته</option>
                </select>
              </label>
            )}
            <label className="notices__search">
              <Search size={17} aria-hidden="true" />
              <span className="sr-only">جست‌وجو در عنوان یا شماره آگهی</span>
              <input
                ref={search}
                value={query}
                onChange={(event) => changeQuery(event.target.value)}
                type="search"
                placeholder="جست‌وجو در عنوان، شماره یا موضوع..."
              />
            </label>
            {query && (
              <button className="notices__clear-search" type="button" onClick={() => changeQuery("")} aria-label="پاک کردن جست‌وجو">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        <div className="notices__result-bar" aria-live="polite" aria-atomic="true">
          <span>{localizeDigits(String(filtered.length))} آگهی نمایشی یافت شد</span>
          {(query || type !== "all" || status !== "all") && (
            <button type="button" onClick={clear}><RotateCcw size={13} aria-hidden="true" /> پاک کردن فیلترها</button>
          )}
        </div>

        {shown.length === 0 ? (
          <div className="notices__empty" role="status">
            <FileSearch size={35} strokeWidth={1.6} aria-hidden="true" />
            <strong>آگهی مطابق جست‌وجوی شما پیدا نشد</strong>
            <p>عبارت دیگری جست‌وجو کنید یا فیلترها را پاک کنید.</p>
            <button type="button" onClick={clear}>نمایش همه آگهی‌ها</button>
          </div>
        ) : (
          <>
            <div className="notices__table-wrap">
              <table className="notices__table">
                <caption className="sr-only">فهرست نمونه مناقصات، مزایدات و فراخوان‌های فولاد گهرزمین</caption>
                <thead>
                  <tr>
                    <th scope="col" className="notices__subject-col">موضوع</th>
                    <th scope="col">شماره</th>
                    <th scope="col">نوع</th>
                    <th scope="col" aria-sort={sortBy === "publishedAt" ? direction === "asc" ? "ascending" : "descending" : "none"}>
                      <button type="button" className="notices__sort" onClick={() => changeSort("publishedAt")}>
                        تاریخ انتشار <ArrowDownUp size={13} aria-hidden="true" />
                      </button>
                    </th>
                    <th scope="col" aria-sort={sortBy === "deadline" ? direction === "asc" ? "ascending" : "descending" : "none"}>
                      <button type="button" className="notices__sort" onClick={() => changeSort("deadline")}>
                        مهلت دریافت <ArrowDownUp size={13} aria-hidden="true" />
                      </button>
                    </th>
                    <th scope="col">وضعیت</th>
                    <th scope="col">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((notice) => (
                    <tr key={notice.id}>
                      <td className="notices__subject">{notice.subject}</td>
                      <td className="notices__number-cell" dir="ltr">{notice.reference}</td>
                      <td><span className={`notices__kind notices__kind--${notice.kind}`}>{noticeTypeLabels[notice.kind]}</span></td>
                      <td dir="ltr">{localizeDigits(notice.publishedAt)}</td>
                      <td dir="ltr">{localizeDigits(notice.deadline)}</td>
                      <td><span className={`notices__status notices__status--${notice.status}`}><i aria-hidden="true"/>{noticeStatusLabels[notice.status]}</span></td>
                      <td>
                        <button type="button" className="notices__action" onClick={() => openDetails(notice)}>
                          مشاهده جزئیات <ArrowLeft size={14} aria-hidden="true"/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="notices__mobile-list">
              {shown.map((notice) => (
                <article className="notices__mobile-card" key={notice.id}>
                  <div className="notices__mobile-head">
                    <span className={`notices__kind notices__kind--${notice.kind}`}>{noticeTypeLabels[notice.kind]}</span>
                    <span className={`notices__status notices__status--${notice.status}`}><i aria-hidden="true"/>{noticeStatusLabels[notice.status]}</span>
                  </div>
                  <h3>{notice.subject}</h3>
                  <dl>
                    <div><dt>شماره</dt><dd dir="ltr">{notice.reference}</dd></div>
                    <div><dt>تاریخ انتشار</dt><dd>{localizeDigits(notice.publishedAt)}</dd></div>
                    <div><dt>مهلت دریافت</dt><dd>{localizeDigits(notice.deadline)}</dd></div>
                  </dl>
                  <button type="button" className="notices__action" onClick={() => openDetails(notice)}>مشاهده جزئیات <ArrowLeft size={14}/></button>
                </article>
              ))}
            </div>
          </>
        )}

        {archive && shown.length > 0 && pageCount > 1 && (
          <nav className="notices__pagination" aria-label="صفحه‌بندی آگهی‌ها">
            <button type="button" disabled={pageNumber === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              <ChevronRight size={17} aria-hidden="true" /> قبلی
            </button>
            <span>صفحه {localizeDigits(String(pageNumber))} از {localizeDigits(String(pageCount))}</span>
            <button type="button" disabled={pageNumber === pageCount} onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>
              بعدی <ChevronLeft size={17} aria-hidden="true" />
            </button>
          </nav>
        )}

        {!archive && filtered.length > HOME_LIMIT && (
          <div className="notices__more-bottom">
            <Link href="/tenders">مشاهده آرشیو آگهی‌ها <ArrowLeft size={15} aria-hidden="true"/></Link>
          </div>
        )}
      </div>

      <dialog
        className="notice-dialog"
        ref={dialog}
        aria-labelledby="notice-dialog-title"
        onClose={() => setSelected(null)}
        onClick={(event) => { if (event.target === event.currentTarget) closeDetails(); }}
      >
        {selected && (
          <div className="notice-dialog__content" dir="rtl">
            <div className="notice-dialog__header">
              <span className="notice-dialog__tag">آگهی نمایشی — غیررسمی</span>
              <button type="button" aria-label="بستن جزئیات" onClick={closeDetails}><X size={20}/></button>
            </div>
            <h2 id="notice-dialog-title">{selected.subject}</h2>
            <p className="notice-dialog__intro">{selected.summary}</p>
            <dl className="notice-dialog__info">
              <div><dt>شماره آگهی</dt><dd dir="ltr">{selected.reference}</dd></div>
              <div><dt>نوع</dt><dd>{noticeTypeLabels[selected.kind]}</dd></div>
              <div><dt>تاریخ انتشار</dt><dd>{localizeDigits(selected.publishedAt)}</dd></div>
              <div><dt>مهلت دریافت</dt><dd>{localizeDigits(selected.deadline)}</dd></div>
              <div><dt>وضعیت</dt><dd>{noticeStatusLabels[selected.status]}</dd></div>
            </dl>
            <div className="notice-dialog__attachments">
              <h3>اسناد و فایل‌های پیوست</h3>
              {selected.attachments.length ? (
                selected.attachments.map((file) => (
                  <a href={file.url} key={file.url} target="_blank" rel="noopener noreferrer">
                    {file.title} <Download size={17} aria-hidden="true"/>
                  </a>
                ))
              ) : <p>برای این داده نمایشی، فایل پیوست واقعی ثبت نشده است.</p>}
            </div>
            <button type="button" className="notice-dialog__close" onClick={closeDetails}>بستن</button>
          </div>
        )}
      </dialog>
    </section>
  );
}
