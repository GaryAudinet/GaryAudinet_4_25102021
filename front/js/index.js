// API

function apiCom() {
  fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((data) => {
      ShowProduct(data);
    })
    .catch((error) => {
      alert('Le serveur de répond pas, veuillez patienter.');
    });
  }
  apiCom();


// Fonction qui permet d'ajouter les elements attendu de chaque produit

function ShowProduct(data) {
  for (product of data) {
    const article = `
      <a href="./product.html?_id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
      </a>
    `;
    document
    .getElementById('items')
    .insertAdjacentHTML('beforeend', article);
  }
}
  