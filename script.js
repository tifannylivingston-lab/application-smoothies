const fruitsDivs = document.querySelectorAll(".fruit");
const zoneVerre = document.getElementById("zone-verre");
const resultat = document.getElementById("resultat");
const compteurDiv = document.getElementById("compteur");

let fruitsSelectionnes = [];
let hauteurFruits = 0;

/* COMPTEUR PERSISTANT */
let compteur = localStorage.getItem("compteurSmoothies");
if (!compteur) compteur = 0;
compteur = parseInt(compteur);
compteurDiv.textContent = `Smoothies générés : ${compteur}`;

function incrementerCompteur() {
  compteur++;
  localStorage.setItem("compteurSmoothies", compteur);
  compteurDiv.textContent = `Smoothies générés : ${compteur}`;
}

/* AJOUT FRUIT DANS LE VERRE */
function ajouterFruitVerre(fruit) {
  const divFruit = [...fruitsDivs].find(f => f.dataset.fruit === fruit);
  const img = divFruit.querySelector("img").cloneNode(true);

  img.classList.add("fruit-in-verre");
  img.style.left = Math.random() * (zoneVerre.clientWidth - 45) + "px";
  img.style.top = "-60px";

  zoneVerre.appendChild(img);

  const yFinal = zoneVerre.clientHeight - 45 - hauteurFruits;
  hauteurFruits += 35;

  img.animate([
    { transform: "translateY(0)", opacity: 0 },
    { transform: `translateY(${yFinal}px) rotate(${Math.random()*30-15}deg)`, opacity: 1 }
  ], {
    duration: 900,
    easing: "ease-out",
    fill: "forwards"
  });
}

/* CLIC FRUITS */
fruitsDivs.forEach(div => {
  div.addEventListener("click", () => {
    const fruit = div.dataset.fruit;
    if (fruitsSelectionnes.includes(fruit) || fruitsSelectionnes.length >= 5) return;

    fruitsSelectionnes.push(fruit);
    div.classList.add("selected");
    ajouterFruitVerre(fruit);
  });
});

/* NOUVELLE RECETTE */
document.getElementById("nouvelleRecetteBtn").onclick = () => {
  fruitsSelectionnes = [];
  hauteurFruits = 0;
  zoneVerre.innerHTML = "";
  resultat.innerHTML = "";
  fruitsDivs.forEach(f => f.classList.remove("selected"));
};

/* RECETTE */
document.getElementById("recetteBtn").onclick = () => {
  if (fruitsSelectionnes.length < 2) {
    resultat.innerHTML = "❌ Choisis au moins 2 fruits";
    return;
  }

  const q = fruitsSelectionnes.length === 2 ? 75 :
            fruitsSelectionnes.length === 3 ? 50 :
            fruitsSelectionnes.length === 4 ? 38 : 30;

  resultat.innerHTML = `
    <h3>🍹 Ta recette</h3>
    <ul>${fruitsSelectionnes.map(f => `<li>${f} : ${q} g</li>`).join("")}</ul>
    <p><strong>+ 100 ml d’eau ou jus</strong></p>
  `;

  incrementerCompteur();
};

/* ALÉATOIRE */
document.getElementById("aleatoireBtn").onclick = () => {
  document.getElementById("nouvelleRecetteBtn").click();
  const fruits = ["Pomme","Poire","Clémentine","Fraise","Kiwi"];
  fruits.sort(() => 0.5 - Math.random());
  fruits.slice(0, Math.floor(Math.random()*4)+2).forEach(f => {
    fruitsSelectionnes.push(f);
    document.querySelector(`[data-fruit="${f}"]`).classList.add("selected");
    ajouterFruitVerre(f);
  });
};

/* RESET COMPTEUR */
document.getElementById("resetBtn").onclick = () => {
  const mdp = prompt("Mot de passe administrateur :");
  if (mdp === "admin123") {
    compteur = 0;
    localStorage.setItem("compteurSmoothies", 0);
    compteurDiv.textContent = "Smoothies générés : 0";
  } else {
    alert("❌ Mot de passe incorrect");
  }
};
