'use strict';
import Popup from "./popup.js";
import * as sound from './sound.js';
import { GameBuilder, Reason } from "./game.js";

// 어떤 값을 설정하는지 한 눈에 알아보기 쉬움
const playgame = new GameBuilder()
.gameDuration(3)
.carrotCount(2)
.bugCount(2)
.build();

playgame.setGameStopListener((reason) => {
  let message;
  switch(reason) {
    case Reason.cancel:
      message = 'Replay?';
      sound.playalert();
      break;
    case Reason.win:
      message = '🏅 you won!';
      sound.playwin();
      break;
    case Reason.lose:
      message = 'you lost!💩';
      sound.playBug();
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







