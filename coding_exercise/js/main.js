const menu = document.querySelector('#open-menu');
menu.addEventListener('click', openMenu);

const nav = document.querySelector('#open-modal');
nav.addEventListener('click', openModal);

const modal = document.querySelector('#modal');

const btn = document.querySelector('#show-result');
btn.addEventListener('click', loadResult);

function openMenu(ev) {
  document.querySelector('#slideout').classList.toggle('open');
}

function openModal(ev) {
  modal.style.display = 'block';
  document.querySelector('#slideout').classList.remove('open');

}

function loadResult(ev) {
  ev.target.remove();
  const loader = document.querySelector('#loading');
  loader.style.display = 'block';
  // simulate ajax call
  setTimeout(function() {
    loader.remove();
    let result = document.createElement('p');
    result.textContent = 'Result data goes here...';
    document.querySelector('#modal').append(result);
  }, 3000);
}