import {createRouter, createWebHistory} from "vue-router";
import HomeView from "/src/views/Home.vue";
import ProductDetail from "/src/components/ProductDetail.vue";
import ProductsByCategories from "/src/views/ProductsByCategories.vue";
import SearchProducts from "/src/components/SearchProducts.vue";
import Cart from "/src/components/Cart.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: ProductDetail,
    props: true,
  },
  {
    path: "/category/:categoryName",
    name: "category-products",
    component: ProductsByCategories,
  },
  {
    path: "/search",
    name: "search-results",
    component: SearchProducts,
    props: (route) => ({query: route.query.q}),
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
