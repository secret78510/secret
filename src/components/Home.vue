<template>
  <div>
      <Navbar/>
          <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Alert from './AlertMessage'
import Footer from './Footer'
export default {
    components:{
        Navbar,
        Alert,
        Footer,
    }
};
</script>
