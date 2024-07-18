# Done

| 1 |configure repo (add teammates etc) 

| 1 |install ts 

| 1 |install webpack 

| 1 |install eslint 

| 1 |install prettier 

| 3 |make github actions build on PR and push to main 

| 3 |make github actions deploy on PR and push to main 

| 3 |make github actions eslint on PR and push to main 

| 3 |make github actions prettier on PR and push to main

| 5 |Implement generic onDrag, onDrop, and onDragOver

| 1 |Import images

| 3 |Create empty Card Slot

| 3 |Create draggable card image which save card information via image id.

| 1 |Move card via image between slots via onDrag/onDrop.

| 5 |Create Piles to separate UI from Game.

| 3 |Modify drag mechanism to use piles instead of image id.

| 1 |Create Deck slot which holds all cards.

| 1 |Create Talon slot which holds discard pile.

| 1 |Create Foundation that can accept literally any card.

| 3 |Create Tableau demo visuals containing references to card that do not exist.

| 1 |Add onClick for the deck.

| 1 |Fix bug where game crash when deck is clicked and empty.

| 3 |Have slots register function to update it's UI instead of re-rendering the whole page each transfer.

| 3 |Add function parameters to slot onDragOver to allow flexible drag events.

| 1 |Splice initial deck so that tableau contains real cards.

| 3 |Render Tableau to use game pile instead of random images.

| 5 |Enforce Foundation slot to only accept cards that follow the rules of the game.

| 3 |Refactor.

# To-Do

| 3 |Refactor CardView to accept a optional onDrag parameter which determines what happens when the card is dragged.

| 3 |Add an optional onClick parameters to CardView which determines what happens when the card is clicked.

| 1 |transfer should accept a number of card and move that many cards.

| 1 |Tableau should only allow drag of revealed cards.

| 5 |Tableau should allow drop of card pile when the deepest card is alternating suit with the top card of the tableau and descending rank.

| 1 |Tableau first unrevealed card should be clickable to reveal if it's on top.

| 1 |Empty Slot in Tableau should accept kings.

| 5 |Talon should display up to 3 of the last cards offset to the right when available.

| 5 |Upon completing all foundation piles. The game should spawn cards cards at random on the screen.

| 1 |Navbar should be displayed.

| 1 |Navbar should have a button to start a new game.

| 3 |Navbar should include the score.

| 3 |Navbar needs to display a timer.

| 1 |Navbar should have a dropdown to change the back image.

| 3 |Navbar should have a button to enable vegas mode.

| 5 |Clicking a card in the tableau should automatically place it in the appropriate foundation if available.

