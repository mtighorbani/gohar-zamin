"use client";

import { useEffect, useState, type CSSProperties } from "react";

const steps = [
  { id: "home-hero", label: "شروع" },
  { id: "quick-access", label: "دسترسی سریع" },
  { id: "about-company", label: "درباره گهرزمین" },
  { id: "tenders", label: "مناقصات و مزایدات" },
  { id: "sponge-iron", label: "آهن اسفنجی" },
  { id: "certificates", label: "گواهینامه‌ها" },
  { id: "company-news", label: "اخبار و رویدادها" },
  { id: "why-gohar", label: "چرا گهرزمین؟" },
  { id: "contact-company", label: "پایان" },
] as const;

/** Floating, scroll-aware, keyboard accessible section rail (home page only). */
export function IronOreStepper() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.38;
      let current = 0;
      for (let i = 0; i < steps.length; i++) {
        const element = document.getElementById(steps[i].id);
        if (element && element.getBoundingClientRect().top <= anchor) current = i;
      }
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const atBottom = window.scrollY >= maxScroll - 5;
      if (atBottom) current = steps.length - 1;
      setActive((previous) => previous === current ? previous : current);

      // Progress is measured between neighboring section markers, not by raw
      // page height, so the line always reaches the currently active pellet.
      const currentElement = document.getElementById(steps[current].id);
      const nextElement = current < steps.length - 1 ? document.getElementById(steps[current + 1].id) : null;
      const currentTop = currentElement?.getBoundingClientRect().top ?? anchor;
      const nextTop = nextElement?.getBoundingClientRect().top ?? currentTop + window.innerHeight;
      const interval = Math.max(1, nextTop - currentTop);
      const fractional = atBottom ? 0 : nextElement ? Math.max(0, Math.min(1, (anchor - currentTop) / interval)) : 0;
      const measured = current === steps.length - 1 ? 100 : Math.max(0, Math.min(100, ((current + fractional) / (steps.length - 1)) * 100));
      setProgress((previous) => Math.abs(previous - measured) < 0.25 ? previous : measured);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, {passive:true});
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
    };
  }, []);

  const progressStyle = {"--ore-progress": `${progress}%`} as CSSProperties;
  return (
    <nav className="ore-stepper" aria-label="پیمایش مرحله‌ای بخش‌های صفحه اصلی">
      <span className="ore-stepper__top-label" aria-hidden="true">شروع</span>
      <div className="ore-stepper__track" style={progressStyle}>
        <span className="ore-stepper__line" aria-hidden="true"/>
        <span className="ore-stepper__line-fill" aria-hidden="true"/>
        <ol className="ore-stepper__list">
          {steps.map((step, index) => (
            <li key={step.id} className="ore-stepper__item">
              <a href={`#${step.id}`} className={`ore-stepper__link${active === index ? " is-active" : ""}`}
                 aria-label={`رفتن به بخش ${step.label}`} aria-current={active === index ? "step" : undefined}
                 title={step.label}>
                <span className="ore-stepper__stone" aria-hidden="true" />
                <span className="ore-stepper__tooltip" aria-hidden="true">{step.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <span className="ore-stepper__bottom-label" aria-hidden="true">پایان</span>
    </nav>
  );
}
