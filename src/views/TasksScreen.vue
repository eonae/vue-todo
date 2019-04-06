<template lang="pug">

  .flex-cont

    button#add.btn-floating.btn-large.waves-effect.waves-light.red(
      :disabled="editing",
      type="button",
      @click.stop="newTask()")
      i.material-icons add

    tasks-container(tasks="tasks",
    :selectedTaskId="selectedTaskId",
    :editedTaskId="editedTaskId")

    details-bar(
      :task="selectedTask",
      :isActive="detailsShown")

</template>

<script>

import TasksContainer from '../components/TasksContainer.vue'
import DetailsBar from '../components/DetailsBar.vue'

import tasks from '../tasks.js';
import bus from '../EventBus.js'

export default {

  name: 'TasksScreen',

  components: {
    TasksContainer,
    DetailsBar
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

      if (id === null) {
        this.detailsShown = false;
      }

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
    });
    bus.$on('stopEdit', taskId => {
      this.stopEdit(taskId);
    });
    bus.$on('newTask', () => {
      this.newTask();
    })
    bus.$on('deleteTask', taskId => {
      this.removeTask(taskId);
    });

    bus.$on('toggleDetails', taskId => {
      this.detailsShown = !this.detailsShown;
      if (typeof taskId !== undefined) {
        this.select(taskId);
      }
    });
    bus.$on('hideDetails', () => {
      this.detailsShown = false;
    });
    bus.$on('taskStatusChange', (taskId, value) => {
      this.tasks.find(t => t.id === taskId).done = value;
    })
  }
}

</script>

<style>

.flex-cont {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

@media (max-width: 740px) {
  .flex-cont {
    flex-direction: column;
  }
}

#add {
  position: absolute;
  top: 56px !important;

  left: 10px;
  transform: translateY(-50%);
}

@media (max-width: 740px) {
  #add {
    left: 100% !important;
    transform: translateX(-100%) translateY(-50%) translateX(-10px) !important;
  }
}

</style>
