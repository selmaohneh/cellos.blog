// Types the first prompt's command like a terminal, then reveals the output below it.
// The inline script in baseof.html adds the "typing" class (unless the visitor prefers
// reduced motion) and removes it after 4 s as a safety net, so content can never stay hidden.
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('typing')) return;
  var cmd = document.querySelector('main > .prompt:first-child .cmd');
  if (!cmd) { root.classList.remove('typing'); return; }

  var text = cmd.textContent;
  var cursor = document.createElement('span');
  cursor.className = 'cursor steady';
  cursor.setAttribute('aria-hidden', 'true');
  cmd.textContent = '';
  cmd.classList.add('is-typing');
  cmd.after(cursor);

  // At most ~0.9 s of typing, however long the command is.
  var delay = Math.min(55, 900 / Math.max(text.length, 1));
  var i = 0;
  function tick() {
    cmd.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, delay * (0.6 + Math.random() * 0.8));
    else setTimeout(done, 220); // brief pause, as if Enter was pressed
  }
  function done() {
    cursor.remove();
    root.classList.remove('typing');
  }
  setTimeout(tick, 250);
})();
