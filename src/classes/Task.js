export default class Task {
  constructor(key) {
    // Временный id
    this.id = 'new_' + Math.floor(Math.random() * 1000);
    this.key = key;
    this.text = '';
    this.notes = '';
    this.isCompleted = false;
    this.isStarred = false;
  }

  
  sync(source) {
    for (let prop in source) {

      if (this[prop] !== source[prop]) {
        // Проверка на hasOwnProperty в данном случае излишняя.
        this[prop] = source[prop];
      }
    }
  }
  
  static create(key) {
    return new Task(key);
  }
}