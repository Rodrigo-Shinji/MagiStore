<template>
  <div>
    <h1 class="pt-36 pb-4 text-3xl font-bold text-center mb-6 text-[#FFD700]">
      <span
        class="bg-[#5D3F8D] text-[#FFD700] px-3 py-1 rounded-lg text-shadow-md capitalize"
        >Todos os Produtos</span
      >
    </h1>

    <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
      <div class="flex items-center space-x-2">
        <label for="sortBy" class="text-lg text-white">Ordenar por:</label>
        <select
          id="sortBy"
          v-model="sortBy"
          class="p-2 shadow-sm focus:outline-none focus:ring-0 bg-[#4C3073] text-white custom-select hover:border-[#FFD700] transition-colors duration-200"
        >
          <option value="title">Título</option>
          <option value="price">Preço</option>
        </select>
      </div>

      <div class="flex items-center space-x-2">
        <label for="order" class="text-lg text-white">Ordem:</label>
        <select
          id="order"
          v-model="order"
          class="p-2 shadow-sm focus:outline-none focus:ring-0 bg-[#4C3073] text-white custom-select hover:border-[#FFD700] transition-colors duration-200"
        >
          <option value="asc">Crescente</option>
          <option value="desc">Decrescente</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="text-center text-xl text-gray-600">Carregando produtos...</div>
    <div v-else-if="error" class="text-center text-xl text-red-500">Erro ao carregar produtos: {{ error }}</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>

    <div class="flex justify-center gap-4 mt-6">
      <button
        @click="previousPage"
        class="btn bg-[#E6A800] text-white px-4 py-2 rounded hover:bg-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="skip === 0"
      >
        Anterior
      </button>
      <button
        @click="nextPage"
        class="btn bg-[#FFD700] text-white px-4 py-2 rounded hover:bg-[#E6A800] disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!hasNextPage"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";

const products = ref([]);
const skip = ref(0);
const limit = 12;
const totalProducts = ref(0);
const loading = ref(true);
const error = ref(null);

const sortBy = ref('title');
const order = ref('asc');

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip.value}&sortBy=${sortBy.value}&order=${order.value}`
    );

    products.value = response.data.products.map((p) => ({
      id: p.id,
      name: p.title,
      price: p.price,
      category: p.category,
      image: p.thumbnail,
      description: p.description,
    }));

    totalProducts.value = response.data.total;

    console.log("Produtos da página atual:", products.value);
    console.log("Total de produtos na API:", totalProducts.value);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    error.value = "Não foi possível carregar os produtos. Tente novamente mais tarde.";
  } finally {
    loading.value = false;
  }
};

const hasNextPage = computed(() => {
  return skip.value + limit < totalProducts.value;
});

const nextPage = () => {
  if (hasNextPage.value) {
    skip.value += limit;
    fetchProducts();
  }
};

const previousPage = () => {
  if (skip.value > 0) {
    skip.value -= limit;
    if (skip.value < 0) skip.value = 0;
    fetchProducts();
  }
};

onMounted(fetchProducts);

watch([sortBy, order], () => {
  skip.value = 0;
  fetchProducts();
});
</script>

<style scoped>
.custom-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  color: white !important;
}

.custom-select option {
  background-color: #4C3073;
  color: white !important;
}

.custom-select option:checked {
  background-color: #5D3F8D;
  color: #FFD700 !important;
}
</style>
