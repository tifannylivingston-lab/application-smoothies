const fruitsDivs = document.querySelectorAll(".fruit");
const resultat = document.getElementById("resultat");
const compteurDiv = document.getElementById("compteur");
const verre = document.getElementById("verre");

let fruitsSelectionnes = [];
let compteurSmoothies = 0;
let posY = []; // pour empiler les fruits dans le verre

// ------------------------
// Fonction pour faire tomber le fruit dans le verre
// ------------------------
function ajouterFruitVerre(fruit) {
  const divFruit = [...fruitsDivs].find(d => d.dataset.fruit === fruit);
  if(!divFruit) return;

  const clone = divFruit.querySelector("img").cloneNode(true);
  clone.classList.add("fruit-in-verre");

  // Supprimer texte initial
  const texteVerre = verre.querySelector("p");
  if(texteVerre) texteVerre.style.display = "none";

  // Position initiale en haut du verre
  const rect = verre.getBoundingClientRect();
  clone.style.left = Math.random() * (rect.width - 60) + "px";

  // Position finale empilée
  const hauteur = posY.length * 50; // 50px par fruit
  clone.style.top = -70 + "px"; // départ au-dessus
  verre.appendChild(clone);

  clone.animate([
    { transform: `translateY(0) rotate(0deg)`, opacity: 0 },
    { transform: `translateY(${hauteur}px) rotate(${Math.random()*30-15}deg)`, opacity: 1 }
  ], { duration: 1000, easing: 'ease-out', fill: 'forwards' });

  posY.push(hauteur);
}

// ------------------------
// Clic sur fruit
// ------------------------
fruitsDivs.forEach(div => {
  div.addEventListener("click", () => {
    const fruit = div.dataset.fruit;
    if(fruitsSelectionnes.includes(fruit)) return;
    if(fruitsSelectionnes.length >= 5){
      alert("❌ Maximum 5 fruits !");
      return;
    }

    fruitsSelectionnes.push(fruit);
    div.classList.add("selected");
    ajouterFruitVerre(fruit);
  });
});

// ------------------------
// Bouton Nouvelle recette
// ------------------------
document.getElementById("nouvelleRecetteBtn").addEventListener("click", () => {
  fruitsSelectionnes = [];
  fruitsDivs.forEach(div => div.classList.remove("selected"));
  resultat.innerHTML = "";
  verre.innerHTML = '<p>🍹 Verre vide</p>';
  posY = [];
});

// ------------------------
// Bouton Voir recette
// ------------------------
document.getElementById("recetteBtn").addEventListener("click", () => {
  const nbFruits = fruitsSelectionnes.length;
  if(nbFruits < 2){
    resultat.innerHTML = "❌ Choisis au moins 2 fruits !";
    return;
  }

  let quantiteParFruit;
  if(nbFruits === 2) quantiteParFruit = 75;
  else if(nbFruits === 3) quantiteParFruit = 50;
  else if(nbFruits === 4) quantiteParFruit = 38;
  else quantiteParFruit = 30;

  let message;
  if(nbFruits === 2) message = "Goût intense 💥";
  else if(nbFruits === 3) message = "Équilibre parfait ⚖️";
  else if(nbFruits === 4) message = "Cocktail vitaminé 🌈";
  else message = "Le smoothie ultime 🔥";

  let html = `<h2>🍹 Ta recette personnalisée</h2>`;
  html += `<p>${message}</p><ul>`;
  fruitsSelectionnes.forEach(fruit => {
    html += `<li>${fruit} : ${quantiteParFruit} g</li>`;
  });
  html += `</ul><p><strong>Liquide :</strong> 100 ml</p>`;
  resultat.innerHTML = html;

  compteurSmoothies++;
  compteurDiv.innerHTML = `Smoothies générés : ${compteurSmoothies}`;
});

// ------------------------
// Bouton aléatoire
// ------------------------
document.getElementById("aleatoireBtn").addEventListener("click", () => {
  document.getElementById("nouvelleRecetteBtn").click();
  const nb = Math.floor(Math.random() * 4) + 2; // 2 à 5 fruits
  const fruits = ["Pomme","Poire","Clémentine","Fraise","Kiwi"];
  const shuffle = fruits.sort(() => 0.5 - Math.random());
  const selection = shuffle.slice(0, nb);
  selection.forEach(fruit => {
    fruitsSelectionnes.push(fruit);
    const divFruit = [...fruitsDivs].find(d => d.dataset.fruit === fruit);
    if(divFruit) divFruit.classList.add("selected");
    ajouterFruitVerre(fruit);
  });
});
