import { Pile } from "./Pile";
import { game } from "./Solitaire";

// Create the function that is called when a card starts to get dragged.
function onDrag(srcPile: Pile, amountOfCards: number) {
  return function (ev: DragEvent) {
    // Add data to the event so that the slot knows what is being dropped into it.
    ev.dataTransfer.setData("src", srcPile);
    ev.dataTransfer.setData("amt", String(amountOfCards));
  };
}

interface CardParams {
  pile: Pile;
  depth: number;
  img: string;
  revealed: boolean;
  parent?: HTMLElement;
}

// Create a card that can be used as the start of a dragging event to move a card between 2 piles.
export function createCard(params: CardParams) {
  const img = document.createElement("img");
  img.classList.add("card");
  if (!params.revealed) img.src = game.backImage;
  else img.src = params.img;

  // Add events
  img.draggable = true;
  img.ondragstart = onDrag(params.pile, params.depth);
  if (params.parent) {
    params.parent.appendChild(img);
  }
  return img;
}
