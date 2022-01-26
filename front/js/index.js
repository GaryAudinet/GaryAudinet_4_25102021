// Recupération des données de l'API 
(async function () {
  const articles = await showProduct();

  for (article of articles) {
    insertProduct(article);
  }
  console.table(articles);
  
})();


// Fonction permettant la récupération des produits de l'API

function showProduct() {
  return fetch("http://localhost:3000/api/products")
    .then(function (res) {
      return res.json();
    })
    .then(function (articles) {
      return articles;
    })
    .catch(function (error) {
      alert("Le serveur de répond pas, veuillez patienter.");
    });
}


// Fonction qui permet d'ajouter les elements attendu de chaque produit afin des les afficher dynamiquement

function insertProduct(article) {
  let productLink = document.createElement("a");
  document.querySelector(".items").appendChild(productLink);
  productLink.href = `product.html?id=${article._id}`;

  let productArticle = document.createElement("article");
  productLink.appendChild(productArticle);

  let productImg = document.createElement("img");
  productArticle.appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  let productName = document.createElement("h3");
  productArticle.appendChild(productName);
  productName.classList.add("productName");
  productName.textContent = article.name;

  let productDescription = document.createElement("p");
  productArticle.appendChild(productDescription);
  productDescription.classList.add("productName");
  productDescription.textContent = article.description;
}

