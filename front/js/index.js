// API

function apiCall() {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((value) => {
        addProducts(value);
        console.log('value via API', value);
      })
      .catch((error) => {
        alert('Notre serveur de répond pas, veuillez revenir ultérieurement.');
      });
  }
  apiCall();
  

  // Fonction qui permet d'ajouter les elements attendu de chaque article

  function addProducts(value) {
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
  