import "./style.css";
import {
  CreateGameDiv,
  CreateHeaderLayout,
  CreateLayout
} from "./LayoutVisuals";
import { fullRender } from "./Solitaire";

const gameLayout = CreateLayout(CreateGameDiv());
CreateHeaderLayout(document.body);
document.body.appendChild(gameLayout);

fullRender();
