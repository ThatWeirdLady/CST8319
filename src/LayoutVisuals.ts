import { CreateDeckSlot } from "./DeckSlot";
import { CreateFoundationSlot } from "./FoundationSlot";
import { FoundationPiles, TableauPiles } from "./Pile";
import { fullRender, game, newGame } from "./Solitaire";
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

export function CreateHeaderLayout(doc: HTMLElement) {
  doc.style.backgroundColor = solitaireGreen;

  const headerDiv = document.createElement("div");
  headerDiv.id = "headerDiv";

  const navBar = document.createElement("div");
  navBar.id = "navBar";

  const score = document.createElement("p");
  score.textContent = "Score: ";
  score.style.color = "white";

  const button = document.createElement("button");
  button.id = "newGame";

  button.addEventListener("click", () => {
    console.log("In On Click");
    const nextGame = newGame();
    game.piles = nextGame.piles;
    fullRender();
    console.log("After full render");
  });

  button.textContent = "New Game";
  navBar.appendChild(score);
  navBar.appendChild(button);

  headerDiv.appendChild(navBar);
  doc.appendChild(headerDiv);
}

export function CreateGameDiv() {
  const gameDiv = document.createElement("div");
  gameDiv.id = "gameDiv";
  gameDiv.style.backgroundColor = solitaireGreen;
  return gameDiv;
}

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

  return container;
}
