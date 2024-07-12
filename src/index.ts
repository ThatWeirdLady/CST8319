import { BackImages, FrontImages } from "./CardImages";
import { createDnDSlot, createGenericSlot } from "./Slot";
import { createCard } from "./CardView";
import "./style.css";
import { fullRender, game } from "./Solitaire";
import { Pile } from "./Pile";
import { Card } from "./Deck";
import { Rank } from "./ranks";
import { CreateDeckVisual } from "./DeckVisual";

export const DefaultBackImage = BackImages.Blue;

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
const deckAndTalonDiv = document.createElement("div");
deckAndTalonDiv.id = "deckDiv";

topRow.appendChild(deckAndTalonDiv);

// Holds four foundation slots.
const FoundationContainer = document.createElement("div");
FoundationContainer.id = "foundationDiv";

// Setup hierarchy.
document.body.appendChild(topRow);
topRow.appendChild(FoundationContainer);

CreateDeckVisual(deckAndTalonDiv);

// create talon slot.
const talon = createGenericSlot({
  id: "Talon",
  pile: Pile.TALON,
  parent: deckAndTalonDiv,
  allowDrop: noDrop
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function noDrop(_: Card[], __: Card[]): boolean {
  return false;
}

function isAllowedOnFoundation(pile: Card[], add: Card[]): boolean {
  if (add.length !== 1) {
    return false;
  }
  const card = add[0];
  if (pile.length === 0) {
    return card.rank === Rank.Ace;
  }
  const topCard = pile[pile.length - 1];
  if (card.suit === topCard.suit && card.rank === topCard.rank + 1) {
    return true;
  }
  return false;
}

// Create all foundations slots, debug slots that accept any card for now.
const foundationPiles = [
  Pile.FOUNDATION_0,
  Pile.FOUNDATION_1,
  Pile.FOUNDATION_2,
  Pile.FOUNDATION_3
];
const FoundationSlots: HTMLDivElement[] = [];
for (let i = 0; i < 4; i++) {
  const slot = createDnDSlot({
    id: `${i}`,
    pile: foundationPiles[i],
    parent: FoundationContainer,
    allowDrop: isAllowedOnFoundation
  });
  FoundationSlots.push(slot);
}

// render a pile where the only thing that matters is the card on top or nothing at all.
export function renderSimplePile(div: HTMLDivElement, pileName: Pile) {
  div.innerHTML = "";
  const pile = game.piles[pileName];
  const topCard = pile[pile.length - 1];
  if (pile.length) {
    createCard({
      pile: pileName,
      faceUp: topCard.revealed,
      img: FrontImages[topCard.suit + topCard.rank],
      parent: div,
      depth: 1
    });
  }
}

game.updateVisuals[Pile.TALON] = () => renderSimplePile(talon, Pile.TALON);

for (let i = 0; i < FoundationSlots.length; i++) {
  game.updateVisuals[foundationPiles[i]] = () =>
    renderSimplePile(FoundationSlots[i], foundationPiles[i]);
}

const tableauPiles = [
  Pile.TABLEAU_0,
  Pile.TABLEAU_1,
  Pile.TABLEAU_2,
  Pile.TABLEAU_3,
  Pile.TABLEAU_4,
  Pile.TABLEAU_5,
  Pile.TABLEAU_6
];

const cardHeight = 172;
const cardOffset = 30;
const tableRow = document.createElement("div");
tableRow.id = "tableauRow";
document.body.appendChild(tableRow);

function renderTableau(
  pileName: Pile,
  slot: HTMLDivElement,
  anchorDiv: HTMLDivElement
) {
  const pile = game.piles[pileName];
  anchorDiv.innerHTML = "";
  slot.style.height = `${cardHeight + (pile.length - 1) * cardOffset}px`;
  for (let i = 0; i < pile.length; i++) {
    const c0 = createCard({
      pile: pileName,
      img: FrontImages[pile[i].suit + pile[i].rank],
      faceUp: pile[i].revealed,
      parent: anchorDiv,
      depth: pile.length - i
    });
    c0.style.position = "absolute";
    c0.style.top = `${i * cardOffset + cardHeight / 2}px`;
    c0.style.transform = "translate(-50%, -50%)";
  }
}

const tableauDivs: HTMLDivElement[] = [];
const anchorDivs: HTMLDivElement[] = [];

for (let i = 0; i < 7; i++) {
  const slot = createGenericSlot({
    id: "tableau0",
    pile: tableauPiles[i],
    parent: tableRow,
    allowDrop: noDrop //For now
  });
  slot.style.height = `${cardHeight + i * cardOffset}px`; // done
  slot.style.alignItems = "start";
  tableauDivs.push(slot);

  const anchorDiv = document.createElement("div");
  slot.appendChild(anchorDiv);
  anchorDivs.push(anchorDiv);

  anchorDiv.style.position = "relative";
}

for (let i = 0; i < 7; i++) {
  game.updateVisuals[tableauPiles[i]] = () =>
    renderTableau(tableauPiles[i], tableauDivs[i], anchorDivs[i]);
}

fullRender();
