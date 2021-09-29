const startBtn = document.querySelector('.start-btn');
const ground = document.querySelector('.ground');
const Carrot = document.querySelector('Cimg');
const Bug = document.querySelector('Bimg');


// 새로운 이미지를 생성
function CreateImg(){
  const imgCarrot = document.createElement('img');
  imgCarrot.setAttribute('class', 'Cimg');
  imgCarrot.setAttribute('src',"../carrot/img/carrot.png");
  
  const imgBug = document.createElement('img');
  imgBug.setAttribute('class',"Bimg");
  imgBug.setAttribute('src',"../carrot/img/bug.png");
    
  // ground 컨테이너에 새로 만든 이미지를 추가
  ground.appendChild(imgCarrot);
  ground.appendChild(imgBug);

  // 이미지 위치 랜덤하게 지정
  imgBug.style.position = 'absolute';
  imgBug.style.top = ground.clientHeight * Math.random()-15+ 'px';
  imgBug.style.left = ground.clientWidth * Math.random() + 'px';
  
  imgCarrot.style.position = 'absolute';
  imgCarrot.style.top = ground.clientHeight * Math.random()-15+ 'px';
  imgCarrot.style.left =ground.clientWidth * Math.random() + 'px';
  }

// 이미지 여러개 생성
function repeat(){
    for( let i = 0; i <= 10; i++){
      CreateImg();
    }
  }
  
// 시작 버튼 클릭! 
startBtn.addEventListener('click',event => {
    console.log('click');
    // 이미지 여러개 생성
    let num = ground.childElementCount;
    if( num <= 10){
      repeat();
    }  
    // 타이머 
    let time = 5;
    const timer = setInterval(function(){
      document.querySelector('.timer').innerHTML = `${time} 초`;
      time--;
      if(time < 0){
        document.querySelector('.timer').innerHTML = "time out";
        clearInterval(timer);
      }
    },1000);

    const timeout = setTimeout(function(){
      alert('time out! try again');
    },6500);


  }
)





