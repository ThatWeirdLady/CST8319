import { isAlternating } from "./CardSuit";
import { FoundationPiles, Pile, TableauPiles } from "./Pile";
import { Rank } from "./Rank";
import { game, transfer } from "./Solitaire";

export function onClickCard(pileName: Pile): boolean {
  if (autoTransferToFoundation(pileName)) return;
  if (autoTransferToTableau(pileName)) return;
}

function autoTransferToTableau(pileName: Pile): boolean {
  const talon = game.piles[pileName];
  const talonLastCard = talon[talon.length - 1];

  for (const tabl of TableauPiles) {
    const tableau = game.piles[tabl];
    if (!tableau.length) {
      if (talonLastCard.rank === Rank.King) {
        transfer(pileName, tabl, 1, true);
        return true;
      }
      continue;
    }

    const tablLastCard = tableau[tableau.length - 1];
    if (
      talonLastCard.rank === tablLastCard.rank - 1 &&
      isAlternating(talonLastCard.suit, tablLastCard.suit)
    ) {
      transfer(pileName, tabl, 1, true);
      return true;
    }
  }

  return false;
}

function autoTransferToFoundation(pileName: Pile): boolean {
  const pile = game.piles[pileName];
  if (pile.length === 0) return false;

  const pileLastCard = pile[pile.length - 1];
  if (!pileLastCard.revealed) {
    pileLastCard.revealed = true;
    game.updateVisuals[pileName]();
    return true;
  }

  for (const fpile of FoundationPiles) {
    const foundation = game.piles[fpile];

    if (foundation.length === 0 && pileLastCard.rank === Rank.Ace) {
      transfer(pileName, fpile, 1, true);
      return true;
    }
    if (foundation.length === 0) continue;

    const foundationLastCard = foundation[foundation.length - 1];
    if (foundationLastCard.suit != pileLastCard.suit) continue;

    if (
      foundationLastCard.suit === pileLastCard.suit &&
      foundationLastCard.rank === pileLastCard.rank - 1
    ) {
      transfer(pileName, fpile, 1, true);
      return true;
    }
  }

  return false;
}
