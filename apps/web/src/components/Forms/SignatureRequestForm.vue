<template>
  <form @submit.prevent="handleSubmit" class="space-y-8">
    <!-- Personal Information Step -->
    <div v-if="currentStep === 1" class="space-y-6">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Información Personal</h2>
        <p class="text-gray-600">Ingresa tus datos personales para la solicitud</p>
        <div class="flex gap-2 justify-center">
          <button
            type="button"
            @click="fillMockData"
            class="mt-4 btn btn-secondary text-sm"
          >
            📝 Llenar con datos de ejemplo
          </button>
          <button
            type="button"
            @click="debugValidation"
            class="mt-4 btn btn-secondary text-sm"
          >
            🔍 Debug Validación
          </button>
          <button
            type="button"
            @click="currentStep = 3"
            class="mt-4 btn btn-secondary text-sm"
          >
            ⏭️ Ir a Pago (Test)
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Identification Number -->
        <div>
          <label class="form-label">Número de Identificación *</label>
          <input
            v-model="formData.identificationNumber"
            type="text"
            maxlength="10"
            class="form-input"
            :class="{ 
              'border-red-500': formData.identificationNumber && formData.identificationNumber.length < 10,
              'border-green-500': formData.identificationNumber && formData.identificationNumber.length === 10
            }"
            placeholder="Ej: 1234567890"
            required
          />
          <p v-if="formData.identificationNumber && formData.identificationNumber.length < 10" class="form-error">
            Mínimo 10 caracteres ({{ formData.identificationNumber.length }}/10)
          </p>
          <p v-if="errors.identificationNumber" class="form-error">
            {{ errors.identificationNumber }}
          </p>
        </div>

        <!-- Finger Code -->
        <div>
          <label class="form-label">Código de Huella *</label>
          <input
            v-model="formData.fingerCode"
            type="text"
            maxlength="10"
            class="form-input"
            :class="{ 
              'border-red-500': formData.fingerCode && !isValidFingerCode(formData.fingerCode),
              'border-green-500': formData.fingerCode && isValidFingerCode(formData.fingerCode)
            }"
            placeholder="Ej: ABC1234567"
            required
          />
          <p v-if="formData.fingerCode && !isValidFingerCode(formData.fingerCode)" class="form-error">
            Código inválido: debe tener exactamente 10 caracteres, mínimo 1 mayúscula y 6 dígitos
          </p>
          <p v-if="errors.fingerCode" class="form-error">
            {{ errors.fingerCode }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            10 caracteres alfanuméricos, mínimo 1 mayúscula y 6 dígitos ({{ formData.fingerCode.length }}/10)
          </p>
        </div>

        <!-- Email -->
        <div>
          <label class="form-label">Correo Electrónico *</label>
          <input
            v-model="formData.emailAddress"
            type="email"
            maxlength="100"
            class="form-input"
            :class="{ 'border-red-500': errors.emailAddress }"
            placeholder="tu@email.com"
            required
          />
          <p v-if="errors.emailAddress" class="form-error">
            {{ errors.emailAddress }}
          </p>
        </div>

        <!-- Cellphone -->
        <div>
          <PhoneInput
            v-model="formData.cellphoneNumber"
            label="Número de Celular *"
            placeholder="912345678"
            :error="errors.cellphoneNumber"
          />
        </div>

        <!-- Province -->
        <div>
          <label class="form-label">Provincia *</label>
          <select
            v-model="formData.province"
            class="form-input"
            :class="{ 'border-red-500': errors.province }"
            @change="formData.city = ''"
            required
          >
            <option value="">Selecciona una provincia</option>
            <option v-for="province in catalogs.provinces" :key="province.code" :value="province.code">
              {{ province.name }}
            </option>
          </select>
          <p v-if="errors.province" class="form-error">
            {{ errors.province }}
          </p>
        </div>

        <!-- City -->
        <div>
          <label class="form-label">Ciudad *</label>
          <select
            v-model="formData.city"
            class="form-input"
            :class="{ 'border-red-500': errors.city }"
            :disabled="!formData.province"
            required
          >
            <option value="">Selecciona una ciudad</option>
            <option v-for="city in filteredCities" :key="city.code" :value="city.code">
              {{ city.name }}
            </option>
          </select>
          <p v-if="errors.city" class="form-error">
            {{ errors.city }}
          </p>
        </div>

        <!-- Address -->
        <div class="md:col-span-2">
          <label class="form-label">Dirección *</label>
          <textarea
            v-model="formData.address"
            rows="3"
            class="form-input"
            :class="{ 'border-red-500': errors.address }"
            placeholder="Ingresa tu dirección completa"
            minlength="15"
            maxlength="100"
            required
          ></textarea>
          <p v-if="errors.address" class="form-error">
            {{ errors.address }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            Mínimo 15 caracteres, máximo 100 ({{ formData.address.length }}/100)
          </p>
        </div>

        <!-- Application Type -->
        <div>
          <label class="form-label">Tipo de Solicitud *</label>
          <select
            v-model="formData.applicationType"
            class="form-input"
            :class="{ 'border-red-500': errors.applicationType }"
            required
          >
            <option value="">Selecciona el tipo</option>
            <option value="NATURAL_PERSON">Persona Natural</option>
            <option value="LEGAL_REPRESENTATIVE">Representante Legal</option>
          </select>
          <p v-if="errors.applicationType" class="form-error">
            {{ errors.applicationType }}
          </p>
        </div>

        <!-- Period -->
        <div>
          <label class="form-label">Período de Validez *</label>
          <select
            v-model="formData.period"
            class="form-input"
            :class="{ 'border-red-500': errors.period }"
            required
          >
            <option value="">Selecciona el período</option>
            <option value="ONE_WEEK">Una Semana</option>
            <option value="ONE_MONTH">Un Mes</option>
            <option value="ONE_YEAR">Un Año</option>
            <option value="TWO_YEARS">Dos Años</option>
            <option value="THREE_YEARS">Tres Años</option>
            <option value="FOUR_YEARS">Cuatro Años</option>
            <option value="FIVE_YEARS">Cinco Años</option>
          </select>
          <p v-if="errors.period" class="form-error">
            {{ errors.period }}
          </p>
        </div>
      </div>

      <!-- Legal Representative Fields -->
      <div v-if="formData.applicationType === 'LEGAL_REPRESENTATIVE'" class="space-y-6 border-t pt-6">
        <h3 class="text-lg font-semibold text-gray-900">Información de Representación Legal</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- RUC -->
          <div>
            <label class="form-label">RUC *</label>
            <input
              v-model="formData.ruc"
              type="text"
              maxlength="13"
              class="form-input"
              :class="{ 'border-red-500': errors.ruc }"
              placeholder="1234567890001"
              required
            />
            <p v-if="errors.ruc" class="form-error">
              {{ errors.ruc }}
            </p>
          </div>

          <!-- Company Name -->
          <div>
            <label class="form-label">Nombre de la Empresa *</label>
            <input
              v-model="formData.companyName"
              type="text"
              maxlength="200"
              class="form-input"
              :class="{ 'border-red-500': errors.companyName }"
              placeholder="Nombre de la empresa"
              required
            />
            <p v-if="errors.companyName" class="form-error">
              {{ errors.companyName }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Documents Step -->
    <div v-if="currentStep === 2" class="space-y-6">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Documentos Requeridos</h2>
        <p class="text-gray-600">Sube los documentos necesarios para la validación</p>
        <button
          type="button"
          @click="fillMockFiles"
          class="mt-4 btn btn-secondary text-sm"
        >
          📁 Simular carga de archivos
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Identification Front -->
        <div>
          <label class="form-label">Cédula de Identidad (Frente) *</label>
          <FileUpload
            v-model="formData.identificationFront"
            accept="image/jpeg,image/png"
            :max-size="5"
            :class="{ 'border-red-500': errors.identificationFront }"
          />
          <p v-if="errors.identificationFront" class="form-error">
            {{ errors.identificationFront }}
          </p>
        </div>

        <!-- Identification Back -->
        <div>
          <label class="form-label">Cédula de Identidad (Reverso) *</label>
          <FileUpload
            v-model="formData.identificationBack"
            accept="image/jpeg,image/png"
            :max-size="5"
            :class="{ 'border-red-500': errors.identificationBack }"
          />
          <p v-if="errors.identificationBack" class="form-error">
            {{ errors.identificationBack }}
          </p>
        </div>

        <!-- Selfie -->
        <div>
          <label class="form-label">Selfie con Cédula *</label>
          <FileUpload
            v-model="formData.selfie"
            accept="image/jpeg,image/png"
            :max-size="5"
            :class="{ 'border-red-500': errors.selfie }"
          />
          <p v-if="errors.selfie" class="form-error">
            {{ errors.selfie }}
          </p>
        </div>

        <!-- Authorization Video -->
        <div>
          <label class="form-label">Video de Autorización *</label>
          <FileUpload
            v-model="formData.authorizationVideo"
            accept="video/mp4"
            :max-size="10"
            :class="{ 'border-red-500': errors.authorizationVideo }"
          />
          <p v-if="errors.authorizationVideo" class="form-error">
            {{ errors.authorizationVideo }}
          </p>
        </div>
      </div>

      <!-- Identity Certificate -->
      <div class="flex items-center space-x-3">
        <input
          v-model="formData.isIdentityCertificate"
          type="checkbox"
          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label class="text-sm text-gray-700">
          Certificado de identidad requerido
        </label>
      </div>
    </div>

    <!-- Payment Step -->
    <div v-if="currentStep === 3" class="space-y-6">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Proceso de Pago</h2>
        <p class="text-gray-600">Simulación del proceso de pago</p>
      </div>

      <div class="max-w-md mx-auto">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Resumen de la Solicitud</h3>
          
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Tipo de Solicitud:</span>
              <span class="font-medium">{{ getApplicationTypeLabel(formData.applicationType) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Período de Validez:</span>
              <span class="font-medium">{{ getPeriodLabel(formData.period) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Certificado de Identidad:</span>
              <span class="font-medium">{{ formData.isIdentityCertificate ? 'Sí' : 'No' }}</span>
            </div>
            <hr class="my-3">
            <div class="flex justify-between text-lg font-semibold">
              <span>Total a Pagar:</span>
              <span class="text-blue-600">$25.00</span>
            </div>
          </div>

          <div class="mt-6">
            <button
              type="button"
              @click="simulatePayment"
              :disabled="isProcessingPayment"
              class="w-full btn btn-primary py-3"
            >
              <span v-if="isProcessingPayment" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </span>
              <span v-else>Proceder al Pago</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Terms Step -->
    <div v-if="currentStep === 4" class="space-y-6">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Términos y Condiciones</h2>
        <p class="text-gray-600">Lee y acepta los términos para continuar</p>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-6 max-h-96 overflow-y-auto">
          <div class="prose prose-sm max-w-none" v-html="termsContent"></div>
        </div>

        <div class="mt-6 flex items-center space-x-3">
          <input
            v-model="formData.acceptedTerms"
            type="checkbox"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            required
          />
          <label class="text-sm text-gray-700">
            He leído y acepto los términos y condiciones *
          </label>
        </div>
        <p v-if="errors.acceptedTerms" class="form-error mt-2">
          {{ errors.acceptedTerms }}
        </p>
      </div>
    </div>

    <!-- Validation Status -->
    <div v-if="currentStep === 1" class="bg-gray-50 rounded-lg p-4 mb-6">
      <h4 class="text-sm font-medium text-gray-900 mb-2">Estado de Validación:</h4>
      <div class="grid grid-cols-2 gap-2 text-xs">
        <div class="flex items-center">
          <span :class="formData.identificationNumber ? 'text-green-600' : 'text-red-600'">●</span>
          <span class="ml-1">ID</span>
        </div>
        <div class="flex items-center">
          <span :class="formData.fingerCode ? 'text-green-600' : 'text-red-600'">●</span>
          <span class="ml-1">Huella</span>
        </div>
        <div class="flex items-center">
          <span :class="formData.emailAddress ? 'text-green-600' : 'text-red-600'">●</span>
          <span class="ml-1">Email</span>
        </div>
        <div class="flex items-center">
          <span :class="formData.cellphoneNumber ? 'text-green-600' : 'text-red-600'">●</span>
          <span class="ml-1">Teléfono</span>
        </div>
        <div class="flex items-center">
          <span :class="formData.province ? 'text-green-600' : 'text-red-600'">●</span>
          <span class="ml-1">Provincia</span>
        </div>
        <div class="flex items-center">
          <span :class="formData.city ? 'text-green-600' : 'text-red-600'">●</span>
          <span class="ml-1">Ciudad</span>
        </div>
        <div class="flex items-center">
          <span :class="formData.address ? 'text-green-600' : 'text-red-600'">●</span>
          <span class="ml-1">Dirección</span>
        </div>
        <div class="flex items-center">
          <span :class="formData.applicationType ? 'text-green-600' : 'text-red-600'">●</span>
          <span class="ml-1">Tipo</span>
        </div>
      </div>
      <div class="mt-2 text-xs">
        <span :class="isStepValid ? 'text-green-600 font-medium' : 'text-red-600'">
          {{ isStepValid ? '✅ Formulario válido - Puedes continuar' : '❌ Completa todos los campos requeridos' }}
        </span>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between pt-6 border-t">
      <button
        v-if="currentStep > 1"
        type="button"
        @click="previousStep"
        class="btn btn-secondary"
      >
        Anterior
      </button>
      <div v-else></div>

      <button
        v-if="currentStep < 4"
        type="button"
        @click="nextStep"
        :disabled="!isStepValid"
        class="btn btn-primary"
        :class="{ 'opacity-50 cursor-not-allowed': !isStepValid }"
      >
        Siguiente
      </button>
      <button
        v-else
        type="submit"
        :disabled="!isFormValid || isSubmitting"
        class="btn btn-primary"
      >
        <span v-if="isSubmitting" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Enviando...
        </span>
        <span v-else>Enviar Solicitud</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import FileUpload from './FileUpload.vue'
import PhoneInput from './PhoneInput.vue'
import { useSignatureRequestStore } from '@/stores/signatureRequest'
import { useCatalogsStore } from '@/stores/catalogs'
import { useTermsStore } from '@/stores/terms'
import { useValidation, validationRules } from '@/composables/useValidation'

const emit = defineEmits<{
  'step-change': [step: number]
}>()

const router = useRouter()
const signatureRequestStore = useSignatureRequestStore()
const catalogsStore = useCatalogsStore()
const termsStore = useTermsStore()
const { errors, validateField, validateForm, clearErrors } = useValidation()

// Form state
const currentStep = ref(1)
const isSubmitting = ref(false)
const isProcessingPayment = ref(false)

// Form data
const formData = ref({
  identificationNumber: '',
  fingerCode: '',
  emailAddress: '',
  cellphoneNumber: '',
  city: '',
  province: '',
  address: '',
  countryCode: 'ECU',
  documentType: 'CI',
  applicationType: '',
  period: '',
  ruc: '',
  companyName: '',
  appointmentDocument: '',
  referenceTransaction: '',
  identificationFront: null as File | null,
  identificationBack: null as File | null,
  selfie: null as File | null,
  authorizationVideo: null as File | null,
  isIdentityCertificate: false,
  acceptedTerms: false,
})

// Computed
const catalogs = computed(() => catalogsStore.catalogs)
const termsContent = computed(() => termsStore.termsContent)

const filteredCities = computed(() => {
  if (!formData.value.province) return []
  // Find the province by code and get its id
  const selectedProvince = catalogs.value.provinces.find(p => p.code === formData.value.province)
  if (!selectedProvince) return []
  return catalogs.value.cities.filter(city => city.provinceId === selectedProvince.id)
})

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 1:
      // Very basic validation for step 1 - just check if fields have values
      return !!(
        formData.value.identificationNumber &&
        formData.value.fingerCode &&
        formData.value.emailAddress &&
        formData.value.cellphoneNumber &&
        formData.value.province &&
        formData.value.city &&
        formData.value.address &&
        formData.value.applicationType &&
        formData.value.period
      )
    case 2:
      return !!(
        formData.value.identificationFront &&
        formData.value.identificationBack &&
        formData.value.selfie &&
        formData.value.authorizationVideo
      )
    case 3:
      return true // Payment step is always valid
    case 4:
      return formData.value.acceptedTerms
    default:
      return false
  }
})

const isFormValid = computed(() => {
  return isStepValid.value && currentStep.value === 4
})

// Methods
const isValidFingerCode = (code: string): boolean => {
  if (code.length !== 10) return false
  const hasUpperCase = /[A-Z]/.test(code)
  const digitCount = (code.match(/\d/g) || []).length
  return hasUpperCase && digitCount >= 6
}

const isValidPhoneNumber = (phone: string): boolean => {
  if (!phone) return false
  
  // Ecuador format: +593 + 9 digits starting with 9
  if (phone.startsWith('+593')) {
    return /^\+5939\d{8}$/.test(phone)
  }
  
  // Other countries - basic validation
  return phone.length >= 10 && phone.startsWith('+')
}

// Debug function to check validation
const debugValidation = () => {
  console.log('=== DEBUG VALIDATION ===')
  console.log('identificationNumber:', formData.value.identificationNumber, 'length:', formData.value.identificationNumber?.length)
  console.log('fingerCode:', formData.value.fingerCode, 'length:', formData.value.fingerCode?.length)
  console.log('emailAddress:', formData.value.emailAddress)
  console.log('cellphoneNumber:', formData.value.cellphoneNumber, 'valid:', isValidPhoneNumber(formData.value.cellphoneNumber))
  console.log('province:', formData.value.province)
  console.log('city:', formData.value.city)
  console.log('address:', formData.value.address, 'length:', formData.value.address?.length)
  console.log('applicationType:', formData.value.applicationType)
  console.log('period:', formData.value.period)
  console.log('isStepValid:', isStepValid.value)
  console.log('========================')
}

const fillMockData = () => {
  formData.value = {
    identificationNumber: '1234567890',
    fingerCode: 'ABC1234567',
    emailAddress: 'usuario@ejemplo.com',
    cellphoneNumber: '+593912345678',
    city: 'UIO',
    province: 'PIC',
    address: 'Av. Amazonas N12-34 y Roca, Quito, Ecuador',
    countryCode: 'ECU',
    documentType: 'CI',
    applicationType: 'NATURAL_PERSON',
    period: 'ONE_YEAR',
    ruc: '',
    companyName: '',
    appointmentDocument: '',
    referenceTransaction: '',
    identificationFront: null,
    identificationBack: null,
    selfie: null,
    authorizationVideo: null,
    isIdentityCertificate: false,
    acceptedTerms: false,
  }
}

const fillMockFiles = () => {
  // Create mock file objects
  const createMockFile = (name: string, type: string, size: number) => {
    const file = new File(['mock content'], name, { type })
    Object.defineProperty(file, 'size', { value: size })
    return file
  }

  formData.value.identificationFront = createMockFile('cedula_frente.jpg', 'image/jpeg', 1024 * 1024) // 1MB
  formData.value.identificationBack = createMockFile('cedula_reverso.jpg', 'image/jpeg', 1024 * 1024) // 1MB
  formData.value.selfie = createMockFile('selfie.jpg', 'image/jpeg', 1024 * 1024) // 1MB
  formData.value.authorizationVideo = createMockFile('autorizacion.mp4', 'video/mp4', 2 * 1024 * 1024) // 2MB
}

const nextStep = () => {
  if (isStepValid.value && currentStep.value < 4) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const simulatePayment = async () => {
  isProcessingPayment.value = true
  
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Generate reference transaction
  formData.value.referenceTransaction = `REF${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`
  
  isProcessingPayment.value = false
  nextStep()
}

const getApplicationTypeLabel = (type: string) => {
  const labels = {
    'NATURAL_PERSON': 'Persona Natural',
    'LEGAL_REPRESENTATIVE': 'Representante Legal'
  }
  return labels[type] || type
}

const getPeriodLabel = (period: string) => {
  const labels = {
    'ONE_WEEK': 'Una Semana',
    'ONE_MONTH': 'Un Mes',
    'ONE_YEAR': 'Un Año',
    'TWO_YEARS': 'Dos Años',
    'THREE_YEARS': 'Tres Años',
    'FOUR_YEARS': 'Cuatro Años',
    'FIVE_YEARS': 'Cinco Años'
  }
  return labels[period] || period
}

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  
  try {
    // Create FormData for file upload
    const submitData = new FormData()
    
    // Add form fields
    Object.keys(formData.value).forEach(key => {
      if (key !== 'acceptedTerms' && formData.value[key] !== null && formData.value[key] !== '') {
        submitData.append(key, formData.value[key])
      }
    })
    
    // Add files
    if (formData.value.identificationFront) {
      submitData.append('identificationFront', formData.value.identificationFront)
    }
    if (formData.value.identificationBack) {
      submitData.append('identificationBack', formData.value.identificationBack)
    }
    if (formData.value.selfie) {
      submitData.append('selfie', formData.value.selfie)
    }
    if (formData.value.authorizationVideo) {
      submitData.append('authorizationVideo', formData.value.authorizationVideo)
    }
    
    // Submit request
    await signatureRequestStore.createRequest(submitData)
    
    // Redirect to status page
    router.push(`/status/${formData.value.referenceTransaction}`)
    
  } catch (error) {
    console.error('Error submitting request:', error)
    // Handle error
  } finally {
    isSubmitting.value = false
  }
}

// Watchers
watch(currentStep, (newStep) => {
  emit('step-change', newStep)
})

// Lifecycle
onMounted(async () => {
  await Promise.all([
    catalogsStore.fetchCatalogs(),
    termsStore.fetchTerms()
  ])
})
</script>
