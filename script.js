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

fruits.forEach(fruit => {
  fruit.addEventListener('click', () => {
    if (fruitsChoisis.length >= 5) return;
    fruitsChoisis.push(fruit.dataset.fruit);
    afficherFruits();
  });
});

function afficherFruits() {
  contenuVerre.innerHTML = ""; // vider avant de réafficher

  // calcul automatique des positions selon le nombre de fruits
  const n = fruitsChoisis.length;
  const yStart = 0; // base du verre
  const yGap = 50;  // écart vertical entre lignes
  const xSpread = 40; // écart horizontal maximal

  fruitsChoisis.forEach((nom, i) => {
    const img = document.createElement('img');
    img.src = document.querySelector(`[data-fruit="${nom}"]`).src;
    img.className = 'fruit-verre';
    img.style.position = 'absolute';
    img.style.left = '50%';

    // position verticale (espacement uniforme du bas vers le haut)
    let y = yStart + Math.floor((i / n) * (n-1) * yGap);

    // position horizontale (alternance gauche-droite autour du centre)
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

// Boutons
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

document.getElementById('btn-reset').onclick = () => {
  fruitsChoisis = [];
  contenuVerre.innerHTML = "";
  recetteDiv.innerHTML = "";
};

document.getElementById('btn-random').onclick = () => {
  fruitsChoisis = [];
  contenuVerre.innerHTML = "";

  const noms = Object.keys(recettes).sort(() => 0.5 - Math.random()).slice(0, 3);
  fruitsChoisis = noms;
  afficherFruits();
};

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

