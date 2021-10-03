'use strict';
import { Ground, ItemType } from "./ground.js";
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel'
});

//bulider pattern
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  build(){
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game{
  constructor(gameDuration, carrotCount, bugCount){
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    //DOM 요소 
    this.startBtn = document.querySelector('.start-btn');
    this.Timer = document.querySelector('.timer');
    this.Score = document.querySelector('.score');
    this.startBtn.addEventListener('click', () => {
      if(this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    
    });
    
    this.field = new Ground(carrotCount, bugCount);
    this.field.setClickListener(this.onItemClick);

    this.started = false;
    this.final_score = 0;
    this.time = undefined;

  }

  setGameStopListener(onGameStop){
    this.onGameStop = onGameStop;
  }

  start(){
    this.started = true;
    this.game();
    this.showStopBtn();
    this.showTimerScore();
    this.startTimer();
    sound.playBackground();
  }
  stop(reason){
    this.started = false;
    this.stopTimer();
    this.hideStartBtn();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason); 
  }

  onItemClick = (item) =>{
    if(!this.started){
      return;
    }
    if(item === ItemType.carrot){
      this.final_score++;
      this.updateScore();
      if( this.final_score === this.carrotCount){
        this.stop(Reason.win);
      }
    }else if(item === ItemType.bug){
      this.stop(Reason.lose);
    }
  }


showStopBtn(){
  const icon = this.startBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  this.startBtn.style.visibility = 'visible';
}
showTimerScore(){
  this.Timer.style.visibility = 'visible';
  this.Score.style.visibility = 'visible';
}

hideStartBtn(){
  this.startBtn.style.visibility = 'hidden';
}

startTimer(){
  let remainingTime = this.gameDuration;
  this.updateTimerText(remainingTime);
  this.time = setInterval(() => {
    if(remainingTime <= 0){
      clearInterval(this.time);
      this.stop(this.carrotCount === this.final_score ? Reason.win: Reason.lose);
      return;
    }
    this.updateTimerText(--remainingTime);
  }, 1000);
}
updateTimerText(timer){
  const sec = timer % 60;
  this.Timer.innerHTML = `${sec} 초`
}

stopTimer(){
  clearInterval(this.time);
}

game() {
  this.final_score = 0;
  this.Score.innerHTML = this.carrotCount;
  this.field.init();
}

updateScore(){
  this.Score.innerHTML = this.carrotCount - this.final_score;
}
}