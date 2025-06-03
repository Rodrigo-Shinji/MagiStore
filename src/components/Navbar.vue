<template>
  <nav
    class="fixed top-0 w-full z-50 bg-[#2A1A4C] px-6 py-4 text-white shadow-lg"
  >
    <div class="container mx-auto flex items-center justify-between flex-wrap">
      <router-link to="/" class="flex items-center">
        <img :src="logoImg" alt="Logo MagiStore" class="max-h-24 max-w-24" />
      </router-link>

      <div
        class="hidden md:flex items-center flex-grow max-w-xl mx-auto relative"
      >
        <div
          class="flex w-full bg-[#4C3073] rounded-full overflow-hidden shadow-inner"
        >
          <input
            type="search"
            placeholder="Buscar..."
            class="flex-grow px-4 py-2 bg-transparent text-white placeholder-gray-300 focus:outline-none custom-search-input"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />

          <button
            @click="handleSearch"
            class="bg-[#FFD700] px-4 py-2 hover:bg-[#E6A800] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex items-center md:hidden">
        <button @click="toggleMobileSearch" class="text-white mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
        <label for="menu-toggle" class="cursor-pointer text-white">
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>

      <ul class="hidden md:flex space-x-6 items-center ml-auto">
        <li>
          <router-link to="/" class="hover:text-[#C5B3F6]">Home</router-link>
        </li>

        <li class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center hover:text-[#C5B3F6] focus:outline-none transition-colors"
          >
            Categorias
            <svg
              class="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <transition name="fade">
            <ul
              v-if="isDropdownOpen"
              class="absolute mt-2 w-48 rounded-lg bg-[#3C2763] py-2 shadow-lg z-50 max-h-64 overflow-y-auto hide-scrollbar"
            >
              <li v-for="cat in categories" :key="cat">
                <a
                  href="#"
                  @click.prevent="selectCategory(cat)"
                  class="block px-4 py-2 text-white hover:bg-[#5D3F8D]"
                  >{{ cat.charAt(0).toUpperCase() + cat.slice(1) }}</a
                >
              </li>
            </ul>
          </transition>
        </li>

        <li>
          <router-link
            to="/cart"
            class="relative text-white hover:text-[#C5B3F6]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>

            <span
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"
              >{{ cartItemCount }}</span
            >
          </router-link>
        </li>
      </ul>

      <input type="checkbox" id="menu-toggle" class="peer hidden" />

      <div
        class="hidden peer-checked:flex md:hidden flex-col mt-4 w-full bg-[#2A1A4C] py-2 rounded-md shadow-lg"
      >
        <ul class="space-y-2">
          <li>
            <router-link
              to="/"
              class="block px-4 py-2 hover:bg-[#5D3F8D] rounded-md"
              @click="closeMobileMenu"
              >Início</router-link
            >
          </li>
          <li>
            <button
              @click="toggleMobileDropdown"
              class="w-full text-left px-4 py-2 flex items-center justify-between hover:bg-[#5D3F8D] rounded-md"
            >
              Categorias
              <svg
                class="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="isMobileDropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'"
                />
              </svg>
            </button>
            <ul
              v-if="isMobileDropdownOpen"
              class="bg-[#3C2763] pl-4 py-2 rounded-md transition-all duration-300 ease-in-out max-h-64 overflow-y-auto hide-scrollbar"
              :class="{
                'opacity-100': isMobileDropdownOpen,
                'max-h-0 opacity-0': !isMobileDropdownOpen,
              }"
            >
              <li v-for="cat in categories" :key="cat">
                <a
                  href="#"
                  @click.prevent="selectCategory(cat)"
                  class="block px-4 py-2 text-white hover:bg-[#5D3F8D] rounded-md"
                  >{{ cat.charAt(0).toUpperCase() + cat.slice(1) }}</a
                >
              </li>
            </ul>
          </li>
          <li>
            <router-link
              to="/cart"
              class="block px-4 py-2 hover:bg-[#5D3F8D] rounded-md"
              @click="closeMobileMenu"
              >Carrinho
              <span
                v-if="cartItemCount > 0"
                class="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 inline-flex items-center justify-center"
                >{{ cartItemCount }}</span
              >
            </router-link>
          </li>
        </ul>
      </div>

      <div
        v-if="isMobileSearchOpen"
        class="md:hidden w-full mt-4 relative transition-all duration-300 ease-in-out"
        :class="{
          'opacity-100 max-h-screen': isMobileSearchOpen,
          'opacity-0 max-h-0': !isMobileSearchOpen,
        }"
      >
        <div
          class="flex w-full bg-[#4C3073] rounded-full overflow-hidden shadow-inner"
        >
          <input
            type="search"
            placeholder="Buscar..."
            class="flex-grow px-4 py-2 bg-transparent text-white placeholder-gray-300 focus:outline-none custom-search-input"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
          <button
            @click="handleSearch"
            class="bg-[#FFD700] px-4 py-2 hover:bg-[#E6A800] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import logoImg from "../assets/imgs/logo.png";
import { ref, onMounted, watch, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const currentRoute = useRoute();

const cartItemCount = inject("cartItemCount");

const categories = ref([]);
const isDropdownOpen = ref(false);
const isMobileDropdownOpen = ref(false);
const isMobileSearchOpen = ref(false);
const searchQuery = ref("");

let searchTimeout = null;
const DEBOUNCE_DELAY = 500;

const fetchCategories = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products/category-list");
    categories.value = res.data;
  } catch (e) {
    console.error("Erro ao buscar categorias:", e);
  }
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  isMobileDropdownOpen.value = false;
  isMobileSearchOpen.value = false;
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    menuToggle.checked = false;
  }
};

const toggleMobileDropdown = () => {
  isMobileDropdownOpen.value = !isMobileDropdownOpen.value;
  isDropdownOpen.value = false;
  isMobileSearchOpen.value = false;
};

const toggleMobileSearch = () => {
  isMobileSearchOpen.value = !isMobileSearchOpen.value;
  isDropdownOpen.value = false;
  isMobileDropdownOpen.value = false;
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    menuToggle.checked = false;
  }
};

const closeMobileMenu = () => {
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    menuToggle.checked = false;
  }
  isMobileDropdownOpen.value = false;
  isMobileSearchOpen.value = false;
};

const selectCategory = (category) => {
  isDropdownOpen.value = false;
  isMobileDropdownOpen.value = false;
  closeMobileMenu();
  router.push({ name: "category-products", params: { categoryName: category } });
};

const handleSearch = () => {
  const trimmedQuery = searchQuery.value.trim();
  if (trimmedQuery) {
    clearTimeout(searchTimeout);
    router.push({ name: "search-results", query: { q: trimmedQuery } });
    closeMobileMenu();
    isMobileSearchOpen.value = false;
  }
};

watch(searchQuery, (newQuery) => {
  clearTimeout(searchTimeout);

  const trimmedQuery = newQuery.trim();

  if (!trimmedQuery) {
    return;
  }

  searchTimeout = setTimeout(() => {
    if (
      currentRoute.name !== "search-results" ||
      currentRoute.query.q !== trimmedQuery
    ) {
      router.push({ name: "search-results", query: { q: trimmedQuery } });
      closeMobileMenu();
      isMobileSearchOpen.value = false;
    }
  }, DEBOUNCE_DELAY);
});

onMounted(() => {
  fetchCategories();
  if (currentRoute.name === "search-results" && currentRoute.query.q) {
    searchQuery.value = currentRoute.query.q;
  }
});
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  scrollbar-width: none;
}

.custom-search-input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1.25rem;
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.5rem;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;
}

.custom-search-input::-webkit-search-cancel-button:hover {
  opacity: 1;
}

.custom-search-input::-moz-search-clear-button {
  -moz-appearance: none;
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1.25rem;
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.5rem;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;
}

.custom-search-input::-moz-search-clear-button:hover {
  opacity: 1;
}

.custom-search-input::-ms-clear {
  display: block;
  width: 1.75rem;
  height: 1.75rem;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1.25rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;
}

.custom-search-input::-ms-clear:hover {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.max-h-0 {
  max-height: 0;
  overflow: hidden;
}
.max-h-screen {
  max-height: 100vh;
}
</style>
