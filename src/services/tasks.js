import { serverUrl } from "../config";
import { json, handleResponse } from '../util';
const url = serverUrl + '/tasks';

class TasksService {

  fetchTasks() {

    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    })
    .then(response => {
      return json(response);
    });
  }

  addTask(task) {

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(task)
    })
    .then(response => {
      return json(response);
    });
  }

  editTask(task) {

    return fetch(`${url}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(task)
    })
    .then(response => {
      return json(response);
    });

  }

  removeTask(id) {

    return fetch(`${url}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors'
    })
    .then(response => {
      return handleResponse(response);
    })
  }
}

export default new TasksService();