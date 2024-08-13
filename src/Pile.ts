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
  TABLEAU_6 = "TABLEAU_6"
}

export const FoundationPiles = [
  Pile.FOUNDATION_0,
  Pile.FOUNDATION_1,
  Pile.FOUNDATION_2,
  Pile.FOUNDATION_3
];

export const TableauPiles = [
  Pile.TABLEAU_0,
  Pile.TABLEAU_1,
  Pile.TABLEAU_2,
  Pile.TABLEAU_3,
  Pile.TABLEAU_4,
  Pile.TABLEAU_5,
  Pile.TABLEAU_6
];

// Checks if variable is a valid Pile
export function isPile(p: unknown): p is Pile {
  return Object.values(Pile).some((v) => v === p);
}

export function isFoundationPile(pile: Pile): boolean {
  for (const f of FoundationPiles) {
    if (f === pile) return true;
  }
  return false;
}

export function isTableauPile(pile: Pile): boolean {
  for (const t of TableauPiles) {
    if (t === pile) return true;
  }
  return false;
}
