import { game, transfer } from "./Solitaire";
import { isPile, Pile } from "./Pile";
import { Card } from "./Deck";

export type AllowedConditionFunction = (pile: Card[], add: Card[]) => boolean;

// Allows drop on a slot(target) if there is not currently a card there
// will have to create different rules for each pile.
function checkAllowedDrop(dst: Pile, allowDrop: AllowedConditionFunction) {
  return function (ev: DragEvent) {
    const srcPileName = ev.dataTransfer.getData("src") as Pile;
    const srcAmt = parseInt(ev.dataTransfer.getData("amt"));
    const srcPileArray = game.piles[srcPileName];
    const add = srcPileArray.slice(-srcAmt);

    if (allowDrop(game.piles[dst], add)) ev.preventDefault();
  };
}

// onDrop creates the function that is attached to slots to determine what happens when a card is dropped into said slot.
function onDrop(dst: Pile) {
  return function (ev: DragEvent) {
    ev.preventDefault();
    const src = ev.dataTransfer.getData("src") as Pile;
    if (!isPile(src)) return;

    transfer(src, dst);
  };
}

interface SlotParams {
  id: string;
  pile: Pile;
  allowDrop: AllowedConditionFunction;
  parent?: HTMLElement;
}

// Create drag n drop slots, these slots only exists for debug purposes for now.
export function createDnDSlot(params: SlotParams) {
  const slot = createGenericSlot(params);

  // add drag events
  slot.ondrop = onDrop(params.pile);
  slot.ondragover = checkAllowedDrop(params.pile, params.allowDrop);
  return slot;
}

// Create the visual element for slots. The event handling has to be added after.
export function createGenericSlot(params: SlotParams) {
  const slot = document.createElement("div");
  slot.classList.add("slot");

  slot.id = params.id;
  if (params.parent) {
    params.parent.appendChild(slot);
  }

  return slot;
}
