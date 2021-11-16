// API

function apiCom() {
  fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((value) => {
      addProduct(value);
      console.log('value via API', value);
    })
    .catch((error) => {
      alert('Le serveur de répond pas, veuillez patienter.');
    });
  }
  apiCom();


// Fonction qui permet d'ajouter les elements attendu de chaque produit

function addProduct(value) {
  for (product of value) {
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
  