import React from 'react';
import './Table.scss';

const Table = ({
  bidTitle,
  currencyNameArr,
  contentArr
}) => {
  return (
    <div className='table'>
      <div>{bidTitle}</div>
      <div className='table-header'>
        <div></div>
        <div>{currencyNameArr[0]}</div>
        <div>{currencyNameArr[1]}</div>
      </div>
      {
        contentArr.map((content, index) => (
          <div className='table-content' key={index}>
            <div>{index + 1}</div>
            <div>{content[0]}</div>
            <div>{content[1]}</div>
          </div>))
      }
    </div>
  );
}

export default Table;
