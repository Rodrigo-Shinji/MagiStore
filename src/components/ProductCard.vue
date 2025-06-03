<template>
  <router-link
    :to="`/product/${product.id}`"
    class="block rounded-lg p-4 text-black shadow-md bg-[#5D3F8D] hover:bg-[#8E7CCB] hover:shadow-xl cursor-pointer transition-all duration-200"
  >
    <img
      :src="product.image"
      :alt="product.name"
      class="mx-auto mb-2 h-20 object-contain"
    />

    <h2 class="text-center capitalize font-bold text-[#FFD700] truncate">
      {{ product.name }}
    </h2>

    <p class="text-center text-sm uppercase text-white">
      ${{ product.price.toFixed(2) }}
    </p>
  </router-link>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  product: Object,
});
</script>

<style scoped>
.object-contain {
  object-fit: contain;
}

.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
