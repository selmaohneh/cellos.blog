# cellos.blog

Source of [cellos.blog](https://www.cellos.blog): a static site built with [Hugo](https://gohugo.io) and hosted on GitHub Pages.

- Posts: `content/posts/*.md`, published at `/<slug>/` (old Substack URLs `/p/<slug>/` redirect there)
- Templates: `layouts/`, styles: `static/css/style.css`
- Deployment: every push to `main` builds and publishes the site

Local preview: `hugo server -D`
