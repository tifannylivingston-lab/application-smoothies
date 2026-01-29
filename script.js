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
    const nom = fruit.dataset.fruit;
    fruitsChoisis.push(nom);
    ajouterFruit(nom);
  });
});

// Fonction pour ajouter un fruit au verre
function ajouterFruit(nom) {
  const img = document.createElement('img');
  img.src = document.querySelector(`[data-fruit="${nom}"]`).src;
  img.className = 'fruit-verre';
  img.style.position = 'absolute';
  img.style.left = '50%';

  // Taille dynamique
  let nFruits = fruitsChoisis.length;
  let taille = 50;
  if(nFruits === 1) taille = 70;
  else if(nFruits === 2) taille = 60;
  else if(nFruits === 3) taille = 55;
  else if(nFruits >= 4) taille = 45;
  img.style.width = taille + 'px';

  // Calcul bottom cumulatif
  let totalBottom = 0;
  const enfants = contenuVerre.querySelectorAll('.fruit-verre');
  enfants.forEach(f => {
    totalBottom += parseFloat(f.style.width) * 0.9; // léger recouvrement
  });
  img.style.bottom = totalBottom + 'px';

  // Décalage horizontal aléatoire pour quincunx naturel
  const xSpread = 40;
  const decalX = (Math.random() - 0.5) * xSpread;
  img.style.transform = `translateX(${decalX}px) translateX(-50%)`;

  contenuVerre.appendChild(img);
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
  noms.forEach(nom => {
    fruitsChoisis.push(nom);
    ajouterFruit(nom);
  });
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
