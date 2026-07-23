# Noor Nemli — Portfolio Website

A fast, accessible, single-page portfolio site (plus a 404 and Privacy Policy
page) built with plain HTML, CSS, and vanilla JavaScript — no framework, no
build step, no heavy libraries.

## Quick start

Just open `index.html` in a browser — everything works with no build step.
To preview it the way a browser would over HTTP (recommended, since a couple
of things like the resume `<iframe>` behave more accurately over a real
server than via `file://`), run any static server from this folder, e.g.:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Project structure

```
portfolio/
├── index.html          Main single-page site (Home → Contact, all sections)
├── 404.html             Not-found page
├── privacy.html         Privacy policy page
├── robots.txt           Search engine crawl rules
├── sitemap.xml          Search engine sitemap
├── manifest.json        Web app manifest (PWA-style home screen icon/name)
├── css/
│   ├── variables.css    All design tokens — colors, type, spacing, radius
│   ├── main.css         Base styles + every component's styles
│   ├── animations.css   Keyframes + scroll-reveal utility classes
│   └── responsive.css   Breakpoint fine-tuning not already in main.css
├── js/
│   ├── theme.js         Dark/light mode (loads early to avoid a flash)
│   ├── navigation.js    Sticky header, mobile menu, scrollspy
│   ├── animations.js    Scroll-reveal, hero typing effect, mouse glow
│   ├── counters.js      Animated number counters (About section stats)
│   └── main.js          Recruiter modal, filters, copy-email, contact form
├── assets/
│   ├── images/          Your photo + project screenshots go here
│   ├── icons/           Favicon + app icons
│   ├── fonts/           (Empty — Inter is loaded from Google Fonts; only
│   │                     use this folder if you switch to self-hosting it)
│   └── resume/          CV PDFs (placeholders included — replace them)
└── components/          Reserved for future use if you add a build step
```

## Current status (as of last update)

**Already filled in:**
- Real email (`nornemli212@gmail.com`), phone, LinkedIn, and GitHub links
- Domain set to `noornemli.com` throughout (update again if you register a
  different one)
- Real profile photo in the hero
- Real Open Graph / social preview image (`assets/images/og-cover.jpg`)
- One real, general-purpose CV at `assets/resume/Noor_Nemli_CV_General.pdf`
- 4 real projects with actual screenshots and live Canva links (Marketing de
  Luxe; Nike Case Study; L'Ingénierie de la Vente; Conclusion de Vente),
  alongside the Business Model Canvas, Digital Marketing Case Simulations,
  and Portfolio Website projects
- A real "Team Coordination" activity card

**Still placeholders — fill in when ready:**
1. **Interactive Consumer Behaviour Study Tool project** — removed for now
   while it's being reorganized; add it back to the Projects section
   (`index.html`) once it's ready, following the same `<article
   class="project-card">` pattern as the others.
2. **Business Model Canvas project file** — the card is still there, but
   there's no download link since the source file was lost; add one back if
   you recreate it.
3. **Project screenshots** for Digital Marketing Case Simulations and the
   Portfolio Website card — still generic icons.
4. **Nice-to-have / only if genuinely true**: academic achievements, first
   professional experience, volunteer work — intentionally left as dashed
   "placeholder" cards so they never read as a false claim. Fill in only
   once true.

Every editable spot in the code is marked with an HTML comment like:
```html
<!-- Replace profile image here -->
```
so you can find them quickly with your editor's search.


## Adding a new project card

Copy one `<article class="project-card">...</article>` block in the
Projects section of `index.html`, update its `data-category` (must match
one of the filter chip values above it), and fill in the new content.

## Adding a new skill

Copy one `.skill-card` block in the Skills section, set its `data-category`
to match one of the filter chips, and update the icon/title/description.

## Connecting the contact form to actually send email

Right now, submitting the contact form validates the input and opens a
pre-filled `mailto:` draft in the visitor's own email client — it does
**not** send anything server-side, because this is a static site with no
backend. To make it submit silently instead:

1. Sign up for a static-form backend (there are several free options for
   low-volume personal sites) or stand up your own small endpoint.
2. In `js/main.js`, find the `contact-form` submit handler and replace the
   `mailto:` fallback with a `fetch()` POST to your form backend's endpoint.
3. Update the Privacy Policy's "The contact form" section to describe what
   that service does with submitted data.

## Deploying

This is a fully static site — it can be deployed as-is to any static host
(GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a plain web server).
There is no build command to run first.

## Performance & accessibility notes

- No jQuery, no CSS framework, no analytics script — everything is
  hand-written and dependency-free except the Inter font (loaded from
  Google Fonts) to keep the page light and fast.
- Respects `prefers-reduced-motion` throughout — all animation shuts off
  automatically for people who've asked their OS for that.
- Keyboard-navigable end to end, with a visible focus style, a skip-to-
  content link, and a focus trap in the Recruiter Mode modal.
- The Content-Security-Policy meta tag in `<head>` is a baseline; for full
  protection, also send an equivalent `Content-Security-Policy` HTTP header
  from your actual hosting configuration once deployed.

## A note on honesty

Per the original brief, this site does not invent experience, projects, or
certifications. Every placeholder is clearly marked as a placeholder in a
code comment and, where visible on the page (like the Activities section's
dashed "Leadership" and "Volunteer Work" cards), styled distinctly so it's
obvious to a real visitor that it's a placeholder too — fill those in only
once they're genuinely true.
