import { BackImages } from "./CardImages";
import { createDnDSlot, createGenericSlot } from "./Slot";
import { createCard } from "./CardView";
import "./style.css";
import { game, transfer } from "./game";

document.body.style.backgroundColor = "#307022";

const FoundationContainer = document.createElement("div");
FoundationContainer.style.display = "flex";
FoundationContainer.style.justifyContent = "flex-start";

const topRow = document.createElement("div");
topRow.id = "topRow";

const deckDiv = document.createElement("div");
deckDiv.id = "deckDiv";

const deckSlot = createGenericSlot({
  id: "Deck",
  pile: "deck",
  parent: deckDiv,
});

const talon = createGenericSlot({
  id: "Talon",
  pile: "talon",
  parent: deckDiv,
});

function onDeckSlotClick() {
  transfer("deck", "talon");
  updateTalon();
}

export function updateTalon() {
  talon.innerHTML = "";
  const talonPile = game["talon"];
  createCard({
    id: talonPile[talonPile.length - 1].id,
    pile: "talon",
    img: talonPile[talonPile.length - 1].img,
    parent: talon,
  });
}
deckSlot.onclick = onDeckSlotClick;

createCard({
  id: "deck-top-card",
  pile: "deck",
  img: BackImages.Abstract,
  parent: deckSlot,
});

document.body.appendChild(topRow);
topRow.appendChild(deckDiv);
topRow.appendChild(FoundationContainer);

const slots: HTMLDivElement[] = [];
for (let i = 0; i < 4; i++) {
  const slot = createDnDSlot({
    id: `${i}`,
    pile: `foundation${i}`,
    parent: FoundationContainer,
  });
  slots.push(slot);
}
