import { FrontImages } from "./CardImages";

export interface Card {
  id: string;
  img: string;
}

function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export function freshDeck() {
  const Deck: Card[] = [];
  for (const entry of Object.entries(FrontImages)) {
    let Card = { id: entry[0], img: entry[1] };
    Deck.push(Card);
  }
  shuffle(Deck);
  return Deck;
}
