<template>
  <AppLayout>
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Términos y Condiciones</h1>
          <p class="text-lg text-gray-600">
            Conoce los términos y condiciones del servicio de firma electrónica
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="bg-white rounded-lg shadow-md p-8 text-center">
          <svg class="animate-spin mx-auto h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="mt-4 text-gray-600">Cargando términos y condiciones...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-white rounded-lg shadow-md p-8">
          <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">Error al cargar los términos</h3>
            <p class="mt-2 text-gray-600">{{ error }}</p>
            <div class="mt-6">
              <button
                @click="fetchTerms"
                class="btn btn-primary"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>

        <!-- Terms Content -->
        <div v-else class="bg-white rounded-lg shadow-md p-8">
          <div class="prose prose-lg max-w-none" v-html="termsContent"></div>
          
          <!-- Actions -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <RouterLink
                to="/request"
                class="btn btn-primary"
              >
                Continuar con Solicitud
              </RouterLink>
              <RouterLink
                to="/"
                class="btn btn-secondary"
              >
                Volver al Inicio
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import AppLayout from '@/components/Layout/AppLayout.vue'
import { useTermsStore } from '@/stores/terms'

const termsStore = useTermsStore()

const isLoading = computed(() => termsStore.isLoading)
const error = computed(() => termsStore.error)
const termsContent = computed(() => termsStore.termsContent)

const fetchTerms = () => {
  termsStore.fetchTerms()
}

onMounted(() => {
  fetchTerms()
})
</script>
