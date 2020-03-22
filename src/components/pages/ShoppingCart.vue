<template>
  <div>
       <section>
      <div class="img">
          <h3>購物車</h3>
      </div>
    </section>
    <section>
        <div class="container">
        <table class="table">
      <thead>
        <th></th>
        <th>圖片</th>
        <th>品名</th>
        <th>數量</th>
        <th>單價</th>
        <th>小計</th>
      </thead>
      <tbody>
        <tr v-for="item in cart.carts" :key="item.id">
          <td class="align-middle">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="removeCart(item.id)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td class="align-middle " >
              <img :src="item.product.image" style="height:40px;width:40px">
          </td>
          <td class="align-middle">
            {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">
          已套用優惠券
            </div>
          </td>
          <td class="align-middle">{{ item.qty}}/{{ item.product.unit }}</td>
          <td class="align-middle ">{{ item.product.price | currency}}</td>
          <td class="align-middle ">{{ item.final_total  | currency}}</td>
        </tr>
      </tbody>
   
    </table>
    <div class="cart" >
     <p class="text-right" v-if="cart.carts">
         <span >總計共</span><b> {{cart.carts.length}}</b><span>種商品</span>
     </p>
     <p class="text-right">
         總計:{{cart.total | currency}}
     </p>
     <p class="text-right" v-if="cart.final_total !== cart.total">
         折扣價:{{cart.final_total | currency}}
     </p>
     <p class="text-right text-primary">
         (免運費)現金付款
     </p>
      
   <div class="clearfix ">
       <button class="btn btn-outline-primary btn-sm float-right" type="button" @click="addCoupon">套用優惠碼</button>
      <input type="text" class="float-right " width="40%" placeholder="請輸入優惠碼" v-model="couponCode" />
    </div >
      <router-link class="btn btn-primary btn-lg float-right"
      style="margin-top: 15px" type="button" to="/order">結帳去</router-link>
    <div class="clearfix "></div>


       </div>
    </div>
    </section>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      cart:{},
      couponCode:'',
    };
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
    removeCart(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
    addCoupon() {
      const api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code:vm.couponCode
      };
      vm.isLoading = true;
      this.$http.post(api,{data:coupon}).then(response => {
        console.log(response.data);
        vm.getCart();
        vm.isLoading = false;
      });
    },
  },
  created() {
    
    this.getCart();
  }

}
</script>

<style lang="scss" scoped>
.img {
  background-image: url(../../assets/img/productTheme.png);
  width: 100%;
  opacity: 0.5;
  height: 30vw;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  
  h3{
      transform: translateY(80%);
      color: white;
      font-weight: bold;
      font-size: 40px;
  }
}
.cart{
    background-color: #4caf50;
    padding: 20px;
    p{
        margin: 0;
    }
    input[type="text"]{
        border: #34495e 1px solid;
        border-radius: 4px;
        
    }
    input[type="text"]:focus{
        outline: #34495e 3px solid;
        box-shadow: 2px 2px 10px #34495e;
    }
}
</style>