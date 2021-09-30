'use strict';

const ground = document.querySelector('.ground');
const groundRect = ground.getBoundingClientRect();
const carrot_size = 60;
const count_carrot = 5;
const count_bug = 5;
const game_Duration = 5;

const startBtn = document.querySelector('.start-btn');
const Timer = document.querySelector('.timer');
const Score = document.querySelector('.score');
const Popup = document.querySelector('.pop-up');
const PopupBtn = document.querySelector('.refresh');
const PopupMsg = document.querySelector('.msg');

let started = false;
let final_score = 0;
let time = undefined;

ground.addEventListener('click', (event) => onFieldClick(event));
startBtn.addEventListener('click', () => {
  if(started) {
    stopGame();
  } else {
    startGame();
  }

});
PopupBtn.addEventListener('click', ()=> {
  startGame();
  hidePopup();
})

function startGame(){
  started = true;
  game();
  showStopBtn();
  showTimerScore();
  startTimer();
}
function stopGame(){
  started = false;
  stopTimer();
  hideStartBtn();
  showPopup('Replay?');
}
function finishGame(win){
  started = false;
  hideStartBtn();
  showPopup(win? '🏅 you won!': 'you lost!💩');
}

function showStopBtn(){
  const icon = startBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play')
}
function showTimerScore(){
  Timer.style.visibility = 'visible';
  Score.style.visibility = 'visible';
}

function hideStartBtn(){
  startBtn.style.visibility = 'hidden';
}
function showPopup(text){
  PopupMsg.innerHTML = text;
  Popup.classList.remove('pop-up--hide')
}
function hidePopup(){
  Popup.classList.add('pop-up--hide')
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
  ground.innerHTML = '';
  Score.innerHTML = count_carrot;
  // 이미지를 생성한 뒤 ground에 추가
  createImg('carrot', count_carrot, 'img/carrot.png');
  createImg('bug', count_bug, 'img/bug.png');
}

function onFieldClick(event){
  if( !started){
    return;
  }
  const target = event.target;
  if(target.matches('.carrot')){
    target.remove();
    final_score++;
    updateScore();
    if( final_score === count_carrot){
      finishGame(true);
    }
  }else if(target.matches('.bug')){
    stopTimer();
    finishGame(false);
  }
}

function updateScore(){
  Score.innerHTML = count_carrot - final_score;
}


//여기서 position random으로 설정
function createImg( className, count, path){
  const x1 = 0;
  const y1 = 0;
  const x2 = groundRect.width  - carrot_size;
  const y2 = groundRect.height  - carrot_size;
  
  for(let i = 0; i < count; i++){
    const img = document.createElement('img');
    img.setAttribute('class', className);
    img.setAttribute('src', path);
    img. style.position = 'absolute';
    
    const x = randomNum(x1, x2);
    const y = randomNum(y1, y2);
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    ground.appendChild(img);
  }
}

function randomNum(min, max){
  return Math.random() * (max-min) +  min;
}





