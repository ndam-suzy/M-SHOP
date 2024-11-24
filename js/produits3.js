let products = []; // Liste des produits récupérés depuis JSON
let currentPage = 1;
const itemsPerPage = 9;
let currentSortOrder = "asc";
let currentCategory = "";
let currentSubcategory = "";

// Fonction pour récupérer les paramètres d'URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    categorie: params.get("categorie"), // Paramètre "categorie" dans l'URL
    sousCategorie: params.get("sous_categorie"), // Paramètre "sous_categorie" dans l'URL
  };
}

// Charger les produits depuis un fichier JSON
async function fetchProducts() {
  try {
    const response = await fetch('produits[1].json'); // Charger le fichier JSON
    products = await response.json();

    // Récupérer les paramètres d'URL et les appliquer
    const { categorie, sousCategorie } = getQueryParams();
    currentCategory = categorie || ""; // Catégorie active
    currentSubcategory = sousCategorie || ""; // Sous-catégorie active

    applyFilters(currentCategory, currentSubcategory); // Appliquer les filtres
  } catch (error) {
    console.error("Erreur lors du chargement des produits :", error);
  }
}

// Afficher les produits
function displayProducts(filteredProducts) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  paginatedProducts.forEach(product => {
    const productCard = `
      <div class="product-card">
        <img src="${product.images}" alt="${product.nom}">
        <h3>${product.nom}</h3>
        <p>${product.prix.toLocaleString()} FCFA</p>
        <button onclick="viewProduct('${product.id}')">Voir</button>
      </div>
    `;
    productsContainer.innerHTML += productCard;
  });

  displayPagination(filteredProducts.length); // Mettre à jour la pagination
  window.scrollTo(0, 0); // Remonter en haut de la page
}

// Rediriger vers la page produit
function redirectToProductPage(productId) {
  window.location.href = 'produit.html?id=' + productId;
}

// Fonction appelée par les boutons "Voir"
function viewProduct(productId) {
  redirectToProductPage(productId);
}

// Afficher la pagination
function displayPagination(totalProducts) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const prevButton = `<button id="prevPage" ${currentPage === 1 ? "disabled" : ""}>Précédent</button>`;
  const nextButton = `<button id="nextPage" ${currentPage === totalPages ? "disabled" : ""}>Suivant</button>`;
  const currentPageIndicator = `<span class="current-page">Page ${currentPage} sur ${totalPages}</span>`;

  paginationContainer.innerHTML = prevButton + currentPageIndicator + nextButton;

  document.getElementById("prevPage").addEventListener("click", () => {
    currentPage--;
    applyFilters(currentCategory, currentSubcategory);
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    applyFilters(currentCategory, currentSubcategory);
  });
}

// Afficher les sous-catégories
function displaySubcategories(category) {
  const subcategoriesContainer = document.getElementById("subcategories");
  subcategoriesContainer.innerHTML = "";

  const subcategoriesMap = {
    Colliers: ["Ras de cou", "Sautoirs", "Pendentifs"],
    Bracelets: ["Joncs", "Chaines", "Perles"],
    Boucles: ["Pendantes", "Créoles", "Pointes"],
  };

  if (category && subcategoriesMap[category]) {
    subcategoriesMap[category].forEach(subcategory => {
      const isSelected = subcategory === currentSubcategory ? "selected" : ""; // Surligner si sélectionné
      const subcategoryButton = `
        <div class="subcategory ${isSelected}" data-subcategory="${subcategory}">
          ${subcategory}
        </div>
      `;
      subcategoriesContainer.innerHTML += subcategoryButton;
    });

    document.querySelectorAll(".subcategory").forEach(button => {
      button.addEventListener("click", () => {
        currentSubcategory = button.dataset.subcategory;
        currentPage = 1; // Réinitialiser à la première page
        applyFilters(currentCategory, currentSubcategory);
      });
    });
  }
}

// Appliquer les filtres sur les produits
function applyFilters(category = "", subcategory = "") {
  let filteredProducts = products.filter(product => product.menu === "Bijoux");

  if (category) {
    filteredProducts = filteredProducts.filter(product => product.categorie === category);
  }
  if (subcategory) {
    filteredProducts = filteredProducts.filter(product => product["sous-categorie"] === subcategory);
  }

  if (currentSortOrder === "asc") {
    filteredProducts.sort((a, b) => a.prix - b.prix);
  } else {
    filteredProducts.sort((a, b) => b.prix - a.prix);
  }

  displayProducts(filteredProducts);

  // Afficher ou masquer les sous-catégories
  if (category) {
    displaySubcategories(category);
  } else {
    document.getElementById("subcategories").innerHTML = ""; // Masquer les sous-catégories
  }

  updateSelectedFilters();
}

// Mettre à jour visuellement les filtres sélectionnés
function updateSelectedFilters() {
  document.querySelectorAll(".filter-title").forEach(title => {
    title.classList.toggle("selected", title.dataset.category === currentCategory);
  });

  document.querySelectorAll(".subcategory").forEach(button => {
    button.classList.toggle("selected", button.dataset.subcategory === currentSubcategory);
  });
}

// Gestion des clics sur les catégories
document.querySelectorAll(".filter-title").forEach(title => {
  title.addEventListener("click", () => {
    currentCategory = title.dataset.category;
    currentSubcategory = "";
    currentPage = 1; // Réinitialiser à la première page
    applyFilters(currentCategory);
  });
});

// Afficher tous les accessoires si aucun filtre
document.getElementById("accessoriesFilter").addEventListener("click", () => {
  currentCategory = "";
  currentSubcategory = "";
  currentPage = 1; // Réinitialiser à la première page
  applyFilters();
});

// Gestion du tri des produits
document.getElementById("applySort").addEventListener("click", () => {
  const sortOrder = document.getElementById("sortOrder").value;
  currentSortOrder = sortOrder;
  applyFilters(currentCategory, currentSubcategory);
});

// Initialisation : Charger les produits
fetchProducts();
