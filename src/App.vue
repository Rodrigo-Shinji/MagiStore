<script setup>
import {ref, provide, computed} from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import bgImage from "./assets/imgs/bg.png";

const cartItems = ref([]);

const cartItemCount = computed(() => {
  return cartItems.value.reduce((count, item) => count + item.quantity, 0);
});

const cartTotalPrice = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const addToCart = (product) => {
  const existingItem = cartItems.value.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.value.push({...product, quantity: 1});
  }
  console.log("Carrinho após adicionar:", cartItems.value);
};

const removeFromCart = (productId) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== productId);
  console.log("Carrinho após remover:", cartItems.value);
};

const increaseQuantity = (productId) => {
  const item = cartItems.value.find((item) => item.id === productId);
  if (item) {
    item.quantity++;
  }
  console.log("Carrinho após aumentar quantidade:", cartItems.value);
};

const decreaseQuantity = (productId) => {
  const item = cartItems.value.find((item) => item.id === productId);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    }
  }
  console.log("Carrinho após diminuir quantidade:", cartItems.value);
};

const clearCart = () => {
  cartItems.value = [];
  console.log("Carrinho limpo:", cartItems.value);
};

provide("cartItems", cartItems);
provide("cartItemCount", cartItemCount);
provide("cartTotalPrice", cartTotalPrice);
provide("addToCart", addToCart);
provide("removeFromCart", removeFromCart);
provide("increaseQuantity", increaseQuantity);
provide("decreaseQuantity", decreaseQuantity);
provide("clearCart", clearCart);
</script>

<template>
  <div
    class="min-h-screen flex flex-col w-full bg-cover bg-no-repeat bg-center"
    :style="{backgroundImage: `url(${bgImage})`}"
  >
    <Navbar />

    <div class="container mx-auto px-4 py-6 flex-grow">
      <router-view></router-view>
    </div>

    <Footer />
  </div>
</template>
