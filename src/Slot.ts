import { updateVisuals } from ".";
import { game, transfer } from "./Game";
import { isPile, Pile } from "./Pile";

// Allows drop on a slot(target) if there is not currently a card there
// will have to create different rules for each pile.
function checkAllowedDrop(dst: Pile) {
  return function (ev: DragEvent) {
    if (game.piles[dst].length === 0) ev.preventDefault(); // if the destination pile has no card allow the drop.
  };
}

// onDrop creates the function that is attached to slots to determine what happens when a card is dropped into said slot.
function onDrop(dst: Pile) {
  return function (ev: DragEvent) {
    ev.preventDefault();
    const elId = ev.dataTransfer.getData("dragged_element_id");
    const src = ev.dataTransfer.getData("src") as Pile;
    if (!isPile(src)) return;
    if (!elId) {
      console.error("no dragged_element_id set");
      return;
    }

    // const el = ev.target as HTMLElement;
    // el.appendChild(document.getElementById(elId));

    transfer(src, dst);
    updateVisuals();
  };
}

interface SlotParams {
  id: string;
  pile: Pile;
  parent?: HTMLElement;
}

// Create drag n drop slots, these slots only exists for debug purposes for now.
export function createDnDSlot(params: SlotParams) {
  const slot = createGenericSlot(params);

  // add drag events
  slot.ondrop = onDrop(params.pile);
  slot.ondragover = checkAllowedDrop(params.pile);
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
