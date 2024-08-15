import { Pile } from "./Pile";
import { createGenericSlot } from "./BaseSlot";
import { game } from "./Solitaire";
import { cardHeight, cardOffset, cardWidth } from "./TableauSlot";
import { createCard } from "./CardView";
import { getImage } from "./CardImages";
import { onClickCard } from "./autoClick";

function renderTalon(
  pileName: Pile,
  slot: HTMLDivElement,
  anchorDiv: HTMLDivElement
) {
  const pile = game.piles[pileName];
  anchorDiv.innerHTML = "";
  slot.style.width = `${cardWidth + 2 * cardOffset}px`;
  const renderCards = pile.slice(-3);
  for (let i = 0; i < renderCards.length; i++) {
    const c0 = createCard({
      pile: pileName,
      img: getImage(renderCards[i]),
      revealed: renderCards[i].revealed,
      parent: anchorDiv,
      depth: renderCards.length - i,
      onclick: () => onClickCard(pileName)
    });
    c0.style.position = "absolute";
    c0.style.top = `${cardHeight / 2}px`;
    c0.style.left = `${(i + 1) * cardOffset - cardWidth / 2}px`;

    c0.style.transform = "translate(-50%, -50%)";
  }
}

export function CreateTalonSlot() {
  const slot = createGenericSlot();

  slot.style.alignItems = "start";
  const anchorDiv = document.createElement("div");
  slot.appendChild(anchorDiv);
  anchorDiv.style.position = "relative";

  // assigns/registers function to call when something changes in the Deck
  game.updateVisuals[Pile.TALON] = () =>
    renderTalon(Pile.TALON, slot, anchorDiv);

  return slot;
}
