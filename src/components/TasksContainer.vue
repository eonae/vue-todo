<template lang="pug">

div(v-bar)
  main
    transition-group(tag="div" name="tasks")
      task(v-for="item in tasks",
          :key = "item.key",
          :task = "item",
          :isSelected = "selectedTaskId === item.id",
          :isBeingEdited = "editedTaskId === item.id")

</template>

<script>

import Task from './Task.vue';
import tasksService from '../services/tasks';
import auth from '../services/auth';
import {serverUrl} from '../config';

export default {

  props: {
    tasks: Array,
    selectedTaskId: String,
    editedTaskId: String
  },

  components: {
    Task
  },

  created() {
    console.log(this.tasks);
    console.log(this.selectedTaskId);
    console.log(this.editedTaskId);
  }
}

</script>

<style>

.tasks-enter-active, .tasks-leave-active {
  transition: 0.2s !important;
}
.tasks-enter, .tasks-leave-to {
  opacity: 0;
  transform: translateX(100%);
  margin: 0 !important;
  height: 0 !important;
  padding: 0 !important;
}

 .vb > .vb-dragger {
   width: 10px;
   right: 8px;
   /* z-index: 1000; */
 }

 .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    background-color: rgba(48, 121, 244,.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
}

.vb {
  flex-grow: 1;
}
  main {
    box-sizing: border-box;
    padding-right: 2em;
    margin-top: 1px;
    width: 100%;
  }

  @media (max-width: 740px) {
    main {
      margin-right: 0;
    }
  }

</style>
