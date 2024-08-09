# Remaining tasks

- User must be able to start a new game, thus receiving a freshly shuffled deck of cards
- Clicking/tapping a card will auto-stack it if an appropriate spot is available
- A working scoring system
  
  10 points for each card moved to a foundation stack.  
  5 points for each card moved from the talon to a tableau stack.  
  5 points for each card turned face-up in a tableau stack.  
  3 points for each card moved from one tableau stack to another.  
  -15 points for each card moved from a foundation stack to a tableau stack.  
  -20 points for each pass through the deck.  
  -2 points for each 10 seconds elapsed during a timed game.  

    
- Vegas rules should be available as additional game mode.
  It costs $52 to play a game of Vegas.  
  Each time a card is moved INTO the foundation, you gain $5.  
  Each time a card is moved FROM the foundation, you lose $5.  
  Therefore we can simply calculate our winning with the following equation:  
  `num_card_in_foundation * 5 = total_earnings` and that can be recalculated every time a card moves.
  Time does not play a factor
  Score does not play a factor.
  The talon cannot be reshuffled into the deck, but the game does not end (otherwise you'd never be able to place the last card)

