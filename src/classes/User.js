export default class User {
  constructor() {
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

  sync(source) {
    for (let prop in source) {

      if (this[prop] !== source[prop]) {
        // Проверка на hasOwnProperty в данном случае излишняя.
        this[prop] = source[prop];
      }
    }
  }

}