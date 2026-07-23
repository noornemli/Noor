# /assets/icons

- `favicon.svg` is already included (a simple "NN" monogram placeholder) —
  replace with your own mark whenever you have one.
- Add `apple-touch-icon.png` (180×180px) for iOS home-screen icons.
- Add `icon-192.png` and `icon-512.png` (referenced in `manifest.json`) for
  Android/PWA home-screen icons.

All other icons on the site (skills, tools, social links, UI controls) are
inline SVG directly in `index.html` — no icon files needed for those, which
keeps the site fast and avoids extra HTTP requests.
