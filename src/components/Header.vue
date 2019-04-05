<template lang="pug">

header.card-panel.indigo.darken-4
  button#add.btn-floating.btn-large.waves.waves-effect.waves-light.red(
    type="button",
    @click.stop="newTask()")
    i.material-icons add
  a(href="#" class="brand-logo") MATERIAL TODO

</template>

<script>

import bus from '../EventBus'

export default {
  name: 'TodoHeader',
  methods: {
    newTask() {
      bus.$emit('newTask', {});
    }
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
}

.brand-logo {
  margin: 0 80px;
  color: white;
}

@media (max-width: 740px) {
  header {
    justify-content: center;
  }
  #add {
    left: 100% !important;
    transform: translateX(-100%) translateY(-50%) translateX(-10px) !important;
  }
}

@media (max-width: 400px) {
  .brand-logo {
    font-size: 0.7em;
  }
}

#add {
  position: absolute;
  top: 100% !important;

  left: 10px;
  transform: translateY(-50%);
}

</style>
