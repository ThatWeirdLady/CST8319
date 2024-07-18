// Import all front images.
import CLUB10 from "./cards/front/clubs_10.svg";
import CLUB2 from "./cards/front/clubs_2.svg";
import CLUB3 from "./cards/front/clubs_3.svg";
import CLUB4 from "./cards/front/clubs_4.svg";
import CLUB5 from "./cards/front/clubs_5.svg";
import CLUB6 from "./cards/front/clubs_6.svg";
import CLUB7 from "./cards/front/clubs_7.svg";
import CLUB8 from "./cards/front/clubs_8.svg";
import CLUB9 from "./cards/front/clubs_9.svg";
import CLUB1 from "./cards/front/clubs_ace.svg";
import CLUB11 from "./cards/front/clubs_jack.svg";
import CLUB13 from "./cards/front/clubs_king.svg";
import CLUB12 from "./cards/front/clubs_queen.svg";
import DIAMOND10 from "./cards/front/diamonds_10.svg";
import DIAMOND2 from "./cards/front/diamonds_2.svg";
import DIAMOND3 from "./cards/front/diamonds_3.svg";
import DIAMOND4 from "./cards/front/diamonds_4.svg";
import DIAMOND5 from "./cards/front/diamonds_5.svg";
import DIAMOND6 from "./cards/front/diamonds_6.svg";
import DIAMOND7 from "./cards/front/diamonds_7.svg";
import DIAMOND8 from "./cards/front/diamonds_8.svg";
import DIAMOND9 from "./cards/front/diamonds_9.svg";
import DIAMOND1 from "./cards/front/diamonds_ace.svg";
import DIAMOND11 from "./cards/front/diamonds_jack.svg";
import DIAMOND13 from "./cards/front/diamonds_king.svg";
import DIAMOND12 from "./cards/front/diamonds_queen.svg";
import HEART10 from "./cards/front/hearts_10.svg";
import HEART2 from "./cards/front/hearts_2.svg";
import HEART3 from "./cards/front/hearts_3.svg";
import HEART4 from "./cards/front/hearts_4.svg";
import HEART5 from "./cards/front/hearts_5.svg";
import HEART6 from "./cards/front/hearts_6.svg";
import HEART7 from "./cards/front/hearts_7.svg";
import HEART8 from "./cards/front/hearts_8.svg";
import HEART9 from "./cards/front/hearts_9.svg";
import HEART1 from "./cards/front/hearts_ace.svg";
import HEART11 from "./cards/front/hearts_jack.svg";
import HEART13 from "./cards/front/hearts_king.svg";
import HEART12 from "./cards/front/hearts_queen.svg";
import SPADE10 from "./cards/front/spades_10.svg";
import SPADE2 from "./cards/front/spades_2.svg";
import SPADE3 from "./cards/front/spades_3.svg";
import SPADE4 from "./cards/front/spades_4.svg";
import SPADE5 from "./cards/front/spades_5.svg";
import SPADE6 from "./cards/front/spades_6.svg";
import SPADE7 from "./cards/front/spades_7.svg";
import SPADE8 from "./cards/front/spades_8.svg";
import SPADE9 from "./cards/front/spades_9.svg";
import SPADE1 from "./cards/front/spades_ace.svg";
import SPADE11 from "./cards/front/spades_jack.svg";
import SPADE13 from "./cards/front/spades_king.svg";
import SPADE12 from "./cards/front/spades_queen.svg";

// Import all back images.
import Abstract from "./cards/backs/abstract.svg";
import AbstractClouds from "./cards/backs/abstract_clouds.svg";
import AbstractScene from "./cards/backs/abstract_scene.svg";
import Astronaut from "./cards/backs/astronaut.svg";
import Blue from "./cards/backs/blue.svg";
import Blue2 from "./cards/backs/blue2.svg";
import Cars from "./cards/backs/cars.svg";
import Castle from "./cards/backs/castle.svg";
import Fish from "./cards/backs/fish.svg";
import Frog from "./cards/backs/frog.svg";
import Red from "./cards/backs/red.svg";
import Red2 from "./cards/backs/red2.svg";
import { Card } from "./Solitaire";

// Create an object with all card front images for easy access.
const FrontImages: Record<string, string> = {
  CLUB10,
  DIAMOND10,
  HEART10,
  SPADE10,
  CLUB2,
  DIAMOND2,
  HEART2,
  SPADE2,
  CLUB3,
  DIAMOND3,
  HEART3,
  SPADE3,
  CLUB4,
  DIAMOND4,
  HEART4,
  SPADE4,
  CLUB5,
  DIAMOND5,
  HEART5,
  SPADE5,
  CLUB6,
  DIAMOND6,
  HEART6,
  SPADE6,
  CLUB7,
  DIAMOND7,
  HEART7,
  SPADE7,
  CLUB8,
  DIAMOND8,
  HEART8,
  SPADE8,
  CLUB9,
  DIAMOND9,
  HEART9,
  SPADE9,
  CLUB1,
  DIAMOND1,
  HEART1,
  SPADE1,
  CLUB11,
  DIAMOND11,
  HEART11,
  SPADE11,
  CLUB13,
  DIAMOND13,
  HEART13,
  SPADE13,
  CLUB12,
  DIAMOND12,
  HEART12,
  SPADE12
};

// Create an object with all card back  images for easy access.
export const BackImages: Record<string, string> = {
  Abstract,
  AbstractClouds,
  AbstractScene,
  Astronaut,
  Blue,
  Blue2,
  Cars,
  Castle,
  Fish,
  Frog,
  Red,
  Red2
};

export function getImage(card: Card) {
  return FrontImages[card.suit + card.rank];
}
