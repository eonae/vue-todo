<template lang="pug">
  .menu
    div.btns-container(v-if="user.authorized")
      button#tasks.waves-effect.waves-light(@click="tasks()")
        i.material-icons assignment_turned_in
      button#profile.waves-effect.waves-light(@click="profile()")
        i.material-icons account_circle
      button#logout.waves-effect.waves-light(@click="logout()")
        i.material-icons exit_to_app
    div.btns-container(v-else)
      button#login.waves-effect.waves-light.btn.red(@click="login()")
        | Sign In
      button#register.waves-effect.waves-light.btn.yellow.darken-3(@click="register()")
        | Register
</template>

<script>

import bus from '../EventBus';

export default {

  computed: {
    user () {
      return this.$store.state.user;
    }
  },
  
  methods: {
    login () {
      bus.$emit('login');
    },

    register () {
      bus.$emit('register');
    },

    tasks () {
      this.$router.push('/tasks');
    },
    
    logout () {
      this.$store.dispatch('user/logout');
      this.$router.push('/home');
    },
    profile () {
      this.$router.push('/profile');
    }

  }


}
</script>

<style>
  #login, #register {
    font-weight: 700;
    padding: 0 20px;
    height: 56px;
    box-shadow: none;
    border-radius: 0;
  }
  .btns-container {
    height: 100%;
  }
  .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .menu button {
    background: none;
    border: none;
    outline: none;
    height: 100%;
    padding: 0;
  }

  .menu button:focus {
    background: none;
  }

    .menu button:hover {
    background: #323B96;
    color: #F9FFFF;
    cursor: pointer;
  }


  .menu button > i {
    font-size: 40px;
    margin: 0 10px;
    display: block;
    color: white;
    text-decoration: none;
  }

  @media (max-width: 500px) {
    .menu button > i {
      margin: 0 5px;
      font-size: 30px;
    }
    .user {
      font-size: .7em;
      margin-bottom: 7px;
    }
    #login, #register {
      font-size: 0.4em;
      padding: 0 12px;
    }
  }
  .user {
    line-height: 1em;
    margin-right: 10px;
    margin-bottom: 5px;
    /* hack */
  }
</style>
