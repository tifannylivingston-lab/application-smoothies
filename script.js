const fruitsDivs = document.querySelectorAll(".fruit");
const resultat = document.getElementById("resultat");
const compteurDiv = document.getElementById("compteur");
const verre = document.getElementById("verre");

let fruitsSelectionnes = [];
let posY = [];

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

// --- Ajouter fruit dans le verre ---
function ajouterFruitVerre(fruit){
  const divFruit = [...fruitsDivs].find(d => d.dataset.fruit === fruit);
  if(!divFruit) return;

  const clone = divFruit.querySelector("img").cloneNode(true);
  clone.classList.add("fruit-in-verre");

  const verreRect = verre.getBoundingClientRect();
  const leftPos = Math.random() * (verre.clientWidth - 50);
  clone.style.left = leftPos + "px";
  clone.style.top = "-60px";
  verre.appendChild(clone);

  const hauteur = verre.clientHeight - 50 - (posY.length * 40);
  posY.push(hauteur);

  clone.animate([
    { transform: "translateY(0px) rotate(0deg)", opacity: 0 },
    { transform: `translateY(${hauteur}px) rotate(${Math.random()*30-15}deg)`, opacity: 1 }
  ], { duration: 1000, easing: 'ease-out', fill: 'forwards' });
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

// --- Nouvelle recette ---
document.getElementById("nouvelleRecetteBtn").addEventListener("click", () => {
  fruitsSelectionnes = [];
  fruitsDivs.forEach(div => div.classList.remove("selected"));
  resultat.innerHTML = "";
  verre.innerHTML = '<img src="verre.png" alt="Verre à smoothie" id="verre-img">';
  posY = [];
});

// --- Voir recette ---
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

// --- Bouton aléatoire ---
document.getElementById("aleatoireBtn").addEventListener("click", () => {
  document.getElementById("nouvelleRecetteBtn").click();
  const nb = Math.floor(Math.random()*4)+2;
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

// --- Bouton reset avec mot de passe ---
document.getElementById("resetBtn").addEventListener("click", ()=>{
  const motDePasse = prompt("🔒 Mot de passe administrateur pour remettre le compteur à zéro :");
  if(motDePasse === "admin123"){ // changer le mot de passe si tu veux
    if(confirm("⚠️ Remettre le compteur à zéro ?")){
      compteurSmoothies = 0;
      localStorage.setItem("compteurSmoothies", compteurSmoothies);
      compteurDiv.innerHTML = `Smoothies générés : ${compteurSmoothies}`;
    }
  } else {
    alert("❌ Mot de passe incorrect !");
  }
});
