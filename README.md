# فولاد گهرزمین — Corporate Website

Next.js App Router + TypeScript. Implementation delivered section-by-section with GitHub commits.

## Start
```bash
npm install
npm run dev
npm run build
```

## Brand colors
- Navy `#293B84`
- Red `#EE2535`
- Industrial gray `#818994`
- RTL responsive layout. IRANSans font faces are configured; licensed fonts still need to be added to `public/fonts/`. Until then Vazirmatn fallback is used.

## Homepage structure
- Two-tier animated header (site-wide)
- Cinematic industrial hero
- Four quick-access cards
- 01 — Procurement notices: search, filters, sort, detail dialogs, and /tenders archive
- 02 — About Gohar Zamin, mirrored image/text layout
- 03 — Sponge iron product introduction
- **04 — Certificates and standards**: ISO 9001/14001/45001 visual category cards and evidence-status dialogs
- **05 — News and editorial content**: rotating featured story, three selectable cards, director introduction, full /news and /news/[slug] routes
- **06 — Why Gohar Zamin**: five industrial value propositions
- Shared Footer — in the root layout, so it renders consistently across all routes

## Client-supplied visuals
- `/news/ceo.avif` — actual CEO portrait cropped from user-supplied photo
- `/news/factory-feature.avif` — factory panorama graded and resized from user-supplied aerial image
- `/news/factory-small.avif` — compact shot of user-supplied steel facilities
- `/sections/sponge-iron.webp` — user-supplied product photo
- Hero still defaults to the previously committed compressed AVIF preview. The high-resolution original remains a separate future upgrade.

## Important publication rules
- The ISO cards display **standard categories**, not evidence that the company holds verified certificates. They have no fake documents; genuine signed files and expiry data are required.
- News items are **editorial introductions** rather than real press releases or dated events. The CEO biography/name should only be completed after corporate confirmation.
- The 12 notices under `/tenders` are explicitly labeled demonstration data. An official CMS/API must replace them before publication.
- No invented email or social accounts are linked in the footer.
- `noindex` remains enabled while site content is being approved.

## QA
Commit and file presence verified via GitHub. Responsive layout, browser interactions and `npm run build` require runtime testing. Do not mark these completed without running the tests.

## Homepage navigation refinement

The About and procurement sections have been reordered: **01 About, 02 Notices**. An ore-pellet scroll rail and softly patterned left edge appear only on the home page. See `docs/iron-ore-navigation-qa.md` for the section map, behavior and testing checklist.
