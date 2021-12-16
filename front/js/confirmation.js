// Fonction pour afficher le numéro de commande

function confirmation() {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  if (searchParams.has('id')) {
    const id = searchParams.get('id');
    console.log('Numéro de commande:', id);
    return id;
  }
}
window.addEventListener('load', () => {
  const orderId = document.getElementById('orderId');
  orderId.innerText = confirmation();
  localStorage.clear();
});