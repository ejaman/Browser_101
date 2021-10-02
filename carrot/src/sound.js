'use strict';

const CarrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const BackgroundSound = new Audio('./sound/bg.mp3');
const BugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playCarrot(){
  playSound(CarrotSound);
}
export function playBug(){
  playSound(BugSound);
}
export function playBackground(){
  playSound(BackgroundSound);
}
export function playwin(){
  playSound(winSound);
}
export function playalert(){
  playSound(alertSound);
}
export function stopBackground(){
  stopSound(BackgroundSound);
}

function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound){
  sound.pause();
}