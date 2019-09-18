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
        contentArr.length ?
          <div className='table-content'>
            {
              contentArr.map((content, index) => (
                <div className='table-row' key={index}>
                  <div>{index + 1}</div>
                  <div>{content[0]}</div>
                  <div>{content[1]}</div>
                </div>))
            }
          </div> : <img src='https://res.cloudinary.com/store-manager/image/upload/v1568812725/Bars-1s-200px.svg'  alt='loader'/>
      }

    </div>
  );
}

export default Table;
