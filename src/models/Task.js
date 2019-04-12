import BaseModel from './BaseModel'

export default class Task extends BaseModel {
  constructor(key, source) {
    super();
    this.id = 'new_' + key; // Временный id
    this.key = key;
    this.text = '';
    this.notes = '';
    this.isCompleted = false;
    this.isStarred = false;

    if (source) this.modify(source);
  }

  get isNew() {
    return /new_/.test(this.id);
  }

  get isEmpty() {
    return this.text === '' && this.notes === '';
  }
}