<template lang="pug">

header.card-panel.indigo.darken-4
  a(href="#" class="brand-logo")
    span EONAE 
    | TODO
  main-menu

</template>

<script>

import MainMenu from './MainMenu.vue'

export default {
  name: 'TodoHeader',
  components: {
    MainMenu
  }
}

</script>

<style scoped>

header {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 56px;
  left: 0;
  top: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-logo {
  flex-grow: 1;
  margin-left: 80px;
  color: white;
}

@media (max-width: 640px) {
  header {
    justify-content: flex-end;
  }
  .brand-logo {
    font-size: .7em;
  }
}

@media (max-width: 500px) {
  .brand-logo span{
    display: none;
  }
}

</style>
