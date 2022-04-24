import { legacy_createStore } from 'redux';

const add = document.querySelector('.add');
const minus = document.querySelector('.minus');
const number = document.querySelector('span');

const ADD = 'ADD';
const MINUS = 'MINUS';

const reducer = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;

    case MINUS:
      return count - 1;

    default:
      return count;
  }
};

const store = legacy_createStore(reducer);

const handleAdd = () => {
  store.dispatch({ type: ADD });
  number.innerText = store.getState();
};

const handleMinus = () => {
  store.dispatch({ type: MINUS });
  number.innerText = store.getState();
};

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);
