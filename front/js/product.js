// Redirection d'url de l'API avec de faire un lien entre un produit des pages accueil/produit

const params = new URL(window.location.href).searchParams;
const newID = params.get('id');


// API - Recuperation de l'id d'un produit à afficher

let article = "";
getArticle();

function getArticle() {
  fetch("http://localhost:3000/api/products/" + newID)
    .then((res) => {
      return res.json();
    })

    .then(async function (API) {
      article = await API;
      console.table(article);
      if (article) {
        getPost(article);
      }
    })
    .catch((error) => {
      alert('Le serveur de répond pas, veuillez patienter.');
    });
}
  

// Fonction permettant d'afficher les détails d'un produit 
function getPost(article) {
  
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  let productName = document.getElementById("title");
  productName.textContent = article.name;

  document.title = article.name;

  let productPrice = document.getElementById("price");
  productPrice.textContent = article.price;

  let productDescription = document.getElementById("description");
  productDescription.textContent = article.description;

  for (let colors of article.colors) {
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.textContent = colors;
  }
}


// Fonction permettant l'ajout des produits dans le panier

const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');

function addToCart () {
  const addToCart = document.getElementById('addToCart');
  addToCart.addEventListener('click', (event) => {
    if (selectQuantity.value > 0 && selectQuantity.value <=100 && selectQuantity.value != 0) {
        event.preventDefault();
 
      const selection = {
        id: newID,
        name: article.name,
        price: article.price,
        image: article.imageUrl,
        alt: article.altTxt,
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


