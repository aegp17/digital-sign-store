import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Catalog, ApiResponse } from '@shared'

export const useCatalogsStore = defineStore('catalogs', () => {
  const catalogs = ref<Catalog>({
    provinces: [],
    cities: [],
    periods: [],
    applicationTypes: [],
  })
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchCatalogs = async (): Promise<Catalog> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/catalogs`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<Catalog> = await response.json()
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to fetch catalogs')
      }

      catalogs.value = result.data
      
      return result.data
    } catch (err) {
      // Fallback to mock data if API fails
      catalogs.value = getMockCatalogs()
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
      
      return catalogs.value
    } finally {
      isLoading.value = false
    }
  }

  const getMockCatalogs = (): Catalog => {
    return {
      provinces: [
        { id: '1', name: 'Pichincha', code: 'PIC' },
        { id: '2', name: 'Guayas', code: 'GUA' },
        { id: '3', name: 'Azuay', code: 'AZU' },
        { id: '4', name: 'Manabí', code: 'MAN' },
        { id: '5', name: 'El Oro', code: 'ORO' },
        { id: '6', name: 'Los Ríos', code: 'LOS' },
        { id: '7', name: 'Chimborazo', code: 'CHI' },
        { id: '8', name: 'Tungurahua', code: 'TUN' },
        { id: '9', name: 'Imbabura', code: 'IMB' },
        { id: '10', name: 'Loja', code: 'LOJ' },
      ],
      cities: [
        { id: '1', name: 'Quito', code: 'UIO', provinceId: '1' },
        { id: '2', name: 'Guayaquil', code: 'GYE', provinceId: '2' },
        { id: '3', name: 'Cuenca', code: 'CUE', provinceId: '3' },
        { id: '4', name: 'Manta', code: 'MAN', provinceId: '4' },
        { id: '5', name: 'Machala', code: 'MAC', provinceId: '5' },
        { id: '6', name: 'Babahoyo', code: 'BAB', provinceId: '6' },
        { id: '7', name: 'Riobamba', code: 'RIB', provinceId: '7' },
        { id: '8', name: 'Ambato', code: 'AMB', provinceId: '8' },
        { id: '9', name: 'Ibarra', code: 'IBA', provinceId: '9' },
        { id: '10', name: 'Loja', code: 'LOJ', provinceId: '10' },
      ],
      periods: [
        'ONE_WEEK',
        'ONE_MONTH',
        'ONE_YEAR',
        'TWO_YEARS',
        'THREE_YEARS',
        'FOUR_YEARS',
        'FIVE_YEARS',
      ],
      applicationTypes: [
        'NATURAL_PERSON',
        'LEGAL_REPRESENTATIVE',
      ],
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    catalogs,
    isLoading,
    error,
    fetchCatalogs,
    clearError,
  }
})
