const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const message = document.getElementById('message');
const list = document.getElementById('list');
const title = document.getElementById('list-title');

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase();
}

function renderItem(participant) {
  const item = el('li', 'bd-list__item');
  item.appendChild(el('span', 'bd-avatar', initials(participant.name)));
  const body = el('div', 'bd-list__body bd-list__body--inline');
  body.appendChild(el('strong', '', participant.name));
  body.appendChild(el('span', '', `— ${participant.email}`));
  item.appendChild(body);
  return item;
}

function renderParticipants(participants) {
  title.replaceChildren('Inscritos ', el('span', 'bd-count', String(participants.length)));
  if (participants.length === 0) {
    list.replaceChildren(el('li', 'bd-list__empty', 'Ninguém inscrito ainda.'));
    return;
  }
  list.replaceChildren(...participants.map(renderItem));
}

async function readResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Não foi possível concluir a solicitação.');
  }
  return data;
}

async function loadParticipants() {
  try {
    const participants = await readResponse(await fetch('/participants'));
    renderParticipants(participants);
  } catch (error) {
    message.textContent = error.message;
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = '';

  try {
    const participant = await readResponse(await fetch('/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameInput.value, email: emailInput.value })
    }));
    const currentParticipants = Array.from(list.querySelectorAll('.bd-list__item')).map((item) => item);
    currentParticipants.push(renderItem(participant));
    list.replaceChildren(...currentParticipants);

    const count = list.querySelectorAll('.bd-list__item').length;
    title.replaceChildren('Inscritos ', el('span', 'bd-count', String(count)));
    form.reset();
  } catch (error) {
    message.textContent = error.message;
  }
});

loadParticipants();
