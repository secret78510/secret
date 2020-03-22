<template>
  <div>
    <section>
      <div class="img"></div>
    </section>
    <section>
      <loading :active.sync="isLoading"></loading>
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <div class="sticky-top">
              <h5 class="text-secondary">商品分類</h5>
              <ul class="Sidebar-menu">
                <li>
                  <a href="#" @click.prevent="category =''">全部商品</a>
                </li>
                <li>
                  <a href="#" @click.prevent="category ='蔬菜'">蔬菜</a>
                </li>
                <li>
                  <a href="#" @click.prevent="category ='水果'">水果</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-md-9">
            <div class="row">
              <div class="col-md-6 my-4" v-for="item in filteredTodo" :key="item.id">
                <div class="card border-0 shadow-sm">
                  <div
                    style="height: 200px; background-size: cover; background-position: center"
                    :style="{backgroundImage: `url(${item.image})`}"
                  ></div>
                  <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                      <a href="#" class="text-dark">{{item.titile}}</a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <!-- 沒特價顯示原價 -->
                      <div class="h5" v-if="!item.price">{{item.origin_price | currency}}</div>
                      <!-- 特價就兩個都顯示 -->
                      <del class="h6" v-if="item.price">{{item.origin_price | currency}}</del>
                      <div class="h5" v-if="item.price">{{item.price | currency}}</div>
                    </div>
                  </div>
                  <div class="card-footer d-flex">
                    <button
                      type="button"
                      class="btn btn-outline-secondary btn-sm"
                      @click="getProduct(item.id)"
                    >
                      <!-- icon讀取效果點擊時ID相等才觸發 -->
                      <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                      查看更多
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm ml-auto"
                      @click="addCart(item.id)"
                    >
                      <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                      加到購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <router-link to="/shopping_cart" class="iconBottom" title="結帳去">
      <i class="fas fa-shopping-cart"></i>
      <small class="text-danger" v-if="cart.carts">{{cart.carts.length}}</small>
    </router-link>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      isLoading: false,
      products: {},
      status: {
        loadingItem: "" //icon的讀取效果
      },
      cart: {},
      category: ""
    };
  },
  computed: {
    filteredTodo() {
      let newProducts = {};
      if (this.category === "蔬菜") {
        for (let i in this.products) {
          if (this.products[i].category === "蔬菜") {
            newProducts[i] = this.products[i];
          }
        }
        console.log(newProducts);
        return newProducts;
      } else if (this.category === "水果") {
        for (let i in this.products) {
          if (this.products[i].category === "水果") {
            newProducts[i] = this.products[i];
          }
        }
        return newProducts;
      } else {
        return this.products;
      }
    }
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/admin/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        console.log(vm.products);
      });
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.product = response.data.product;
        vm.status.loadingItem = "";
        localStorage.setItem("product", JSON.stringify(vm.product.id));
        vm.$router.push("/introduction");
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
    },
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

  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>

<style lang="scss" scoped>
.img {
  background-image: url(../../assets/img/productTheme.png);
  width: 100%;
  height: 35vw;
  background-position: center;
  background-size: cover;
}
@media (max-width: 767.98px) {
  h5 {
    text-align: center;
  }
}

.Sidebar-menu {
  position: sticky;
  display: flex;
  flex-direction: column;
  padding: 0;

  li {
    list-style: none;
    border: 2px solid;
    border-color: #34495e #4caf50 #4caf50 #34495e;
    border-radius: 20px;
    padding: 8px;
    margin-bottom: 8px;
    text-align: center;
    transition: all 0.4s;
    a {
      display: block;
      text-decoration: none;
    }
  }
  li:hover {
    background-color: #34495e;
    a {
      color: #ffffff;
    }
  }
}
.iconBottom{
  transition: all 0.4s;
  position: fixed;
  right: 30px;
  bottom: 40px;
  font-size: 22px;
  color: #4caf50;
  text-decoration: none;
}
.iconBottom:hover{
  color: #2ecc71;
  transform: scale(1.2);
}

</style>