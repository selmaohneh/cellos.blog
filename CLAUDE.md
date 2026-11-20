# cellos.blog

Hugo site, deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`.

## Adding a post

- Create `content/posts/<slug>.md` with front matter: `title`, `subtitle` (optional), `date`, `slug`.
- Posts are published at `/<slug>/`. Never change the slug of a published post.
- Posts imported from Substack also have `aliases: ["/p/<slug>/"]`, which keeps their old Substack URLs working as redirects. Keep these; new posts don't need one.
- Images for a post go in `static/img/<slug>/` and are referenced as `/img/<slug>/<file>`.
- `draft: true` keeps a post out of the published site.
- `teaser` (optional) overrides the newsletter/RSS teaser; `image` (optional) overrides the preview image (default: first image in the post).

## Layout

No external theme: templates are in `layouts/`, styles in `static/css/style.css`.

## Newsletter

Buttondown sends new posts from the RSS feed (`layouts/index.rss.xml`, served at `/index.xml`). Keep the feed plain RSS 2.0: `<description>` is a plain-text teaser (Buttondown strips HTML from it). The email template has no image and uses `{{ item.url }}` for links. Keep `<guid>` as the permalink, or Buttondown will re-send old posts.

The email body template is `buttondown/rss-email-template.html`; paste the whole file into Buttondown (subject: `{{ item.title }}`). Buttondown's editor is Markdown and only fills in plain `{{ item.* }}` variables, so the template must have no indented lines, no `{% %}` tags, no `|filters`.

## Sitemap and robots.txt

Hugo builds `/sitemap.xml` on every build, so new posts are added automatically. `/robots.txt` comes from `layouts/robots.txt` (needs `enableRobotsTXT = true`): it blocks known AI crawlers and links the sitemap.
