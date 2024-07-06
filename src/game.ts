import { Card, freshDeck } from "./Deck";

export const game: Record<string, Card[]> = {
  deck: freshDeck().slice(0, 2),
  talon: [],
  foundation0: [],
  foundation1: [],
  foundation2: [],
  foundation3: [],
};

export function transfer(src: string, dst: string) {
  const card = game[src].pop();
  game[dst].push(card);
}
