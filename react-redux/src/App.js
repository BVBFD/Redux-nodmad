import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Detail from './routes/Detail';
import Home from './routes/Home';

const App = (props) => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:id' element={<Detail />} />
    </Routes>
  );
};

export default App;
