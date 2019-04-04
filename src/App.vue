<template lang="pug">
  div#app
    todo-header
    .flex-cont
      tasks-container(tasks="tasks",
      :selected="selected",
      :edited="edited",
      @reset="reset()",
      @select="select($event)",
      @edit="edit($event)",
      @finishEditing="finishEditing()")
      details-bar
        // (:task="tasks.find(t => t.id === this.selected)")
    todo-footer
</template>

<script>

import TodoHeader from './components/Header.vue'
import DetailsBar from './components/DetailsBar.vue'
import TasksContainer from './components/TasksContainer.vue'
import TodoFooter from './components/Footer.vue'

import tasks from './tasks.js';

export default {
  name: 'app',
  components: {
    TodoHeader,
    TasksContainer,
    DetailsBar,
    TodoFooter 
  },
  data: function () {
    return {
      nextId: 6,
      tasks,
      selected: null,
      edited: null
    }
  },
  computed: {
    detailsShown() {
      return this.selected !== null;
    }
  },
  methods: {

    removeTask(task) {
      const index = this.tasks.indexOf(task);
        if (index != -1)
          this.tasks.splice(index, 1);
      this.selected = null;
      this.edited = null;
    },

    removeIfEmpty(id) {
      if (id !== null) {
        const task = this.tasks.find(t => t.id === id);
        if (task.text === '' && task.details === '')
          this.removeTask(task);
      }
    },

    reset() {
      this.removeIfEmpty(this.edited);

      this.selected = null;
      this.edited = null;
    },
    select(id) {
      this.removeIfEmpty(this.edited);
      this.selected = id;     
    },
    edit(id) {
      this.removeIfEmpty(this.edited);
      this.edited = id;
      this.selected = id;
    },
    finishEditing() {
      this.removeIfEmpty(this.edited);
      this.edited = null;
    },
    newTask() {
      this.removeIfEmpty(this.edited);
      this.tasks.unshift({
        id: this.nextId,
        text: '',
        done: false,
        details: ''
      });

      this.selected = this.nextId;
      this.edited = this.nextId;
      this.nextId++;
    }
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
    /* justify-content: space-between; */
  }
}


</style>
