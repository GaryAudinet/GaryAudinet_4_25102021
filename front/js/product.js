// Lien entre un produit des pages accueil/produit

const params = new URLSearchParams(location.search);
const productID = params.get('_id');


// API - Recuperation de l'id d'un produit à afficher


function ShowProductID() {
  fetch(`http://localhost:3000/api/products/${productID}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      
      // Fonction permettant d'afficher les détails d'un produit    
      
      function showDetail() {
        const image = document.querySelector(
          'body > main > div > section > article > div.item__img'
        );
        const description = document.getElementById('description');
        const price = document.getElementById('price');
        const name = document.getElementById('title');
        const colors = document.getElementById('colors');
        image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        name.innerHTML = `<h1>${data.name}</h1>`;
        price.innerText = `${data.price}`;
        description.innerText = `${data.description}`;
      
        function colorsOption() {
          for (let index in data.colors) {
            colors.options[colors.options.length] = new Option(
              data.colors[index],
              data.colors[index]
            );
          }
        }
        colorsOption();
      }
      showDetail();
      

      // Permettre l'ajout des produits dans le panier

      function addToCart() {
        const addCartDOM = document.getElementById('addToCart');
        addCartDOM.addEventListener('click', (event) => {
          event.preventDefault();
          let dataQuantity = document.getElementById('quantity');
          const dataColor = document.getElementById('colors');
          const selection = {
            id: productID,
            name: data.name,
            price: data.price,
            color: dataColor.value,
            quantity: dataQuantity.value,
            image: data.imageUrl,
            alt: data.altTxt,
          };
          let localStorageProducts = JSON.parse(
            localStorage.getItem('localStorageProducts')
          );
          if (localStorageProducts === null) {
            localStorageProducts = [];
          }
          let isHere = false;
          localStorageProducts.forEach((element) => {
            if (element.id === productID && element.color === dataColor.value) {
              element.quantity = quantity.value;
              isHere = true;
              alert(`Votre panier a été mis à jour`);
            }
          });
          if (!isHere) {
            localStorageProducts.push(selection);
            alert('Votre article a été ajouté au panier');
          }
          localStorage.setItem(
            'localStorageProducts',
            JSON.stringify(localStorageProducts)
          );
        });
      }
      addToCart();
    })
    .catch((error) => {
      alert('Le serveur de répond pas, veuillez patienter.');
    });
}
ShowProductID();



