<template lang="pug">

main(data-simplebar)
  task(v-for="item in tasks",
      :key = "item.id",
      :task = "item",
      :isSelected = "selected === item.id",
      :isBeingEdited = "edited === item.id",
      @select = "updateSelection($event)",
      @edit = "updateSelection($event, true)",
      @finishEditing = "finishEditing()")

</template>

<script>

import Task from './Task.vue'
import tasks from '../tasks.js'

export default {

  props: {
    selected: Number,
    edited: Number
  },

  data: function () {
    return {
      tasks
    }
  },

  components: {
    Task
  },
  methods: {

    updateSelection(id, edit) {
      if (id === null) {
        this.$emit('reset');
      } else {
        if (edit) {
          this.$emit('edit', id);
        } else {
          this.$emit('select', id);
        }        
      }
    },

    finishEditing() {
      this.$emit('finishEditing', {});
    }

  }
}

</script>

<style>

  main {
    flex: 1 1 0;
    padding-right: 1em;
    padding-bottom: 5em;
    margin-right: .5em;
    margin-top: 1px;
    /* overflow-y: scroll; */
  }

  main .simplebar-wrapper {

    height: 100px;
    width: 100px;
    /* костыль, но работает */
  }

  @media (max-width: 740px) {
    main {
      margin-right: 0;
    }
  }


</style>
