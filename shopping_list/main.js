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

function createItem (text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const name = document.createElement('span');
  name.setAttribute('class', 'name');
  name.innerText = text;

  const deletebtn = document.createElement('button');
  deletebtn.setAttribute('class', 'delete-btn');
  deletebtn.innerHTML='<i class="fas fa-times"></i>'
  deletebtn.addEventListener('click',()=> {
    items.removeChild(itemRow);
  })

  const itemDivider = document.createElement('Divider');
  itemDivider.setAttribute('class', 'divider');

  item.appendChild(name);
  item.appendChild(deletebtn);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);

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