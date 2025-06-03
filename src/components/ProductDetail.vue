<template>
  <div class="container mx-auto px-4 py-8 pt-36">
    <div
      v-if="product"
      class="bg-[#5D3F8D] rounded-lg shadow-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8"
    >
      <div class="md:w-1/3 flex-shrink-0">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-auto object-contain rounded-lg shadow-md bg-white"
        />
      </div>

      <div class="md:w-2/3">
        <h1 class="text-4xl font-bold text-[#FFD700] mb-4">
          {{ product.name }}
        </h1>
        <p class="text-2xl font-semibold text-white mb-6">
          $ {{ product.price.toFixed(2) }}
        </p>

        <h2 class="text-xl font-semibold text-[#FFD700] mb-2">Descrição:</h2>
        <p class="text-white leading-relaxed mb-4">{{ product.description }}</p>

        <p class="text-white mb-2">
          <strong class="text-[#FFD700]">Categoria:</strong>
          <span class="capitalize">{{ product.category }}</span>
        </p>
        <p class="text-white mb-2">
          <strong class="text-[#FFD700]">Marca:</strong> {{ product.brand }}
        </p>
        <p class="text-white mb-2">
          <strong class="text-[#FFD700]">Avaliação:</strong>
          {{ product.rating }} / 5
        </p>
        <p class="text-white mb-4">
          <strong class="text-[#FFD700]">Em Estoque:</strong>
          {{ product.stock }} unidades
        </p>

        <button
          @click="handleAddToCart"
          class="bg-[#FFD700] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#E6A800] transition-colors duration-200 shadow-md"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
    <div v-else class="text-center text-lg text-gray-700">
      Carregando detalhes do produto...
    </div>
    <div v-if="error" class="text-center text-red-500 mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, inject} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";

const product = ref(null);
const route = useRoute();
const error = ref(null);

const addToCart = inject("addToCart");

const fetchProductDetails = async () => {
  const productId = route.params.id;
  if (!productId) {
    error.value = "ID do produto não fornecido na URL.";
    return;
  }

  try {
    const response = await axios.get(
      `https://dummyjson.com/products/${productId}`
    );
    product.value = {
      id: response.data.id,
      name: response.data.title,
      price: response.data.price,
      category: response.data.category,
      image:
        response.data.images && response.data.images.length > 0
          ? response.data.images[0]
          : response.data.thumbnail,
      description: response.data.description,
      brand: response.data.brand,
      rating: response.data.rating,
      stock: response.data.stock,
      thumbnail: response.data.thumbnail,
    };
  } catch (err) {
    console.error("Erro ao buscar detalhes do produto:", err);
    error.value = "Não foi possível carregar os detalhes do produto.";
  }
};

const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value);
    alert(`${product.value.name} foi adicionado ao carrinho!`);
  }
};

onMounted(fetchProductDetails);
</script>
