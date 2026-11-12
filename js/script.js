// Catalogo prodotti: categoria = scarpe | abbigliamento | accessori
const prodotti = [
  { id: 1, nome: "Sneaker Run", prezzo: 89, categoria: "scarpe", descrizione: "Scarpa leggera per la corsa, suola in gomma traspirante.", img: "https://placehold.co/300x180" },
  { id: 2, nome: "T-shirt basic", prezzo: 19, categoria: "abbigliamento", descrizione: "Cotone biologico, taglio regolare, disponibile in 5 colori.", img: "https://placehold.co/300x180" },
  { id: 3, nome: "Borsa city", prezzo: 49, categoria: "accessori", descrizione: "Tessuto resistente, tasca interna, cinghia regolabile.", img: "https://placehold.co/300x180" },
  { id: 4, nome: "Sandali estate", prezzo: 39, categoria: "scarpe", descrizione: "Plantare anatomico, pelle vegana, perfetti per l'estate.", img: "https://placehold.co/300x180" },
  { id: 5, nome: "Felpa con cappuccio", prezzo: 59, categoria: "abbigliamento", descrizione: "Tessuto morbido, tasca a marsupio, polsini elasticizzati.", img: "https://placehold.co/300x180" },
  { id: 6, nome: "Cappello sport", prezzo: 14, categoria: "accessori", descrizione: "Visiera regolabile, traspirante, ideale per gli allenamenti.", img: "https://placehold.co/300x180" },
];

/**
 * Genera le card dei prodotti e le inserisce in #contenitore-prodotti,
 * sostituendo quelle già presenti. Aggiorna anche il contatore dei prodotti mostrati.
 * La categoria del prodotto diventa una classe della card (.scarpe, .abbigliamento, .accessori)
 * per applicare il colore d'accento definito in style.scss.
 *
 * @param {Array<{id: number, nome: string, prezzo: number, categoria: string, descrizione: string, img: string}>} lista
 *   I prodotti da mostrare.
 * @returns {void}
 */
function renderProdotti(lista) {
  document.getElementById("contenitore-prodotti").innerHTML = lista
    .map(
      (p) => `
      <article class="col-12 col-sm-6 col-xl-4 mb-3">
        <div class="card h-100 ${p.categoria}">
          <img src="${p.img}" class="card-img-top" alt="${p.nome}">
          <div class="card-body">
            <h5 class="card-title">${p.nome}</h5>
            <p class="card-text">${p.descrizione}</p>
            <p class="fw-bold fs-5 m-0">€ ${p.prezzo}</p>
          </div>
        </div>
      </article>`
    )
    .join("");

  // Extra 16: contatore
  document.getElementById("contatore").textContent = lista.length;
}

/**
 * Somma i prezzi dei prodotti con reduce (extra 17).
 *
 * @param {Array<{prezzo: number}>} lista I prodotti da sommare.
 * @returns {number} Il totale dei prezzi.
 */
function calcolaTotale(lista) {
  return lista.reduce((somma, p) => somma + p.prezzo, 0);
}


// === Toggle tema chiaro/scuro ===

const toggle = document.getElementById("toggle-tema");

toggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  // aggiorna il testo del bottone in base allo stato
  const isDark = document.body.classList.contains("dark");
  toggle.textContent = isDark ? "Tema chiaro" : "Tema scuro";
});


// === Filtri per categoria (event delegation) ===

const filtri = document.getElementById("filtri");

/**
 * Listener unico sul contenitore #filtri (event delegation): gestisce il click
 * su qualsiasi bottone con attributo data-categoria.
 * Sposta la classe active sul bottone cliccato, filtra l'array prodotti
 * per categoria ("tutti" = nessun filtro) e ridisegna le card.
 *
 * @param {MouseEvent} event Il click avvenuto dentro #filtri.
 * @returns {void}
 */
filtri.addEventListener("click", function (event) {
  const bottone = event.target.closest("[data-categoria]");
  if (!bottone) return; // click fuori dai bottoni

  filtri.querySelectorAll(".btn").forEach((b) => b.classList.remove("active"));
  bottone.classList.add("active");

  const categoria = bottone.dataset.categoria;
  const filtrati = categoria === "tutti" ? prodotti : prodotti.filter((p) => p.categoria === categoria);
  renderProdotti(filtrati);
});


// === Init ===

renderProdotti(prodotti);
document.getElementById("totale").textContent = calcolaTotale(prodotti);
