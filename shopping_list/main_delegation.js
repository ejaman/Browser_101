const items = document.querySelector('.items');
const input = document.querySelector('.input');
const addbtn = document.querySelector('.add-btn');

function onAdd() {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  // 아무것도 입력하지 않았을 때
  if (text === ''){
    input.focus();
    return ;
  }

  // 2. 새로운 아이템 (텍스트 + 버튼)
  const item = createItem(text);
  
  // 3. items 컨테이너 안에 새로 만든 아이템을 추가
  items.appendChild(item);
  
  // 4. 새로 추가된 아이템으로 스크롤링 
  item.scrollIntoView({block:'center'});

  // 5. 인풋 초기화
  input.value = '';
  input.focus();

}
let id = 0; //UUID or object의 #태그 이용해서 고유한 아이디를 만드는 것이 좋음
function createItem (text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <div class="item" >
      <span class="name" >${text}</span>
      <button class="delete-btn" data-id=${id} >
          <i class="fas fa-times" data-id=${id} ></i>
      </button>
    </div>
    <div class="divider"></div>
`;
  id++;
  return itemRow;
}

addbtn.addEventListener('click', () => {
  onAdd();
})

input.addEventListener('keypress',event => {
  if(event.key === 'Enter') {
    onAdd();
  }
});

items.addEventListener('click', event => {
  const id = event.target.dataset.id;
  if(id){
    const toBeDeleted = document.querySelector(`.row[data-id="${id}"]`)
    toBeDeleted.remove();
  }
  
});