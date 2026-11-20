# cellos.blog

Hugo site, deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`.

## Adding a post

- Create `content/posts/<slug>.md` with front matter: `title`, `subtitle` (optional), `date`, `slug`.
- Posts are published at `/<slug>/`. Never change the slug of a published post.
- Posts imported from Substack also have `aliases: ["/p/<slug>/"]`, which keeps their old Substack URLs working as redirects. Keep these; new posts don't need one.
- Images for a post go in `static/img/<slug>/` and are referenced as `/img/<slug>/<file>`.
- `tags` (optional) puts the post under tags, e.g. `tags: ["smart home", "cyber security"]`. Current tags: `nerdy stuff`, `software craftsmanship`, `cyber security`, `smart home`. Reuse these spellings exactly: a new spelling creates a new tag.
- `draft: true` keeps a post out of the published site.
- `teaser` (optional) overrides the newsletter/RSS teaser; `image` (optional) overrides the preview image (default: first image in the post).

## Layout

No external theme: templates are in `layouts/`, styles in `static/css/style.css`.

Tags: each post's tags are shown on the post list and in the post header (`layouts/partials/tags.html`). The home page and each tag page (`/tags/<tag>/`, `layouts/term.html`) show a filter row (`layouts/partials/tag-filter.html`); `/tags/` lists all tags (`layouts/taxonomy.html`). Filtering is plain static pages, no JavaScript.

## Search

`/search/` (`content/search.md`, linked as `[search]` in the header nav) is a client-side full-text search over all posts, styled as `grep -ri <query> posts/`. Hugo builds the index at `/search/index.json` (`layouts/_default/search.json`: title, subtitle, date, url, tags, plain-text body per post); `static/js/search.js` loads it and searches in the browser. New posts are indexed automatically. The query is kept in the URL (`/search/?q=...`), so searches can be linked.

## Newsletter

Buttondown sends new posts from the RSS feed (`layouts/index.rss.xml`, served at `/index.xml`). Keep the feed plain RSS 2.0: `<description>` is a plain-text teaser (Buttondown strips HTML from it). The email template has no image and uses `{{ item.url }}` for links. Keep `<guid>` as the permalink, or Buttondown will re-send old posts.

The email body template is `buttondown/rss-email-template.html`; paste the whole file into Buttondown (subject: `{{ item.title }}`). Buttondown's editor is Markdown and only fills in plain `{{ item.* }}` variables, so the template must have no indented lines, no `{% %}` tags, no `|filters`.

## Sitemap and robots.txt

Hugo builds `/sitemap.xml` on every build, so new posts are added automatically. `/robots.txt` comes from `layouts/robots.txt` (needs `enableRobotsTXT = true`): it blocks known AI crawlers and links the sitemap.

## Impressum

`content/impressum.md` (published at `/impressum/`, linked from the header nav in `layouts/_default/baseof.html`). Standalone pages like this use `layouts/page/single.html`.
