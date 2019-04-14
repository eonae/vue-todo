import { serverUrl } from '../config';
import { json, handleResponse } from '../util';

const url = serverUrl + '/auth';

export default class AuthService {

  static register(credentials) {
    return fetch(url + '/register', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(credentials)
    })
    .then(response => {
      return handleResponse(response);
    })
  }

  static require() {

    return fetch(url + '/require', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    })
    .then(response => {
      return json(response);
    })
  }

  static logout() {

    return fetch(url + '/logout', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    })
    .then(response => {
      return handleResponse(response);
    })
  }

  static login(loginData) {

    return fetch(url + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(loginData)
    })
    .then(response => {
      return json(response);
    })
  }
}