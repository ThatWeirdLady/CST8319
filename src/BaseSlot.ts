import { game, transfer } from "./Solitaire";
import { isPile, Pile } from "./Pile";
import { Card } from "./Solitaire";

export type AllowedConditionFunction = (pile: Card[], add: Card[]) => boolean;

function CreateOnDragOver(dst: Pile, allowDrop: AllowedConditionFunction) {
  /* When CreateOnDragOver is called it creates a function onDragOver that keeps reference of dst and allowDrop.
 Every time CreateOnDragOver is called, dst is different, allowDrop can be different and allowDrop is given different arguments depending on the destination and the cards to add */
  function onDragOver(ev: DragEvent) {
    const srcPileName = ev.dataTransfer.getData("src");
    if (!isPile(srcPileName)) return;
    const srcAmt = parseInt(ev.dataTransfer.getData("amt"));
    const srcPileArray = game.piles[srcPileName];
    const add = srcPileArray.slice(-srcAmt);

    if (allowDrop(game.piles[dst], add)) ev.preventDefault();
  }

  return onDragOver;
}

function CreateOnDropForDst(dst: Pile) {
  // Every time CreateOnDropForDst is called (CreateDnDSlot) it creates a new onDrop and onDrop has a reference to the variable(dst)
  // This allows dst to be dynamic. It is a new onDrop and new dst every time CreateOnDropForDst is called.
  function onDrop(ev: DragEvent) {
    ev.preventDefault();
    const src = ev.dataTransfer.getData("src");
    if (!isPile(src)) return;

    transfer(src, dst);
  }

  return onDrop;
}

interface SlotParams {
  pile: Pile;
  allowDrop: AllowedConditionFunction;
}

// Create drag n drop slots, these slots only exists for debug purposes for now.
export function createDnDSlot(params: SlotParams) {
  const slot = createGenericSlot();

  // add drag events
  slot.ondrop = CreateOnDropForDst(params.pile);
  slot.ondragover = CreateOnDragOver(params.pile, params.allowDrop);
  return slot;
}

// Create the visual element for slots. The event handling has to be added after.
export function createGenericSlot() {
  const slot = document.createElement("div");
  slot.classList.add("slot");

  return slot;
}
