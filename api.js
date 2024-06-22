const url = 'http://localhost:8080/article';

export async function getArticlesFromDB() {
  const res = await fetch(url);
  const articles = await res.json();
  return articles;
}

export async function postArticle(article) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: article,
  });
  const created = await res.json();
  console.log(created);
}

export async function deleteArticle(id) {
  const deleteArticle = await fetch(url + '/' + id, {
    method: 'DELETE',
  });
  console.log(id, deleteArticle);
}

export async function updateArticle(body) {
  const update = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}
