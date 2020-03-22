<template>
  <div>
      
       <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-model="form.user.email"
            placeholder="請輸入 Email"
            v-validate="'required|email'"
          />
          <span class="text-danger">{{errors.first('email')}}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            v-model="form.user.name"
            placeholder="輸入姓名"
            v-validate="'required'"
          />
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            id="usertel"
            v-model="form.user.tel"
            placeholder="請輸入電話"
          />
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            v-validate="'required'"
            placeholder="請輸入地址"
          />
          <span class="text-danger" v-if="errors.has('address')" >
            地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.user.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
    </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      form:{
        user:{
        name:'',
        email:'',
        tel:'',
        address:'',
        }
      }
    };
  },
  methods: {
    createOrder() {
      const api = `${process.env.APIPATH}/api/${process.env.CUMSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      vm.isLoading = true;
      this.$validator.validate().then((valid) => {
       if (valid) {
        this.$http.post(api,{data:order}).then((response) => {
        console.log('新增訂單',response);
        vm.isLoading = false;
       if(response.data.success){
          vm.$router.push(`/customer_checkout/${response.data.orderId}`)
        }   
      });
         }else {
           console.log('欄位不完整')
           vm.isLoading = false;
       } 
       });
     },
      

  },
  
};
</script>

<style>

</style>