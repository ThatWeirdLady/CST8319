import { drawType } from "./drawType";
import "./Modal.css";
import {
  fullRender,
  KlondikePiles,
  NearWinPiles,
  startNewGame
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

  const drawOne = document.createElement("input");
  drawOne.type = "radio";
  drawOne.name = "drawType";
  drawOne.id = drawType.drawOne;
  drawOne.checked = true;

  const drawOneLabel = document.createElement("label");

  drawOneLabel.setAttribute("for", drawType.drawOne);
  drawOneLabel.innerHTML = `<p style="font-size: 24px; margin-right: 32px">Draw One</p>`;
  const drawThreeLabel = document.createElement("label");
  drawThreeLabel.setAttribute("for", drawType.drawThree);
  drawThreeLabel.innerHTML = `<p style="font-size: 24px">Draw Three</p>`;

  const drawThree = document.createElement("input");
  drawThree.type = "radio";
  drawThree.name = "drawType";
  drawThree.id = drawType.drawThree;

  const drawBox = document.createElement("div");
  drawBox.style.display = "flex";
  drawBox.style.justifyContent = "center";

  drawBox.appendChild(drawOne);
  drawBox.appendChild(drawOneLabel);
  drawBox.appendChild(drawThree);
  drawBox.appendChild(drawThreeLabel);
  modal.appendChild(drawBox);
  modal.appendChild(document.createElement("br"));

  function whichDrawType() {
    if (drawOne.checked) return drawType.drawOne;
    else return drawType.drawThree;
  }

  regular.onclick = () => {
    startNewGame({
      drawType: whichDrawType(),
      piles: KlondikePiles()
    });
    fullRender();
    onClose();
  };
  modal.appendChild(regular);

  const vegas = document.createElement("button");
  vegas.innerText = "Vegas";
  vegas.classList.add("btn");
  vegas.onclick = () => {
    startNewGame({
      drawType: whichDrawType(),
      piles: KlondikePiles(),
      vegas: true,
      score: -52
    });
    fullRender();
    onClose();
  };
  modal.appendChild(vegas);

  const nearWin = document.createElement("button");
  nearWin.innerText = "Near win";
  nearWin.classList.add("btn");
  nearWin.onclick = () => {
    startNewGame({
      piles: NearWinPiles(),
      drawType: whichDrawType()
    });
    fullRender();
    onClose();
  };
  modal.appendChild(nearWin);

  backdrop.appendChild(modal);
}
