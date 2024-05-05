console.log(tinymce);
tinymce.init({
  license_key: 'gpl',
  selector: 'textarea#article-input',
  width: 1000,
  height: 300,
  plugins: [
    'advlist',
    'autolink',
    'link',
    'image',
    'lists',
    'charmap',
    'preview',
    'anchor',
    'pagebreak',
    'searchreplace',
    'wordcount',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'emoticons',
    'template',
    'codesample',
  ],
  toolbar:
    'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |' +
    'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
    'forecolor backcolor emoticons',
  menu: {
    favs: {
      title: 'menu',
      items: 'code visualaid | searchreplace | emoticons',
    },
  },
  menubar: 'favs file edit view insert format tools table',
  content_style: 'body{font-family:Helvetica,Arial,sans-serif; font-size:16px}',
});

const addArticleBtn = document.querySelector('.add-article');
const dialog = document.querySelector('dialog.editor');
const saveBtn = document.querySelector('button[type=submit]');
const textarea = document.querySelector('iframe');
const main = document.querySelector('main');
const cancelBtn = document.querySelector('button#cancel');

function toggleModal() {
  dialog.toggleAttribute('open');
}

function clearContent() {
  tinymce.activeEditor.setContent('');
}

addArticleBtn.addEventListener('click', () => {
  toggleModal();
  tinymce.setActive();
});

saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let articleHTML = tinymce.activeEditor.getContent({ format: 'html' });
  let newArticle = document.createElement('article');
  newArticle.innerHTML = articleHTML;
  toggleModal();
  main.appendChild(newArticle);
  clearContent();
});

cancelBtn.addEventListener('click', () => {
  toggleModal();
  clearContent();
});
