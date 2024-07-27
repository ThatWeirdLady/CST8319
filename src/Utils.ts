import { getImage } from "./CardImages";
import { createCard } from "./CardView";
import { Pile } from "./Pile";
import { game } from "./Solitaire";

// Utility function that takes in any kind of array and shuffles it.
export function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    const tmp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tmp;
  }
}

// render a pile where the only thing that matters is the card on top or nothing at all.
export function renderSimplePile(div: HTMLDivElement, pileName: Pile) {
  div.innerHTML = "";
  const pile = game.piles[pileName];
  const topCard = pile[pile.length - 1];
  if (pile.length) {
    createCard({
      pile: pileName,
      revealed: topCard.revealed,
      img: getImage(topCard),
      parent: div,
      depth: 1
    });
  }
}
