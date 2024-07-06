function allowDrop(ev: DragEvent) {
  let el = ev.target as HTMLElement;
  while (el.tagName === "IMG") el = el.parentElement;
  if (el.children.length === 0) ev.preventDefault(); // preventing default does let you drop it there.
}

function drop(ev: DragEvent) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("dragged_element_id");
  if (!data) {
    console.error("no dragged_element_id set");
    return;
  }
  let el = ev.target as HTMLElement;
  el.appendChild(document.getElementById(data));
}

interface SlotParams {
  id: string;
  parent?: HTMLElement;
}

export function createSlot(params: SlotParams) {
  const slot = document.createElement("div");
  slot.classList.add("slot");

  slot.id = params.id;
  if (params.parent) {
    params.parent.appendChild(slot);
  }

  //on drag events
  slot.ondrop = drop;
  slot.ondragover = allowDrop;
  return slot;
}
