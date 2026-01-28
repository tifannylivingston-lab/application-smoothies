const fruitsBtns = document.querySelectorAll(".fruit");
const resultat = document.getElementById("resultat");
let fruitsSelectionnes = [];

fruitsBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const fruit = btn.dataset.fruit;

    if (fruitsSelectionnes.includes(fruit)) {
      fruitsSelectionnes = fruitsSelectionnes.filter(f => f !== fruit);
      btn.classList.remove("selected");
    } else {
      fruitsSelectionnes.push(fruit);
      btn.classList.add("selected");
    }
  });
});

document.getElementById("recetteBtn").addEventListener("click", () => {
  const nbFruits = fruitsSelectionnes.length;

  if (nbFruits < 2) {
    resultat.innerHTML = "❌ Choisis au moins 2 fruits";
    return;
  }

  let quantiteParFruit;

  if (nbFruits === 2) quantiteParFruit = 75;
  else if (nbFruits === 3) quantiteParFruit = 50;
  else if (nbFruits === 4) quantiteParFruit = 38;
  else quantiteParFruit = 30;

  let html = `<h2>🍹 Ta recette personnalisée</h2>`;
  html += `<p><strong>Fruits choisis :</strong></p><ul>`;

  fruitsSelectionnes.forEach(fruit => {
    html += `<li>${fruit} : ${quantiteParFruit} g</li>`;
  });

  html += `</ul>
    <p><strong>Liquide :</strong> 100 ml (eau ou jus de pomme)</p>
    <p>🚴‍♀️ Plus tu pédales, plus c’est onctueux !</p>`;

  resultat.innerHTML = html;
});
