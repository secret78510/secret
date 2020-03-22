<template>
  <div>
    <nav class="navbar navbar-expand-md fixed-top navbar-light bg-primary">
      <div class="container">
      <img src="../assets/img/secret-logo.png" alt />
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item ">
            <router-link class="nav-link  text-white scale" to="/">
             首頁
            </router-link>
           
          </li>
          <li class="nav-item ">
            <router-link class="nav-link text-white scale" to="/product_list">產品列表</router-link>
          
          </li>
        </ul>
        <ul class="account-nav" >
          <li class="nav-item ">
            <router-link class="nav-link  text-white scale" to="/shopping_cart">
              <i class="fas fa-shopping-cart"></i>
              購物車<span v-if="cart.carts">({{cart.carts.length}})</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link scale" to="/login">
              <i class="fas fa-cog"></i>
              登入</router-link>
          </li>
        </ul>
      </div>
          </div>
    </nav>
  </div>
</template>

<script>
export default {
  data(){
    return{
      cart:{}
    }
  },
  methods: {
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.cart = response.data.data;
      })
    },
  },
  created(){
    this.getCart();
  }
}
</script>

<style lang="scss" scoped>

.account-nav{
  display: flex;
  margin-bottom: 0;
  li{
    list-style: none;
    display: flex;
    a{
      color: #fff;
    }
  }
}

.account-nav li:last-child:not(i)::before{
  content: '/';
  display: flex;
  color:#fff;
  padding: 0.5rem 0;
  width: 0;
  margin: 0;
}
.scale:hover{
  transition: all 0.4s;
  transform: scale(1.2);
  color: #4caf50 !important; 

}
@media (max-width: 767.98px) { 
 
  .nav-item{
    display: flex;
    justify-content: center;
    border-bottom: 1px solid  #4caf50;
  }
  .account-nav{
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    .nav-item{
      border-bottom:0;
    }
  } 
 }
</style>