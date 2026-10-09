# Notices section QA and acceptance checks

## Intended design
- Desktop: title with pale 01 at the right, secondary "view all" action at the left, filters right / search left, seven-column RTL table.
- Brand navy #293b84, red #ee2535, off-white and iron-grey surfaces; restrained type scale and soft industrial texture.
- All notice entries are explicitly labeled as demonstration records.
- A consistent 8px inter-section spacing remains between the quick-access, notices and sponge-iron sections.

## Core interaction checklist
- [ ] Homepage /: section appears after QuickAccess and before SpongeIronSection.
- [ ] Tabs "همه / مناقصه / مزایده / فراخوان" filter the table and update results.
- [ ] Persian/Arabic Yeh and Kaf + Western/Persian digits are normalized in search.
- [ ] Searching by partial title or demo reference narrows results.
- [ ] Clearing filters or search restores records.
- [ ] Sorting by publication or deadline flips between ascending and descending.
- [ ] Desktop uses one semantic table with headings and statuses that are not color-only.
- [ ] Screen widths <=780px show mobile cards and do not overflow horizontally.
- [ ] Empty search returns a helpful no-results state with a reset action.
- [ ] Details open as native modal dialog; Escape and explicit close dismiss it.
- [ ] Clicking the modal backdrop dismisses it.
- [ ] No fake document download is offered for empty attachments.
- [ ] "مشاهده همه" routes to /tenders and the archive paginates at eight entries.
- [ ] /tenders status select filters active/closed/review records.
- [ ] Buttons, tabs, inputs and links are navigable by keyboard and show visible focus.
- [ ] Reduced-motion users can operate everything without animations.
- [ ] Data is visibly marked as NOT an official opportunity.
- [ ] The page's noindex directive is retained until validated official data is supplied.

## Limitations
No real company data feed, document attachment files or official publication system has been connected in this stage.
Full `npm run build`, interactive browser screenshots and automated accessibility auditing are pending in a runtime with installed npm dependencies. Do not mark these tests as passed without executing them.
