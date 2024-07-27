import { renderSimplePile } from "./Utils";
import { Pile } from "./Pile";
import { createGenericSlot } from "./BaseSlot";
import { game } from "./Solitaire";

export function CreateTalonSlot() {
  const slot = createGenericSlot();

  // assigns/registers function to call when something changes in the Deck
  game.updateVisuals[Pile.TALON] = () => renderSimplePile(slot, Pile.TALON);

  return slot;
}
