// Communication indispensable pour l'acces avec le localStorage

function getLocalStorageProducts() {
  const localStorageProducts = JSON.parse(
    localStorage.getItem('localStorageProducts')
  );


if (localStorageProducts == 0) {
  document.querySelector("#cart__items").innerHTML =`
    <p>Votre panier est vide. <br> Retourner sur la page d'accueil afin de sélectionner des produits !</p>`;
}


// Fonction permettant d'afficher les produits qui sont présent dans le panier.

  function showCart() {
    if (localStorageProducts) {
      for (let index = 0; index < localStorageProducts.length; index++) {
        const productTotalPrice =
          localStorageProducts[index].price *
          localStorageProducts[index].quantity;
        const productCart = `
          <article class="cart__item" data-id="${localStorageProducts[index].id}" data-color="${localStorageProducts[index].color}">
            <div class="cart__item__img">
            <img src="${localStorageProducts[index].image}" alt="${localStorageProducts[index].alt}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
            <h2>${localStorageProducts[index].name}</h2>
            <p >${localStorageProducts[index].color}</p>
            <p>${productTotalPrice}€</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageProducts[index].quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
          </article>`;
          document
            .getElementById('cart__items')
            .insertAdjacentHTML('beforeend', productCart);
      }


      // Fonction pour la supression d'un article

      function deleteProduct() {
        const deleteItem = document.querySelectorAll('.deleteItem');
        for (let index = 0; index < deleteItem.length; index++) {
          deleteItem[index].addEventListener('click', (event) => {
            event.preventDefault();
            localStorageProducts.splice(index, 1);
            localStorage.setItem(
              'localStorageProducts',
              JSON.stringify(localStorageProducts)
            );
            alert('Votre article a été supprimé');
            location.reload();
          });
        }
      }
      deleteProduct();


      // Fonction pour le changement de la quantité

      function changeQuantity() {
        const itemQuantity = document.querySelectorAll('.itemQuantity');
        for (let index = 0; index < itemQuantity.length; index++) {
          itemQuantity[index].addEventListener('change', (event) => {
            event.preventDefault();
            const itemNewQuantity = event.target.value;
            const UpStorage = {
              id: localStorageProducts[index].id,
              name: localStorageProducts[index].name,
              price: localStorageProducts[index].price,
              color: localStorageProducts[index].color,
              quantity: itemNewQuantity,
              image: localStorageProducts[index].image,
              alt: localStorageProducts[index].alt,
            };
            localStorageProducts[index] = UpStorage;
            localStorage.clear();
            localStorage.setItem(
              'localStorageProducts',
              JSON.stringify(localStorageProducts)
            );
            location.reload();
          });
        }
      }
      changeQuantity();


      // Fonction pour le calcul du prix
    
      function priceCalcul() {
        const priceCalcul = [];
        for (let index = 0; index < localStorageProducts.length; index++) {
          const cartAmout =
            localStorageProducts[index].price *
            localStorageProducts[index].quantity;
          priceCalcul.push(cartAmout);
          const reduce = (previousValue, currentValue) =>
            previousValue + currentValue;
          total = priceCalcul.reduce(reduce);
        }
        const totalPrice = document.getElementById('totalPrice');
        totalPrice.textContent = total;
      }
      priceCalcul();


      // Fonction pour le calcul du nombre total d'articles

      function totalArticle() {
        let total = 0;
        for (let index in localStorageProducts) {
          const quantity = parseInt(localStorageProducts[index].quantity, 10);
          total += quantity;
        }
        return total;
      }
      const totalQuantity = document.getElementById('totalQuantity');
      totalQuantity.textContent = totalArticle();


      // Contenant pour le formulaire

      class Form {
        constructor() {
          this.firstName = document.getElementById('firstName').value;
          this.lastName = document.getElementById('lastName').value;
          this.address = document.getElementById('address').value;
          this.city = document.getElementById('city').value;
          this.email = document.getElementById('email').value;
        }
      }
      


      // Fonction permettant de tester la validité de chaque partie du formulaire

      function validation() {
        const contact = new Form();

          // Fonction pour le prénom


        function ValidFirstName() {
          const firstNameRegex = contact.firstName;
          const firstNameErrorMsg =
            document.getElementById('firstNameErrorMsg');
          if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(firstNameRegex)) {
            firstNameErrorMsg.innerText = '';
            return true;
          } else {
            firstNameErrorMsg.innerText =
              'Doit contenir que des lettres, avec un minmum de 3 caractères';
            firstNameErrorMsg.style.color = 'red';
          }
        }

          // Fonction pour le nom


        function ValidLastName() {
          const lastNameRegex = contact.lastName;
          const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
          if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(lastNameRegex)) {
            lastNameErrorMsg.innerText = '';
            return true;
          } else {
            lastNameErrorMsg.innerText =
              'Doit contenir que des lettres, avec un minmum de 3 caractères';
            lastNameErrorMsg.style.color = 'red';
          }
        }

          // Fonction pour l'adresse


        function ValidAddress() {
          const addressRegex = contact.address;
          const addressErrorMsg = document.getElementById('addressErrorMsg');
          if (/^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/.test(addressRegex)) {
            addressErrorMsg.innerText = '';
            return true;
          } else {
            addressErrorMsg.innerText = `Contient des caractères non valide`;
            addressErrorMsg.style.color = 'red';
          }
        }


          // Fonction pour la ville

        function ValidCity() {
          const cityRegex = contact.city;
          const cityErrorMsg = document.getElementById('cityErrorMsg');
          if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(cityRegex)) {
            cityErrorMsg.innerText = '';
            return true;
          } else {
            cityErrorMsg.innerText =
              'Doit contenir que des lettres, avec un minmum de 3 caractères';
            cityErrorMsg.style.color = 'red';
          }
        }


          // Fonction pour l'email

        function ValidEmail() {
          const emailRegex = contact.email;
          const emailErrorMsg = document.getElementById('emailErrorMsg');
          if (/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(emailRegex)) {
            emailErrorMsg.innerText = '';
            return true;
          } else {
            emailErrorMsg.innerText =
              'Email non valide';
            emailErrorMsg.style.color = 'red';
          }
        }

        // Vérification des champs du formulaire

        if (
          ValidFirstName() &&
          ValidLastName() &&
          ValidAddress() &&
          ValidCity() &&
          ValidEmail()
        ) {
          return true;
        } else {
          alert('Vérifier les données du formulaire');
          return false;
        }
      }

      // Fonction pour passer la commande

      function Order() {
          const order = document.getElementById('order');
          order.addEventListener('click', (event) => {
            event.preventDefault();
            if (validation()) {
              
            }
          });
      }
      Order();
    }

  }
  showCart();
}
getLocalStorageProducts();
