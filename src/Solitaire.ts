import { shuffle } from "./Utils";
import { Pile } from "./Pile";
import { Rank } from "./Rank";
import { Suit } from "./CardSuit";
import { BackImages } from "./CardImages";

export const game = newGame();

interface DragData {
  src: Pile;
  amt: number;
}

interface Game {
  backImage: string;
  piles: Record<Pile, Card[]>;
  updateVisuals: Record<Pile, () => void>;
  currentDrag?: DragData;
}

// reveal the last card of a pile and return the pile, used for Tableau initialization.
function revealLast(pile: Card[]): Card[] {
  pile[pile.length - 1].revealed = true;
  return pile;
}

// declare this so we can use it as default use case for updateVisuals
function doNothing() {}

function newGame(): Game {
  const deck = freshDeck();
  return {
    backImage: BackImages.Blue,
    piles: {
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
    },

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
}

// Transfer a card between 2 piles.
export function transfer(src: Pile, dst: Pile, revealed?: boolean) {
  const card = game.piles[src].pop();
  // Whomever is calling transfer can specify revealed status
  if (revealed !== undefined) {
    card.revealed = revealed;
  }

  game.piles[dst].push(card);

  game.updateVisuals[src]();
  game.updateVisuals[dst]();
}

export function fullRender() {
  // Get an array of all update functions.
  const updates = Object.values(game.updateVisuals);
  for (const update of updates) {
    update();
  }
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
