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

    const nom = fruit.dataset.fruit;
    fruitsChoisis.push(nom);

    const img = document.createElement('img');
    img.src = fruit.src;
    img.className = 'fruit-verre';

    contenuVerre.appendChild(img);
  });
});

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
  noms.forEach(nom => {
    fruitsChoisis.push(nom);
    const img = document.createElement('img');
    img.src = document.querySelector(`[data-fruit="${nom}"]`).src;
    img.className = 'fruit-verre';
    contenuVerre.appendChild(img);
  });
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
