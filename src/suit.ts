export enum Suit {
  HEART,
  SPADE,
  DIAMOND,
  CLUB,
}

const black = [Suit.CLUB, Suit.SPADE];
const red = [Suit.HEART, Suit.DIAMOND];

export const isAlternating = (a: Suit, b: Suit) =>
  red.includes(a) ? black.includes(b) : red.includes(b);
