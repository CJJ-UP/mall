import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//路由懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

const routes = [
  {//默认重定向首页
    path: '/',
    redirect: '/home'
  },
  //首页
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  // 分类
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  //购物车
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  //我的
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  //商品详情
  {
    path: '/detail/:iid',
    name: 'detail',
    component: Detail
  }
]

const router = new VueRouter({
  //使用history模式
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
