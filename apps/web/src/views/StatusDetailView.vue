<template>
  <AppLayout>
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Estado de Solicitud</h1>
          <p class="text-lg text-gray-600">
            Código de referencia: <span class="font-mono font-semibold">{{ reference }}</span>
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="bg-white rounded-lg shadow-md p-8 text-center">
          <svg class="animate-spin mx-auto h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="mt-4 text-gray-600">Cargando información de la solicitud...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-white rounded-lg shadow-md p-8">
          <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">Error al cargar la solicitud</h3>
            <p class="mt-2 text-gray-600">{{ error }}</p>
            <div class="mt-6">
              <button
                @click="fetchStatus"
                class="btn btn-primary"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>

        <!-- Request Details -->
        <div v-else-if="request" class="space-y-6">
          <!-- Status Card -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-900">Estado Actual</h2>
              <span :class="getStatusBadgeClasses(request.status)" class="badge text-sm">
                {{ getStatusLabel(request.status) }}
              </span>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">Estado de Solicitud</p>
                <p class="font-medium">{{ getStatusLabel(request.status) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Estado de Validación</p>
                <p class="font-medium">{{ getValidationStatusLabel(request.validationStatus) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Fecha de Creación</p>
                <p class="font-medium">{{ formatDate(request.createdAt) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Última Actualización</p>
                <p class="font-medium">{{ formatDate(request.updatedAt) }}</p>
              </div>
            </div>
          </div>

          <!-- Observations -->
          <div v-if="request.observations && request.observations.length > 0" class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Observaciones</h3>
            <div class="space-y-3">
              <div
                v-for="(observation, index) in request.observations"
                :key="index"
                class="flex items-start space-x-3 p-3 rounded-lg"
                :class="getObservationClasses(observation.type)"
              >
                <div class="flex-shrink-0">
                  <svg
                    v-if="observation.type === 'INFO'"
                    class="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  <svg
                    v-else-if="observation.type === 'WARNING'"
                    class="w-5 h-5 text-yellow-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium">{{ observation.message }}</p>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ formatDate(observation.createdAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Acciones</h3>
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="fetchStatus"
                :disabled="isLoading"
                class="btn btn-secondary"
              >
                Actualizar Estado
              </button>
              <RouterLink
                to="/request"
                class="btn btn-primary text-center"
              >
                Nueva Solicitud
              </RouterLink>
              <RouterLink
                to="/status"
                class="btn btn-secondary text-center"
              >
                Consultar Otra
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/Layout/AppLayout.vue'
import { useSignatureRequestStore } from '@/stores/signatureRequest'
import type { SignatureRequest } from '@/types'
import { SignatureRequestStatus, ValidationStatus, ObservationType } from '@/types'

const route = useRoute()
const signatureRequestStore = useSignatureRequestStore()

const reference = ref(route.params.reference as string)
const isLoading = ref(false)
const error = ref('')
const request = ref<SignatureRequest | null>(null)

const fetchStatus = async () => {
  if (!reference.value) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    request.value = await signatureRequestStore.fetchRequestStatus(reference.value)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al consultar el estado'
  } finally {
    isLoading.value = false
  }
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

const getValidationStatusLabel = (status: ValidationStatus): string => {
  const labels = {
    PENDING: 'Pendiente',
    MANUALLY_VALIDATING: 'Validación Manual',
    AUTOMATICALLY_VALIDATING: 'Validación Automática',
    ERROR: 'Error',
    REFUSED: 'Rechazado',
    COMPLETED: 'Completado',
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

const getObservationClasses = (type: ObservationType): string => {
  const classes = {
    INFO: 'bg-blue-50 border border-blue-200',
    WARNING: 'bg-yellow-50 border border-yellow-200',
    ALERT: 'bg-red-50 border border-red-200',
  }
  return classes[type] || 'bg-gray-50 border border-gray-200'
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
  fetchStatus()
})
</script>
