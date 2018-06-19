import { DEFAULT_HEADERS } from './types';
import axios from 'axios'
export const PostDispatcher = (method, url, type, payload=null, headers=DEFAULT_HEADERS) => {
  return (dispatch) => {
  fetch(url,{
    method: method,
    headers: headers,
    body: JSON.stringify(payload)
  }).then(response => response.json())
      .then((jsonResponse) => {
        return dispatch({
          type: type,
          payload: jsonResponse
        })
      }).catch((error)=> { alert(error) })
  }
}



export const getDispatcher = (method, url, type, headers=DEFAULT_HEADERS) => {
  return (dispatch) => {
  axios.get(url,{
    method,
    headers
  }).then((jsonResponse) => {
        console.log('returned response json')
        return dispatch({
          type,
          payload: jsonResponse.data
        })
      }).catch((error)=> { alert(error) })
  }
}

export const getDispatcherOptions = (method, url, type, options=null) => {
  return (dispatch) => {
  axios.get(url,{
    method,
    headers: DEFAULT_HEADERS,
  }).then((jsonResponse) => {
        console.log('returned response json')
        if (!!options) {
          return dispatch({ type, payload: { options, data: jsonResponse }})
        }else{
          return dispatch({ type, payload: jsonResponse })
        }
        
      }).catch((error)=> { alert(error) })
  }
}


export const roundNumber = (value, digits) => {
      if(!digits){
        digits = 2;
    }
    value = value * Math.pow(10, digits);
    value = Math.round(value);
    value = value / Math.pow(10, digits);
    return value;
}

export const numberWithCommas = (x)=> {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

export const titlize = (word) =>{
  return word.replace(/(^[a-z])|(\s+[a-z])/g, txt => txt.toUpperCase());
}