import "./style.css";
import { CreatePageLayout, solitaireGreen } from "./LayoutVisuals";
import { fullRender } from "./Solitaire";

document.body.appendChild(CreatePageLayout());
document.body.style.backgroundColor = solitaireGreen;

fullRender();
