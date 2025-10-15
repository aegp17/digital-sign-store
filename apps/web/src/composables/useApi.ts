import { ref } from 'vue'
import type { ApiResponse } from '@shared'

export function useApi() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const apiCall = async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<T> = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'API call failed')
      }

      return result.data as T
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

  return {
    isLoading,
    error,
    apiCall,
    clearError,
  }
}
