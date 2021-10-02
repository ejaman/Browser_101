'use strict';

export default class Popup{
  constructor(){ 
  // constructor로 필요한 것들을 초기화
    this.popup = document.querySelector('.pop-up');
    this.PopupBtn = document.querySelector('.refresh');
    this.PopupMsg = document.querySelector('.msg');
    // 버튼이 클릭되면 우리가 할당해준 콜백 함수(onClick)가 실행됨
    this.PopupBtn.addEventListener('click', () => {
      // onclick이 있을 때만 onclick 실행
      this.onClick && this.onClick(); 
      this.hide();
    });

  }
  // popup class를 쓰는 사람이 클릭 리스너를 등록할 수 있다
  setClickListener(onClick){
    this.onClick = onClick;
  }

  show(text){
    this.PopupMsg.innerHTML = text;
    this.popup.classList.remove('pop-up--hide')
  }  

  hide(){
    this.popup.classList.add('pop-up--hide');
  }

}