'use strict';

const ground = document.querySelector('.ground');
const groundRect = ground.getBoundingClientRect();
const carrot_size = 60;
const count_carrot = 5;
const count_bug = 5;
const game_time = 5;

const startBtn = document.querySelector('.start-btn');
const timer = document.querySelector('.timer');
const score = document.querySelector('.score');
const popup = document.querySelector('.pop-up');
const popupBtn = document.querySelector('.refresh');
const popupMsg = document.querySelector('.msg');

// 게임의 상태를 기억하는 변수( 시작 여부, 최종 점수, 남은 시간)
let started = false;
let final_score = 0;
let time = undefined;

// img click!
ground.addEventListener('click', (event) => onFieldClick(event));

//시작 버튼 클릭! 
startBtn.addEventListener('click',() => {
  console.log('click');
  if(started){
    stopGame();
    showStopBtn();
  } else {
    startGame();
  }
  started = !started;
});

popupBtn.addEventListener('click',()=>{
  startGame();
  hidePopup();
});

function startGame(){
  started = true;
  Game();
  showStopBtn();
  showTimerScore();
  startGameTimer();
}
function stopGame(){
  started = false;
  stopGameTimer();
  hideBtn();
  showPopUp('replay? 😂')
}
function finish(win){
  started = false;
  hideBtn();
  showPopUp(win? 'you won🌈': 'you lost👻');
}

function showStopBtn(){
  const stop = startBtn.querySelector('.fas');
  stop.classList.add('fa-stop');
  stop.classList.remove('fa-play');
}

function hideBtn(){
  startBtn.style.visibility = 'hidden';
}

function showTimerScore(){
  timer.style.visibility = 'visible';
  score.style.visibility = 'visible';
}
function startGameTimer(){
  let remainingTimeSec = game_time;
  updateTimerText(remainingTimeSec);
  time = setInterval(() => {
    if(remainingTimeSec <= 0){
      clearInterval(time);
      finish(count_carrot === final_score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}
function stopGameTimer(){
  clearInterval(time);
}
function updateTimerText(sec){
  const seconds = sec % 60;
  timer.innerHTML = `${seconds}초`
}

function showPopUp(text){
  popupMsg.innerHTML = text;
  popup.classList.remove('pop-up--hide');
}
function hidePopup(){
  popup.classList.add('pop-up--hide');
}

function Game(){
  ground.innerHTML = '';
  score.innerHTML = count_carrot;
  //이미지를 생성하고 ground에 추가해줌
  CreateImg('carrot',count_carrot,'img/carrot.png');
  CreateImg('bug',count_bug,'img/bug.png');
}

function onFieldClick(event){
  if(!started){
    return;
  }
  const target = event.target;
  if(target.matches('.carrot')){
    target.remove();
    final_score++;
    updateScoreBoard();
    if(final_score === count_carrot){
      finish(true);
    }
  }else if(target.matches('.bug')){
    stopGameTimer();
    finish(false);
  }
};


function updateScoreBoard(){
  score.innerHTML = count_carrot-final_score;
}

function CreateImg( className, count, path){
  const x1 = 0;
  const y1 = 0;
  const x2 = groundRect.width - carrot_size;
  const y2 = groundRect.height - carrot_size;
  for(let i = 0; i < count; i++){
    const img = document.createElement('img');
    img.setAttribute('class', className);
    img.setAttribute('src', path);
    img.style.position = 'absolute';

    const x = randomNum(x1, x2);
    const y = randomNum(y1, y2);
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    ground.appendChild(img);
    }
  }

function randomNum(min, max){
  // 단 max는 포함 x
  return Math.random() * (max - min) + min;
}


  






