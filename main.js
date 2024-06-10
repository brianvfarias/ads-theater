import { deleteArticle, getArticlesFromDB, postArticle } from './api.js';
let articles;
let articlesArea = document.querySelector('main');
let trashBtns;
window.addEventListener('load', async function () {
  articles = await getArticlesFromDB();
  articles.forEach((a) => {
    createArticleHTML(a);
  });
  trashBtns = document.querySelectorAll('.trash-btn');
  trashBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const id = btn.getAttribute('id');
      console.log(id);
      await deleteArticle(id);
      location.reload(true);
    });
  });
});

tinymce.init({
  language: 'pt_BR',
  license_key: 'gpl',
  selector: 'textarea#article-input',
  width: '95%',
  height: 300,
  // plugins: [
  //   'advlist',
  //   'autolink',
  //   'link',
  //   'image',
  //   'lists',
  //   'charmap',
  //   'preview',
  //   'anchor',
  //   'pagebreak',
  //   'searchreplace',
  //   'wordcount',
  //   'visualblocks',
  //   'code',
  //   'fullscreen',
  //   'insertdatetime',
  //   'media',
  //   'table',
  //   'emoticons',
  //   'template',
  //   'codesample',
  // ],
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
console.log(trashBtns);
const cancelBtn = document.querySelector('button#cancel');

function toggleModal() {
  dialog.toggleAttribute('open');
}

function clearContent() {
  tinymce.activeEditor.setContent('');
  let title = document.querySelector('input#article-title');
  title.value = '';
}

function createArticleHTML(article) {
  let temp = document.getElementsByTagName('template')[0];
  let clone = temp.content.cloneNode(true);
  let title = clone.querySelector('h2');
  let text = clone.querySelector('p');
  let trash = clone.querySelector('button.trash-btn');
  trash.setAttribute('id', article.id);
  title.textContent = article.title;
  text.textContent = article.article;
  articlesArea.appendChild(clone);
}

addArticleBtn.addEventListener('click', () => {
  toggleModal();
  tinymce.setActive();
});

saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let title = document.querySelector('input#article-title').value;
  let article = tinymce.activeEditor.getContent({ format: 'text' });
  const newArticle = { title, article };
  console.log(JSON.stringify(newArticle));
  postArticle(JSON.stringify(newArticle));
  location.reload(true);
  // toggleModal();
  // clearContent();
});

cancelBtn.addEventListener('click', () => {
  toggleModal();
  clearContent();
});
