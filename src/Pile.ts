export enum Pile {
  DECK = "DECK",
  TALON = "TALON",
  FOUNDATION_0 = "FOUNDATION_0",
  FOUNDATION_1 = "FOUNDATION_1",
  FOUNDATION_2 = "FOUNDATION_2",
  FOUNDATION_3 = "FOUNDATION_3",
}

export function isPile(p: any): p is Pile {
  return Object.values(Pile).includes(p);
}
