import { CreateDeckSlot } from "./DeckSlot";
import { CreateFoundationSlot } from "./FoundationSlot";
import { OpenNewGameModal } from "./Modal";
import { FoundationPiles, TableauPiles } from "./Pile";
import { game } from "./Solitaire";
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
  const gameLayoutDiv = document.createElement("div");
  gameLayoutDiv.style.display = "flex";
  gameLayoutDiv.style.justifyContent = "center";
  gameLayoutDiv.style.marginTop = "32px";
  gameLayoutDiv.appendChild(CreateGameLayout());
  page.appendChild(gameLayoutDiv);
  return page;
}

function CreateHeaderLayout() {
  const headerDiv = document.createElement("div");
  headerDiv.id = "headerDiv";

  const navBar = document.createElement("div");
  navBar.id = "navBar";

  const score = document.createElement("p");
  score.textContent = "Score: 0";
  score.style.color = "white";
  score.style.fontSize = "32px";
  game.updateScore = () => updateScore(score);

  const timer = document.createElement("p");
  timer.textContent = "0:00";
  timer.style.color = "white";
  timer.style.fontSize = "32px";
  game.updateTimer = () => updateTimer(timer);

  const button = document.createElement("button");
  button.id = "newGame";
  button.onclick = OpenNewGameModal;

  button.textContent = "New Game";
  button.classList.add("btn");
  navBar.appendChild(score);
  navBar.appendChild(timer);
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
  if (game.vegas === true) {
    score.innerHTML = "$: " + game.score;
  } else score.innerHTML = "Score: " + game.score;
}

function padWithZero(num: number): string {
  if (num < 10) return "0" + num;
  return num + "";
}
function updateTimer(timer: HTMLElement) {
  const minutes = Math.floor(game.timer / 60);
  const seconds = game.timer % 60;
  timer.innerHTML = minutes + ":" + padWithZero(seconds);
}
