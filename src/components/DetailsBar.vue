<template lang="pug">

aside.card
  div.card-panel.red.details-header
    div Notes
    button#hideDetails.btn-floating.btn-large.waves-effect.waves-light.red(type="button" @click="emitHide()")
      i.material-icons send
  .details-content(data-simplebar)
    .textarea-wrapper
      textarea#notes.materialize-textarea(
        name="details",
        maxlength="50",
        placeholder="Put your notes here..")

</template>

<script>

import simplebar from 'simplebar';

export default {
  name: 'DetailsBar',

  // props: {
  //   task: {
  //     type: Object,
  //     required: true
  //   }
  // },

  methods: {
    emitHide () {
      console.log('hide!');
      this.$emit('hide', {});
    }
  }
}
</script>

<style>


.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.details-content {
  width: 100%;
  max-height: 120px;
  padding: 5%;
  padding-right: 10%;
}

aside {
  margin: 0;
  flex: 0 0 30%;
  overflow: hidden;
  margin-top: 1px !important;
  margin-bottom: 2px !important;
  margin-right: 1px !important;
  display: flex !important;
  flex-direction: column;
}

  @media (max-width: 740px) {
    aside {
      position: absolute !important;
      top: 100% !important;
      left: 0 !important;
      width: 100%;
      transform: translateY(-100%);
      flex-direction: row !important;
      z-index: 1000;
    }
    .details-header {
      font-size: 1.7em !important;
      padding: 20px !important;

    }

    #hideDetails {
      position: fixed !important;
      left: 100%;
      transform: translateX(-100%) translateY(10%) translateX(-10px);
      height: 30px;
      width: 30px;
    }
    #hideDetails > i {
      font-size: 1em !important;
      line-height: 30px !important;
      transform: translateY(-32%);
      /* и снова хак*/
    }
    .textarea-wrapper {
      width: 90%;
    }
    textarea {
      width: 100% !important;
    }

  }

.card-panel {
  margin: 0 !important;
  color: white;
  font-size: 30px;
  padding: .5em;
}

</style>
