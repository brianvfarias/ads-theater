let getArticlesFromDB;
let postArticle;
let deleteArticle;
let updateArticle;

if (!location.href.includes('github')) {
  const url = 'http://localhost:8080/article';

  getArticlesFromDB = async () => {
    const res = await fetch(url);
    const articles = await res.json();
    return articles;
  };

  postArticle = async (article) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: article,
    });
    // const created = await res.json();
    // console.log(created);
  };

  deleteArticle = async (id) => {
    const deleteArticle = await fetch(url + '/' + id, {
      method: 'DELETE',
    });
    console.log(id, deleteArticle);
  };

  updateArticle = async (body) => {
    const update = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
  };
} else {
  /**
   * 

   */
  let localArticles = localStorage.getItem('articles');

  if (!localArticles) {
    localArticles = [];
  } else {
    localArticles = JSON.parse(localArticles);
  }

  getArticlesFromDB = () => {
    console.log(localArticles);
    return localArticles;
  };

  postArticle = (article) => {
    let newArticle = JSON.parse(article);
    const currentID = new Date().getTime();
    newArticle.id = currentID;
    localArticles.push(newArticle);
    console.log(localArticles);
    localStorage.setItem('articles', JSON.stringify(localArticles));
  };

  deleteArticle = (id) => {
    localArticles = localArticles.filter((article) => article.id != id);
    console.log(localArticles);
    localStorage.setItem('articles', JSON.stringify(localArticles));
  };

  updateArticle = (body) => {
    const { id, title, article } = JSON.parse(body);
    localArticles = localArticles.map((localArticle) => {
      console.log(localArticle);
      if (localArticle.id == id) {
        localArticle.title = title;
        localArticle.article = article;
      }
      return localArticle;
    });
    localStorage.setItem('articles', JSON.stringify(localArticles));
  };
}

export { getArticlesFromDB, postArticle, deleteArticle, updateArticle };
