import { CreateDeckSlot } from "./DeckSlot";
import { CreateFoundationSlot } from "./FoundationSlot";
import { FoundationPiles, TableauPiles } from "./Pile";
import { fullRender, game, newGame } from "./Solitaire";
import { CreateTableauSlot } from "./TableauSlot";
import { CreateTalonSlot } from "./TalonSlot";

export const solitaireGreen = "#307022"; // taken from pictures off the internet

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

export function CreatePageLayout() {
  const page = document.createElement("div");
  page.appendChild(CreateHeaderLayout());
  page.appendChild(CreateGameLayout());
  return page;
}

function CreateHeaderLayout() {
  const headerDiv = document.createElement("div");
  headerDiv.id = "headerDiv";

  const navBar = document.createElement("div");
  navBar.id = "navBar";

  const score = document.createElement("p");
  score.textContent = "Score: ";
  score.style.color = "white";
  game.updateScore = () => updateScore(score);

  const button = document.createElement("button");
  button.id = "newGame";

  button.onclick = () => {
    const nextGame = newGame();
    game.piles = nextGame.piles;
    fullRender();
  };

  button.textContent = "New Game";
  navBar.appendChild(score);
  navBar.appendChild(button);

  headerDiv.appendChild(navBar);
  return headerDiv;
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

function CreateGameLayout() {
  const gameDiv = document.createElement("div");
  gameDiv.id = "gameDiv";
  gameDiv.style.backgroundColor = solitaireGreen;
  gameDiv.appendChild(CreateTopRowLayout());
  gameDiv.appendChild(CreateTableauLayout());
  return gameDiv;
}

function updateScore(score: HTMLElement) {
  score.innerHTML = "Score: " + game.score;
}
