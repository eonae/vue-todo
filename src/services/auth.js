import bus from '../EventBus'
import { serverUrl } from '../config';

console.log(serverUrl);
console.log('authConnected');

class AuthService {
  constructor() {
    this.user = { authorized: false };
    bus.$on('loginAttempt', this.tryLogin.bind(this));
  }

  logout() {

    const _user = this.user;
    fetch(serverUrl + '/logout', {
      method: 'GET',
      credentials: 'same-origin',
      mode: 'cors'
    }).then(response => {
      if (response.ok) {
        _user = { authorized: false };
      }
    }).catch(err => {
      console.log(err);
    });
  }

  tryLogin(loginData) {
    debugger;
    const _user = this.user;

    fetch(serverUrl + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      mode: 'cors',
      body: JSON.stringify(loginData)

    }).then(response => {

      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    }).then(result => {
      debugger;
        _user.username = result.username;
        _user.authorized = true;
        bus.$emit('changeUser', result);
      
    }).catch(err => {

      bus.$emit('loginFail', err);
    });
  }
}

export default new AuthService();

