import TasksService from '../services/tasks'
import Task from '../models/Task'
// import { STATUS_CODES } from '../constants'

export default {
  namespaced: true,

  state: {
    list: [],
    _nextKey: 0
  },

  getters: {
    getById(store) {
      return function(id) {
        return store.list.find(t => t.id === id);
      }
    },
    getByKey(store) {
      return function(key) {
        return store.list.find(t => t.key === key);
      }
    }
  },

  mutations: {

    clear(state) {
      state.list = [];
    },

    add(state, { key, source }) {
      const task = new Task(key, source);
      state.list.unshift(task);
    },

    remove(state, id) {
      const index = state.list.findIndex(t => t.id === id);
      state.list.splice(index, 1);
    },

    modify(state, { task, source }) {
      task.modify(source);
    }
  },

  actions: {
  
    add({commit, state, getters}, source) {
      const key = state._nextKey++;  
      commit('add', { key, source });
      return getters.getByKey(key);
    },

    fetch({ commit, dispatch }) {
      commit('clear');
      TasksService
        .fetchTasks()
        .then(tasks => tasks.forEach(task => {
          dispatch('add', task);
        }))
        .catch(err => { debugger; });
    },

    modify({commit, getters}, { id, changes }) {
    // Повторный commit modify нужен для того, чтобы
    // Синхронизироваться по данным сервера (дата изменения, id и т. п.)
      const task = getters.getById(id);
      commit('modify', { task, source: changes })
      const serviceCall = (task.isNew)
        ? TasksService.addTask(task)
        : TasksService.editTask(task)
      
      serviceCall
        .then(source => { commit('modify', { task, source })})
        .catch(err => { debugger; });
    },

    remove({commit}, id) {

      TasksService
        .removeTask(id)
        .then(() => commit('remove', id))
        .catch(err => { debugger; });      
    },
  }
}

