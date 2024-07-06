import { CardImages } from "./Cards";
import { createSlot } from "./Slot";
import { createCard } from "./utils";
import "./style.css";

document.body.style.backgroundColor = "#307022";

const FoundationContainer = document.createElement("div");
FoundationContainer.style.display = "flex";
FoundationContainer.style.justifyContent = "flex-start";
document.body.appendChild(FoundationContainer);

const slots: HTMLDivElement[] = [];
for (let i = 0; i < 6; i++) {
  const slot = createSlot({ id: `${i}`, parent: FoundationContainer });
  slots.push(slot);
}

createCard({
  id: "C2",
  img: CardImages.C2,
  parent: slots[0],
});

createCard({
  id: "C3",
  img: CardImages.C3,
  parent: slots[1],
});

createCard({
  id: "KH",
  img: CardImages.HKing,
  parent: slots[2],
});
