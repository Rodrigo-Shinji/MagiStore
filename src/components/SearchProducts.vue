<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="pt-24 text-3xl font-bold text-center mb-6 text-[#FFD700]">
      <span
        class="bg-[#5D3F8D] text-[#FFD700] px-3 py-1 rounded-lg text-shadow-md"
      >
        Resultados para "{{ query }}"
      </span>
    </h1>

    <div v-if="loading" class="text-center text-gray-600">
      <p>Carregando resultados...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-600">
      <p>Ocorreu um erro ao carregar os resultados: {{ error.message }}</p>
      <button
        @click="fetchSearchResults"
        class="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Tentar Novamente
      </button>
    </div>

    <div v-else-if="products.length === 0" class="text-center text-gray-600">
      <p>Nenhum produto encontrado para "{{ query }}".</p>
    </div>

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
    >
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>

    <div v-if="products.length > 0" class="flex justify-center gap-4 mt-6">
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
import {ref, computed, watch} from "vue";
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";

const props = defineProps({
  query: {
    type: String,
    required: true,
  },
});

const products = ref([]);
const fullResults = ref([]);
const skip = ref(0);
const limit = 12;
const totalProducts = ref(0);
const loading = ref(true);
const error = ref(null);

const fetchSearchResults = async () => {
  loading.value = true;
  error.value = null;
  fullResults.value = [];
  products.value = [];

  try {
    const response = await axios.get(
      "https://dummyjson.com/products?limit=100"
    );

    const filtered = response.data.products.filter((p) =>
      p.title.toLowerCase().includes(props.query.toLowerCase())
    );

    fullResults.value = filtered.map((p) => ({
      id: p.id,
      name: p.title,
      price: p.price,
      category: p.category,
      image: p.thumbnail,
      description: p.description,
    }));

    totalProducts.value = fullResults.value.length;
    updatePaginatedProducts();
  } catch (err) {
    console.error("Erro ao buscar resultados:", err);
    error.value = err;
  } finally {
    loading.value = false;
  }
};

const updatePaginatedProducts = () => {
  const start = skip.value;
  const end = skip.value + limit;
  products.value = fullResults.value.slice(start, end);
};

const hasNextPage = computed(() => {
  return skip.value + limit < totalProducts.value;
});

const nextPage = () => {
  if (hasNextPage.value) {
    skip.value += limit;
    updatePaginatedProducts();
  }
};

const previousPage = () => {
  if (skip.value > 0) {
    skip.value = Math.max(0, skip.value - limit);
    updatePaginatedProducts();
  }
};

watch(
  () => props.query,
  (newQuery, oldQuery) => {
    if (newQuery !== oldQuery) {
      skip.value = 0;
      fetchSearchResults();
    }
  },
  {immediate: true}
);
</script>

<style scoped>
.text-shadow-md {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}
</style>
