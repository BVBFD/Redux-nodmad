import { legacy_createStore } from 'redux';

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const reducer = (state = [], action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    // 리덕스 배열을 추가할때 state.push() 이런식으로 mutate 하지마라.
    // 왜냐하면 변화가 일어날때 store.subscribe()가 감지하여
    // HTML을 렌더링 해주어야 하는데.. push를 쓰게 되면 기존 state 배열이
    // 유지가 되기 때문에 이 state 배열 값이 저장되어 있는 메모리상 주소가 같기 때문에,
    // subscribe() 가 store에 저장된 state 배열을 감지하지 못하고,.
    // html 렌더링이 일어나지 않게된다.
    // 그래서 새로운 state 값 업데이트 할때 항상 새로운 배열값을
    // 만들어주는 형식을 취해야 한다.

    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);

    default:
      return state;
  }
};

const store = legacy_createStore(reducer);

const addToDo = (text) => {
  return { type: ADD_TODO, text };
};

const deleteToDo = (id) => {
  return { type: DELETE_TODO, id };
};

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  //   HTML로부터 받아오는 id 값은 string임
  //  그래서 컴퓨터가 이해할 수 있는 실수값으로 변환해서 전달
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = '';
  toDos.forEach((toDo) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.addEventListener('click', dispatchDeleteToDo);
    btn.innerText = 'DEL';
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  dispatchAddToDo(toDo);
};

form.addEventListener('submit', onSubmit);
