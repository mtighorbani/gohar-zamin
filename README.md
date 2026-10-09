# فولاد گهرزمین — Corporate Website

Next.js App Router / TypeScript. Section-by-section implementation with separate commits.

## Run locally

```bash
npm install
npm run dev
npm run build
```

## Brand
- Navy: `#293B84`
- Red: `#EE2535`
- Iron-gray: `#818994`
- RTL and responsive design

## Page sections
1. Header: two-tier nav, looping corporate links, sticky behavior.
2. Hero: responsive industrial hero and company facts.
3. Quick access: four cards for production, standards, sponge iron, tenders.
4. Sponge iron: editorial composition, section number 03, product copy, diagonal clipped macro photo, CTA. Component is `components/SpongeIronSection.tsx`.

## Client assets (still required)
- Hero original: `public/hero/gohar-factory-original.jpg`; until provided, uses prior small AVIF preview.
- Sponge iron photograph: bundled at `public/sections/sponge-iron.webp` from the client-supplied photograph (960×540, visually optimized for the short showcase).
- IRANSans fonts are commercial: when licensed font files are available, add `IRANSans-Regular.woff2`, `IRANSans-Medium.woff2`, `IRANSans-Bold.woff2` under `public/fonts/`.

Product details route `/products` is planned, not yet implemented. All development pages remain `noindex` until launch.

## Spacing
An 8px breathing gap separates Hero and Quick Access, and Quick Access and Sponge Iron on all breakpoints.
