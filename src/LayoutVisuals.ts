import { CreateDeckSlot } from "./DeckSlot";
import { CreateFoundationSlot } from "./FoundationSlot";
import { FoundationPiles, TableauPiles } from "./Pile";
import { fullRender } from "./Solitaire";
import { CreateTableauSlot } from "./TableauSlot";
import { CreateTalonSlot } from "./TalonSlot";

const solitaireGreen = "#307022"; // taken from pictures off the internet

/*

+------------------------#topRowDiv-----------------------------------+
|+--#deckDiv-----+|                            +--#foundationDiv-----+|
||+----+ +-------+|                            | +--+ +--+ +--+ +--+ ||
|||Deck| | Talon ||                            | |F0| |F1| |F2| |F3| ||
|||    | |       ||                            | |  | |  | |  | |  | ||
||+----+ +-------+|                            | +--+ +--+ +--+ +--+ ||
|+----------------+                            +---------------------+|
+---------------------------------------------------------------------+
+------------------------#tableauRow----------------------------------+
| +--+ +--+ +--+ +--+ +--+ +--+ +--+                                  |
| |T0| |T1| |T2| |T3| |T4| |T5| |T6|                                  |
| |  | |  | |  | |  | |  | |  | |  |                                  |
| |  | |  | |  | |  | |  | |  | |  |                                  |
| |  | |  | |  | |  | |  | |  | |  |                                  |
| +--+ +--+ +--+ +--+ +--+ +--+ +--+                                  |
+---------------------------------------------------------------------+

*/

function CreateFoundationLayout() {
  const container = document.createElement("div");
  container.id = "foundationDiv";

  for (const pile of FoundationPiles) {
    container.appendChild(CreateFoundationSlot(pile));
  }

  return container;
}

function CreateDeckLayout() {
  // Holds deck and talon.
  const container = document.createElement("div");
  container.id = "deckDiv";

  container.appendChild(CreateDeckSlot());
  container.appendChild(CreateTalonSlot());

  return container;
}

function CreateTopRowLayout() {
  // Div element that holds the deck container and foundation container.
  const container = document.createElement("div");
  container.id = "topRowDiv";
  container.appendChild(CreateDeckLayout());
  container.appendChild(CreateFoundationLayout());

  return container;
}

function CreateTableauLayout() {
  const container = document.createElement("div");
  container.id = "tableauRow";

  for (const tableau of TableauPiles) {
    container.appendChild(CreateTableauSlot(tableau));
  }

  return container;
}

export function CreateLayout(container: HTMLElement) {
  container.style.backgroundColor = solitaireGreen;

  container.appendChild(CreateTopRowLayout());
  container.appendChild(CreateTableauLayout());

  fullRender();
}
