<template lang="pug">

header.card-panel.indigo.darken-4
  a(href="#" class="brand-logo") EONAE TODO

</template>

<script>

import bus from '../EventBus'

export default {
  name: 'TodoHeader'
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
}

@media (max-width: 400px) {
  .brand-logo {
    font-size: 0.7em;
  }
}

</style>
