// Recupération des données de l'API 

fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(data => { 
    showProduct(data);
    console.table(data);
  })
  .catch(_error => {
    alert('Le serveur de répond pas, veuillez patienter.');
  });


// Fonction qui permet d'ajouter les elements attendu de chaque produit afin des les afficher dynamiquement

function showProduct(data) {
    for (product of data) {
        const itemCard = document.getElementById('items');
        itemCard.innerHTML +=`
        <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
        </a>
      `;
    }
}
