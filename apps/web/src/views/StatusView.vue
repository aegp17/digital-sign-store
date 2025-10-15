<template>
  <AppLayout>
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Consultar Estado de Solicitud</h1>
          <p class="text-lg text-gray-600">
            Ingresa tu código de referencia para consultar el estado de tu solicitud
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="form-label">Código de Referencia *</label>
              <input
                v-model="referenceCode"
                type="text"
                class="form-input"
                :class="{ 'border-red-500': error }"
                placeholder="Ej: REF1234567890ABC"
                required
              />
              <p v-if="error" class="form-error">
                {{ error }}
              </p>
            </div>

            <button
              type="submit"
              :disabled="!referenceCode || isLoading"
              class="w-full btn btn-primary py-3"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Consultando...
              </span>
              <span v-else>Consultar Estado</span>
            </button>
          </form>
        </div>

        <!-- Recent Requests -->
        <div v-if="recentRequests.length > 0" class="mt-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Solicitudes Recientes</h2>
          <div class="space-y-4">
            <div
              v-for="request in recentRequests"
              :key="request.id"
              class="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              @click="goToRequestStatus(request.referenceTransaction)"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">
                    {{ request.referenceTransaction }}
                  </h3>
                  <p class="text-sm text-gray-600">
                    Creado el {{ formatDate(request.createdAt) }}
                  </p>
                </div>
                <div class="flex items-center space-x-2">
                  <span :class="getStatusBadgeClasses(request.status)" class="badge">
                    {{ getStatusLabel(request.status) }}
                  </span>
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/components/Layout/AppLayout.vue'
import { useSignatureRequestStore } from '@/stores/signatureRequest'
import type { SignatureRequest } from '@/types'
import { SignatureRequestStatus } from '@/types'

const router = useRouter()
const signatureRequestStore = useSignatureRequestStore()

const referenceCode = ref('')
const isLoading = ref(false)
const error = ref('')
const recentRequests = ref<SignatureRequest[]>([])

const handleSubmit = async () => {
  if (!referenceCode.value) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    await signatureRequestStore.fetchRequestStatus(referenceCode.value)
    router.push(`/status/${referenceCode.value}`)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al consultar el estado'
  } finally {
    isLoading.value = false
  }
}

const goToRequestStatus = (reference: string) => {
  router.push(`/status/${reference}`)
}

const getStatusLabel = (status: SignatureRequestStatus): string => {
  const labels = {
    REGISTERED: 'Registrado',
    VALIDATING: 'Validando',
    REFUSED: 'Rechazado',
    ERROR: 'Error',
    APPROVED: 'Aprobado',
    GENERATED: 'Generado',
    EXPIRED: 'Expirado',
  }
  return labels[status] || status
}

const getStatusBadgeClasses = (status: SignatureRequestStatus): string => {
  const classes = {
    REGISTERED: 'badge-info',
    VALIDATING: 'badge-warning',
    REFUSED: 'badge-error',
    ERROR: 'badge-error',
    APPROVED: 'badge-success',
    GENERATED: 'badge-success',
    EXPIRED: 'badge-warning',
  }
  return classes[status] || 'badge-info'
}

const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(() => {
  // Load recent requests from store
  recentRequests.value = signatureRequestStore.requests.slice(0, 5)
})
</script>
