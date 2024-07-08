export enum Suit {
  HEART,
  SPADE,
  DIAMOND,
  CLUB,
}

export const blackSuits = [Suit.CLUB, Suit.SPADE];
export const redSuits = [Suit.HEART, Suit.DIAMOND];

// Check if suits are alternating colors.
export const isAlternating = (a: Suit, b: Suit) =>
  redSuits.includes(a) ? blackSuits.includes(b) : redSuits.includes(b);
