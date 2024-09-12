import { shuffle } from "./Utils";
import {
  FoundationPiles,
  isFoundationPile,
  isTableauPile,
  Pile,
  TableauPiles
} from "./Pile";
import { Rank } from "./Rank";
import { Suit } from "./CardSuit";
import { BackImages } from "./CardImages";
import { TriggerWinAnimation } from "./WinAnimation";
import { drawType } from "./drawType";
import { autoTransferToFoundation } from "./autoClick";

export const game = createGameObject();

interface DragData {
  src: Pile;
  amt: number;
}

interface Game {
  backImage: string;
  piles: Record<Pile, Card[]>;
  updateVisuals: Record<Pile, () => void>;
  currentDrag?: DragData;
  score: number;
  updateScore: () => void;
  timer: number;
  updateTimer: () => void;
  vegas: boolean;
  drawType: drawType;
  deckPass: number;
}

// reveal the last card of a pile and return the pile, used for Tableau initialization.
function revealLast(pile: Card[]): Card[] {
  pile[pile.length - 1].revealed = true;
  return pile;
}

// declare this so we can use it as default use case for updateVisuals
function doNothing() {}
interface newGameOptions {
  score?: number;
  piles: Record<Pile, Card[]>;
  vegas?: boolean;
  drawType: drawType;
}
export function startNewGame(opt: newGameOptions): void {
  game.score = opt.score ?? 0;
  game.piles = opt.piles;
  game.vegas = opt.vegas ?? false;
  game.timer = 0;
  game.deckPass = 1;
  game.drawType = opt.drawType;
}

export function createGameObject(): Game {
  const out: Game = {
    score: 0,
    updateScore: doNothing,
    backImage: BackImages.Blue,
    piles: NearWinPiles(), //KlondikePiles(),
    vegas: false,
    timer: 0,
    updateTimer: doNothing,
    drawType: drawType.drawOne,
    deckPass: 1,
    updateVisuals: {
      // Contains all unused cards.
      [Pile.DECK]: doNothing,

      // Also known as the "waste" pile. Cards go here after being flipped from the deck pile.
      [Pile.TALON]: doNothing,

      // The 4 piles where the Aces go first.
      [Pile.FOUNDATION_0]: doNothing,
      [Pile.FOUNDATION_1]: doNothing,
      [Pile.FOUNDATION_2]: doNothing,
      [Pile.FOUNDATION_3]: doNothing,

      [Pile.TABLEAU_0]: doNothing,
      [Pile.TABLEAU_1]: doNothing,
      [Pile.TABLEAU_2]: doNothing,
      [Pile.TABLEAU_3]: doNothing,
      [Pile.TABLEAU_4]: doNothing,
      [Pile.TABLEAU_5]: doNothing,
      [Pile.TABLEAU_6]: doNothing
    }
  };

  return out;
}

export function KlondikePiles(): Record<Pile, Card[]> {
  const deck = freshDeck();
  return {
    // Contains all unused cards.
    [Pile.DECK]: deck,

    // Also known as the "waste" pile. Cards go here after being flipped from the deck pile.
    [Pile.TALON]: [],

    // The 4 piles where the Aces go first.
    [Pile.FOUNDATION_0]: [],
    [Pile.FOUNDATION_1]: [],
    [Pile.FOUNDATION_2]: [],
    [Pile.FOUNDATION_3]: [],

    [Pile.TABLEAU_0]: revealLast(deck.splice(-1)),
    [Pile.TABLEAU_1]: revealLast(deck.splice(-2)),
    [Pile.TABLEAU_2]: revealLast(deck.splice(-3)),
    [Pile.TABLEAU_3]: revealLast(deck.splice(-4)),
    [Pile.TABLEAU_4]: revealLast(deck.splice(-5)),
    [Pile.TABLEAU_5]: revealLast(deck.splice(-6)),
    [Pile.TABLEAU_6]: revealLast(deck.splice(-7))
  };
}

export function NearWinPiles(): Record<Pile, Card[]> {
  const makeFoundation = (suit: Suit, n: number): Card[] => {
    const ranksArray = Object.values(Rank);
    const out: Card[] = [];
    for (const rank of ranksArray) {
      if (rank > n) break;
      const Card = {
        rank: rank,
        suit: suit,
        revealed: true
      };
      out.push(Card);
    }
    return out;
  };

  const makeTableau = (suit: Suit, n: number): Card[] => {
    const out: Card[] = [];
    for (let i = 13; i > n; i--) {
      const Card = {
        rank: i,
        suit: suit,
        revealed: true
      };
      out.push(Card);
    }
    return out;
  };

  return {
    // Contains all unused cards.
    [Pile.DECK]: [],

    // Also known as the "waste" pile. Cards go here after being flipped from the deck pile.
    [Pile.TALON]: [],

    // The 4 piles where the Aces go first.
    [Pile.FOUNDATION_0]: makeFoundation(Suit.CLUB, 2),
    [Pile.FOUNDATION_1]: makeFoundation(Suit.DIAMOND, 2),
    [Pile.FOUNDATION_2]: makeFoundation(Suit.HEART, 2),
    [Pile.FOUNDATION_3]: makeFoundation(Suit.SPADE, 2),

    [Pile.TABLEAU_0]: [],
    [Pile.TABLEAU_1]: [],
    [Pile.TABLEAU_2]: [],
    [Pile.TABLEAU_3]: makeTableau(Suit.CLUB, 2),
    [Pile.TABLEAU_4]: makeTableau(Suit.DIAMOND, 2),
    [Pile.TABLEAU_5]: makeTableau(Suit.HEART, 2),
    [Pile.TABLEAU_6]: makeTableau(Suit.SPADE, 2)
  };
}

// Transfer a card between 2 piles.
export function transfer(
  src: Pile,
  dst: Pile,
  amt: number,
  revealed?: boolean
) {
  const cards = game.piles[src].splice(-amt);
  // Whomever is calling transfer can specify revealed status
  if (revealed !== undefined) {
    for (const card of cards) card.revealed = revealed;
  }

  if (game.vegas === false) {
    checkKlondikeScore(src, dst, amt);
  }
  if (game.vegas === true) {
    checkVegasScore(src, dst);
  }

  game.piles[dst].push(...cards);

  game.updateVisuals[src]();
  game.updateVisuals[dst]();

  if (game.piles.DECK.length === 0 && game.piles.TALON.length === 0) {
    checkTalonForSolve();
  }

  const hasWon = FoundationPiles.every((f) => game.piles[f].length === 13);
  if (hasWon) TriggerWinAnimation();
}

export function addScore(score: number) {
  game.score += score;
  game.updateScore();
}

export function fullRender() {
  // Get an array of all update functions.
  const updates = Object.values(game.updateVisuals);
  for (const update of updates) {
    update();
  }
  game.updateTimer();
  game.updateScore();
}

export interface Card {
  rank: number;
  suit: Suit;
  revealed: boolean;
}

// Create a brand new, shuffled deck of 52 cards.
function freshDeck() {
  const Deck: Card[] = [];

  const ranksArray = Object.values(Rank);
  const suitsArray = Object.values(Suit);
  for (const rank of ranksArray) {
    for (const suit of suitsArray) {
      const Card = {
        rank: rank,
        suit: suit,
        revealed: false
      };
      Deck.push(Card);
    }
  }

  shuffle(Deck);

  return Deck;
}

function incrementTimer() {
  game.timer++;
  if (game.timer % 10 === 0 && !game.vegas) {
    game.score = game.score - 2;
    game.updateScore();
  }
}

setInterval(() => {
  incrementTimer();
  game.updateTimer();
}, 1000);

function checkKlondikeScore(src: Pile, dst: Pile, amt: number) {
  if (isFoundationPile(dst)) addScore(10);
  if (src === Pile.TALON && isTableauPile(dst)) addScore(5);
  if (isTableauPile(src) && isTableauPile(dst)) addScore(3 * amt);
  if (isFoundationPile(src) && !isFoundationPile(dst)) addScore(-15);
}

function checkVegasScore(src: Pile, dst: Pile) {
  if (isFoundationPile(dst)) addScore(5);
  if (isFoundationPile(src) && !isFoundationPile(dst)) addScore(-5);
}

function checkTalonForSolve(): boolean {
  const isReady = TableauPiles.every((pile) =>
    game.piles[pile].every((card) => card.revealed)
  );
  const autoSolve = document.getElementById("autoSolve");
  autoSolve.style.visibility = "visible";
  return isReady;
}

export function autoSolveClick() {
  const id = setInterval(() => {
    TableauPiles.forEach(autoTransferToFoundation);
    if (TableauPiles.every((p) => game.piles[p].length === 0)) {
      clearInterval(id);
    }
  }, 100);
}
