import axios from 'axios';

const makeRequest = (url, options = { method: 'GET' }) => {
  return axios({
    url,
    method: options.method,
    data: options.body,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    }
  }).then(response => response.data);
};

export default makeRequest;