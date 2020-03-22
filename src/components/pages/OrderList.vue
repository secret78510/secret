<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="container pt-5">
    <table class="table mt-5">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in sortOrder" :key="key" :class="{'text-secondary': !item.is_paid}">
          <td>{{ item.create_at | date }}</td>
          <td>
            <span v-text="item.user.email" v-if="item.user"></span>
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                數量：{{ product.qty }}
              
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未起用</span>
          </td>
          <td>
            <button class="btn btn-outline-danger" @click="openCouponModal(item)">修改</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- modal  -->
    <div
      class="modal fade"
      id="ordersModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">訂單資訊</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="name">姓名</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="tempOrder.user.name"
                placeholder="請輸入姓名"
              />
            </div>
            <div class="form-group">
              <label for="email">信箱</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="tempOrder.user.email"
                placeholder="請輸入email"
              />
            </div>
            <div class="form-group">
              <label for="address">地址</label>
              <input
                type="text"
                class="form-control"
                id="address"
                v-model="tempOrder.user.address"
                placeholder="請輸入地址"
              />
            </div>
            <div class="form-group">
              <h4 class="text-info">總價{{tempOrder.total}}</h4>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempOrder.is_paid"
                  id="is_paid"
                />
                <label class="form-check-label" for="is_paid">確認是否付款</label>
              </div>
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateOrders">更新訂單</button>
          </div>
        </div>
      </div>
    </div>
    <Pagination :childPagination="pagination" @changePage="getOrders"></Pagination>
  </div>
  </div>
</template> 

<script>

import $ from 'jquery'
import Pagination from '@/components/pages/Pagination';
export default {
  components: {
    Pagination
  },
  data() {
    return {
      orders: {},
      tempOrder:{
        create_at:0,
        is_paid:0,
        message:'',
        payment_method:'',
        qty:1,
        total:100,
        user:{}
      },
      pagination: {},
      isLoading: false
    };
  },
  methods: {
    //畫面商品列表
    //預設為第一頁
    getOrders(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api, vm.tempProducts).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
        console.log(response);
      });
    },
    updateOrders() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/admin/order/${vm.orders.id}`;
      this.$http.put(api, {data:vm.tempOrder}).then((response) => {
        console.log(response);
        $("#ordersModal").modal("hide");     
        this.getOrders()
      });
    },
    openCouponModal(item) {
      const vm = this;
      $("#ordersModal").modal("show");
        vm.tempOrder  = JSON.parse(JSON.stringify(item));
        console.log(vm.tempOrder)
    }
  },
  computed: {
    sortOrder() {
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const Apaid= a.is_paid ? 1 : 0;
          const Bpaid = b.is_paid ? 1 : 0;
          return Bpaid -Apaid;
        });
      }
      return newOrder;
    },
  },
  created(){
      this.getOrders()
  }
};
</script>