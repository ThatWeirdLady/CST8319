function onDrag(src: string) {
  return function drag(ev: DragEvent) {
    const element = ev.target as HTMLElement;
    ev.dataTransfer.setData("dragged_element_id", element.id);
    ev.dataTransfer.setData("src", src);
  };
}

interface CardParams {
  id: string;
  pile: string;
  img: string;
  parent?: HTMLElement;
}

export function createCard(params: CardParams) {
  const img = document.createElement("img");
  img.classList.add("card");
  img.src = params.img;
  img.id = params.id;
  img.draggable = true;
  img.ondragstart = onDrag(params.pile);
  if (params.parent) {
    params.parent.appendChild(img);
  }
  return img;
}
