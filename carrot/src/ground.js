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
    
    // this라는 정보가 class가 아니기 때문 
    // class에 있는 함수를 누군가에게 전달해줄 때
    // 클레스 정보가 무시되기 떄문에 바인딩 과정이 필요 => this binding
    // 1.
    // this.onClick = this.onClick.bind(this);
    // this.ground.addEventListener('click',this.onClick);

    // 2.
    // 또는 => function은 this가 유지되기 때문에 이 방법 사용
    //this.ground.addEventListener('click', (event) => this.onClick(event));

    // 3. 클래스 안에 있는 어떤 함수를 다른 콜백으로 전달할 떄 onClick ㄱㄱ
    this.ground.addEventListener('click',this.onClick);
    
    
  }

  init() {
    // 이미지를 생성한 뒤 ground에 추가
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

  // onClick이라는 멤버 변수로 만들고 => 사용
  onClick = (event)=>{
    const target = event.target;
    if(target.matches('.carrot')){
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick('carrot');
      // type 전달
    }else if(target.matches('.bug')){
      this.onItemClick && this.onItemClick('bug');
    }
  }
  
}

function randomNum(min, max){
  return Math.random() * (max-min) +  min;
}

