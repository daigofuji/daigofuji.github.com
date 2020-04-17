const menu = document.querySelector('#open-modal');
menu.addEventListener('click', openModal);

const modal = document.querySelector('#modal');

const btn = document.querySelector('#show-result');
btn.addEventListener('click', loadResult);

function openModal(ev) {
  modal.style.display = 'block';
}

function loadResult(ev) {
  ev.target.remove();
  const loader = document.querySelector('#loading');
  loader.style.display = 'block';

  setTimeout(function() {
    loader.remove();
    let result = document.createElement('p');
    result.textContent = 'Result data goes here...';
    document.querySelector('#modal').append(result);
  }, 3000);
}