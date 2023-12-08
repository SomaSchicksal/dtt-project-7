import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HouseDetails from "../components/HouseDetails"
import HouseForm from "../components/HouseForm"
import MyHouse from "../components/MyHouse"
import EditHouse from "../components/EditHouse"
import FavoritesList from "../views/FavoritesList"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },


  {
    path: '/house/:id',
    name: 'house-details',
    component: HouseDetails
  },

  {
    path: '/houseForm',
    name: 'house-form',
    component: HouseForm
  },

  {
    path: '/myhouseDetails/:index',
    name: 'myhouse-details',
    component: MyHouse
  },

  {
    path: '/myhouseEdit/:index',
    name: 'edit-house',
    component: EditHouse
  },

  {
    path: '/favoritesList',
    name: 'favorites-list',
    component: FavoritesList
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
