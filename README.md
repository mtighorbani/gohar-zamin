# فولاد گهرزمین — Corporate Website

Next.js App Router, TypeScript. Development is staged and committed section-by-section.

## Development
```bash
npm install
npm run dev
npm run build
```

## Stage 03 — Hero / responsive above the fold
- At laptop/desktop width, the expanded header (36px + 78px) and hero fit one screen. The bottom three facts remain in the first viewport.
- Title, body, buttons and compact facts have a restrained hierarchy based on the approved mockup.
- Navy + red logo accents, with desaturated steel gray photo treatment.
- The hero prefers `public/hero/gohar-factory-original.jpg` at the client-supplied original resolution (2048x1536). **This asset still needs to be transferred into GitHub**; until then the committed AVIF preview is used. Do not upscale the 4KB preview or claim it is the original.
- Product/capacity facts not yet confirmed by the client are not invented.

## IRANSans (commercial license)
Use a legitimately licensed IRANSans webfont. Add these files to `public/fonts/`:
- `IRANSans-Regular.woff2`
- `IRANSans-Medium.woff2`
- `IRANSans-Bold.woff2`

The font faces are configured in `app/globals.css`. Until the client supplies the licensed font binaries, the UI falls back to Vazirmatn. Do not commit or distribute unlicensed font files.

## Sections
01. Header: implemented.
02. Hero: responsive layout implemented; full-resolution photo and licensed font pending binary upload.
03. Quick access: next stage.

Site is intentionally `noindex` during development.
