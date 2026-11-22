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
│   └── resume/          One real general-purpose CV PDF
└── components/          Reserved for future use if you add a build step
```

## Current status (as of last update)

**Ready for deployment after your final confirmations:**
- Real email (`nornemli212@gmail.com`) and phone, both clickable (`mailto:` / `tel:`)
- LinkedIn URL verified from the signed-in account menu: `https://www.linkedin.com/in/noornemli/`
- Broken GitHub profile link removed from the social row and structured data
- Site URL set to the GitHub Pages project URL `https://noornemli.github.io/Noor/`
  in `index.html`, `robots.txt`, `sitemap.xml`, and `privacy.html`
- Real profile photo and Open Graph image
- One real CV at `assets/resume/Noor_Nemli_CV_General.pdf`
- 4 project cards only: the projects explicitly approved for public visibility
- Visible placeholder cards and dead `href="#"` links removed

**Still needs your input (do not invent):**
1. Confirm WhatsApp phone number and Gmail access from your signed-in sessions.
2. Add achievements, first professional role, or volunteer work once true.


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

This site does not invent experience, projects, or certifications. Visible
placeholder cards and dead links were removed in the Phase 1 cleanup. Add new
roles, achievements, or project files only once they are genuinely true.
