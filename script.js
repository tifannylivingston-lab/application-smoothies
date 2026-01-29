const fruits = document.querySelectorAll('.fruits img');
const contenuVerre = document.getElementById('contenu-verre');
const recetteDiv = document.getElementById('recette');
const compteurSpan = document.getElementById('compteur');

let fruitsChoisis = [];
let compteur = localStorage.getItem('compteurSmoothie') || 0;
compteurSpan.textContent = compteur;

const recettes = {
  pomme: "1/2 pomme",
  poire: "1/2 poire",
  clementine: "1 clémentine",
  fraise: "4 fraises",
  kiwi: "1 kiwi"
};

// Événements clic sur les fruits
fruits.forEach(fruit => {
  fruit.addEventListener('click', () => {
    if (fruitsChoisis.length >= 5) return;
    fruitsChoisis.push(fruit.dataset.fruit);
    afficherFruits();
  });
});

// Fonction pour afficher les fruits en quincunx et ajuster la taille
function afficherFruits() {
  contenuVerre.innerHTML = ""; // vider avant de réafficher

  const n = fruitsChoisis.length;
  const baseY = 10; // distance depuis le fond du verre
  const hauteurVerre = 250; // hauteur de #contenu-verre
  const xSpread = 40; // écart horizontal max

  fruitsChoisis.forEach((nom, i) => {
    const img = document.createElement('img');
    img.src = document.querySelector(`[data-fruit="${nom}"]`).src;
    img.className = 'fruit-verre';
    img.style.position = 'absolute';
    img.style.left = '50%';

    // Ajustement dynamique de la taille selon le nombre de fruits
    let taille = 50; // par défaut
    if(n === 1) taille = 70;
    else if(n === 2) taille = 60;
    else if(n === 3) taille = 55;
    else if(n >= 4) taille = 45;
    img.style.width = taille + 'px';

    // position verticale proportionnelle depuis le bas
    let y = baseY + (i / n) * (hauteurVerre - taille - 20); 
    // 20 pour laisser un petit espace en haut

    // position horizontale quincunx
    let x;
    if (n === 1) x = 0;
    else if (n === 2) x = i === 0 ? -xSpread/2 : xSpread/2;
    else if (n === 3) x = i === 0 ? -xSpread : i === 1 ? xSpread : 0;
    else if (n === 4) x = i === 0 ? -xSpread : i === 1 ? xSpread : i === 2 ? -xSpread/2 : xSpread/2;
    else x = i === 0 ? -xSpread : i === 1 ? xSpread : i === 2 ? -xSpread/2 : i === 3 ? xSpread/2 : 0;

    img.style.bottom = y + 'px';
    img.style.transform = `translateX(${x}px)`;

    contenuVerre.appendChild(img);
  });
}

// Bouton "Voir la recette"
document.getElementById('btn-recette').onclick = () => {
  if (fruitsChoisis.length < 2) {
    recetteDiv.innerHTML = "👉 Choisis au moins 2 fruits";
    return;
  }

  let texte = `<strong>Smoothie ${fruitsChoisis.length} fruits</strong><br>`;
  fruitsChoisis.forEach(f => texte += `${recettes[f]}<br>`);
  texte += "<br>Ajoute un peu d’eau ou de jus 🍹";

  recetteDiv.innerHTML = texte;

  compteur++;
  localStorage.setItem('compteurSmoothie', compteur);
  compteurSpan.textContent = compteur;
};

// Bouton "Nouveau smoothie"
document.getElementById('btn-reset').onclick = () => {
  fruitsChoisis = [];
  contenuVerre.innerHTML = "";
  recetteDiv.innerHTML = "";
};

// Bouton "Recette aléatoire"
document.getElementById('btn-random').onclick = () => {
  fruitsChoisis = [];
  contenuVerre.innerHTML = "";

  const noms = Object.keys(recettes).sort(() => 0.5 - Math.random()).slice(0, 3);
  fruitsChoisis = noms;
  afficherFruits();
};

// Bouton "Remettre le compteur à zéro"
document.getElementById('reset-compteur').onclick = () => {
  const mdp = prompt("Mot de passe propriétaire :");
  if (mdp === "smoothie2024") {
    compteur = 0;
    localStorage.setItem('compteurSmoothie', 0);
    compteurSpan.textContent = 0;
  } else {
    alert("Mot de passe incorrect ❌");
  }
};
