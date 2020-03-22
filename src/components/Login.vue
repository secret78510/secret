<template>
  <div>
    <form class="box" @submit.prevent="signin">
      <h1>Login</h1>
    <input type="email"
        placeholder="Email address"
        required
        v-model="user.username">
    <input type="password"
        placeholder="Password"
        required
        v-model="user.password">
    <input type="submit" value="Login">
  </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
        user:{
            username:'',
            password:'',
        }
    };
  },
  methods:{
      signin(){
          const api = `${process.env.APIPATH}/admin/signin`;
          const vm =this;
          this.$http.post(api,vm.user).then(response => {
          if(response.data.success){
              vm.$router.push('/manage/product');
          }
      });
    }
  }
};
</script>


<style scoped>
.box{
    height: 100%;
    width: 100%;
    padding: 50px;
    background-color: #191919; 
    top: 50%;
    left:50%;
    transform: translate(-50% ,-50%);
    position: absolute;
    text-align: center;
}
.box h1{
    text-transform: uppercase;
    font-weight: 500;
    color: white;
}
.box input[type="email"],input[type="password"],input[type="submit"]{
    border: 2px solid #3498db;
    display: block;
    background: none   ;
    margin: 20px auto;
    padding: 14px 10px;
    text-align: center;
    width: 200px;
    color: #fff;
    border-radius: 24px;
    transition: 0.3s;
    outline: none;
}
.box input[type="submit"]{
    width: 100px;
    cursor: pointer;
    width: 150px;
    border-color:   #2ecc71;
}
.box input[type="email"]:focus,input[type="password"]:focus{
    width: 280px;
    border-color:   #2ecc71;
}
.box input[type="submit"]:hover{
    background: #2ecc71;
}
</style>