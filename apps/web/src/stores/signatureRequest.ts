import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SignatureRequest, ApiResponse } from '@shared'

export const useSignatureRequestStore = defineStore('signatureRequest', () => {
  const requests = ref<SignatureRequest[]>([])
  const currentRequest = ref<SignatureRequest | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const createRequest = async (formData: FormData): Promise<SignatureRequest> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/requests`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<SignatureRequest> = await response.json()
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to create request')
      }

      currentRequest.value = result.data
      requests.value.push(result.data)
      
      return result.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchRequestStatus = async (referenceTransaction: string): Promise<SignatureRequest> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/requests/${referenceTransaction}/status`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<SignatureRequest> = await response.json()
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to fetch request status')
      }

      currentRequest.value = result.data
      
      return result.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const clearCurrentRequest = () => {
    currentRequest.value = null
  }

  return {
    requests,
    currentRequest,
    isLoading,
    error,
    createRequest,
    fetchRequestStatus,
    clearError,
    clearCurrentRequest,
  }
})
