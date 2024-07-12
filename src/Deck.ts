import { Rank } from "./ranks";
import { Suit } from "./suit";

export interface Card {
  rank: number;
  suit: Suit;
  revealed: boolean;
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

  const ranksArray = Object.values(Rank);
  const suitsArray = Object.values(Suit);
  for (const rank of ranksArray) {
    for (const suit of suitsArray) {
      const Card = {
        rank: rank,
        suit: suit,
        revealed: false
      };
      Deck.push(Card);
    }
  }

  shuffle(Deck);

  return Deck;
}
