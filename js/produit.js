
        /**
         * Initialisation du zoom d'image
         * @param {string} imgID - ID de l'image principale à zoomer
         * @param {string} resultID - ID du cadre de résultat pour l'aperçu du zoom
         */
        function imageZoom(imgID, resultID) {
            const img = document.getElementById(imgID);
            const result = document.getElementById(resultID);
    
            // Vérifier si une loupe existe déjà
            let lens = document.querySelector(".img-zoom-lens");
            if (!lens) {
                // Si aucune loupe n'existe, en créer une nouvelle
                lens = document.createElement("DIV");
                lens.setAttribute("class", "img-zoom-lens");
                img.parentElement.insertBefore(lens, img);
            }
    
            // Calcul des facteurs de zoom
            const cx = result.offsetWidth / lens.offsetWidth;
            const cy = result.offsetHeight / lens.offsetHeight;
    
            // Configuration du cadre de zoom
            result.style.backgroundImage = `url('${img.src}')`;
            result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;
    
            // Supprimer les anciens gestionnaires d'événements pour éviter des duplications
            lens.onmousemove = null;
            img.onmousemove = null;
            lens.ontouchmove = null;
            img.ontouchmove = null;
    
            // Ajout des événements pour déplacer la loupe
            lens.addEventListener("mousemove", (e) => moveLens(e, lens, img, result, cx, cy));
            img.addEventListener("mousemove", (e) => moveLens(e, lens, img, result, cx, cy));
            lens.addEventListener("touchmove", (e) => moveLens(e, lens, img, result, cx, cy));
            img.addEventListener("touchmove", (e) => moveLens(e, lens, img, result, cx, cy));
        }
    
        /**
         * Déplacement de la loupe sur l'image
         * @param {MouseEvent|TouchEvent} e - Événement de la souris ou du tactile
         * @param {HTMLElement} lens - Élément loupe
         * @param {HTMLImageElement} img - Image principale
         * @param {HTMLElement} result - Cadre de zoom
         * @param {number} cx - Facteur de zoom horizontal
         * @param {number} cy - Facteur de zoom vertical
         */
        function moveLens(e, lens, img, result, cx, cy) {
            e.preventDefault();
    
            // Calcul de la position du curseur
            const pos = getCursorPos(e, img);
    
            // Calcul des coordonnées de la loupe
            let x = pos.x - (lens.offsetWidth / 2);
            let y = pos.y - (lens.offsetHeight / 2);
    
            // Restrictions pour que la loupe reste dans les limites de l'image
            x = Math.max(0, Math.min(x, img.width - lens.offsetWidth));
            y = Math.max(0, Math.min(y, img.height - lens.offsetHeight));
    
            // Mise à jour de la position de la loupe
            lens.style.left = `${img.offsetLeft + x}px`;
            lens.style.top = `${img.offsetTop + y}px`;
    
            // Mise à jour de l'arrière-plan du cadre de zoom
            result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
        }
    
        /**
         * Récupération de la position du curseur par rapport à l'image
         * @param {MouseEvent|TouchEvent} e - Événement de la souris ou du tactile
         * @param {HTMLImageElement} img - Image principale
         * @returns {{x: number, y: number}} - Position x et y du curseur
         */
        function getCursorPos(e, img) {
            const rect = img.getBoundingClientRect(); // Position de l'image dans la fenêtre
            const x = e.pageX - rect.left - window.pageXOffset;
            const y = e.pageY - rect.top - window.pageYOffset;
            return { x, y };
        }
    
        /**
         * Changement de l'image principale et mise à jour du cadre de zoom
         * @param {string} newImageSrc - Source de la nouvelle image
         */
        function changeMainImage(newImageSrc) {
            const img = document.getElementById("myimage");
            const result = document.getElementById("myresult");
    
            // Mise à jour de l'image principale et du cadre de zoom
            img.src = newImageSrc;
            result.style.backgroundImage = `url('${newImageSrc}')`;
    
            // Réinitialisation du zoom pour la nouvelle image
            imageZoom("myimage", "myresult");
        }
    
        /**
         * Initialisation des événements sur les miniatures
         */
        function initThumbnailClicks() {
            const thumbnails = document.querySelectorAll('.product-images img');
    
            // Ajout d'un événement de clic à chaque miniature
            thumbnails.forEach((thumbnail) => {
                thumbnail.addEventListener('click', function () {
                    changeMainImage(this.src); // Mettre à jour l'image principale
                });
            });
        }
    
        /**
         * Initialisation globale des fonctionnalités de la page
         */
        function init() {
            imageZoom("myimage", "myresult"); // Initialiser le zoom sur l'image principale
            initThumbnailClicks(); // Configurer les miniatures
        }
    
        // Exécution après le chargement complet de la page
        document.addEventListener("DOMContentLoaded", init);
   
    /**
 * Mise à jour du compteur d'articles dans le panier
 */
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-counter').textContent = cart.length;
  }
  
  /**
   * Ajout d'un produit au panier
   */
  function addToCart() {
    // Récupérer les informations du produit
    const productInfo = document.querySelector('.product-info');
    const productName = productInfo.dataset.name;
    const productPrice = productInfo.dataset.price;
    const productImage = productInfo.dataset.image;
  
    // Créer un objet produit
    const product = {
      name: productName,
      price: productPrice,
      image: productImage,
    };
  
    // Récupérer le panier existant depuis localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Ajouter le produit au panier
    cart.push(product);
  
    // Enregistrer le panier mis à jour dans localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Mettre à jour l'affichage du compteur
    updateCartCounter();
  
    // Optionnel : Alerter l'utilisateur
    alert('Produit ajouté au panier avec succès !');
  }
  
  /**
   * Initialisation des événements
   */
  function init() {
    imageZoom("myimage", "myresult"); // Initialiser le zoom sur l'image principale
    initThumbnailClicks(); // Configurer les miniatures
  
    // Ajouter un événement au bouton "Ajouter au panier"
    const addToCartButton = document.getElementById('addToCart');
    addToCartButton.addEventListener('click', addToCart);
  
    // Mettre à jour le compteur du panier au chargement
    updateCartCounter();
  }
  
  // Exécution après le chargement complet de la page
  document.addEventListener("DOMContentLoaded", init);