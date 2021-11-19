// Lien entre un produit des pages accueil/produit

const search_params = new URLSearchParams(location.search);
const productID = search_params.get('_id');


// API - Recuperation de l'id d'un produit à afficher

fetch(`http://localhost:3000/api/products/${productID}`)
.then((response) => response.json())
.then((value) => {
  addProduct(value);
})
.catch((error) => {
  alert('Le serveur de répond pas, veuillez patienter.');
});


// Fonction permettant d'afficher les détails d'un produit

function addProduct(product) {
  const productImg = document.querySelector(
    'body > main > div > section > article > div.item__img'
  );
  const productDescription = document.getElementById('description');
  const productPrice = document.getElementById('price');
  const productName = document.getElementById('title');
  const productColors = document.getElementById('colors');
  productImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  productName.innerHTML = `<h1>${product.name}</h1>`;
  productPrice.innerText = `${product.price}`;
  productDescription.innerText = `${product.description}`;
  for (index in product.colors) {
    productColors.options[productColors.options.length] = new Option(
    product.colors[index],
    product.colors[index]
    );
  }
}



// Permettre l'ajout des produits dans le panier


document.getElementById('addToCart').addEventListener('click', (event) => {
  event.defaultPrevented;
  const productColor = document.getElementById('colors');
  const productQuantity = document.getElementById('quantity');
  const productArray = {
    id: productID,
    color: productColor.value,
    quantity: productQuantity.value,
  };
  if (
    localStorage.getItem('localStorageProduct') &&
    localStorage.getItem('localStorageProduct').length > 0
  ) {
    const localStorageProduct = JSON.parse(
      localStorage.getItem('localStorageProduct')
    );
    const product = localStorageProduct.findIndex(
      (product) =>
        product.id === productArray.id && product.color === productArray.color
    );
    if (product === -1) {
      localStorageProduct.push(productArray);
      localStorage.setItem(
        'localStorageProduct',
        JSON.stringify(localStorageProduct)
      );
    } else {
      localStorageProduct[product].quantity =
        parseInt(localStorageProduct[product].quantity) +
        parseInt(productArray.quantity);
      localStorage.setItem(
        'localStorageProduct',
        JSON.stringify(localStorageProduct)
      );
    }
  } else {
    localStorageProduct = [];
    localStorageProduct.push(productArray);
    localStorage.setItem(
      'localStorageProduct',
      JSON.stringify(localStorageProduct)
    );
  }
});


