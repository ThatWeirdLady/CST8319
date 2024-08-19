import { renderSimplePile } from "./Utils";
import { Pile } from "./Pile";
import { createGenericSlot } from "./BaseSlot";
import { addScore, fullRender, game, transfer } from "./Solitaire";
import { drawType } from "./drawType";
function maxVegasPass() {
  if (game.drawType === drawType.drawOne) return 1;
  else return 3;
}
function onDeckSlotClick() {
  // if there are cards in the deck..
  if (game.piles[Pile.DECK].length !== 0) {
    // transfer from the deck to the talon, reveal the card
    if (game.drawType === drawType.drawThree)
      transfer(Pile.DECK, Pile.TALON, 3, true);
    else transfer(Pile.DECK, Pile.TALON, 1, true);
  } else {
    if (game.vegas && game.deckPass >= maxVegasPass()) return;
    game.deckPass++;
    const talon = game.piles[Pile.TALON];
    game.piles[Pile.TALON] = game.piles[Pile.DECK];
    game.piles[Pile.DECK] = talon.reverse();
    game.piles[Pile.DECK].forEach((card) => (card.revealed = false));
    if (!game.vegas) {
      if (game.deckPass > 4 && game.drawType == drawType.drawThree)
        addScore(-20);
      if (game.deckPass > 1 && game.drawType == drawType.drawOne)
        addScore(-100);
    }
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
