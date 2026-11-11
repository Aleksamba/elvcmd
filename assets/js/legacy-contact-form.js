const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));
document.querySelectorAll('[data-interest]').forEach((link) => link.addEventListener('click', () => {
  document.querySelector('#destination').value = link.dataset.interest;
}));
document.querySelector('#tour-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get('name').trim();
  const destination = form.get('destination');
  const dates = form.get('dates').trim() || 'даты пока не выбраны';
  const message = `Здравствуйте, Эльвира! Меня зовут ${name}. Хочу подобрать тур: ${destination}. Когда: ${dates}.`;
  const status = document.querySelector('.form-success');
  status.replaceChildren();
  const text = document.createElement('span');
  text.textContent = message;
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.className = 'copy-message';
  copy.textContent = 'Скопировать текст';
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(message);
      copy.textContent = 'Скопировано ✓';
    } catch {
      copy.textContent = 'Выдели и скопируй текст выше';
    }
  });
  const profile = document.createElement('a');
  profile.href = 'https://vk.ru/mamawickwheat';
  profile.target = '_blank';
  profile.rel = 'noreferrer';
  profile.textContent = 'Открыть VK Эльвиры ↗';
  status.append(text, copy, profile);
  status.style.display = 'flex';
  window.open(profile.href, '_blank', 'noopener,noreferrer');
});
