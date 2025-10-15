<template>
  <div class="phone-input">
    <label class="form-label">{{ label }}</label>
    <div class="flex space-x-2">
      <!-- Country Code -->
      <div class="flex-shrink-0">
        <select
          v-model="countryCode"
          class="form-input w-24"
          :class="{ 'border-red-500': error }"
        >
          <option value="+593">🇪🇨 +593</option>
          <option value="+1">🇺🇸 +1</option>
          <option value="+52">🇲🇽 +52</option>
          <option value="+57">🇨🇴 +57</option>
          <option value="+51">🇵🇪 +51</option>
          <option value="+56">🇨🇱 +56</option>
          <option value="+54">🇦🇷 +54</option>
          <option value="+55">🇧🇷 +55</option>
        </select>
      </div>
      
      <!-- Phone Number -->
      <div class="flex-1">
        <input
          v-model="phoneNumber"
          type="tel"
          class="form-input"
          :class="{ 
            'border-red-500': error || (phoneNumber && !isValidPhone),
            'border-green-500': phoneNumber && isValidPhone
          }"
          :placeholder="placeholder"
          :maxlength="maxLength"
          required
        />
      </div>
    </div>
    
    <!-- Error Messages -->
    <p v-if="error" class="form-error">
      {{ error }}
    </p>
    <p v-if="phoneNumber && !isValidPhone && !error" class="form-error">
      {{ getValidationMessage() }}
    </p>
    <p class="text-xs text-gray-500 mt-1">
      {{ getFormatHint() }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  error?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Número de Teléfono',
  placeholder: '912345678',
  required: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const countryCode = ref('+593')
const phoneNumber = ref('')

// Computed
const fullPhoneNumber = computed(() => {
  return countryCode.value + phoneNumber.value
})

const isValidPhone = computed(() => {
  if (!phoneNumber.value) return false
  
  switch (countryCode.value) {
    case '+593':
      return /^9\d{8}$/.test(phoneNumber.value)
    case '+1':
      return /^\d{10}$/.test(phoneNumber.value)
    case '+52':
      return /^\d{10}$/.test(phoneNumber.value)
    case '+57':
      return /^\d{10}$/.test(phoneNumber.value)
    case '+51':
      return /^\d{9}$/.test(phoneNumber.value)
    case '+56':
      return /^\d{9}$/.test(phoneNumber.value)
    case '+54':
      return /^\d{10}$/.test(phoneNumber.value)
    case '+55':
      return /^\d{11}$/.test(phoneNumber.value)
    default:
      return phoneNumber.value.length >= 8
  }
})

const maxLength = computed(() => {
  switch (countryCode.value) {
    case '+593':
      return 9
    case '+1':
      return 10
    case '+52':
      return 10
    case '+57':
      return 10
    case '+51':
      return 9
    case '+56':
      return 9
    case '+54':
      return 10
    case '+55':
      return 11
    default:
      return 15
  }
})

// Methods
const getValidationMessage = (): string => {
  switch (countryCode.value) {
    case '+593':
      return 'Número inválido: debe empezar con 9 y tener 9 dígitos'
    case '+1':
      return 'Número inválido: debe tener 10 dígitos'
    case '+52':
      return 'Número inválido: debe tener 10 dígitos'
    case '+57':
      return 'Número inválido: debe tener 10 dígitos'
    case '+51':
      return 'Número inválido: debe tener 9 dígitos'
    case '+56':
      return 'Número inválido: debe tener 9 dígitos'
    case '+54':
      return 'Número inválido: debe tener 10 dígitos'
    case '+55':
      return 'Número inválido: debe tener 11 dígitos'
    default:
      return 'Número inválido'
  }
}

const getFormatHint = (): string => {
  switch (countryCode.value) {
    case '+593':
      return 'Formato: 9 + 8 dígitos (ej: 912345678)'
    case '+1':
      return 'Formato: 10 dígitos (ej: 1234567890)'
    case '+52':
      return 'Formato: 10 dígitos (ej: 1234567890)'
    case '+57':
      return 'Formato: 10 dígitos (ej: 1234567890)'
    case '+51':
      return 'Formato: 9 dígitos (ej: 123456789)'
    case '+56':
      return 'Formato: 9 dígitos (ej: 123456789)'
    case '+54':
      return 'Formato: 10 dígitos (ej: 1234567890)'
    case '+55':
      return 'Formato: 11 dígitos (ej: 12345678901)'
    default:
      return 'Ingresa el número de teléfono'
  }
}

// Watchers
watch(fullPhoneNumber, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    // Parse existing phone number
    if (newValue.startsWith('+593')) {
      countryCode.value = '+593'
      phoneNumber.value = newValue.substring(4)
    } else if (newValue.startsWith('+1')) {
      countryCode.value = '+1'
      phoneNumber.value = newValue.substring(2)
    } else if (newValue.startsWith('+52')) {
      countryCode.value = '+52'
      phoneNumber.value = newValue.substring(3)
    } else if (newValue.startsWith('+57')) {
      countryCode.value = '+57'
      phoneNumber.value = newValue.substring(3)
    } else if (newValue.startsWith('+51')) {
      countryCode.value = '+51'
      phoneNumber.value = newValue.substring(3)
    } else if (newValue.startsWith('+56')) {
      countryCode.value = '+56'
      phoneNumber.value = newValue.substring(3)
    } else if (newValue.startsWith('+54')) {
      countryCode.value = '+54'
      phoneNumber.value = newValue.substring(3)
    } else if (newValue.startsWith('+55')) {
      countryCode.value = '+55'
      phoneNumber.value = newValue.substring(3)
    } else {
      // Default to Ecuador
      countryCode.value = '+593'
      phoneNumber.value = newValue.replace(/^\+593/, '')
    }
  }
}, { immediate: true })
</script>
