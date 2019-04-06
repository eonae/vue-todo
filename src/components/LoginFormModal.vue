<template lang="pug">

  modal-window(title="Sign In")
    form(name="login", action="")
      div.inputs-container
        .input-field.col.s12
          input.validate(v-model="loginData.email", id="email", type="email")
          label(for="email") Email

        .input-field.col.s12
          input.validate(v-model="loginData.password", id="pwd", type="password")
          label(for="pwd") Password

      modal-actions(
        :actions="actions"
        )

</template>

<script>

import bus from '../EventBus'
import Modal from '../components/ModalWindow.vue'

export default {

  methods: {
    submit() {
      bus.$emit('loginAttempt', this.loginData);
      console.log('submit');
      this.$emit('close');
    },
    cancel() {
      this.$emit('close');
    }
  },
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      },
      actions: {
        ok: {
          name: 'ok',
          disabled: false,
          func: this.submit
        },
        cancel: {
          name: 'cancel',
          disabled: false,
          func: this.cancel
        }
      }
    }
  }
}
</script>

<style scoped>

  .inputs-container {
    margin-bottom: 2em !important;
  }
  .input-field > input {
    font-size: 2em !important;
  }
</style>
