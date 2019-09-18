import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import './App.scss';
import Table from './components/Table/index';
import 'semantic-ui-css/semantic.min.css';
import HighestBid from './components/HighestBid/index';
import makeRequest from './utils/axiosSetup';
import { subscribe, unSubscribe } from './utils/webSocketSetup';
import HighestArrayValue from './utils/HighestArrayValue';

class App extends Component {
  state = {
    currencyPairs: [],
    ws: {},
    selectedCurrencyDetails: {
      currencyPair: '',
      currencyNameArr: []
    },
    liveBookDatas: {},
    isLoading: true,
    highestBid: [],
    highestAsk: [],
    subscribe: false
  }

  async componentDidMount() {
    let currencyPairs = await makeRequest('https://www.bitstamp.net/api/v2/trading-pairs-info/');
    currencyPairs = currencyPairs.map(({ url_symbol, description, name }) => ({
      key: url_symbol,
      text: description,
      value: `${name} ${url_symbol}`
    }));
    const [currencyName, currencyPair] = currencyPairs[0].value.split(' ')
    this.setState({
      currencyPairs, selectedCurrencyDetails: {
        currencyPair,
        currencyNameArr: currencyName.replace('/', ' ').split(' ')
      },
      isLoading: false,
      subscribe: true,
      ws: new WebSocket('wss://ws.bitstamp.net/')
    })

    subscribe({
      setWs: this.setWs,
      currencyPair,
      getData: this.handleStreamResponse
    })
  }

  setWs = (ws) => {
    this.setState({
      ws
    })
  }

  handleStreamResponse = ({ data: liveBookDatas }) => {
      const highestBid = HighestArrayValue(liveBookDatas, 'bids');
      const highestAsk = HighestArrayValue(liveBookDatas, 'asks');
      this.setState({ liveBookDatas, highestBid, highestAsk })
  }

  handleDropdownChange = async (event, data) => {
    const [currencyName, currencyPair] = data.value.split(' ');
    unSubscribe({
      currencyPair: this.state.selectedCurrencyDetails.currencyPair,
      ws: this.state.ws
    })

    this.setState({
      selectedCurrencyDetails: {
        currencyPair,
        currencyNameArr: currencyName.replace('/', ' ').split(' ')
      },
      liveBookDatas: {},
      highestBid: [],
      highestAsk: [],
      subscribe: false
    })

    subscribe({
      setWs: this.setWs,
      currencyPair,
      getData: this.handleStreamResponse
    })
  }

  render() {
    const { currencyPairs, selectedCurrencyDetails: { currencyNameArr }, liveBookDatas, highestBid, highestAsk } = this.state;
    return (
      <div className="App">
        <div className='header'>Crpto App</div>
        <div className='top'>
          <div className='width-fifty-percent'>
            <div className='top-left'>
              <h2>{currencyNameArr.length && `Highest  ${currencyNameArr[0]} - ${currencyNameArr[1]} Exchange`}</h2>
              <HighestBid bidTitle='Bid' currencyNameArr={currencyNameArr} highestBidAskArr={highestBid} />
              <HighestBid bidTitle='Ask' currencyNameArr={currencyNameArr} highestBidAskArr={highestAsk} />
            </div>
          </div>
          <div className='width-fifty-percent'>
            <Dropdown
              placeholder={`${currencyPairs.length ? currencyPairs[0].text : 'Select an option'}`}
              selection options={this.state.currencyPairs}
              onChange={this.handleDropdownChange}
            />
          </div>
        </div>
        <div className='table-collection'>
          <Table bidTitle='Bid' currencyNameArr={currencyNameArr} contentArr={liveBookDatas.bids ? liveBookDatas.bids : []} />
          <Table bidTitle='Asks' currencyNameArr={currencyNameArr} contentArr={liveBookDatas.asks ? liveBookDatas.asks : []} />
        </div>
      </div>
    );
  }
}

export default App;