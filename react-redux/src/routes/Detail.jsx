import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Detail = (props) => {
  const params = useParams();
  const storeState = useSelector((state) => state);
  const newArray = storeState.filter((data) => data.id === parseInt(params.id));

  return (
    <div>
      <div>Details</div>
      <div>{newArray[0]?.id}</div>
      <p>{newArray[0]?.text}</p>
    </div>
  );
};

export default Detail;
