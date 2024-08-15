import { getImage } from "./CardImages";
import { createCard } from "./CardView";
import { Pile } from "./Pile";
import { createDnDSlot } from "./BaseSlot";
import { Card, game } from "./Solitaire";
import { Rank } from "./Rank";
import { isAlternating } from "./CardSuit";
import { onClickCard } from "./autoClick";

export const cardHeight = 172;
export const cardWidth = 121;
export const cardOffset = 30;

function renderTableau(
  pileName: Pile,
  slot: HTMLDivElement,
  anchorDiv: HTMLDivElement
) {
  const pile = game.piles[pileName];
  anchorDiv.innerHTML = "";
  slot.style.height = `${cardHeight + Math.max(0, pile.length - 1) * cardOffset}px`;
  for (let i = 0; i < pile.length; i++) {
    const c0 = createCard({
      pile: pileName,
      img: getImage(pile[i]),
      revealed: pile[i].revealed,
      parent: anchorDiv,
      depth: pile.length - i,
      onclick: () => onClickCard(pileName)
    });
    c0.style.position = "absolute";
    c0.style.top = `${i * cardOffset + cardHeight / 2}px`;
    c0.style.transform = "translate(-50%, -50%)";
  }
}

function isAllowedOnTableau(pile: Card[], add: Card[]): boolean {
  const firstCard = add[0];

  if (pile.length === 0) {
    return firstCard.rank === Rank.King;
  }
  const topCard = pile[pile.length - 1];
  if (pile.length !== 0) {
    return (
      firstCard.rank === topCard.rank - 1 &&
      isAlternating(firstCard.suit, topCard.suit)
    );
  }
  return false;
}

export function CreateTableauSlot(pile: Pile) {
  const slot = createDnDSlot({ pile: pile, allowDrop: isAllowedOnTableau });

  slot.style.alignItems = "start";
  const anchorDiv = document.createElement("div");
  slot.appendChild(anchorDiv);
  anchorDiv.style.position = "relative";

  game.updateVisuals[pile] = () => renderTableau(pile, slot, anchorDiv);

  return slot;
}
