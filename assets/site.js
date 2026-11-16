// Home: show the cover of the work under the pointer or keyboard focus.
(() => {
  const stage = document.querySelector('.stage');
  if (!stage) return;
  const imgs = [...stage.querySelectorAll('img')];
  const show = (i) => imgs.forEach((im) => im.classList.toggle('on', im.dataset.i === i));
  document.querySelectorAll('.works a').forEach((a) => {
    a.addEventListener('pointerenter', () => show(a.dataset.i));
    a.addEventListener('focus', () => show(a.dataset.i));
  });
})();

// Contact form: send without leaving the page.
(() => {
  const form = document.querySelector('.form');
  if (!form) return;
  const status = form.querySelector('.status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.getAttribute('action') === 'FORM_ENDPOINT') {
      status.textContent = 'This form is not connected yet.';
      return;
    }
    const button = form.querySelector('button');
    button.disabled = true;
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = 'Message sent. Thank you.';
    } catch {
      status.textContent = 'Message not sent. Check your connection and try again.';
    } finally {
      button.disabled = false;
    }
  });
})();
