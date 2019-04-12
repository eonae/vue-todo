export default class {
  modify(source) {
    for (let prop in source) {

      if (this[prop] !== source[prop]) {
        // Проверка на hasOwnProperty в данном случае излишняя.
        this[prop] = source[prop];
      }
    }
  }
}