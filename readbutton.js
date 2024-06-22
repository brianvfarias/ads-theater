import { updateArticle } from './api.js';

function getUpdateInfo(button) {
  let id = button.getAttribute('id');
  let textElement = button.previousElementSibling;
  let titleElement = textElement.previousElementSibling;
  let article = textElement.value;
  let title = titleElement.value;

  console.log(title, article, id);
  updateArticle(JSON.stringify({ id, title, article }));
}

export function readMore(articleDisplay) {
  const readbutton = articleDisplay.querySelector('.readbutton');
  const fullarticle = articleDisplay.querySelector('.fullarticle');
  const buttonclose = articleDisplay.querySelector('.fullarticle .close');
  const buttonUpdate = articleDisplay.querySelector('.fullarticle .update-btn');
  readbutton.onclick = function () {
    fullarticle.showModal();
  };

  buttonclose.onclick = function () {
    fullarticle.close();
  };
  buttonUpdate.addEventListener('click', () => {
    getUpdateInfo(buttonUpdate);
    fullarticle.close();
    setTimeout(() => console.log('delay'), 100);
    location.reload(true);
  });
}
