# Homepage Hero background video deployment & performance

## Optimized client-supplied media
The provided AVI is 1920×1080, 24fps, 8 seconds and ~20.44 MiB.
Do **not** serve it directly in HTML.

Extract `gohar-hero-video-ready.zip` to the project root:
- `public/hero/gohar-hero-720.mp4` — H.264 yuv420p, 1280×720, 8s, 1.28 MiB, faststart, muted/no audio. For <=800px screens and mobile.
- `public/hero/gohar-hero-1080.mp4` — H.264 yuv420p, 1920×1080, 8s, 2.87 MiB, faststart, muted/no audio. For desktop.
- `public/hero/gohar-hero-poster.webp` — 1600×900 frame poster, ~204 KiB. Priority LCP still image.

**The ZIP is an attachment generated in chat; video binary files have not yet been pushed through the GitHub text-only connector.**
The React/CSS code is pushed. Until the files are extracted and pushed, HeroBackgroundVideo may request a missing MP4, catch the media error and keep the static fallback image. Hero's Image automatically falls back to already-existing `/hero/gohar-factory-new.avif` when the WebP poster is absent.

## Runtime performance behavior
1. Server HTML renders an optimized Next.js `<Image priority>` poster but **no media src**, so video does not compete for LCP.
2. After the `window.load` event, an idle callback (2s maximum wait), with 700ms fallback, allows video loading only when the hero is visible.
3. Visitor preferences: on `prefers-reduced-motion: reduce`, `navigator.connection.saveData`, or effectiveType 3g/2g/slow-2g, no video src is set and no MP4 is downloaded.
4. Uses desktop/mobile variants so mobile never downloads the 1080p file.
5. Autoplay `muted`, `playsInline`, `loop` and `preload="none"` with visual fade-in after real playback starts.
6. Pauses when hero exits the viewport or tab is hidden, resumes when visible.
7. When media fails, retains priority poster; no broken player icon or fake playback controls.

## QA and verification before launch
- [ ] Run `npm run build` and inspect dev console at 1366×768, 390×844.
- [ ] Add the exact video assets above to `public/hero/` and commit them.
- [ ] Verify Media network: poster starts first, MP4 starts after load/idle; selected video only (no double download).
- [ ] Inspect waterfall and LCP under Lighthouse mobile throttling, Fast 3G and 4G.
- [ ] Test Save-Data, reduced-motion and off-screen pause; expected: no video download on constrained clients.
- [ ] Browser check: no broken media, no hydration errors, no horizontal overflow, keyboard still works.
- [ ] Review color grading and cropping with the text to ensure contrast and product focus.
