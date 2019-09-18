export const subscribe = ({
  currencyPair,
  setWs,
  getData
}) => {
  const ws = new WebSocket('wss://ws.bitstamp.net/');
  ws.onopen = () => {
    //Subscribe to the channel
    ws.send(JSON.stringify({ event: `bts:subscribe`, data: { channel: `order_book_${currencyPair}` } }))
    setWs(ws)

  }

  ws.onmessage = (msg) => {
   getData(JSON.parse(msg.data));
  }
}


export const unSubscribe = ({ws, currencyPair}) => {
  ws.send(JSON.stringify({ event: `bts:unsubscribe`, data: { channel: `order_book_${currencyPair}` } }))
  ws.close();
}