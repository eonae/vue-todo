import BaseModel from './BaseModel'

export default class User extends BaseModel {
  constructor() {
    super();
    this.authorized = false;
  }

  static unauthorized() {
    return new User();
  }

  static create(source) {
    return {
      authorized: true,
      username: source.username
    }
  }
}