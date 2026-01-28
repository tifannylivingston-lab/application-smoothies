const fruitsDivs = document.querySelectorAll(".fruit");
const resultat = document.getElementById("resultat");
const compteurDiv = document.getElementById("compteur");
const verre = document.getElementById("verre");
const verreImg = document.getElementById("verre-img");

let fruitsSelectionnes = [];
let posY = []; // position de chaque fruit dans le verre

// --- Compteur persistant ---
let compteurSmoothies = localStorage.getItem("compteurSmoothies");
if(!compteurSmoothies) compteurSmoothies = 0;
else compteurSmoothies = parseInt(compteurSmoothies);
compteurDiv.innerHTML = `Smoothies générés : ${compteurSmoothies}`;

function incrementerCompteur(){
  compteurSmoothies++;
  compteurDiv.innerHTML = `Smoothies générés : ${compteurSmoothies}`;
  localStorage.setItem("compteurSmoothies", compteurSmoothies);
}

// --- Ajouter fruit dans le verre avec animation réelle ---
function ajouterFruitVerre(fruit){
  const divFruit = [...fruitsDivs].find(d => d.dataset.fruit === fruit);
  if(!divFruit) return;

  const clone = divFruit.querySelector("img").cloneNode(true);
  clone.classList.add("fruit-in-verre");

  const verreRect = verre.getBoundingClientRect();
  const leftPos = 20 + Math.random() * (verreRect.width - 70); // position aléatoire
  clone.style.left = leftPos + "px";

  // hauteur empilée
  const hauteur = verreRect.height - 50 - (posY.length * 40);
  clone.style.top = "-60px"; // départ au-dessus

  verre.appendChild(clone);

  // Animation chute + rebond
  clone.animate([
    { transform: `translateY(0px) rotate(0deg)`, opacity: 0 },
    { transform: `translateY(${hauteur + 20}px) rotate(${Math.random()*30-15}deg)`, opacity: 1 },
    { transform: `translateY(${hauteur}px) rotate(0deg)`, opacity: 1 }
  ], { duration: 1000, easing: 'ease-out', fill: 'forwards' });

  posY.push(hauteur);
}

// --- Clic sur fruit ---
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

// --- Bouton Nouvelle recette ---
document.getElementById("nouvelleRecetteBtn").addEventListener("click", () => {
  fruitsSelectionnes = [];
  fruitsDivs.forEach(div => div.classList.remove("selected"));
  resultat.innerHTML = "";
  verre.innerHTML = '<img src="verre.png" alt="Verre à smoothie" id="verre-img">';
  posY = [];
});

// --- Bouton Voir recette ---
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
  fruitsSelectionnes.forEach(fruit => html += `<li>${fruit} : ${quantiteParFruit} g</li>`);
  html += `</ul><p><strong>Liquide :</strong> 100 ml</p>`;
  resultat.innerHTML = html;

  incrementerCompteur();
});

// --- Bouton Aléatoire ---
document.getElementById("aleatoireBtn").addEventListener("click", () => {
  document.getElementById("nouvelleRecetteBtn").click();
  const nb = Math.floor(Math.random()*4)+2; // 2 à 5 fruits
  const fruits = ["Pomme","Poire","Clémentine","Fraise","Kiwi"];
  const shuffle = fruits.sort(()=>0.5-Math.random());
  const selection = shuffle.slice(0, nb);
  selection.forEach(fruit => {
    fruitsSelectionnes.push(fruit);
    const divFruit = [...fruitsDivs].find(d=>d.dataset.fruit===fruit);
    if(divFruit) divFruit.classList.add("selected");
    ajouterFruitVerre(fruit);
  });
});

// --- Bouton Reset admin ---
const motDePasse = "admin123";
if(prompt("Mot de passe admin pour gestion compteur :") === motDePasse){
  document.getElementById("resetBtn").style.display = "inline-block";
}

document.getElementById("resetBtn").addEventListener("click", ()=>{
  if(confirm("⚠️ Remettre le compteur à zéro ?")){
    compteurSmoothies = 0;
    localStorage.setItem("compteurSmoothies", compteurSmoothies);
    compteurDiv.innerHTML = `Smoothies générés : ${compteurSmoothies}`;
  }
});
