import Task from './Task';

export default class TaskList {

  constructor() {
    this._tasks = [];
    this._nextKey = 0;
  }

  add(source) {
    // если без source, то создаётся пустая заготовка.
    // key - ключ для v-for. В этом качестве не может быть использован id, т. к. при создании новой задачи,
    // она получает временный id.
    const key = this._nextKey++;
    
    const task = Task.create(key);
    if (source) {
      task.sync(source);
    }
    this._tasks.unshift(task);
    return task;
  }

  
  addMany(tasks) {
    const _this = this;
    tasks.forEach(task => {
      _this.add(task);
    });
  }

  toArray() {
    const arr = this._tasks.slice();

    return arr;
  }

  get(id) {
    return this._tasks.find(t => t.id === id);
  }
  remove(id) {
    const index = this._tasks.findIndex(t => t.id === id);
    this._tasks.splice(index, 1);
  }
}