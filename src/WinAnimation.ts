import { FrontImages } from "./CardImages";
import { Suit } from "./CardSuit";

import { Rank } from "./Rank";

export function TriggerWinAnimation() {
  const cardHolder = document.createElement("div");
  cardHolder.classList.add("backdrop");
  document.body.appendChild(cardHolder);

  const renderNextFrame = (ts: DOMHighResTimeStamp) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const img = document.createElement("img");
    img.classList.add("card");
    const suit = Object.values(Suit)[Math.floor(Math.random() * 4)];
    const rank = Object.values(Rank)[Math.floor(Math.random() * 13)];

    img.src = FrontImages[suit + rank];
    img.style.position = "absolute";

    const dx = ts / 1200;
    let px = 0;
    if (Math.floor(dx) % 2 === 0) {
      px = 1 - (dx % 1);
    } else {
      px = dx % 1;
    }
    img.style.left = `${px * width}px`;
    img.style.top = `${height - Math.abs(Math.cos(ts / 300) * height)}px`;

    document.body.appendChild(img);
    requestAnimationFrame(renderNextFrame);
  };

  requestAnimationFrame(renderNextFrame);
}
