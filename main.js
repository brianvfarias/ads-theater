import {
  deleteArticle,
  getArticlesFromDB,
  postArticle,
  // updateArticle,
} from './api.js';
import { readMore } from './readbutton.js';
let articles;
let articlesArea = document.querySelector('main');
// let trashBtns;
window.addEventListener('load', async function () {
  articles = await getArticlesFromDB();
  articles.forEach(async (a) => {
    await createArticleHTML(a);
  });
  // updateBtns = document.querySelectorAll('.update');
  // console.log(updateBtns);
  // updateBtns.forEach((btn) => {
  //   btn.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     console.log(btn.previousElementSibling);
  //     // console.log(id);
  //     // await updateArticle(id);
  //     // location.reload(true);
  //   });
  // });
  // trashBtns = document.querySelectorAll('.trash-btn');
  // console.log('botões', trashBtns);
  // trashBtns.forEach((btn) => {
  //   btn.addEventListener('click', async (e) => {

  //   });
  // });
});

tinymce.init({
  // language: 'pt_BR',
  license_key: 'gpl',
  selector: 'textarea#article-input',
  width: '95%',
  height: 300,
  toolbar:
    'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |' +
    'bullist numlist outdent indent',
  menu: {
    favs: {
      title: 'Conteúdo do artigo',
      items: 'code visualaid | searchreplace',
    },
  },
  menubar: 'favs file edit insert format',
  content_style: 'body{font-family:Helvetica,Arial,sans-serif; font-size:16px}',
});

const addArticleBtn = document.querySelector('.add-article');
const dialog = document.querySelector('dialog.editor');
const saveBtn = document.querySelector('button[type=submit]');
// const textarea = document.querySelector('iframe');
// console.log(trashBtns);
const cancelBtn = document.querySelector('button#cancel');

function toggleModal() {
  console.log(dialog);
  if (dialog.hasAttribute('open')) {
    dialog.close();
    return;
  }
  dialog.showModal();
}

function clearContent() {
  tinymce.activeEditor.setContent('');
  let title = document.querySelector('input#article-title');
  title.value = '';
}

async function getBlob(file) {
  const blobFile = await fetch(file)
    .then((res) => res.blob())
    .then((data) => data);
  console.log('blob in getBlob()', blobFile);
  return blobFile;
}

async function createArticleHTML(article) {
  let temp = document.getElementsByTagName('template')[0];
  let clone = temp.content.cloneNode(true);
  let boxTitle = clone.querySelector('h2.box-title');
  let boxText = clone.querySelector('p.box-article');
  let fullTitle = clone.querySelector('dialog input.full-title');
  let fullText = clone.querySelector('dialog textarea.full-article');
  let trash = clone.querySelector('button.trash-btn');
  if (location.href.includes('github')) {
    let img = clone.querySelector('img');
    let file = await getBlob(article.file);
    const reader = new FileReader();
    reader.onload = async (e) => {
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
  trash.setAttribute('id', article.id);
  let update = clone.querySelector('button.update-btn');
  update.setAttribute('id', article.id);
  boxTitle.textContent = article.title;
  boxText.textContent = article.article;
  fullTitle.value = article.title;
  fullText.textContent = article.article;
  readMore(clone);
  console.log(clone);
  articlesArea.appendChild(clone);
}

addArticleBtn.addEventListener('click', () => {
  toggleModal();
  tinymce.setActive();
});

saveBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  let title = document.querySelector('input#article-title').value;
  let article = tinymce.activeEditor.getContent({ format: 'text' });
  if (location.href.includes('github')) {
    let file = document.querySelector('input[type=file]').files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = async (e) => {
      file = reader.result;
      const newArticle = { title, article, file };
      console.log(JSON.stringify(newArticle));
      postArticle(JSON.stringify(newArticle));
      location.reload(true);
    };
    reader.readAsDataURL(file);
  } else {
    const newArticle = { title, article };
    console.log(JSON.stringify(newArticle));
    postArticle(JSON.stringify(newArticle));
    location.reload(true);
  }
});

cancelBtn.addEventListener('click', () => {
  toggleModal();
  clearContent();
});
