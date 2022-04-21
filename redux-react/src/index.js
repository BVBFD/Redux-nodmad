import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { legacy_createStore } from 'redux';

const add = document.querySelector('.add');
const minus = document.querySelector('.minus');
const number = document.querySelector('span');

const ADD = 'ADD';
const MINUS = 'MINUS';

const reducer = (count = 0, action) => {
  // count state 값 store에 등록,
  // action 콜백 중간 파라메터로 전달
  switch (action.type) {
    case ADD:
      return count + 1;
    // reducer 함수가 return 하는 것은
    // reducer 함수 파라메터를 통해서
    // store에 등록된 데이터 값의 수정된 데이터 값이 된다.
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const store = legacy_createStore(reducer);

const onChange = () => {
  console.log('there was a change on the store!');
};

store.subscribe(onChange);
// subscribe는 store 안에 있는 변화를 감지해서
// store 안에 있는 값이 변화하면 해당 콜백함수를 실행

const handleAdd = () => {
  store.dispatch({ type: ADD });
  number.innerText = store.getState();
};

const hadleMinus = () => {
  store.dispatch({ type: MINUS });
  number.innerText = store.getState();
};

add.addEventListener('click', handleAdd);

minus.addEventListener('click', hadleMinus);
// dispatch, reducer 함수 파라미터 action은
// 즉 지금 이 함수는 dispatch(action);
// action 객체를 담고 있는 dispatch 함수 임..
// 데이터를 콜백 return을 통해서 조작하는
// reducer 함수와의 소통 방법임.

// ✅ Store는 data를 저장하는 곳
// ✅ CreateStore는 reducer를 요구함.
// ✅ Reducer는 data를 modify 해주는 함수로 reducer가
// return하는 것은 store에 있는 data가 됨.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
