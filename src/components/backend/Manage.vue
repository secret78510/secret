<template>
  <div>
      <AlertMessage/>
      <MagageNavbar/>
      <router-view></router-view>
  </div>
</template>

<script>
import AlertMessage from './AlertMessage.vue';
import MagageNavbar from './ManageNavbar.vue';

export default {
  data() {
    return {};
  },
  components: {
    MagageNavbar,
    AlertMessage,
  },
};
</script>

<style>

</style>
