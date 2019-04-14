<template lang="pug">

  modal-window(title="Register")
    form(name="register")
      div.inputs-container
        .input-field.col.s12
          input.validate(v-model="credentials.username", id="username", type="text", @input="failed = false")
          label(for="username") User name
        .input-field.col.s12
          input.validate(v-model="credentials.email", id="email", type="email", @input="failed = false")
          label(for="username") Email

        .input-field.col.s12
          input.validate(v-model="credentials.password", id="pwd", type="password", @input="failed = false")
          label(for="pwd") Password
        .input-field.col.s12
          input.validate(v-model="credentials.passwordConfirmation", id="pwd-conf", type="password", @input="failed = false")
          label(for="username") Confirm password


        .register-failed(v-if="failed") {{ failMessage }}

      modal-actions(
        :actions="actions"
        )

</template>

<script>

import bus from '../EventBus'
import Modal from '../components/ModalWindow.vue'
import { STATUS_CODES } from '../constants';

export default {

  data() {
    return {
      credentials: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },

      failed: false,
      failMessage: '',
      
      actions: {
        ok: {
          name: 'sign up',
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
      debugger;
      if (this.credentials.password !== this.credentials.passwordConfirmation) {
        this.failMessage = "Passwords don't match!";
        this.failed = true;
      } else {
        this.$store
          .dispatch('user/register', this.credentials)
          .then(() => {
            debugger;
            bus.$emit('register-success', this.credentials.username);
            this.$emit('close');
          })
          .catch(err => {
            debugger;
            if (err == STATUS_CODES.FORBIDDEN) {
              this.failMessage = 'Username is already taken!';
              this.failed = true;
            }
            else debugger;
          });
      }

      
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
  .register-failed {
    color: crimson;
    font-size: 0.7em;
    font-weight: 700;
    text-align: center;
  }
</style>
