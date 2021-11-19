
// Communication indispensable pour l'acces avec le localStorage

const localStorageProduct = JSON.parse(
    localStorage.getItem('localStorageProduct')
);


// Fonction permettant d'afficher les produits qui sont présent dans le panier.

function AfficheCart() {
    for (const product of localStorageProduct) {
        const productQuantity = product.quantity;
        const productColor = product.color;
        const productID = product.id;
        console.log(product);
        fetch(`http://localhost:3000/api/products/${productID}`)
        .then((response) => response.json())
        .then((product) => {
            const productImage = product.imageUrl;
            const productAlt = product.altTxt;
            const productName = product.name;
            const productPrice = product.price;
            const total = productPrice * productQuantity;
            const cart = `<article class="cart__item item_${productID}" data-id="${productID}">
                            <div class="cart__item__img">
                                <img src="${productImage}" alt="${productAlt}">
                            </div>
                            <div class="cart__item__content">
                                <div class="cart__item__content__titlePrice">
                                    <h2>${productName}</h2>
                                    <p>${productColor}</p>
                                    <p data-name="prix" id="prix">${total} €</p>
                                </div>
                                <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                        <p id="quantite">Qté : ${productQuantity} </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productQuantity}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem">Supprimer</p>
                                    </div>
                                </div>
                            </div>
                        </article>`;
            document
            .getElementById('cart__items')
            .insertAdjacentHTML('beforeend', cart);
        })
        .catch((error) => {
            alert('Le serveur de répond pas, veuillez patienter.');
        });
    }
}
AfficheCart();

