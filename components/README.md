# /components

This folder is reserved for breaking sections of `index.html` into separate
reusable snippets if the site grows (e.g. `header.html`, `project-card.html`)
and you introduce a build step or static-site generator to stitch them
together.

Right now the site intentionally ships as plain, dependency-free HTML/CSS/JS
with no build step, so `index.html` contains all markup directly — that's
what keeps "Load extremely fast" and "No unnecessary JavaScript" true. Only
add a templating/build step here if the project grows enough to need one.
