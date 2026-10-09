import Link from "next/link";
import { ChartNoAxesCombined, FileText, Plus, ShieldCheck } from "lucide-react";

function IronPelletsIcon() {
  // Industrial sponge-iron pellets, rather than a generic package/box icon.
  const pellets = [
    [23, 7], [18, 15], [28, 15],
    [13, 23], [23, 23], [33, 23],
    [8, 31], [18, 31], [28, 31], [38, 31],
    [13, 39], [23, 39], [33, 39],
  ];
  return (
    <svg viewBox="0 0 46 46" fill="none" aria-hidden="true" className="quick-access__pellets">
      {pellets.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.9" stroke="currentColor" strokeWidth="1.85" fill="currentColor" fillOpacity=".1"/>
      ))}
    </svg>
  );
}

const links = [
  {
    title: "میزان تولید",
    subtitle: "آمار تولید و عملکرد سالانه",
    href: "/production",
    icon: ChartNoAxesCombined,
  },
  {
    title: "کیفیت و استاندارد",
    subtitle: "تعهد ما به کیفیت پایدار",
    href: "/quality-and-standards",
    icon: ShieldCheck,
  },
  {
    title: "آهن اسفنجی",
    subtitle: "محصول استراتژیک",
    href: "/products",
    icon: IronPelletsIcon,
  },
  {
    title: "مناقصات و مزایدات",
    subtitle: "شفافیت در مسیر توسعه",
    href: "/tenders",
    icon: FileText,
  },
] as const;

export function QuickAccess() {
  return (
    <section className="quick-access" aria-label="دسترسی سریع به بخش‌های مهم فولاد گهرزمین">
      <div className="quick-access__container">
        <nav className="quick-access__grid" aria-label="دسترسی سریع">
          {links.map(({ title, subtitle, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="quick-access__card"
              aria-label={`${title}، ${subtitle}`}
            >
              <span className="quick-access__icon" aria-hidden="true"><Icon /></span>
              <span className="quick-access__copy">
                <span className="quick-access__title">{title}</span>
                <span className="quick-access__subtitle">{subtitle}</span>
              </span>
              <span className="quick-access__more" aria-hidden="true"><Plus size={16} strokeWidth={2}/></span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
