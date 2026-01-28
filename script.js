const fruitsDivs = document.querySelectorAll(".fruit");
const resultat = document.getElementById("resultat");
const compteurDiv = document.getElementById("compteur");
const objectifSelect = document.getElementById("objectifSelect");
const verre = document.getElementById("verre");

let fruitsSelectionnes = [];
let compteurSmoothies = 0;

// ------------------------
// Sélection des fruits clic
// ------------------------
fruitsDivs.forEach(div => {
  div.setAttribute("draggable", true); // pour drag & drop

  div.addEventListener("click", () => {
    const fruit = div.dataset.fruit;
    if(fruitsSelectionnes.includes(fruit)){
      fruitsSelectionnes = fruitsSelectionnes.filter(f => f !== fruit);
      div.classList.remove("selected");
    } else {
      if(fruitsSelectionnes.length < 5){
        fruitsSelectionnes.push(fruit);
        div.classList.add("selected");
      } else {
        alert("❌ Maximum 5 fruits !");
      }
    }
  });

  // Drag start
  div.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", div.dataset.fruit);
  });
});

// ------------------------
// Drag & Drop dans le verre
// ------------------------
verre.addEventListener("dragover", (e) => {
  e.preventDefault();
  verre.classList.add("drag-over");
});

verre.addEventListener("dragleave", () => {
  verre.classList.remove("drag-over");
});

verre.addEventListener("drop", (e) => {
  e.preventDefault();
  verre.classList.remove("drag-over");

  const fruit = e.dataTransfer.getData("text/plain");
  if(!fruitsSelectionnes.includes(fruit)) {
    if(fruitsSelectionnes.length < 5){
      fruitsSelectionnes.push(fruit);
      fruitsDivs.forEach(div => {
        if(div.dataset.fruit === fruit) div.classList.add("selected");
      });
    } else {
      alert("❌ Maximum 5 fruits !");
    }
  }

  // Générer recette automatiquement
  document.getElementById("recetteBtn").click();
});

// ------------------------
// Bouton Nouvelle recette
// ------------------------
document.getElementById("nouvelleRecetteBtn").addEventListener("click", () => {
  fruitsSelectionnes = [];
  fruitsDivs.forEach(div => div.classList.remove("selected"));
  resultat.innerHTML = "";
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

  let html = `<h2>🍹 Ta recette personnalisée (${objectifSelect.value})</h2>`;
  html += `<p>${message}</p>`;
  html += `<ul>`;
  fruitsSelectionnes.forEach(fruit => {
    html += `<li>${fruit} : ${quantiteParFruit} g</li>`;
  });
  html += `</ul>`;
  html += `<p><strong>Liquide :</strong> 100 ml (eau ou jus de pomme)</p>`;
  html += `<p>🚴‍♀️ Plus tu pédales, plus c’est onctueux !</p>`;

  resultat.innerHTML = html;

  compteurSmoothies++;
  compteurDiv.innerHTML = `Smoothies générés : ${compteurSmoothies}`;
});

// ------------------------
// Bouton Aléatoire "Surprends-moi"
// ------------------------
document.getElementById("aleatoireBtn").addEventListener("click", () => {
  fruitsSelectionnes = [];
  fruitsDivs.forEach(div => div.classList.remove("selected"));

  const nb = Math.floor(Math.random() * 4) + 2; // 2 à 5 fruits
  const fruits = ["Pomme","Poire","Clémentine","Fraise","Kiwi"];
  const shuffle = fruits.sort(() => 0.5 - Math.random());
  fruitsSelectionnes = shuffle.slice(0, nb);

  // mise à jour visuelle
  fruitsDivs.forEach(div => {
    if(fruitsSelectionnes.includes(div.dataset.fruit)) div.classList.add("selected");
  });

  document.getElementById("recetteBtn").click();
});
