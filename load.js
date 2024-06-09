export async function getArticlesFromDB() {
  const res = await fetch('http://localhost:8080/article');
  const articles = await res.json();
  return articles;
}
