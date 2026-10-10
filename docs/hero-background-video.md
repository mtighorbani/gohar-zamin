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

## Fix for local 404s after pulling code

`git pull` updates the React/CSS code **but does not install the chat-attached ZIP**.
The poster and MP4 files are missing until the ZIP is extracted into the root of the local repo.

From PowerShell in `C:\\Users\\Mehdi\\Desktop\\gohar-zamin`:

```powershell
# Adjust the ZIP path to wherever you saved it:
Expand-Archive -LiteralPath "$env:USERPROFILE\Downloads\gohar-hero-video-ready.zip" -DestinationPath "." -Force
npm run assets:check
npm run dev
```

Verify the files exist with `dir public\hero`. The exact names must match the component.

### Other warning cleanup

- `quality={78}` was removed from the optimized poster; Next/Image uses its configured default quality.
- Missing licensed IRANSans `@font-face` declarations were disabled until the real font files are supplied, so they no longer trigger repeated 404 requests. Current readable fallback: Vazirmatn.
- The Hero uses the poster, then the previously committed factory AVIF, then CSS background, in that order. There is no infinite failed-image retry.
- If the committed `public/hero/gohar-factory-new.avif` is missing locally despite being tracked, run `git status --short` and `git restore public/hero/gohar-factory-new.avif`.

After the ZIP is installed successfully, commit the three video assets with `git add public/hero/gohar-hero-*.mp4 public/hero/gohar-hero-poster.webp` and `git push` so other checkouts deploy without manual attachment transfer.

## One-command Windows installation (October 2026)

After **downloading** the ZIP from the chat into Windows Downloads, pull this code and run:

```powershell
git pull origin main
npm run assets:install:win
npm run assets:check
npm run dev
```

The installer in `scripts/install-hero-assets.ps1` finds the ZIP in Downloads or the repo root and extracts it under `public/hero/`. You may pass an alternate path:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install-hero-assets.ps1 -ZipPath "C:\path\to\gohar-hero-video-ready.zip"
```

Hero asset presence is checked in `app/page.tsx` during server render/build; no broken WebP resource is requested when poster is missing, and the video is not mounted when MP4 files are absent. When all assets are present, the MP4 plays over the static LCP poster on appropriate networks. Restart `npm run dev` after extracting the ZIP. For production deployments, commit the three binary media assets and rebuild; GitHub code-only commits do not contain them.

NOTE: The identical 8-second client-supplied AVI has already been transcoded to the optimized MP4s within the ZIP. There is no need to upload the 20 MiB original AVI to the repo.
