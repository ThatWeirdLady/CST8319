import "./Modal.css";
import {
  addScore,
  fullRender,
  game,
  KlondikePiles,
  NearWinPiles
} from "./Solitaire";

export function OpenNewGameModal() {
  if (document.getElementById("backdrop")) return;
  const backdrop = document.createElement("div");
  backdrop.id = "backdrop";
  backdrop.classList.add("backdrop");

  const onClick = (ev: MouseEvent) => {
    if (ev.target !== backdrop) return;
    onClose();
  };

  const onKeyDown = (ev: KeyboardEvent) => {
    if (ev.key !== "Escape") return;
    onClose();
  };

  const onClose = () => {
    backdrop.removeEventListener("click", onClick);
    document.removeEventListener("keydown", onKeyDown);
    document.body.removeChild(backdrop);
  };
  backdrop.addEventListener("click", onClick);

  document.addEventListener("keydown", onKeyDown);
  document.body.appendChild(backdrop);

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const regular = document.createElement("button");
  regular.innerText = "Klondike";
  regular.classList.add("btn");

  regular.onclick = () => {
    game.piles = KlondikePiles();
    addScore(-game.score);
    game.timer = 0;
    fullRender();
    onClose();
  };
  modal.appendChild(regular);

  const vegas = document.createElement("button");
  vegas.innerText = "Vegas";
  vegas.classList.add("btn");
  modal.appendChild(vegas);

  const nearWin = document.createElement("button");
  nearWin.innerText = "Near win";
  nearWin.classList.add("btn");
  nearWin.onclick = () => {
    game.piles = NearWinPiles();
    addScore(-game.score);
    fullRender();
    onClose();
  };
  modal.appendChild(nearWin);

  backdrop.appendChild(modal);
}
