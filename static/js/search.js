// Full-text search over all posts, rendered like grep output.
// The index (title, subtitle, date, url, tags, plain-text body per post) is built by
// layouts/page/search.json. Every word of the query must appear somewhere in a post;
// posts are ranked by where the words appear (title > tags/subtitle > body), then by date.
(function () {
  var script = document.currentScript;
  var input = document.getElementById('search-input');
  var status = document.getElementById('search-status');
  var list = document.getElementById('search-results');
  var form = input.form;
  var posts = null;
  var initialStatus = status.textContent;

  var SNIPPETS = 3;   // matching lines shown per post
  var BEFORE = 40;    // characters of context before a match
  var AFTER = 90;     // ... and after it

  // Curly quotes → straight, so "don't" finds "don’t". Same length, so offsets stay valid.
  function fold(s) {
    return s.toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  }

  function terms(query) {
    var seen = {};
    return fold(query).split(/\s+/).filter(function (t) {
      if (!t || seen[t]) return false;
      return (seen[t] = true);
    });
  }

  function count(hay, term) {
    var n = 0, i = hay.indexOf(term);
    while (i !== -1) { n++; i = hay.indexOf(term, i + term.length); }
    return n;
  }

  // Appends text to el, wrapping every occurrence of any term in <mark>.
  function highlight(el, text, ts) {
    var hay = fold(text), pos = 0;
    while (pos < text.length) {
      var best = -1, len = 0;
      ts.forEach(function (t) {
        var i = hay.indexOf(t, pos);
        if (i !== -1 && (best === -1 || i < best || (i === best && t.length > len))) { best = i; len = t.length; }
      });
      if (best === -1) break;
      if (best > pos) el.appendChild(document.createTextNode(text.slice(pos, best)));
      var m = document.createElement('mark');
      m.textContent = text.slice(best, best + len);
      el.appendChild(m);
      pos = best + len;
    }
    if (pos < text.length) el.appendChild(document.createTextNode(text.slice(pos)));
  }

  // Up to SNIPPETS non-overlapping windows of body text around matches, in reading order.
  function snippets(post, ts) {
    var hits = [];
    ts.forEach(function (t) {
      var i = post._body.indexOf(t);
      while (i !== -1) { hits.push(i); i = post._body.indexOf(t, i + t.length); }
    });
    hits.sort(function (a, b) { return a - b; });
    var out = [], end = -1, body = post.body;
    for (var k = 0; k < hits.length && out.length < SNIPPETS; k++) {
      if (hits[k] < end) continue;
      var s = Math.max(0, hits[k] - BEFORE), e = Math.min(body.length, hits[k] + AFTER);
      // snap to word boundaries
      if (s > 0) { var sp = body.indexOf(' ', s); if (sp !== -1 && sp < hits[k]) s = sp + 1; }
      if (e < body.length) { var ep = body.lastIndexOf(' ', e); if (ep > hits[k]) e = ep; }
      out.push((s > 0 ? '…' : '') + body.slice(s, e) + (e < body.length ? '…' : ''));
      end = e;
    }
    return { lines: out, total: hits.length };
  }

  function search(query) {
    var ts = terms(query);
    if (!ts.length) return null;
    var results = [];
    posts.forEach(function (p) {
      var score = 0;
      for (var i = 0; i < ts.length; i++) {
        var t = ts[i];
        var inTitle = count(p._title, t), inMeta = count(p._meta, t), inBody = count(p._body, t);
        if (!inTitle && !inMeta && !inBody) return; // every term must match
        score += inTitle * 20 + inMeta * 5 + Math.min(inBody, 20);
      }
      results.push({ post: p, score: score });
    });
    results.sort(function (a, b) {
      return b.score - a.score || (a.post.date < b.post.date ? 1 : -1);
    });
    return { terms: ts, results: results };
  }

  function render(query) {
    list.textContent = '';
    var r = search(query);
    if (!r) { status.textContent = initialStatus; status.className = 'comment search-status'; return; }
    var n = r.results.length;
    status.className = n ? 'comment search-status' : 'error search-status';
    status.textContent = n
      ? '# ' + n + (n === 1 ? ' post matches' : ' posts match')
      : 'grep: no matches for "' + query.trim() + '"';

    r.results.forEach(function (res) {
      var p = res.post;
      var li = document.createElement('li');
      li.className = 'search-hit';

      var head = document.createElement('p');
      head.className = 'search-head';
      var time = document.createElement('time');
      time.dateTime = p.date;
      time.textContent = p.date;
      var a = document.createElement('a');
      a.className = 'title';
      a.href = p.url;
      highlight(a, p.title, r.terms);
      head.appendChild(time);
      head.appendChild(document.createTextNode(' '));
      head.appendChild(a);
      li.appendChild(head);

      if (p.subtitle) {
        var sub = document.createElement('p');
        sub.className = 'subtitle';
        highlight(sub, p.subtitle, r.terms);
        li.appendChild(sub);
      }
      if (p.tags.length) {
        var tags = document.createElement('p');
        tags.className = 'tags';
        p.tags.forEach(function (t) {
          var span = document.createElement('span');
          span.className = 'tag';
          highlight(span, '#' + t.replace(/\s+/g, '-'), r.terms);
          tags.appendChild(span);
        });
        li.appendChild(tags);
      }

      var sn = snippets(p, r.terms);
      sn.lines.forEach(function (line) {
        var pre = document.createElement('p');
        pre.className = 'search-line';
        highlight(pre, line, r.terms);
        li.appendChild(pre);
      });
      if (sn.total > sn.lines.length) {
        var more = document.createElement('p');
        more.className = 'comment search-more';
        more.textContent = '# +' + (sn.total - sn.lines.length) + ' more';
        li.appendChild(more);
      }
      list.appendChild(li);
    });
  }

  function update() {
    var q = input.value;
    var url = new URL(location.href);
    if (q.trim()) url.searchParams.set('q', q); else url.searchParams.delete('q');
    history.replaceState(null, '', url);
    if (posts) render(q);
  }

  var timer;
  input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(update, 80); });
  form.addEventListener('submit', function (e) { e.preventDefault(); clearTimeout(timer); update(); });

  input.value = new URLSearchParams(location.search).get('q') || '';

  fetch(script.dataset.index)
    .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
    .then(function (data) {
      posts = data.map(function (p) {
        p._title = fold(p.title);
        p._meta = fold(p.subtitle + ' ' + p.tags.map(function (t) { return '#' + t.replace(/\s+/g, '-') + ' ' + t; }).join(' '));
        p._body = fold(p.body);
        return p;
      });
      render(input.value);
    })
    .catch(function () {
      status.className = 'error search-status';
      status.textContent = 'grep: posts/: could not load the search index';
    });

  // Focus the prompt once the typing animation (static/js/typing.js) has finished.
  function focus() { if (!input.value) input.focus({ preventScroll: true }); }
  var root = document.documentElement;
  if (!root.classList.contains('typing')) focus();
  else new MutationObserver(function (_, obs) {
    if (!root.classList.contains('typing')) { obs.disconnect(); focus(); }
  }).observe(root, { attributes: true, attributeFilter: ['class'] });
})();
