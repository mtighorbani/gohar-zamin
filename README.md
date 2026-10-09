# فولاد گهرزمین — Corporate Website

Next.js App Router / TypeScript. Section-by-section implementation with independent commits.

## Local development

```bash
npm install
npm run dev
npm run build
```

## Brand
- Navy: `#293B84`
- Red: `#EE2535`
- Iron-gray: `#818994`
- RTL and responsive layout
- Licensed IRANSans fonts may be added under `public/fonts`; Vazirmatn is the current fallback.

## Implemented home sections
1. Header: sticky two-level navigation, looping corporate links and mobile navigation.
2. Hero: responsive factory image treatment and company facts.
3. Quick access: production, quality and standards, sponge iron, tenders.
4. **Notices 01**: `components/NoticesBoard.tsx` + `app/notices.css`. Search, type filters, publication/deadline sorting, colored status labels, accessible details dialog and a separate `/tenders` archive with status filter and pagination. Mobile cards replace the desktop table.
5. Sponge iron 03: editorial product showcase with a client product photograph.

### CRITICAL: procurement notices are demonstration data
The twelve sample records in `data/notices.ts` are **NOT verified company notices**. Their subjects, dates, statuses and reference numbers are invented solely to test the UX and are visibly marked as samples on both homepage and `/tenders`. They **must not** be treated as real active procurements.

Before a public production release:
- Connect this module to an authorized CMS/procurement data source.
- Map the verified API response to the `Notice` type and remove `demoNotices`.
- Provide authorized attachments as `{ title, url }`. The current details dialog correctly says no attachments are available; it does not fake downloads.
- Verify date/timezone conventions, archive policy, statuses, search, authorization and real download links.
- Add server-side pagination and filtering if the dataset becomes large.
- Remove `noindex` only when the site and live procurement records are approved.

## Pending client assets
- Hero original: `public/hero/gohar-factory-original.jpg` should contain the original image (currently falls back to compressed AVIF).
- Sponge iron product: `public/sections/sponge-iron.webp`.
- Licensed IRANSans font files under `public/fonts` as described above.

## QA
See `docs/notices-qa.md` for acceptance criteria and manual test cases. Build/browser validation needs to be run in the application environment.
