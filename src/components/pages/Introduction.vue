<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section>
      <div class="img">
        <h3>產品介紹</h3>
      </div>
    </section>
    <section>
      <div class="container my-5">
        <div class="row">
          <div class="col-md-6">
            <img :src="product.image" />
          </div>
          <div class="col-md-6">
            <ul class="list">
              <li>
                <b class="text-primary">商品名稱</b>
                {{product.title}}
              </li>
              <li>
                <b class="text-primary">單位</b>
                {{product.unit}}
              </li>
              <li>
                <b class="text-primary">付款方式</b>
                <i class="far fa-credit-card"></i>
                現金支付
              </li>
              <div class="d-flex justify-content-between">
                <div class="pt-2">
                  <span v-if="product.number">小計{{product.price * product.number | currency}}</span>
                  <span v-else>小計{{product.price | currency }}</span>
                </div>
                <div>
                  <del>原價${{product.origin_price}}</del>
                  <b class="text-success" style="font-size:22px">單價{{product.price | currency}}</b>
                </div>
              </div>
              <div class="row pt-4">
                <div class="col-md-6">
                  <select class="w-100 h-100" name="item" v-model="product.number">
                    <option :value="item" v-for="item in 10" :key="item">選購{{item}}{{product.unit}}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <button
                    type="button"
                    class="btn btn-outline-danger w-100"
                    @click="addCart(product.id,product.number)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem ===product.id"></i>
                    <i class="fas fa-shopping-cart" v-else></i>
                    加入購物車
                  </button>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h4>商品介紹</h4>
        <p>
          知消健離能，相全的我濟少的天服企面之算車。我住候是候熱。動性？
          育內上公何都費血世治色應的後；今說顯但熱高的長選時因國直空水念客別年同代海聽著家有在公了。最來為異竟國今行地資哥利一高兒營總該我著，我人非家物法縣星醫接的機期。
          分了士牛有車感，大定施麗有的：會詩目起月出子無己洋是花頭，思同黑角裡正料：人一果所太、城好中太兩收的數沒在、里我氣行著老今是頭上落生上看河童空致書你名關少極員！不式水教起有精裡待名風性庭一想說，外量只賣車他爾場實裝發因禮腦待。
        </p>
      </div>
    </section>
    <router-link to="/product_list" class="iconTop" title="回到上一頁">
      <i class="fas fa-arrow-up"></i>
    </router-link>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      isLoading: false,
      products: [],
      product: {},
      cart: {},
      status: {
        loadingItem: "" //icon的讀取效果
      },
    };
  },
  methods: {
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/product/${id}`;
      console.log(id);
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        console.log(response.data);
        vm.product = response.data.product;
      });
    },
    addCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty: qty
      };
      this.$http.post(api, { data: cart }).then(response => {
        console.log(response.data);
        vm.status.loadingItem = "";
      });
    }
  },
  created() {
    const localStr = JSON.parse(localStorage.getItem("product"));
    console.log(localStr);
    this.getProduct(localStr);
  }
};
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
  h3 {
    transform: translateY(80%);
    color: white;
    font-weight: bold;
    font-size: 40px;
  }
}
.container img {
  width: 100%;
  height: 25vw;
  background-position: center;
  background-size: cover;
}
.list {
  b {
    width: 100px;
    display: inline-block;
  }
  li {
    list-style: none;
    border-bottom: 1px dotted #4caf50;
    padding: 15px 0;
  }
}
.iconTop {
  transition: all 0.4s;
  position: fixed;
  right: 40px;
  bottom: 40px;
  font-size: 36px;
  color: #4caf50;
}
.iconTop:hover {
  color: #2ecc71;
  transform: scale(1.2);
}
</style>