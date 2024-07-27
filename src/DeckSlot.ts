import { renderSimplePile } from "./Utils";
import { Pile } from "./Pile";
import { createGenericSlot } from "./BaseSlot";
import { fullRender, game, transfer } from "./Solitaire";

function onDeckSlotClick() {
  // if there are cards in the deck..
  if (game.piles[Pile.DECK].length !== 0) {
    // transfer from the deck to the talon, reveal the card
    transfer(Pile.DECK, Pile.TALON, 1, true);
  } else {
    // if no cards in deck, refill the deck
    const talon = game.piles[Pile.TALON];
    game.piles[Pile.TALON] = game.piles[Pile.DECK];
    // Use reverse to flip the order of the deck
    game.piles[Pile.DECK] = talon.reverse();
    // Equivalent  of a for loop, hide all cards
    game.piles[Pile.DECK].forEach((card) => (card.revealed = false));
    // Call fullRender() because we don't have a way of doing this cleanly
    fullRender();
  }
}

export function CreateDeckSlot() {
  //Creates DeckSlot inside container given
  const slot = createGenericSlot();
  // set up deck onClick event
  slot.onclick = onDeckSlotClick;
  // assigns/registers function to call when something changes in the Deck
  game.updateVisuals[Pile.DECK] = () => renderSimplePile(slot, Pile.DECK);

  return slot;
}
