## Section: About Gohar Zamin 02

- Renders after notices 01, before sponge iron 03.
- On wide screens: photo LEFT, title/content/right-side 02 marker RIGHT, mirroring the sponge-iron composition.
- On narrow screens the content stacks above the photo.
- The image uses the existing committed industrial factory photo `/hero/gohar-factory.avif`, so there is no broken image link. Replace the image with a higher-resolution customer photo when uploaded.
- CSS color grading is a presentation effect. The imagery is sourced from the actual corporate factory footage/photos provided by the customer in earlier conversation.
- The play affordance opens a native dialog. The dialog does **not** show a fake or broken movie: absent a verified intro video it displays a clear pending notice and an alternative company link.
- To activate a verified company introduction video later, configure `NEXT_PUBLIC_GOHAR_INTRO_VIDEO_URL` as an accessible playable video URL (e.g. MP4) during build and redeploy.
- The /about route provides verified basic company details, not imaginary capacity claims.

Acceptance:
[ ] Full desktop width shows the photo in the LEFT column and info in RIGHT column.
[ ] About is between notices and product section with +8px vertical spacing.
[ ] On mobile, text appears before the image and there is no horizontal overflow.
[ ] Play button opens and closes native dialog, including Escape and backdrop dismiss.
[ ] No broken video element is rendered until video URL is configured.
[ ] Link to /about opens a real page rather than 404.
[ ] Visually verify sharpness, crop, layout and responsive typography at 1366x768, 1440x900 and 390x844.
