import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Category from '../views/Category.vue'
import Login from '../views/Login.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import CreateOrder from '../views/CreateOrder.vue'
import User from '../views/User.vue'
import Setting from '../views/Setting.vue'
import Address from '../views/Address.vue'
import AddressEdit from '../views/AddressEdit.vue'
import Order from '../views/Order.vue'
import OrderDetail from '../views/OrderDetail.vue'




const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        index: 1
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        index: 1
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About, 
      meta: {
        index: 2
      }
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
      meta: {
        index: 1
      }
    },
    {
      path: '/product-list',
      name: 'product-list',
      meta: {
        index: 2
      },
      component: ProductList
    },
    {
      path: '/product/:id',
      name: 'product',
      meta: {
        index: 3
      },
      component: ProductDetail
    },
    {
      path: '/cart',
      name: 'cart',
      meta: {
        index: 1
      },
      component: Cart
    },
    {
      path: '/create-order',
      name: 'create-order',
      meta: {
        index: 2
      },
      component: CreateOrder
    },
    {
      path: '/order',
      name: 'order',
      meta: {
        index: 2
      },
      component: Order
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      meta: {
        index: 3
      },
      component: OrderDetail
    },
    {
      path: '/user',
      name: 'user',
      meta: {
        index: 1
      },
      component: User
    },
    {
      path: '/setting',
      name: 'setting',
      meta: {
        index: 2
      },
      component: Setting
    },
    {
      path: '/address',
      name: 'address',
      meta: {
        index: 2
      },
      component: Address
    },
    {
      path: '/address-edit',
      name: 'address-edit',
      meta: {
        index: 3
      },
      component: AddressEdit
    },
  ]
})

export default router