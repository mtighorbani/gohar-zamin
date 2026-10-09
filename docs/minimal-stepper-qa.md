# Minimal stepper and local mineral pattern — QA

### Design
- [ ] Light-gray iron-ore edge pattern visible ONLY at the LEFT of Quick Access (below hero) and About 01.
- [ ] No sponge-iron decorative left-edge pattern on Notices 02, Product 03, Certificates 04, News 05, Why 06.
- [ ] Stepper is on viewport RIGHT, vertically centered, approximately 226–296px tall, TRANSPARENT without a full-height background or painted side rail.
- [ ] The full page remains full width. No body padding/column left over from the earlier 54px left-side bar.
- [ ] Ore-textured small dots, red/blue brand-accent active state, subtle progress line, no persistent large labels.
- [ ] Hover/focus tooltip is positioned to the LEFT of the right-aligned stepper.
- [ ] Stepper clicks navigate to correct sections and update active marker as the user scrolls.
- [ ] Mobile viewport (360/390px): compact 23px rail stays near the right edge and does not cover primary content; tooltips are visually hidden.
- [ ] Direct /about, /news, /tenders routes have no home stepper, pattern or added spacing.
- [ ] Reduced-motion and keyboard interaction remain usable.
- [ ] CI production build passes after push.
