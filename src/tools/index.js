import axios from 'axios';
import { API_URL } from "../constants";
import { store } from '../redux';

export const request = async ({ url, method, params, headers }) => {
  /* params is body in axios */
  try {
    const fullURL = `${API_URL}${url}`;
    const user = store.getState().authReducer.user;
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("Timeout, Server is not responding"));
      }, 5000); // After 5 seconds will stop the request

      let modfiedHeaders = {
        ...headers,
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json',
      }
      const data = method !== 'get' ? params : {headers: modfiedHeaders};
      axios[method](fullURL, data, {headers: modfiedHeaders})
        .then(res => {
          clearTimeout(timeoutId);
          resolve(res);
        })
        .catch(error => {
          clearTimeout(timeoutId);
          /*
          * returning the error status code
          * and show an error message depending on code.
          */
          reject(error?.response?.status)
        }
      )
    })
  } catch (error) {
    console.warn(error);
  }
}