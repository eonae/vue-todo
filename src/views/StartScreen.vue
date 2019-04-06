<template lang="pug">

  .home-content.card
    .central
      .greetings
        | Best TODO list ever made by
        br
        | Geek University student!

      button.btn-continue.action-button.btn-large.red(
        v-if="loggedIn"
      ) CONTINUE
      button.action-button.btn-large.yellow.darken-3.btn-start(
        v-else
        @click="showLoginForm()"
      ) GET STARTED

    login-form-modal(v-if="loginFormActive" @close="hideLoginForm()")

</template>

<script>

import bus from '../EventBus'
import LoginFormModal from '../components/LoginFormModal.vue'

export default {
  components: {
    LoginFormModal
  },
  computed: {
    loggedIn() {
      return bus.loggedIn;
    }
  },
  data() {
    return {
      loginFormActive: false
    }
  },
  methods: {
    login() {
      bus.login();

    },
    logout() {
      bus.logout();
    },
    showLoginForm() {
      console.log('show login form!');
      this.loginFormActive = true;
    },
    hideLoginForm() {
      this.loginFormActive = false;
    }
  }
}

</script>

<style>
  
.home-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.central {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.greetings {
  font-size: 2.9em;
  font-style: italic;
  margin-bottom: 5vh;
  text-align: center;
}

@media (min-height: 600px) {
  .central {
    transform: translateY(-10%);
  }
}

@media (max-width: 740px) {
  .greetings {
    font-size: 2.2em;
    margin-bottom: 4vh;
  }
}

@media (max-width: 500px) {
  .greetings {
    font-size: 1.4em;
    margin-bottom: 3vh;
  }
}

.action-button {
  display: block;
}


</style>
