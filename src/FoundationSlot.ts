import { renderSimplePile } from "./Utils";
import { Card } from "./Solitaire";
import { Pile } from "./Pile";
import { Rank } from "./Rank";
import { createDnDSlot } from "./BaseSlot";
import { game } from "./Solitaire";

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

export function CreateFoundationSlot(pile: Pile) {
  const slot = createDnDSlot({
    pile: pile,
    allowDrop: isAllowedOnFoundation
  });

  game.updateVisuals[pile] = () => renderSimplePile(slot, pile);

  return slot;
}
