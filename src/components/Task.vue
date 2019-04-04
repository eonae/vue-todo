<template lang="pug">

.todo-item.card(
  @click="clickHandler($event.target)",
  :class="[ this.isSelected ? 'indigo lighten-5' : '', 'todo-item card']")
    label
      input.custom-checkbox(
        type="checkbox",
        :checked="task.done")
      span
    transition
      .input-field(v-if="isBeingEdited")
        input(
          type="text",
          v-model.lazy="task.text",
          v-focus,
          @blur="finishEditing()",
          @keyup.enter="$event.target.blur()")
      .task(v-else) {{ task.text }}

</template>

<script>

export default {

  name: 'Task',

  props: {
    task: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    isBeingEdited: {
      type: Boolean,
      default: false
    }
  },

  directives: {
    focus: {
      inserted(input) {
        input.focus();
      } 
    }
  },

  methods: {
    clickHandler(target) {
      if (target.classList.contains('task')) {
        this.$emit('edit', this.task.id);
      } else if (target.classList.contains('card')) {
        this.$emit('select', (!this.isSelected) ? this.task.id : null)
      }
    },
    finishEditing() {
      console.log('task stop edit')
      this.$emit('finishEditing', {});
    }
  }
}

</script>

<style>

.todo-item {
  width: 100%;
  padding: 2em;
  margin-left: 2px !important;
  display: flex;
  align-items: center;
  overflow: hidden !important;
}

.todo-item:first-child {
  margin-top: 1px;
}

.todo-item input[type="checkbox"]:not(:checked) + span::before {
  width: 25px !important;
  height: 25px !important;
}

.todo-item input[type="checkbox"]:checked + span::before {
  width: 25px !important;
  height: 35px !important;
  left: -15px;
  top: -10px;
  border-right: 3px solid #1A237E !important;
  border-bottom: 3px solid #1A237E !important;
}

.todo-item.red input[type="checkbox"]:not(:checked) + span::before {
  border-color: white !important;
}

.todo-item.red input[type="checkbox"]:checked + span::before {
  border-right-color: white !important;
  border-bottom-color: white !important;
}

.task {
  font-size: 2em;
  margin-left: 10px;
  min-width: 100px;
  min-height: 1em;
  /* white-space: nowrap; */
}

  @media (max-width: 740px) {
    .input-field {
      font-size: 1.2em;
    }
    .task {
      font-size: 1.2em;
    }
  }

.input-field {
  margin: 0 !important;
  width: 80% !important;
}

.input-field > input {
  font-size: 2em !important;
  margin-left: 10px !important;
  margin-bottom: 0 !important;
  width: 100% !important;
  overflow: hidden;
}

</style>
