'use strict';
import Popup from "./popup.js";
import Game from "./game.js";

const playgame = new Game(3,2,2);
playgame.setGameStopListener((reason) => {
  console.log(reason);

  let message;
  switch(reason) {
    case 'cancel':
      message = 'Replay?';
      break;
    case '🏅 you won!':
      message = '🏅 you won!';
      break;
    case 'you lost!💩':
      message = 'you lost!💩';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.show(message);
});

const gameFinishBanner = new Popup();
gameFinishBanner.setClickListener(() => {
  playgame.start();
});







