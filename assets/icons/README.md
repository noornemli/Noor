# /assets/icons

- `favicon.svg` is included (a simple "NN" monogram placeholder) — replace
  with your own mark whenever you have one.
- Missing iOS/Android home-screen icon references were removed in Phase 1.
  If you later add `apple-touch-icon.png`, `icon-192.png`, and `icon-512.png`,
  also restore the matching link in `index.html` and the `icons` array in
  `manifest.json`.

All other icons on the site (skills, tools, social links, UI controls) are
inline SVG directly in `index.html` — no icon files needed for those, which
keeps the site fast and avoids extra HTTP requests.
