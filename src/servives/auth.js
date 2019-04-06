import bus from '../EventBus'

console.log('authConnected');

class AuthService {
  constructor() {
    bus.$on('loginAttempt', this.tryLogin);
  }

  tryLogin(loginData) {
    console.log('try login');
    console.log(loginData);
  }
}

export default new AuthService()