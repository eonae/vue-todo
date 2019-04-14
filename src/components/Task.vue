<template lang="pug">

.todo-item.card(
  @click="select($event)",
  :class="[ this.isSelected ? 'indigo lighten-5 active' : '', 'todo-item card']")
    
    label
      input.custom-checkbox(
        type="checkbox",
        :checked="task.isCompleted",
        @change.stop="modifyStatus($event)")
      span

    transition
      .input-field(v-if="isBeingEdited")
        input(
          type="text",
          :value="task.text",
          v-focus,
          @blur="stopEdit($event)",
          @keyup.enter="$event.target.blur()",
          @keyup.esc="cancelChanges()")
      .task(v-else, @click.stop="edit()") {{ task.text }}

    .btns-group
      button.btn-notes.icon-btn(@click.stop="toggleDetails()")
        i.material-icons subject
      button.btn-delete.icon-btn(@click.stop="deleteTask()")
        i.material-icons delete

</template>

<script>

import bus from '../EventBus.js'

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
    }
  },
  data() {
    return {
      isBeingEdited: false,
      changesCanceled: false
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

    cancelChanges(event) {
      this.changesCanceled = true;
      this.isBeingEdited = false;
    },

    select(event) {
      // В параметр event может прийти undefined, если target был удалён из DOM по v-if
      if (event && event.target.tagName === 'DIV') {
        bus.$emit('select', (!this.isSelected) ? this.task.id : null)
      }
    },
    edit() {
      
      this.isBeingEdited = true;
      if (!this.isSelected) {
        bus.$emit('select', this.task.id);
      }
      bus.$emit('edit', this.task);
    },
    stopEdit(event) {
      if (this.changesCanceled) {
        this.changesCanceled = false;
      } else {
        const text = event.target.value;
        if (text === '' && this.task.isNew) {
          this.$store.commit('tasks/remove', this.task.id);
        } else {
          this.isBeingEdited = false;
          this.modify({ text: event.target.value });
        }
      }
      bus.$emit('edit', null);
    },

    modifyStatus(event) {
      this.modify({ isCompleted: event.target.checked });
    },

    modify(changes) {
      this.$store.dispatch('tasks/modify', { id: this.task.id, changes });
    },

    deleteTask() {
      this.$store.dispatch('tasks/remove', this.task.id);
    },

    toggleDetails() {
      debugger;
      bus.$emit('toggleDetails', this.task.id);
    },
  },

  created() {
    if (this.task.isNew) this.edit();
  }
}

</script>

<style scoped>

.btns-group {
  display: flex;
  align-items: center;
  margin-left: auto;
  transition: 0.5s;
  opacity: 0;
}

.todo-item:hover > .btns-group {
  opacity: 1;
}

.btn-notes {
  display: none;
}

.icon-btn {
  border: none;
  background: none;
  outline: none;
  padding: 2px;
  transition: .5s;
}

@media (max-width: 740px) {
  .btn-notes {
    display: block;
  }
}

.todo-item {
  box-sizing: border-box;
  width: calc(100%-4px);
  padding: 2em;
  margin-left: 2px !important;
  margin-right: 2px !important;
  padding-right: 2% !important;
  display: flex;
  align-items: center;
  overflow: hidden !important;
}

.todo-item:first-child {
  margin-top: 2px;
}

.todo-item:last-child {
  margin-bottom: 3px;
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
  margin-right: 10px;
  min-width: 100px;
  min-height: 1em;
}

@media (max-width: 740px) {
  .input-field {
    font-size: .6em !important;
  }
  .task {
    font-size: 1.2em;
  }
}

.input-field {
  margin: 0 !important;
  width: 75% !important;
}

.input-field > input {
  font-size: 2em !important;
  margin-left: 10px !important;
  margin-bottom: 0 !important;
  width: 100% !important;
  overflow: hidden;
}

</style>
