import axios from 'axios';
// import Notification from './Toast';

const http = {

  get({ url, data, params, errorHandler, headers, jwt }) {
    return this.send('get', url, data, params, errorHandler, headers, jwt);
  },

  post({ url, data, params, errorHandler, headers, jwt }) {
    return this.send('post', url, data, params, errorHandler, headers, jwt);
  },

  put({ url, data, params, errorHandler, headers, jwt }) {
    return this.send('put', url, data, params, errorHandler, headers, jwt);
  },

  patch({ url, data, params, errorHandler, headers, jwt }) {
    return this.send('patch', url, data, params, errorHandler, headers, jwt);
  },

  delete({ url, data, params, errorHandler, headers, jwt }) {
    return this.send('delete', url, data, params, errorHandler, headers, jwt);
  },

  //try to catch error in this param
  send(method, url, data, params, errorHandler, headers, jwt) {
    let config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': jwt,
        ...headers
      },
      method: method,
      url: url,
      data: data,
      params: params,
    };
    return new Promise((resolve, reject) => {
      axios(config)
        .then((response) => resolve(response))
        .catch(({ response, message, request }) => {
          if (errorHandler) {
            errorHandler(response);
          } else {
            // console.log(response);
            // Notification.pushError(response.data.error || message, response.status);
          }
        });
    })
  }
}

export default http;