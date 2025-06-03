<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="pt-24 text-3xl font-bold text-center mb-6 text-[#FFD700]">
      <span
        class="bg-[#5D3F8D] text-[#FFD700] px-3 py-1 rounded-lg text-shadow-md capitalize"
        >{{ displayCategoryName }}</span
      >
    </h1>

    <div
      class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8"
    >
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

    <div v-if="loading" class="text-center text-gray-600">
      <p>Carregando produtos...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-600">
      <p>Ocorreu um erro ao carregar os produtos: {{ error.message }}</p>
      <button
        @click="fetchProducts"
        class="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Tentar Novamente
      </button>
    </div>
    <div v-else-if="products.length === 0" class="text-center text-gray-600">
      <p>Nenhum produto encontrado para esta categoria.</p>
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
import {useRoute} from "vue-router";
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";

const route = useRoute();

const products = ref([]);
const skip = ref(0);
const limit = 12;
const totalProducts = ref(0);
const loading = ref(true);
const error = ref(null);

// Novos refs para a ordenação
const sortBy = ref("title");
const order = ref("asc");

const displayCategoryName = computed(() => {
  const categoryParam = route.params.categoryName;
  if (categoryParam) {
    return categoryParam
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return "Categoria";
});

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  products.value = [];

  const category = route.params.categoryName;

  let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip.value}&sortBy=${sortBy.value}&order=${order.value}`;

  if (category) {
    url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip.value}&sortBy=${sortBy.value}&order=${order.value}`;
  }

  try {
    const response = await axios.get(url);

    products.value = response.data.products.map((p) => ({
      id: p.id,
      name: p.title,
      price: p.price,
      category: p.category,
      image: p.thumbnail,
      description: p.description,
    }));

    totalProducts.value = response.data.total;

    console.log(
      `Produtos da categoria '${category || "todos"}' na página atual:`,
      products.value
    );
    console.log(
      "Total de produtos na API para esta categoria:",
      totalProducts.value
    );
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    error.value = err;
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

watch(
  () => route.params.categoryName,
  (newCategoryName, oldCategoryName) => {
    if (newCategoryName !== oldCategoryName) {
      skip.value = 0;
      fetchProducts();
    }
  },
  {immediate: true}
);

// Observa mudanças em sortBy ou order e redefine o skip para 0 antes de buscar os produtos novamente
watch([sortBy, order], () => {
  skip.value = 0; // Reinicia a paginação ao mudar a ordenação
  fetchProducts();
});
</script>

<style scoped>
.text-shadow-md {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  scrollbar-width: none;
}

.custom-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  color: white !important;
}

.custom-select option {
  background-color: #4c3073;
  color: white !important;
}

.custom-select option:checked {
  background-color: #5d3f8d;
  color: #ffd700 !important;
}
</style>
