/**
 * Affichage des articles du panier
 */
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
  
    // Vider le contenu précédent
    cartList.innerHTML = '';
  
    if (cart.length === 0) {
      cartList.innerHTML = '<p>Votre panier est vide.</p>';
      return;
    }
  
    // Générer les éléments du panier
    cart.forEach((product, index) => {
      const productItem = document.createElement('div');
      productItem.className = 'cart-item';
  
      productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="cart-item-image">
        <div class="cart-item-info">
          <h3>${product.name}</h3>
          <p>Prix : ${product.price} FCFA</p>
        </div>
      `;
  
      cartList.appendChild(productItem);
    });
  }
  
  /**
   * Vider le panier
   */
  function clearCart() {
    localStorage.removeItem('cart');
    displayCartItems();
    updateCartCounter();
  }
  
  /**
   * Mise à jour du compteur d'articles dans le panier
   */
  function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-counter').textContent = cart.length;
  }
  
  /**
   * Initialisation des événements
   */
  function init() {
    displayCartItems();
  
    // Ajouter un événement au bouton "Vider le panier"
    const clearCartButton = document.getElementById('clear-cart');
    clearCartButton.addEventListener('click', clearCart);
  
    // Mettre à jour le compteur du panier
    updateCartCounter();
  }
  
  // Exécution après le chargement complet de la page
  document.addEventListener('DOMContentLoaded', init);