import { Card, freshDeck } from "./Deck";
import { Pile } from "./Pile";

// Defining a game so each spot has a location.
export const game = newGame();

interface Game {
  piles: Record<Pile, Card[]>;
}

function newGame(): Game {
  return {
    piles: {
      // Contains all unused cards.
      [Pile.DECK]: freshDeck().slice(0, 3),

      // Also known as the "waste" pile. Cards go here after being flipped from the deck pile.
      [Pile.TALON]: [],

      // The 4 piles where the Aces go first.
      [Pile.FOUNDATION_0]: [],
      [Pile.FOUNDATION_1]: [],
      [Pile.FOUNDATION_2]: [],
      [Pile.FOUNDATION_3]: [],

      [Pile.TABLEAU_0]: [],
      [Pile.TABLEAU_1]: [],
      [Pile.TABLEAU_2]: [],
      [Pile.TABLEAU_3]: [],
      [Pile.TABLEAU_4]: [],
      [Pile.TABLEAU_5]: [],
      [Pile.TABLEAU_6]: []
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
}
