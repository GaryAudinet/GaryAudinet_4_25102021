// Redirection d'url de l'API avec de faire un lien entre un produit des pages accueil/produit

const params = new URL(window.location.href).searchParams;
const newID = params.get('id');

const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');

// API - Recuperation de l'id d'un produit à afficher
// Fonction permettant d'afficher les détails d'un produit 

const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

fetch("http://localhost:3000/api/products/" + newID)
  .then(res => res.json())
  .then(data => {
    console.table(data);
    image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;

    function colorsOptions() {
      for (index in data.colors) {
        colors.options[colors.options.length] = new Option(
          data.colors[index],
          data.colors[index]
        );
      }
    }
    colorsOptions();
  })
  .catch(_error => {
    alert('Le serveur de répond pas, veuillez patienter.');
  });


// Fonction permettant l'ajout des produits dans le panier

function addToCart () {
  const addToCart = document.getElementById('addToCart');
  addToCart.addEventListener('click', (event) => {
    if (selectQuantity.value > 0 && selectQuantity.value <=100 && selectQuantity.value != 0) {
        event.preventDefault();
 
      
      const selection = {
        id: newID,
        image: imageURL,
        alt: imageAlt,
        name: title.textContent,
        price: price.textContent,
        color: selectColors.value,
        quantity: selectQuantity.value,
      };

      let localStorageProducts =  JSON.parse(localStorage.getItem('product'));
      const addProductLocalStorage = () => {
      localStorageProducts.push(selection);
      localStorage.setItem('product', JSON.stringify(localStorageProducts));
      }
    
      let update = false;

      if (localStorageProducts) {
        localStorageProducts.forEach (function (productHere, key) {
        if (productHere.id == newID && productHere.color == selectColors.value) {
          localStorageProducts[key].quantity = parseInt(productHere.quantity) + parseInt(selectQuantity.value);
          localStorage.setItem('product', JSON.stringify(localStorageProducts));
          update = true;
          alert(`Votre panier a été mis à jour`)
        }
      });
    
        if (!update) {
        addProductLocalStorage();
        alert('Votre article a été ajouté au panier');
        }
      }
    
      else {
        localStorageProducts = [];
        addProductLocalStorage();
      }
      console.table(localStorageProducts);
    }
  
 
  });
}
addToCart();


