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

Buttondown sends new posts from the RSS feed (`layouts/index.rss.xml`, served at `/index.xml`). `<description>` holds the post's linked preview image, the teaser and a "read the full post" button, as HTML. Buttondown inserts `{{ item.description }}` as-is, but variables inside attributes (`<img src>`, `<a href>`) break when it creates a draft, so every post URL must live in the feed, not the template. Keep `<guid>` as the permalink, or Buttondown will re-send old posts.

The email body template is `buttondown/rss-email-template.html`; paste the whole file into Buttondown (subject: `{{ item.title }}`). Buttondown's editor is Markdown and only fills in plain `{{ item.* }}` variables, so the template must have no indented lines, no `{% %}` tags, no `|filters` and no variables inside attributes.
