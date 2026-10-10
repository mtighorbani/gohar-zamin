import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd(), "public", "hero");
const expected = [
  ["gohar-hero-poster.webp", "image/webp", 5 * 1024],
  ["gohar-hero-720.mp4", "video/mp4", 100 * 1024],
  ["gohar-hero-1080.mp4", "video/mp4", 100 * 1024],
];
let missingOrInvalid = 0;

function isValid(path, type) {
  const buf = readFileSync(path);
  if (type === "image/webp") {
    return buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP";
  }
  return buf.toString("ascii", 4, 8) === "ftyp";
}

console.log("Checking optimized Hero video bundle in public/hero/ ...\n");
for (const [name, type, minimumBytes] of expected) {
  const path = join(root, name);
  const size = existsSync(path) ? statSync(path).size : 0;
  const valid = size >= minimumBytes && isValid(path, type);
  console.log(`${valid ? "OK     " : "MISSING"} ${name}${size ? ` (${(size / 1048576).toFixed(2)} MiB)` : ""}`);
  if (!valid) missingOrInvalid++;
}
if (missingOrInvalid) {
  console.error("\nExtract gohar-hero-video-ready.zip in the PROJECT ROOT (not inside public/hero).");
  console.error("Expected paths: public/hero/gohar-hero-poster.webp and both .mp4 files.");
  console.error("The assets were delivered as a separate ZIP; git pull cannot download them until they are committed.");
  process.exitCode = 1;
} else {
  console.log("\nAll Hero assets are installed. Run npm run dev, then verify the video in your browser.");
}
