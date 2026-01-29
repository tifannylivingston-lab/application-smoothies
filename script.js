const fruits = document.querySelectorAll('.fruits img');
const contenuVerre = document.getElementById('contenu-verre');
const recetteDiv = document.getElementById('recette');
const compteurSpan = document.getElementById('compteur');

let fruitsChoisis = [];
let compteur = localStorage.getItem('compteurSmoothie') || 0;
compteurSpan.textContent = compteur;

// Quantités DE BASE pour 1 fruit dans un verre de 25–30 cl
const baseRecettes = {
  pomme: 0.5,
  poire: 0.5,
  clementine: 1,
  fraise: 4,
  kiwi: 1
};

const unite = {
  pomme: "pomme",
  poire: "poire",
  clementine: "clémentine",
  fraise: "fraise",
  kiwi: "kiwi"
};

// Gestion clic fruits
fruits.forEach(fruit => {
  fruit.addEventListener('click', () => {
    if (fruitsChoisis.length >= 5) return;
    const nom = fruit.dataset.fruit;
    fruitsChoisis.push(nom);
    ajouterFruit(nom);
  });
});

// Ajout visuel fruit (inchangé, fonctionne bien)
function ajouterFruit(nom) {
  const img = document.createElement('img');
  img.src = document.querySelector(`[data-fruit="${nom}"]`).src;
  img.className = 'fruit-verre';
  img.style.position = 'absolute';
  img.style.left = '50%';

  let n = fruitsChoisis.length;
  let taille = n === 1 ? 70 : n === 2 ? 60 : n === 3 ? 55 : 45;
  img.style.width = taille + 'px';

  let bottom = 0;
  contenuVerre.querySelectorAll('.fruit-verre').forEach(f => {
    bottom += parseFloat(f.style.width) * 0.9;
  });
  img.style.bottom = bottom + 'px';

  const decalX = (Math.random() - 0.5) * 40;
  img.style.transform = `translateX(${decalX}px) translateX(-50%)`;

  contenuVerre.appendChild(img);
}

// 📌 RECETTE ADAPTATIVE
document.getElementById('btn-recette').onclick = () => {
  if (fruitsChoisis.length < 2) {
    recetteDiv.innerHTML = "👉 Choisis au moins 2 fruits";
    return;
  }

  const n = fruitsChoisis.length;

  // Coefficient d’ajustement (plus il y a de fruits, plus on réduit)
  let coef = 1;
  if (n === 2) coef = 1;
  else if (n === 3) coef = 0.75;
  else if (n === 4) coef = 0.6;
  else if (n === 5) coef = 0.5;

  let texte = `<strong>Smoothie équilibré (${n} fruits)</strong><br><br>`;

  fruitsChoisis.forEach(fruit => {
    let qte = baseRecettes[fruit] * coef;

    // arrondis intelligents
    if (fruit === "fraise") qte = Math.max(1, Math.round(qte));
    else if (qte < 0.5) qte = "¼";
    else if (qte === 0.5) qte = "½";
    else qte = qte.toString().replace(".5", "½");

    texte += `${qte} ${unite[fruit]}<br>`;
  });

  // Liquide adapté
  let liquide = n <= 2 ? 120 : n === 3 ? 100 : 85;
  texte += `<br>${liquide} ml d’eau ou de jus 🍹`;

  recetteDiv.innerHTML = texte;

  compteur++;
  localStorage.setItem('compteurSmoothie', compteur);
  compteurSpan.textContent = compteur;
};

// Reset
document.getElementById('btn-reset').onclick = () => {
  fruitsChoisis = [];
  contenuVerre.innerHTML = "";
  recetteDiv.innerHTML = "";
};

// Random
document.getElementById('btn-random').onclick = () => {
  fruitsChoisis = [];
  contenuVerre.innerHTML = "";

  const noms = Object.keys(baseRecettes).sort(() => 0.5 - Math.random()).slice(0, 3);
  noms.forEach(nom => {
    fruitsChoisis.push(nom);
    ajouterFruit(nom);
  });
};

// Reset compteur
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
