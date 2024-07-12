import { DefaultBackImage } from ".";
import { Pile } from "./Pile";

// Create the function that is called when a card starts to get dragged.
function onDrag(srcPile: Pile) {
  return function (ev: DragEvent) {
    const element = ev.target as HTMLElement;
    // Add data to the event so that the slot knows what is being dropped into it.
    ev.dataTransfer.setData("dragged_element_id", element.id); // Eventually we will not want to pass the ID because the html element should just be destroyed instead.
    ev.dataTransfer.setData("src", srcPile);
  };
}

interface CardParams {
  id: string;
  pile: Pile;
  img: string;
  faceUp: boolean;
  parent?: HTMLElement;
}

// Create a card that can be used as the start of a dragging event to move a card between 2 piles.
export function createCard(params: CardParams) {
  const img = document.createElement("img");
  img.classList.add("card");
  if (params.faceUp == false) img.src = DefaultBackImage;
  if (params.faceUp) img.src = params.img;
  img.id = params.id;

  // Add events
  img.draggable = true;
  img.ondragstart = onDrag(params.pile);
  if (params.parent) {
    params.parent.appendChild(img);
  }
  return img;
}
