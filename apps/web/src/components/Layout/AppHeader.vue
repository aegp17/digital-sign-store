<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">Zelda Sign</span>
          </RouterLink>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <RouterLink 
            to="/" 
            class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/' }"
          >
            Inicio
          </RouterLink>
          <RouterLink 
            to="/request" 
            class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/request' }"
          >
            Solicitar Firma
          </RouterLink>
          <RouterLink 
            to="/status" 
            class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/status' }"
          >
            Consultar Estado
          </RouterLink>
        </nav>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu"
            class="text-gray-600 hover:text-blue-600 p-2 rounded-md"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <RouterLink 
            to="/" 
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            @click="closeMobileMenu"
          >
            Inicio
          </RouterLink>
          <RouterLink 
            to="/request" 
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            @click="closeMobileMenu"
          >
            Solicitar Firma
          </RouterLink>
          <RouterLink 
            to="/status" 
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            @click="closeMobileMenu"
          >
            Consultar Estado
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
