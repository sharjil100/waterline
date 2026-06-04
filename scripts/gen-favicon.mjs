// Builds favicon + apple icon from the white logo on an ink rounded square.
// Run: node scripts/gen-favicon.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const INK = "#0B1320";
const SRC = "public/waterline-logo-white.png";

async function make(size, radius, logoWidth, out) {
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${INK}"/></svg>`
  );
  const logo = await sharp(SRC).resize({ width: logoWidth }).toBuffer();
  const buf = await sharp(bg)
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toBuffer();
  writeFileSync(out, buf);
  console.log("Wrote", out, `(${size}x${size})`);
}

// app/icon.png -> favicon (browsers downscale as needed)
await make(512, 112, 384, "app/icon.png");
// app/apple-icon.png -> iOS home screen
await make(180, 40, 136, "app/apple-icon.png");
