<template lang="pug">

footer.card-panel.indigo.darken-4
  // button#add.btn-floating.btn-large.waves.waves-effect.waves-light.red(
  //   type="button",
  //   @click="newTask()")
  //   i.material-icons add
  a(href="#" class="brand-logo")

</template>

<script>

export default {
  name: 'TodoFooter'
}

</script>

<style scoped>

footer {
  position: absolute;
  width: 100%;
  height: 56px;
  left: 0;
  top: 100%;
  transform: translateY(-100%);
  padding: 0;
  display: flex;
  align-items: center;
}

.brand-logo {
  margin-left: 80px;
}

@media (max-width: 992px) {
  .brand-logo {
    margin: 0;
  }
}

#add {
  position: fixed !important;
  top: 56px;
  left: 10px;
  transform: translateY(-50%);
  z-index: 9000;
}

@media (min-width: 601px) {
  #add {
    top: 64px;
  }
}

</style>
