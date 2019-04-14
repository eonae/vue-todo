<template lang="pug">

  .home-content.card
    .central
      .greetings
        | Best TODO list ever made by
        br
        | Geek University student!

    login-form-modal(v-if="loginFormActive" @close="loginFormActive = false")
    register-form-modal(v-if="registerFormActive" @close="registerFormActive = false")
    message-box(
      v-if="messageBox.active"
      :props="messageBox.data"
      @close="messageBox.active = false")

</template>

<script>

import bus from '../EventBus'
import LoginFormModal from '../components/LoginFormModal.vue'
import RegisterFormModal from '../components/RegisterFormModal.vue'
import MessageBox from '../components/MessageBox.vue'

export default {
  components: {
    LoginFormModal,
    RegisterFormModal,
    MessageBox
  },
  data() {
    return {
      loginFormActive: false,
      registerFormActive: false,
      messageBox: {
        active: false,
        data: {}
      }
    }
  },
  methods: {

    showLoginForm() {
      this.loginFormActive = true;
    },
    showRegisterForm() {
      this.registerFormActive = true;
    },
    showMessageBox(props) {
      debugger;
      this.messageBox.active = true;
      this.messageBox.data = props;
    }
  },
  created() {

    bus.$on('login', this.showLoginForm.bind(this));
    bus.$on('register', this.showRegisterForm.bind(this));

    bus.$on('register-success', function(username) {
      msgBoxHelper(this, username);
    }.bind(this))
  }
}

function msgBoxHelper(vm, username) {
  const props = {
    title: 'Success!',
    content: `You were registered successfully <span>${username}</span>, now you can log in.`,
    callback: function() {
      this.showLoginForm();
    }.bind(vm)
  }
  debugger;
  vm.showMessageBox(props);
}

</script>

<style>
  
.home-content {
  width: calc(100%-4px);
  margin: 0 2px !important;
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
