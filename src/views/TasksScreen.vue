<template lang="pug">

  .flex-cont

    button#add.btn-floating.btn-large.waves-effect.waves-light.red(
      :disabled="editing",
      type="button",
      @click.stop="newTaskHandler()")
      i.material-icons add

    tasks-container(:tasks="tasks.toArray()",
      :selectedTaskId="selectedTaskId",
      :editedTaskId="editedTaskId")

    details-bar(
      :task="selectedTask",
      :isActive="detailsShown")

</template>

<script>

import TasksContainer from '../components/TasksContainer.vue'
import DetailsBar from '../components/DetailsBar.vue'

import tasksService from '../services/tasks'
import Task from '../classes/Task';
import TaskList from '../classes/TaskList'

import bus from '../EventBus.js'

export default {

  name: 'TasksScreen',

  components: {
    TasksContainer,
    DetailsBar
  },

  data() {
    return {
      tasks: new TaskList(),
      selectedTaskId: null,
      editedTaskId: null,
      detailsShown: false
    }
  },

  computed: {
    selectedTask() {
      const task = this.tasks.get(this.selectedTaskId);
      return (task) ? task : null;
    },
    editing() {
      return this.editedTaskId !== null;
    }
  },

  methods: {

    saveChanges() {
      // Возможно id стоит передавать в метод из-за асинхронности..
      // Этот метод будет вызываться при завершении редактирования задачи
      const task = this.tasks.get(this.editedTaskId);
      const isNew = /new_/.test(task.id); // Является ли задача только что созданной.

      return (isNew)
        ? tasksService.addTask(task)
        : tasksService.editTask(task);
    },

    fetchTasks() {
      const vm = this;

      tasksService
        .fetchTasks()
        .then(tasks => vm.tasks.addMany(tasks))
        .catch(err => { debugger; });
    },

    newTaskHandler() {
      //this.removeIfEmpty(this.editedTaskId);

      const tempId = this.tasks.add().id;

      this.selectedTaskId = tempId;
      this.editedTaskId = tempId;
    },

    removeTaskHandler(id) {
      // this.removeIfEmpty(this.editedTaskId);

      const vm = this;

      this.tasks.remove(id);
      if (this.selectedTaskId == id) this.selectedTaskId = null;
      if (this.editedTaskId == id) this.editedTaskId = null;

      tasksService
        .removeTask(id)
        .catch(err => { debugger; });
        
    },

    stopEditHandler() {
      // this.removeIfEmpty(this.editedTaskId);

      const vm = this;
      const bufferId = this.editedTaskId;

      this
        .saveChanges()
        .then(task => {
          vm.tasks.get(bufferId).sync(task);
        })
        .catch(err => { debugger; })

      this.editedTaskId = null;
    },

    selectHandler(id) {
      // this.removeIfEmpty(this.editedTaskId);

      if (id === null) {
        this.detailsShown = false;
      }

      this.selectedTaskId = id;
    },

    startEditHandler(id) {
      // this.removeIfEmpty(this.editedTaskId);
      this.editedTaskId = id;
      this.selectedTaskId = id;
    },

    // removeIfEmpty(id) {

    //   if (id !== null) {
    //     const task = this.tasks.find(t => t.id === id);
    //     if (task.text === '' && task.details === '')
    //       this.removeTaskHandler(task.id);
    //   }
    // },
    
    // reset() {
    //   // Используется ли где-то?
    //   // this.removeIfEmpty(this.editedTaskId);
    //   this.selectedTaskId = null;
    //   this.editedTaskId = null;
    // }
  },
  
  created() {

    this.fetchTasks();

    bus.$on('edit', taskId => {
      this.startEditHandler(taskId);
    });

    bus.$on('select', taskId => {
      this.selectHandler(taskId);
    });

    bus.$on('stopEdit', taskId => {
      this.stopEditHandler(taskId);
    });

    bus.$on('deleteTask', taskId => {
      this.removeTaskHandler(taskId);
    });

    bus.$on('toggleDetails', taskId => {
      this.detailsShown = !this.detailsShown;
      if (typeof taskId !== undefined) {
        this.selectHandler(taskId);
      }
    });

    bus.$on('taskStatusChange', (taskId, value) => {
      this.tasks.get(taskId).isCompleted = value;
      this.saveChanges();
    });
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
