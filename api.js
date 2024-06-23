let getArticlesFromDB;
let postArticle;
let deleteArticle;
let updateArticle;

if (location.href.includes('5500')) {
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
    localArticles = [
      {
        id: 1,
        title: 'BACK TO BLACK id',
        article: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas mi eros, sit amet pulvinar velit mollis eget. Donec sollicitudin vitae est non pulvinar. Suspendisse sagittis eros mattis dui maximus, sed fermentum dolor tristique. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam nec mollis metus, non placerat eros. Phasellus non enim mattis, eleifend nulla eu, rhoncus massa. Vestibulum dignissim quam a sem vestibulum, sed volutpat urna sagittis. Curabitur consectetur facilisis mauris, eget dignissim elit elementum eget. Etiam viverra nunc eu est venenatis mattis id vitae diam. Mauris id hendrerit turpis, ac porta risus. Integer placerat efficitur nunc, eu cursus ante bibendum et. 
     Phasellus feugiat mattis ipsum, a vulputate dolor semper et. Ut cursus quam non elit pharetra, at hendrerit odio tincidunt. Integer ornare, risus dapibus sagittis congue, ante ligula porta turpis, nec gravida nulla eros nec purus. Fusce venenatis nibh sem, et hendrerit quam luctus vel. Donec nec fringilla lectus, ac pulvinar augue. Praesent sed finibus sem, id consequat velit. Aenean pulvinar est pharetra enim interdum, eu eleifend metus pulvinar. Aliquam aliquet, eros in hendrerit volutpat, dolor orci fringilla lectus, eu lobortis diam ante et augue. Aenean aliquet tellus ac ex blandit faucibus. Donec auctor ipsum felis, non faucibus est interdum porta. Vivamus eu imperdiet odio. Suspendisse fringilla tristique bibendum. Fusce venenatis erat in arcu luctus, eu facilisis leo maximus.`,
      },
    ];
  } else {
    localArticles = JSON.parse(localArticles);
  }

  getArticlesFromDB = () => {
    console.log(localArticles);
    return localArticles;
  };

  postArticle = (article) => {
    let newArticle = JSON.parse(article);
    const currentID = localArticles.length + 1;
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
