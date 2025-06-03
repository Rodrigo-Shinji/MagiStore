<template>
  <div class="container mx-auto px-4 py-8 pt-36 min-h-screen">
    <h1 class="text-4xl font-bold text-[#FFD700] mb-8 text-center">Carrinho</h1>

    <div
      v-if="cartItems.length === 0 && !purchaseCompleted"
      class="bg-[#3C2763] rounded-lg shadow-xl p-8 text-center text-white"
    >
      <p class="text-xl mb-4">
        Seu carrinho está vazio. Que tal explorar nossos produtos?
      </p>
      <router-link
        to="/"
        class="bg-[#FFD700] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#E6A800] transition-colors duration-200 shadow-md inline-block"
      >
        Voltar para a Loja
      </router-link>
    </div>

    <div
      v-else-if="purchaseCompleted"
      class="bg-[#3C2763] rounded-lg shadow-xl p-8 text-center text-white"
    >
      <p class="text-3xl font-bold text-[#FFD700] mb-4">
        Compra finalizada com sucesso!!!
      </p>
      <p class="text-xl mb-6">Obrigado por sua preferência!!!</p>
      <router-link
        to="/"
        class="bg-[#FFD700] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#E6A800] transition-colors duration-200 shadow-md inline-block"
      >
        Continuar Comprando
      </router-link>
    </div>

    <div v-else class="bg-[#3C2763] rounded-lg shadow-xl p-8">
      <div
        class="hidden md:grid grid-cols-5 gap-4 pb-4 border-b border-gray-600 font-bold text-[#FFD700] text-lg mb-4"
      >
        <div class="col-span-2">Produto</div>
        <div class="text-center">Preço</div>
        <div class="text-center">Quantidade</div>
        <div class="text-right">Subtotal</div>
      </div>

      <div
        v-for="item in cartItems"
        :key="item.id"
        class="grid grid-cols-1 md:grid-cols-5 gap-4 py-4 border-b border-gray-700 last:border-b-0 items-center"
      >
        <div
          class="col-span-2 flex items-center flex-col md:flex-row text-center md:text-left"
        >
          <img
            :src="item.thumbnail"
            :alt="item.title"
            class="w-24 h-24 object-cover rounded-lg mr-4 mb-4 md:mb-0 shadow-md bg-white"
          />
          <span class="text-white text-lg font-semibold">{{ item.title }}</span>
        </div>

        <div class="text-center text-white text-lg">
          $ {{ item.price.toFixed(2) }}
        </div>

        <div class="flex items-center justify-center text-white">
          <button
            @click="decreaseQuantity(item.id)"
            class="bg-[#2A1A4C] text-[#FFD700] px-3 py-1 rounded-l-md hover:bg-[#4C3073] transition-colors duration-200"
          >
            -
          </button>
          <span class="px-4 py-1 border-y border-[#4C3073] bg-[#4C3073]">{{
            item.quantity
          }}</span>
          <button
            @click="increaseQuantity(item.id)"
            class="bg-[#2A1A4C] text-[#FFD700] px-3 py-1 rounded-r-md hover:bg-[#4C3073] transition-colors duration-200"
          >
            +
          </button>
        </div>

        <div
          class="flex items-center justify-end text-white text-lg font-semibold gap-4"
        >
          <span class="mr-4"
            >$ {{ (item.price * item.quantity).toFixed(2) }}</span
          >
          <button
            @click="removeFromCart(item.id)"
            class="text-red-400 hover:text-red-600 transition-colors duration-200"
            title="Remover item"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="mt-8 text-right text-white">
        <p class="text-2xl font-bold mb-4">
          Total:
          <span class="text-[#FFD700]">$ {{ cartTotalPrice.toFixed(2) }}</span>
        </p>

        <div class="flex flex-col sm:flex-row justify-end gap-4">
          <button
            @click="clearCart"
            class="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md"
          >
            Limpar Carrinho
          </button>
          <button
            @click="completePurchase"
            class="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {inject, ref} from "vue";

const cartItems = inject("cartItems");
const cartItemCount = inject("cartItemCount");
const cartTotalPrice = inject("cartTotalPrice");
const addToCart = inject("addToCart");
const removeFromCart = inject("removeFromCart");
const increaseQuantity = inject("increaseQuantity");
const decreaseQuantity = inject("decreaseQuantity");
const clearCart = inject("clearCart");

const purchaseCompleted = ref(false);

const completePurchase = () => {
  clearCart();
  purchaseCompleted.value = true;
};
</script>

<style scoped></style>
