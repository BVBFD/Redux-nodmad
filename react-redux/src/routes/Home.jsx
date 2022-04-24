import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToDo, deleteToDo } from '../store';

const Home = (props) => {
  const [text, setText] = useState('');
  const storeState = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(storeState);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addToDo(text));
    setText('');
  };

  const removeList = (e) => {
    dispatch(deleteToDo(e.target.id));
  };

  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type='text' value={text} onChange={onChange} />
        <button type='submit'>Add</button>
      </form>
      <ul>
        {storeState.reverse().map((data) => (
          <div style={{ display: 'flex' }}>
            <Link to={`/${data.id}`}>
              <li>{data.text}</li>
            </Link>
            <button id={data.id} onClick={removeList}>
              x
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Home;
