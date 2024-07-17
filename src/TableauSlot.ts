import { getImage } from "./CardImages";
import { createCard } from "./CardView";
import { Pile } from "./Pile";
import { createGenericSlot } from "./BaseSlot";
import { game } from "./Solitaire";

const cardHeight = 172;
const cardOffset = 30;

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
      depth: pile.length - i
    });
    c0.style.position = "absolute";
    c0.style.top = `${i * cardOffset + cardHeight / 2}px`;
    c0.style.transform = "translate(-50%, -50%)";
  }
}

export function CreateTableauSlot(pile: Pile) {
  const slot = createGenericSlot();
  slot.style.alignItems = "start";
  const anchorDiv = document.createElement("div");
  slot.appendChild(anchorDiv);
  anchorDiv.style.position = "relative";

  game.updateVisuals[pile] = () => renderTableau(pile, slot, anchorDiv);

  return slot;
}
