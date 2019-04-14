<template lang="pug">

  modal-window(title="Sign In")
    form(name="login")
      div.inputs-container
        .input-field.col.s12
          input.validate(v-model="loginData.username", id="username", type="text", @input="failed = false")
          label(for="username") User name

        .input-field.col.s12
          input.validate(v-model="loginData.password", id="pwd", type="password", @input="failed = false")
          label(for="pwd") Password

        .login-failed(v-if="failed") Invalid username or password!

      modal-actions(
        :actions="actions"
        )

</template>

<script>

import bus from '../EventBus'
import Modal from './ModalWindow.vue'
import { STATUS_CODES } from '../constants';

export default {

  data() {
    return {
      loginData: {
        username: '',
        password: ''
      },

      failed: false,
      
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
  },

  methods: {
    submit() {
      this.$store
        .dispatch('user/login', this.loginData)
        .then(() => {
          this.$emit('close');
          this.$router.push('/tasks');
        })
        .catch(err => {
          if (err == STATUS_CODES.FORBIDDEN)
            this.failed = true;
          else debugger;
        });
    },
    cancel() {
      this.$emit('close');
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
  .login-failed {
    color: crimson;
    font-size: 0.7em;
    font-weight: 700;
    text-align: center;
  }
</style>
