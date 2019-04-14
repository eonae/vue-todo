<template lang="pug">

div(v-bar)
    main
      transition-group(, tag="div" name="tasks")
        task(v-for="task in tasks",
            :key = "task.key",
            :task = "task",
            :isSelected = "selectedTaskId === task.id")
      transition(name="empty")
        .no-tasks(v-if="isEmpty") Nothing no show
      
</template>

<script>

import Task from './Task.vue';
import tasksService from '../services/tasks';
import auth from '../services/auth';
import {serverUrl} from '../config';

export default {

  props: {
    selectedTaskId: String
  },

  computed: {
    tasks() {
      return this.$store.state.tasks.list;
    },
    isEmpty() {
      return this.tasks.length < 1;
    }
  },

  components: {
    Task
  }
}

</script>

<style>

.empty-enter-active, .empty-leave-active {
  transition: 0.2s !important;
}

.empty-enter, .empty-leave-to {
  opacity: 0;
}

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
    margin: 0;
    height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0;
    height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
}

.vb {
  flex-grow: 1;
}

main {
  box-sizing: border-box !important;
  width: 100%;
  padding-right: 2em !important;
  margin-top: 1px;
  min-height: 100%;
  position: relative;
}

@media (max-width: 740px) {
  main {
    margin-right: 0;
    padding-right: 0 !important;
  }
  
  .vb > .vb-dragger {
   width: 6px;
   right: -20px;
   /* Убрать с экрана  */
   /* z-index: 1000; */
 }
}

.no-tasks {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
  font-weight: 700;
  opacity: .1;
  min-width: 280px;
  text-align: center;
  padding-right: 20px;
}

</style>
