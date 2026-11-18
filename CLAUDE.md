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

## Newsletter

Buttondown sends new posts from the RSS feed (`layouts/index.rss.xml`). Each item carries the preview image as `<enclosure>` and a subtitle + teaser as `<description>`. The email body template lives in `buttondown/rss-email-template.html` and is pasted into Buttondown by hand. Keep `<guid>` as the permalink, or Buttondown will re-send old posts.
