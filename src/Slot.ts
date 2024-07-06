import { updateTalon } from ".";
import { transfer } from "./game";

function allowDrop(ev: DragEvent) {
  let el = ev.target as HTMLElement;
  while (el.tagName === "IMG") el = el.parentElement;
  if (el.children.length === 0) ev.preventDefault(); // preventing default does let you drop it there.
}

function onDrop(dst: string) {
  return function drop(ev: DragEvent) {
    ev.preventDefault();
    var elId = ev.dataTransfer.getData("dragged_element_id");
    var src = ev.dataTransfer.getData("src");
    if (!elId) {
      console.error("no dragged_element_id set");
      return;
    }
    let el = ev.target as HTMLElement;
    el.appendChild(document.getElementById(elId));
    transfer(src, dst);
    updateTalon();
  };
}

interface SlotParams {
  id: string;
  pile: string;
  parent?: HTMLElement;
}

export function createDnDSlot(params: SlotParams) {
  const slot = createGenericSlot(params);

  //on drag events
  slot.ondrop = onDrop(params.pile);
  slot.ondragover = allowDrop;
  return slot;
}

export function createGenericSlot(params: SlotParams) {
  const slot = document.createElement("div");
  slot.classList.add("slot");

  slot.id = params.id;
  if (params.parent) {
    params.parent.appendChild(slot);
  }

  return slot;
}
