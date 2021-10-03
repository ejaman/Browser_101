'use strict';
import Popup from "./popup.js";
import Ground from "./ground.js";
import * as sound from './sound.js';

const count_carrot = 15;
const count_bug = 20;
const game_Duration = 10;

const startBtn = document.querySelector('.start-btn');
const Timer = document.querySelector('.timer');
const Score = document.querySelector('.score');


let started = false;
let final_score = 0;
let time = undefined;

const gameFinishBanner = new Popup();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const field = new Ground(count_carrot,count_bug);
field.setClickListener(onItemClick);


function onItemClick(item){
  if(!started){
    return;
  }
  if(item === 'carrot'){
    final_score++;
    updateScore();
    if( final_score === count_carrot){
      finishGame(true);
    }
  }else if(item === 'bug'){
    sound.playBug();
    finishGame(false);
  }
}

startBtn.addEventListener('click', () => {
  if(started) {
    stopGame();
  } else {
    startGame();
  }

});


function startGame(){
  started = true;
  game();
  showStopBtn();
  showTimerScore();
  startTimer();
  sound.playBackground();
}
function stopGame(){
  started = false;
  stopTimer();
  hideStartBtn();
  gameFinishBanner.show('Replay?');
  sound.playalert();
  sound.stopBackground()

}
function finishGame(win){
  started = false;
  hideStartBtn();
  if(win){
    sound.playwin();
  }else{
    sound.playBug();
  }
  stopTimer();
sound.stopBackground();
  gameFinishBanner.show(win? '🏅 you won!': 'you lost!💩');
}

function showStopBtn(){
  const icon = startBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  startBtn.style.visibility = 'visible';
}
function showTimerScore(){
  Timer.style.visibility = 'visible';
  Score.style.visibility = 'visible';
}

function hideStartBtn(){
  startBtn.style.visibility = 'hidden';
}

function startTimer(){
  let remainingTime = game_Duration;
  updateTimerText(remainingTime);
  time = setInterval(() => {
    if(remainingTime <= 0){
      clearInterval(time);
      finishGame(count_carrot === final_score);
      return;
    }
    updateTimerText(--remainingTime);
  }, 1000);
}
function updateTimerText(timer){
  const sec = timer % 60;
  Timer.innerHTML = `${sec} 초`
}

function stopTimer(){
  clearInterval(time);
}

function game() {
  final_score = 0;
  Score.innerHTML = count_carrot;
  field.init();
}

function updateScore(){
  Score.innerHTML = count_carrot - final_score;
}







