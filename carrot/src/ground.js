'use strict';
// img 랜덤 포지션, 클릭 담당
import * as sound from './sound.js';

const carrot_size = 60;

export default class Ground {
  constructor(countCarrot, countBug){
    this.countCarrot = countCarrot;
    this.countBug = countBug;
    this.ground = document.querySelector('.ground');
    this.groundRect = this.ground.getBoundingClientRect();
    
    this.ground.addEventListener('click',this.onClick);
  }

  init() {
    // 이미지를 생성한 뒤 ground에 추가
    console.log('check');
    this.ground.innerHTML = '';
    const check =document.createElement('img');
    check.setAttribute('src', 'img/bug.png')
    this._createImg('carrot', this.countCarrot,'img/carrot.png' );
    this._createImg('bug', this.countBug, 'img/bug.png'); 
  }

    // 콜백 등록할 수 있도록
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // 자바스크립트에서는 private한 함수를 만들 수 없기때문에 _를 사용해서 외부에서 부르면 안되는군을 표기함
  _createImg( className, count, path){
    console.log('create img');
    const x1 = 0;
    const y1 = 0;
    const x2 = this.groundRect.width  - carrot_size;
    const y2 = this.groundRect.height  - carrot_size;
    
    for(let i = 0; i < count; i++){
      const img = document.createElement('img');
      img.setAttribute('class', className);
      img.setAttribute('src', path);
      img. style.position = 'absolute';
      const x = randomNum(x1, x2);
      const y = randomNum(y1, y2);
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      this.ground.appendChild(img);
    }
  }

  onClick(event){
    console.log('onclick')
    const target = event.target;
    if(target.matches('.carrot')){
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick('carrot'); // type 전달
    }else if(target.matches('.bug')){
      this.onItemClick && this.onItemClick('bug');
    }
  }
  
}

function randomNum(min, max){
  return Math.random() * (max-min) +  min;
}

