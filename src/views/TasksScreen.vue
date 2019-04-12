<template lang="pug">

  .flex-cont(v-on:keyup.ctrl.n="")

    button#add.btn-floating.btn-large.waves-effect.waves-light.red(
      type="button",
      @keyup.ctrl.space="test()",
      @click.stop="createTaskHandler()")
      i.material-icons add

    tasks-container(:selectedTaskId="selectedTaskId")

    details-bar(
      :task="selectedTask",
      :isActive="detailsShown")

</template>

<script>

import TasksContainer from '../components/TasksContainer.vue'
import DetailsBar from '../components/DetailsBar.vue'

import tasksService from '../services/tasks'
import Task from '../models/Task';
import bus from '../EventBus.js'

export default {

  name: 'TasksScreen',

  components: {
    TasksContainer,
    DetailsBar
  },

  data() {
    return {
      selectedTaskId: null,
      detailsShown: false
    }
  },

  computed: {
    selectedTask() {
      this.$store.getters['tasks/getById'](this.selectedTaskId);
    },
  },

  methods: {

    createTaskHandler() {

      const vm = this;
      this.$store
        .dispatch('tasks/add')
        .then(task => {
          vm.selectedTaskId = task.id;
        });
    },

    selectHandler(id) {
      // debugger;
      if (id === null) {
        this.detailsShown = false;
      }

      this.selectedTaskId = id;
    },

    toggleDetailsHandler(id) {
      this.detailsShown = !this.detailsShown;
      if (typeof taskId !== undefined) {
        this.selectHandler(taskId);
      }
    }    
  },
  
  created() {
    this.$store.dispatch('tasks/fetch');
    bus.$on('select', this.selectHandler);
    bus.$on('toggleDetails', this.toggleDetails);
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
