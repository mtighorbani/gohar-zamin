# فولاد گهرزمین — Corporate Website

Next.js App Router, TypeScript. Development is staged and committed section-by-section.

## Development
```bash
npm install
npm run dev
npm run build
```

## Design palette
- Navy: `#293B84`
- Red: `#EE2535`
- Steel / iron gray: `#818994`
- RTL and mobile-first responsive behavior.

## Implemented sections
01. **Header:** sticky two-level navigation and looping corporate links.
02. **Hero:** laptop-first compact layout; image treatment and key company facts.
03. **Quick-access cards:** production, quality & standards, sponge iron, tenders. Four columns on desktop, two on tablet, one on mobile. Focus, hover and reduced-motion handling included.

The four quick-access cards link to their planned routes (`/production`, `/quality-and-standards`, `/products`, `/tenders`). **Those detail pages will be implemented in later stages.** Do not treat the targets as completed.

## Outstanding client assets
- The full-resolution client-supplied hero photograph should be placed at `public/hero/gohar-factory-original.jpg` (the smaller AVIF is a fallback until the binary is uploaded).
- IRANSans is a licensed font. Once you have properly licensed files, add `IRANSans-Regular.woff2`, `IRANSans-Medium.woff2`, `IRANSans-Bold.woff2` to `public/fonts`. Styles are prepared; current fallback is Vazirmatn.

Site is intentionally `noindex` during development.
