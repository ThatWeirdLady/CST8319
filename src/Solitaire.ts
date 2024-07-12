import { Card, freshDeck } from "./Deck";
import { Pile } from "./Pile";

// Defining a game so each spot has a location.
export const game = newGame();

console.log(game);
interface Game {
  piles: Record<Pile, Card[]>;
  updateVisuals: Record<Pile, () => void>;
}

function revealLast(pile: Card[]): Card[] {
  pile[pile.length - 1].revealed = true;
  return pile;
}

function newGame(): Game {
  const deck = freshDeck();
  return {
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
      [Pile.DECK]: () => undefined,

      // Also known as the "waste" pile. Cards go here after being flipped from the deck pile.
      [Pile.TALON]: () => undefined,

      // The 4 piles where the Aces go first.
      [Pile.FOUNDATION_0]: () => undefined,
      [Pile.FOUNDATION_1]: () => undefined,
      [Pile.FOUNDATION_2]: () => undefined,
      [Pile.FOUNDATION_3]: () => undefined,

      [Pile.TABLEAU_0]: () => undefined,
      [Pile.TABLEAU_1]: () => undefined,
      [Pile.TABLEAU_2]: () => undefined,
      [Pile.TABLEAU_3]: () => undefined,
      [Pile.TABLEAU_4]: () => undefined,
      [Pile.TABLEAU_5]: () => undefined,
      [Pile.TABLEAU_6]: () => undefined
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
  console.log(game);
  for (const update of Object.values(game.updateVisuals)) {
    update();
  }
}
