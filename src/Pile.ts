export enum Pile {
  DECK = "DECK",
  TALON = "TALON",
  FOUNDATION_0 = "FOUNDATION_0",
  FOUNDATION_1 = "FOUNDATION_1",
  FOUNDATION_2 = "FOUNDATION_2",
  FOUNDATION_3 = "FOUNDATION_3",

  TABLEAU_0 = "TABLEAU_0",
  TABLEAU_1 = "TABLEAU_1",
  TABLEAU_2 = "TABLEAU_2",
  TABLEAU_3 = "TABLEAU_3",
  TABLEAU_4 = "TABLEAU_4",
  TABLEAU_5 = "TABLEAU_5",
  TABLEAU_6 = "TABLEAU_6",
}

export function isPile(p: unknown): p is Pile {
  return Object.values(Pile).some((v) => v === p);
}
