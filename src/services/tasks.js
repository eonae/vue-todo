import { serverUrl } from "../config";

class TasksService {
  constructor() {
    
  }

  fetchTasks() {

    return fetch(serverUrl + '/tasks', {
      mode: 'cors',
      credentials: 'include'
    })
          .then(response => {
            if (response.ok)
              return response.json()
            else {
              throw new Error(response.status)
            }
          });
  }
}

export default new TasksService();