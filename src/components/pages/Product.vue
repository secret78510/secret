<template>
  <div>
    <!-- vue讀取效果 false 停止 ture 啟用 -->
    <loading :active.sync="isLoading"></loading>
    <div class="container">
    <div class="text-right">
      <button class="btn btn-primary" @click="openModal(true)">建立產品列表</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="120">是否啟用</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td>{{item.origin_price | currency}}</td>
          <td>{{item.price | currency}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁 -->
    <Pagination :childPagination="pagination" @changePage="getProducts"></Pagination>
    <!-- cartIcon Modal -->
    <div
      class="modal fade"
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-info">
            <h5 class="modal-title " id="exampleModalLabel">前往到結帳頁面</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">已挑選完想購買了的商品嗎</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <router-link   class="btn btn-primary" to="/dashboard/customer_order">
              確定
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- productModal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="temProducts.image"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="temProducts.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="temProducts.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="temProducts.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="temProducts.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="temProducts.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="temProducts.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="temProducts.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="temProducts.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="temProducts.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除Modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ temProducts.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
      </div>
</template>


<script>
import $ from "jquery";
import Pagination from "@/components/pages/Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      products: [], //商品列表
      temProducts: {}, //建立商品
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      },
      pagination: {}
    };
  },
  methods: {
    //畫面商品列表
    //預設為第一頁
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        (vm.isLoading = false), (vm.products = response.data.products);
        vm.pagination = response.data.pagination;
      });
    },
    //打開互動視窗
    openModal(isNew, item) {
      if (isNew) {
        this.temProducts = {};
        this.isNew = true;
      } else {
        this.temProducts = Object.assign({}, item); //每次編輯的產品不同 物件傳參考特性
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    delModal(item) {
      this.temProducts = item;
      $("#delProductModal").modal("show");
    },
    delProduct() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/admin/product/${vm.temProducts.id}`;
      this.$http.delete(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          this.getProducts();
        } else {
          $("#delProductModal").modal("hide");
          this.getProducts();
          console.log("新增失敗");
        }
      });
    },
    //互動視窗裡面要新增的商品列表
    updateProduct() {
      let api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/admin/product`;
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        //編輯列表使用的API
        api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/admin/product/${vm.temProducts.id}`;
        httpMethod = "put";
      }
      //post跟put格式
      this.$http[httpMethod](api, { data: vm.temProducts }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#productModal").modal("hide");
          this.getProducts();
        } else {
          $("#productModal").modal("hide");
          this.getProducts();
          console.log("新增失敗");
        }
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0]; //上傳圖片位置
      const vm = this;
      const formData = new FormData(); //使用FormData傳送
      formData.append("file-to-upload", uploadedFile); //上傳name 跟檔案
      vm.status.fileUploading = true; //icon的讀取效果
      const url = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/admin/upload`;
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data" //將表單改成form-data格式
          }
        })
        .then(response => {
          console.log(response.data);
          if (response.data.success) {
            vm.status.fileUploading = false;
            vm.$set(vm.temProducts, "imageUrl", response.data.imageUrl);
            //強制寫入進vm.temProducts.imageUrl
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger");
            //第一個參數會是你要綁定的事件名稱
            //第二個是你要透過這事件傳至父層的資料
          }
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style lang="scss"  scoped>
</style>