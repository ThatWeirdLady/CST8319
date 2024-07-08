import { FrontImages } from "./CardImages";

export interface Card {
  id: string;
  img: string;
}

// Utility function that takes in any kind of array and shuffles it.
function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    const tmp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tmp;
  }
}

// Create a brand new, shuffled deck of 52 cards.
export function freshDeck() {
  const Deck: Card[] = [];
  for (const entry of Object.entries(FrontImages)) {
    const Card = { id: entry[0], img: entry[1] };
    Deck.push(Card);
  }

  shuffle(Deck);

  return Deck;
}
