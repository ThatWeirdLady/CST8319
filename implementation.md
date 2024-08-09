# Change the layout of the page

The new layout should look like this

```
+---------------------+
|  div (header)       |
+---------------------+
+---------------------+
|  div (game)         |
|                     |
|                     |
|                     |
+---------------------+
```

For this part 2 new div will need to be created and appended to the body, with appropriate styling. 
Then `CreateLayout` will need to be passed the game div instead of `document.body`

# Add header placeholders

The header div should contain 2 elements, a score on the left, a newgame button on the right
```
+---------------------+
|Score: 0    new game |
+---------------------+
```

# New game should make a new game

Clicking the `new game` button should run this piece of code

```ts
Object.assign(game, newGame());
```

# Adding optional on click events

We need to add a onClick function to every face-up cards.

The function `createCard`, first argument, called `params` needs to accept a new optional function.

Reminder: optional fields are denoted with question mark

```ts
interface OptionalDemo {
    anOptionalField?: number; // Every value of type `OptionalDemo` has an optional field `anOptionalField`
}
```

and then `createCard` should assign that new field to the html element it creates. In javascript HTMLElements have a `onclick` field of type `() => void`

# on click face up tableau

The tableau is the easiest to start with only the top card will have this special on-click function:

You need to create a function with a closure over a single `Pile`.

When that function is called, it'll check what the first card of that pile is.
- If it's empty, return
- If it's face down, flip it, return
- If it's face up,  
  check if any of the foundations piles have as their top cards the same suit but 1 less, if that's the case, initiate a transfer from the current pile to that tableau spot. `Solitaire.ts > transfer` will help.

# on click face up foundation

The function `renderSimplePile` needs to accept a third argument, the optional on-click function, so it can pass it to `createCard`.

The foundation onclick function should check the following
- If it's empty, return
- If it's not, it'll be face up:  
  For every pile in the tableau, if that pile is not empty and it's top card is face up and that card is an alternating suit and that card has 1 higher rank, initiate a transfer to that pile.

# on click talon

The talon on click function combines both tableau and foundation

- If it's empty, return
  Same foundation check as the function for the tableau.
  Same tableau check as the function for the foundation.

# Score

The game object needs to have a new field called `score` which starts at zero. When clicking new game it should also reset.

In the function transfer a bunch of new conditions need to be checked (at the end of the function)

None of these should `return` as multiple conditions can be true at once.
If the `dst` pile is a Foundation. Add 10 points to the score.
If the the `src` is talon and the `dst` is a tableau, add 5 points.
If the `src` and the `dst` are both tableau, add 3 points multiplied by the number of cards moved.
If the `src` pile is a foundation, remove 15 points.
At the end, console.log the score as it is not visually updated yet.

# Visually display score

`interface Game` needs a new field, a `updateScore: () => void;` field. This will hold what function gets called when the score changes

Go back to where the header div is created, and set the `game.updateScore` field to a new function you create, when that function is created it should have a reference to the `Score: 0` `<p>` element and should modify it's `innerText` to set the value of the new score.

# Score click events

Modify the talon click function so that if it's empty (and therefore the deck refills with all cards), you remove 20 points from the score and call `game.updateScore`.
Modify the tableau click so that turning a card face up adds 5 points.

# Score timer

PLACEHOLDER



