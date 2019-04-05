<template lang="pug">

  div#app
    todo-header(:disableAdd="editing")
    .flex-cont
      tasks-container(tasks="tasks",
      :selectedTaskId="selectedTaskId",
      :editedTaskId="editedTaskId")

      details-bar(
        :task="selectedTask",
        :isActive="detailsShown")
    todo-footer
    
</template>

<script>

import TodoHeader from './components/Header.vue'
import DetailsBar from './components/DetailsBar.vue'
import TasksContainer from './components/TasksContainer.vue'
import TodoFooter from './components/Footer.vue'

import tasks from './tasks.js';

import bus from './EventBus.js'
import { totalmem } from 'os';

export default {
  name: 'app',

  components: {
    TodoHeader,
    TasksContainer,
    DetailsBar,
    TodoFooter 
  },

  computed: {
    selectedTask() {
      const task = tasks.find(t => t.id === this.selectedTaskId);
      return (task) ? task : null;
    },
    editing() {
      return this.editedTaskId !== null
    }
  },

  data: function () {
    return {
      nextId: tasks.length, // Пока так.
      tasks,
      selectedTaskId: null,
      editedTaskId: null,
      detailsShown: false
    }
  },

  methods: {

    removeTask(id) {
      const index = this.tasks.findIndex(t => t.id === id);
        if (index != -1)
          this.tasks.splice(index, 1);
      this.selectedTaskId = null;
      this.editedTaskId = null;
    },

    removeIfEmpty(id) {

      if (id !== null) {
        const task = this.tasks.find(t => t.id === id);
        if (task.text === '' && task.details === '')
          this.removeTask(task.id);
      }
    },

    reset() {
      this.removeIfEmpty(this.editedTaskId);
      this.selectedTaskId = null;
      this.editedTaskId = null;
    },

    select(id) {
      this.removeIfEmpty(this.editedTaskId);
      this.selectedTaskId = id;
    },

    edit(id) {
      this.removeIfEmpty(this.editedTaskId);
      this.editedTaskId = id;
      this.selectedTaskId = id;
    },

    stopEdit() {
      this.removeIfEmpty(this.editedTaskId);
      this.editedTaskId = null;
    },

    newTask() {
      this.removeIfEmpty(this.editedTaskId);
      this.tasks.unshift({
        id: this.nextId,
        text: '',
        done: false,
        details: ''
      });

      this.selectedTaskId = this.nextId;
      this.editedTaskId = this.nextId;
      this.nextId++;
    }
  },
  created() {
    bus.$on('edit', taskId => {
      this.edit(taskId);
      console.log('edit ' + taskId);
    });
    bus.$on('select', taskId => {
      this.select(taskId);
      console.log('select ' + taskId);
    });
    bus.$on('stopEdit', taskId => {
      
      this.stopEdit(taskId);
      console.log('stopEdit ' + taskId);
    });
    bus.$on('newTask', () => {
      this.newTask();
      console.log('new task');
    })
    bus.$on('deleteTask', taskId => {
      this.removeTask(taskId);
      console.log('delete ' + taskId);
    });
    bus.$on('toggleDetails', () => {
      this.detailsShown = !this.detailsShown;
      console.log('toggleDetails');
    });
    bus.$on('hideDetails', () => {
      this.detailsShown = false;
      console.log('hideDetails');
    });
    bus.$on('taskStatusChange', (taskId, value) => {
      this.tasks.find(t => t.id === taskId).done = value;
      console.log(value);
    })
  }
}
</script>

<style>

body {
  background: #FCFCFC;
  height: 100vh;
}

#app {
  max-width: 1140px;
  padding: 0 2%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
}

.flex-cont {
  display: flex;
  padding-top: 70px;
  margin-bottom: 30px;
  width: 100%;

  height: calc(100vh - 70px);
  overflow: hidden;
}

@media (max-width: 740px) {
  .flex-cont {
    flex-direction: column;
  }
}


</style>
