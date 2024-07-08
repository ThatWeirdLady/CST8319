import { BackImages, FrontImages } from "./CardImages";
import { createDnDSlot, createGenericSlot } from "./Slot";
import { createCard } from "./CardView";
import "./style.css";
import { game, transfer } from "./Solitaire";
import { Pile } from "./Pile";

const solitaireGreen = "#307022"; // taken from pictures off the internet
document.body.style.backgroundColor = solitaireGreen;

/*

    +------------------------#topRowDiv-------------------------+
    |+--#deckDiv-----+|           +----------#foundationDiv-----+|
    ||                |           |                             ||
    ||                |           |                             ||
    |+----------------+           +-----------------------------+|
    +------------------------------------------------------------+

*/

// Div element that holds the deck container and foundation container.
const topRow = document.createElement("div");
topRow.id = "topRowDiv";

// Holds deck and talon.
const deckContainer = document.createElement("div");
deckContainer.id = "deckDiv";

// Holds four foundation slots.
const FoundationContainer = document.createElement("div");
FoundationContainer.id = "foundationDiv";

// Setup hierarchy.
document.body.appendChild(topRow);
topRow.appendChild(deckContainer);
topRow.appendChild(FoundationContainer);

// Create the deck slot and what happens when you click on it.
const deckSlot = createGenericSlot({
  id: "Deck",
  pile: Pile.DECK,
  parent: deckContainer,
});

function onDeckSlotClick() {
  transfer(Pile.DECK, Pile.TALON);
  updateVisuals();
}

deckSlot.onclick = onDeckSlotClick;

// Create the visuals for the top of the deck. Simply the back of a card.
createCard({
  id: "deck-top-card",
  pile: Pile.DECK,
  img: BackImages.Blue,
  parent: deckSlot,
});

// create talon slot.
const talon = createGenericSlot({
  id: "Talon",
  pile: Pile.TALON,
  parent: deckContainer,
});

// Create all foundations slots, debug slots that accept any card for now.
const foundationPiles = [
  Pile.FOUNDATION_0,
  Pile.FOUNDATION_1,
  Pile.FOUNDATION_2,
  Pile.FOUNDATION_3,
];
const FoundationSlots: HTMLDivElement[] = [];
for (let i = 0; i < 4; i++) {
  const slot = createDnDSlot({
    id: `${i}`,
    pile: foundationPiles[i],
    parent: FoundationContainer,
  });
  FoundationSlots.push(slot);
}

// render a pile where the only thing that matters is the card on top or nothing at all.
export function renderSimplePile(div: HTMLDivElement, pileName: Pile) {
  div.innerHTML = "";
  const pile = game.piles[pileName];
  if (pile.length) {
    createCard({
      id: pile[pile.length - 1].id,
      pile: pileName,
      img: pile[pile.length - 1].img,
      parent: div,
    });
  }
}

// Update the visuals of all piles.
export function updateVisuals() {
  renderSimplePile(talon, Pile.TALON);

  for (let i = 0; i < FoundationSlots.length; i++) {
    renderSimplePile(FoundationSlots[i], foundationPiles[i]);
  }
}

const tableauPiles = [
  Pile.TABLEAU_0,
  Pile.TABLEAU_1,
  Pile.TABLEAU_2,
  Pile.TABLEAU_3,
  Pile.TABLEAU_4,
  Pile.TABLEAU_5,
  Pile.TABLEAU_6,
];

const cardHeight = 172;
const cardOffset = 30;
const tableRow = document.createElement("div");
tableRow.id = "tableauRow";
document.body.appendChild(tableRow);

for (let i = 0; i < 7; i++) {
  const slot = createGenericSlot({
    id: "tableau0",
    pile: tableauPiles[i],
    parent: tableRow,
  });
  slot.style.height = `${cardHeight + i * cardOffset}px`;
  slot.style.alignItems = "start";

  const relDiv = document.createElement("div");
  slot.appendChild(relDiv);

  relDiv.style.position = "relative";
  for (let j = 0; j < i + 1; j++) {
    const possibilities = Object.values(FrontImages);
    const c0 = createCard({
      id: `c${j}`,
      pile: tableauPiles[j],
      img:
        j < i
          ? BackImages.Blue
          : possibilities[Math.floor(Math.random() * possibilities.length)],
      parent: relDiv,
    });
    c0.style.position = "absolute";
    c0.style.top = `${j * cardOffset + cardHeight / 2}px`;
    c0.style.transform = "translate(-50%, -50%)";
  }
}
