import axios from 'axios';
import { API_URL } from "../constants";
import { store } from '../redux';

export const request = async ({ url, method, params, headers }) => {
  try {
    const fullURL = `${API_URL}${url}`;
    const user = store.getState().authReducer.user;
    return new Promise((resolve, reject) => {
      let timeout = false;
      setTimeout(() => {
        timeout = true;
      }, 15000)

      let modfiedHeaders = {
        ...headers,
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json',
      }

      if(__DEV__) {
        console.log('\n\n' + 'fullURL ==> ', fullURL)
        console.log('========================================')
        console.log('method  ==> ', method)
        console.log('========================================')
        console.log('params  ==> ', params ? params : '{}')
        console.log('========================================')
        console.log('headers ==> ', headers ? headers : '{}')
        console.log('========================================\n')
      }

      axios({
        method: method,
        url: fullURL,
        headers: modfiedHeaders,
        data: params
      })
      .then(res => {
        if(timeout) {
          throw ({response: { status: 500}})
        }

        resolve(res);
      })
      .catch(error => {
        /*
          * returning the error status code
          * and show an error message depending on code.
        */
        reject(error?.response?.status)
      })
    })
  } catch (error) {
    console.warn(error);
  }
}