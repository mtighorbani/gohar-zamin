# UI follow-up: Section ordering and ore-textured side navigation

## Approved home order
- Hero (start marker)
- Four quick-access cards
- **01** — About Gohar Zamin (moved before notices)
- **02** — Notices, tenders, auctions and calls (moved after About)
- **03** — Sponge iron product
- **04** — Certificates and standards
- **05** — News and events
- **06** — Why Gohar Zamin
- Footer (end marker)

## Left edge and rail
- `components/IronOreStepper.tsx` provides a fixed 9-point scroll-aware navigation using real DOM section positions.
- Markers use the existing customer-supplied sponge iron photograph as a CSS background, giving a textured pellet surface; hover and active focus rings use the brand palette.
- `public/brand/ore-edge-pattern.svg` contains a repeatable transparent light-gray sponge-iron pellet pattern, applied only to light home sections.
- Progress fill follows active section marker positions, keeping the line and active dot visually aligned.
- Each dot is a real keyboard-accessible in-page link with tooltip, descriptive accessible label and aria-current.
- The entire rail is scoped to the home page via `:has(.ore-stepper)`; other routes do not lose horizontal content space.
- Compact 35px left rail remains visible on mobile. Includes reduced-motion handling and an explicit 8px gap between sections.

## Visual checks
- [ ] Desktop 1366×768: no horizontal scrollbar and header/footer remain accessible.
- [ ] Home 01/02 headings and section numbers match reordered content.
- [ ] Sidebar dots show real ore surface and highlighted pellet updates on scroll.
- [ ] Clicking all nine markers scrolls to the intended section and updates active marker.
- [ ] Dots' left rail sits flush on viewport LEFT; ore pattern fades in from the left of light sections.
- [ ] Mobile 390×844 / 360×640: compact left rail does not hide content, tooltips stay hidden.
- [ ] Open /tenders, /about and /news directly: no home-only rail spacing.
- [ ] Keyboard tab navigates through markers with a visible focus indicator.
- [ ] No runtime errors and `npm run build` passes in CI.
