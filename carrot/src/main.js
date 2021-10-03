'use strict';
import Popup from "./popup.js";
import { GameBuilder } from "./game.js";

// 어떤 값을 설정하는지 한 눈에 알아보기 쉬움
const playgame = new GameBuilder()
.gameDuration(3)
.carrotCount(2)
.bugCount(2)
.build();

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







