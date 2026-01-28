const fruitsDivs = document.querySelectorAll(".fruit");
const resultat = document.getElementById("resultat");
const compteurDiv = document.getElementById("compteur");
const objectifSelect = document.getElementById("objectifSelect");

let fruitsSelectionnes = [];
let compteurSmoothies = 0;

// Sélection des fruits
fruitsDivs.forEach(div => {
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
});

// Bouton Nouvelle recette
document.getElementById("nouvelleRecetteBtn").addEventListener("click", () => {
  fruitsSelectionnes = [];
  fruitsDivs.forEach(div => div.classList.remove("selected"));
  resultat.innerHTML = "";
});

// Bouton Voir recette
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
