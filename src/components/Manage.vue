<template>
  <div>
      <AlertMessage/>
      <MagageNavbar/>
      <router-view></router-view>
  </div>
</template>

<script>
import AlertMessage from './AlertMessage'
import MagageNavbar from './ManageNavbar'
export default {
    components:{
        MagageNavbar,
        AlertMessage,
    },
}
</script>

<style>

</style>