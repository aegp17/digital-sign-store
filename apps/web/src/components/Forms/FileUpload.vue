<template>
  <div class="file-upload">
    <div
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
      :class="{ 'border-blue-500 bg-blue-50': file, 'border-red-500': error }"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        :accept="accept"
        @change="handleFileChange"
        class="hidden"
      />
      
      <div v-if="!file" class="space-y-2">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="text-sm text-gray-600">
          <span class="font-medium text-blue-600 hover:text-blue-500">Haz clic para subir</span>
          o arrastra y suelta
        </div>
        <p class="text-xs text-gray-500">
          {{ acceptText }} (máximo {{ maxSize }}MB)
        </p>
      </div>
      
      <div v-else class="space-y-2">
        <svg class="mx-auto h-12 w-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="text-sm font-medium text-gray-900">
          {{ file.name }}
        </div>
        <div class="text-xs text-gray-500">
          {{ formatFileSize(file.size) }}
        </div>
        <button
          type="button"
          @click.stop="removeFile"
          class="text-red-600 hover:text-red-800 text-xs font-medium"
        >
          Eliminar archivo
        </button>
      </div>
    </div>
    
    <p v-if="error" class="mt-2 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue: File | null
  accept?: string
  maxSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  accept: '*/*',
  maxSize: 10
})

const emit = defineEmits<{
  'update:modelValue': [value: File | null]
}>()

const fileInput = ref<HTMLInputElement>()
const file = ref<File | null>(props.modelValue)
const error = ref<string>('')

const acceptText = computed(() => {
  const types = props.accept.split(',').map(type => type.trim())
  if (types.includes('image/*')) return 'Imágenes'
  if (types.includes('video/*')) return 'Videos'
  if (types.includes('application/pdf')) return 'PDFs'
  return 'Archivos'
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const selectedFile = target.files?.[0]
  
  if (!selectedFile) return
  
  // Validate file type
  if (!isValidFileType(selectedFile)) {
    error.value = `Tipo de archivo no válido. Permitidos: ${props.accept}`
    return
  }
  
  // Validate file size
  if (selectedFile.size > props.maxSize * 1024 * 1024) {
    error.value = `El archivo es demasiado grande. Máximo: ${props.maxSize}MB`
    return
  }
  
  error.value = ''
  file.value = selectedFile
  emit('update:modelValue', selectedFile)
}

const removeFile = () => {
  file.value = null
  error.value = ''
  emit('update:modelValue', null)
  
  // Reset input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const isValidFileType = (file: File): boolean => {
  const acceptedTypes = props.accept.split(',').map(type => type.trim())
  
  return acceptedTypes.some(type => {
    if (type === '*/*') return true
    if (type.endsWith('/*')) {
      return file.type.startsWith(type.slice(0, -1))
    }
    return file.type === type
  })
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>
