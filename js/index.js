// Variables pour le carrousel
let currentIndex = 0;
const items = document.querySelectorAll('.carrousel-item');
const totalItems = items.length;

// Fonction pour afficher le carrousel suivant
function showNextItem() {
  // Masquer l'élément actuel
  items[currentIndex].style.display = 'none';

  // Calculer l'indice suivant
  currentIndex = (currentIndex + 1) % totalItems;

  // Afficher le nouvel élément
  items[currentIndex].style.display = 'block';
}

// Initialiser le carrousel (en afficher uniquement le premier élément)
function initializeCarrousel() {
  items.forEach((item, index) => {
    if (index !== currentIndex) {
      item.style.display = 'none';
    }
  });

  // Démarrer le changement automatique toutes les 10 secondes
  setInterval(showNextItem, 10000);
}

// Fonction pour changer d'élément au clic
function setupClickNavigation() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      showNextItem();
    });
  });
}

// Démarrer le carrousel au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  initializeCarrousel();
  setupClickNavigation();
});


  
   //Afficher le méga-menu au survol
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.querySelector('.mega-menu').style.display = 'block';
    });

    item.addEventListener('mouseleave', () => {
      item.querySelector('.mega-menu').style.display = 'none';
    });
  });

document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.querySelector('.mega-menu').style.display = 'grid';
    });
    item.addEventListener('mouseleave', () => {
      item.querySelector('.mega-menu').style.display = 'none';
    });
  });
});

document.getElementById('addToCart').addEventListener('click', function() {
  alert('Produit ajouté au panier !');
});

