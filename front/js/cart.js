// Communication indispensable pour l'acces avec le localStorage

let products = [];
let localStorageProducts = JSON.parse(localStorage.getItem('product'));
console.table(localStorageProducts)

// Fonction permettant d'afficher les produits qui sont présent dans le panier, si le panier n'est pas vide

if(localStorageProducts === null || localStorageProducts == 0) {
  document.querySelector("#cart__items").innerHTML =`
  <p>Votre panier est vide. <br> Retourner sur la page d'accueil afin de sélectionner des produits !</p>`;
}

else{
  let itemCards = [];

  for (i = 0; i < localStorageProducts.length; i++) {
  products.push(localStorageProducts[i].id);
  const productTotalPrice =
          localStorageProducts[i].price *
          localStorageProducts[i].quantity;
  itemCards = itemCards + `
    <article class="cart__item" data-id="${localStorageProducts[i].id}" data-color="${localStorageProducts.color}">
    <div class="cart__item__img">
      <img src="${localStorageProducts[i].image}" alt="${localStorageProducts[i].alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${localStorageProducts[i].name}</h2>
        <p>${localStorageProducts[i].color}</p>
        <p>${productTotalPrice} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageProducts[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  }

  if (i === localStorageProducts.length) {
  const itemCart = document.getElementById('cart__items');
  itemCart.innerHTML += itemCards;
  }


  // Fonction pour la supression d'un article

function deleteArticle() {
  const deleteItem = document.querySelectorAll('.deleteItem');

  for (let d = 0; d < deleteItem.length; d++) { 
    deleteItem[d].addEventListener('click', (event) => {
    event.preventDefault();
    localStorageProducts.splice(d, 1);
    localStorage.setItem('product', JSON.stringify(localStorageProducts));
    alert('Votre article a été supprimé');
    location.reload();
    });
  }
}
deleteArticle();


  // Fonction pour le changement de la quantité

function changeQuantity() {
  let itemQuantity = document.querySelectorAll('.itemQuantity');
  for (let q = 0; q < itemQuantity.length; q++) {
    itemQuantity[q].addEventListener('change', (event) => {
    event.preventDefault();
    let itemNewQuantity = itemQuantity[q].value;
    const upStorage = {
      id: localStorageProducts[q].id,
      image: localStorageProducts[q].image,
      alt: localStorageProducts[q].alt,
      name: localStorageProducts[q].name,
      color: localStorageProducts[q].color,
      price: localStorageProducts[q].price,   
      quantity: itemNewQuantity,
    };
    localStorageProducts[q] = upStorage;
    localStorage.setItem('product', JSON.stringify(localStorageProducts));
    alert('Votre panier est à jour.');
    location.reload();
    })
  }
}
changeQuantity();


  // Fonction pour le calcul du prix du panier

function priceCalcul() {
  const priceCalcul = [];
  for (let p = 0; p < localStorageProducts.length; p++) {
    const cartAmount = localStorageProducts[p].price * localStorageProducts[p].quantity;
    priceCalcul.push(cartAmount);
    const reduce = (previousValue, currentValue) => previousValue + currentValue;
    total = priceCalcul.reduce(reduce);
  }
  const totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = total;
}
priceCalcul();


  // Fonction pour le calcul du nombre total d'articles

function totalArticle() {
  let totalItems = 0;
  for (let t in localStorageProducts) {
    const Quantity = parseInt(localStorageProducts[t].quantity, 10);
    totalItems += Quantity;
  }
  const totalQuantity = document.getElementById('totalQuantity');
  totalQuantity.textContent = totalItems;
}
totalArticle();

}


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

function postOrder() {
  const order = document.getElementById('order');
  order.addEventListener('click', (event) => {
    event.preventDefault();
    if (validation()) {
      const products = [];
      for (let index = 0; index < localStorageProducts.length; index++) {
        products.push(localStorageProducts[index].id);
      }
      console.log(products);

      const contactAndProducts = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products,
      };
      console.log(contactAndProducts);

      let letFetch = 
      fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactAndProducts),
        
      })
        .then((response) => response.json())
        .then((id) => {
          console.log(products);
          window.location.href = `confirmation.html?id=${id.orderId}`;
        })
        .catch((error) => {
          alert(
            'Le serveur de répond pas, veuillez patienter.'
          );
          console.log(error);
          
        });
        console.log(letFetch); 
    }
    
  });
}
postOrder();


