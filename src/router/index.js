import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Introduction from '@/components/pages/Introduction'
import OrderList from '@/components/pages/OrderList'
import Product from '@/components/pages/Product'

import CustomerCheckout from '@/components/pages/CustomerCheckout'
import Coupon from '@/components/pages/Coupon'
import Body from '@/components/pages/Body'
import ProductList from '@/components/pages/ProductList'
import ShoppingCart from '@/components/pages/ShoppingCart'
import Order from '@/components/pages/Order'
import Manage from '@/components/Manage'
Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        // {
        //     path:'*',//亂打網址
        //     redirect:'/login', //重新導向回登入頁面
        // },
        {
            name:'Home',
            path:'/',
            component:Home,
            children:[
                {        //巣狀 router-view
                    name:'Body',
                    path:'/',
                    component:Body,
                },
                {       
                    name:'ProductList',
                    path:'/product_list',
                    component:ProductList,
                },
                {        
                    name:'ShoppingCart',
                    path:'/shopping_cart',
                    component:ShoppingCart,
                },
                {        
                    name:'Introduction',
                    path:'/introduction',
                    component:Introduction,
                },
                {       
                    name:'Order',
                    path:'/order',
                    component:Order,
                },
                {       
                    name:'CustomerCheckout',
                    path:'/customer_checkout/:orderId',
                    component:CustomerCheckout,
                },
                
            ]
        },
        {
            name:'Login',
            path:'/login',
            component:Login,
        },
        {
            name:'Manage',
            path:'/manage',
            component:Manage,
            children:[
                {        
                    name:'Product',
                    path:'/manage/product',
                    component:Product,
                },
                {        
                    name:'Coupon',
                    path:'/manage/coupon',
                    component:Coupon,
                },
                {        
                    name:'OrderList',
                    path:'/manage/order_list',
                    component:OrderList,
                },
            ]
        },
        
        
    ]
})