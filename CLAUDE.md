# cellos.blog

Hugo site, deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`.

## Adding a post

- Create `content/posts/<slug>.md` with front matter: `title`, `subtitle` (optional), `date`, `slug`.
- Posts are published at `/<slug>/`. Never change the slug of a published post.
- Posts imported from Substack also have `aliases: ["/p/<slug>/"]`, which keeps their old Substack URLs working as redirects. Keep these; new posts don't need one.
- Images for a post go in `static/img/<slug>/` and are referenced as `/img/<slug>/<file>`.
- `draft: true` keeps a post out of the published site.

## Layout

No external theme: templates are in `layouts/`, styles in `static/css/style.css`.
