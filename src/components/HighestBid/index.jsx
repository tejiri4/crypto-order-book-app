import React from 'react';

const HighestBid = ({
  bidTitle,
  currencyNameArr,
  highestBidAskArr
}) => {  
  return (
    <React.Fragment>
      <div className='top-left__grid'>
        <div>
          {bidTitle}
        </div>
        {
          currencyNameArr.map((currencyName, index) => (
            <div key={index} className='box'>
              <small>{currencyName}</small>
              <p>{!isNaN(highestBidAskArr[index]) ?  Number(highestBidAskArr[index]).toFixed(3) : 0}</p>
            </div>
          ))
        }
      </div>
    </React.Fragment>);
}

export default HighestBid;