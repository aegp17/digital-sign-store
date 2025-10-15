<template>
  <AppLayout>
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Progress Steps -->
        <div class="mb-8">
          <div class="flex items-center justify-center space-x-4">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="flex items-center"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                :class="getStepClasses(index)"
              >
                <span v-if="index < currentStep - 1">✓</span>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span
                class="ml-2 text-sm font-medium"
                :class="getStepTextClasses(index)"
              >
                {{ step }}
              </span>
              <div
                v-if="index < steps.length - 1"
                class="w-16 h-0.5 mx-4"
                :class="index < currentStep - 1 ? 'bg-blue-600' : 'bg-gray-300'"
              ></div>
            </div>
          </div>
        </div>

        <!-- Form Container -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <SignatureRequestForm @step-change="handleStepChange" />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '@/components/Layout/AppLayout.vue'
import SignatureRequestForm from '@/components/Forms/SignatureRequestForm.vue'

const currentStep = ref(1)

const steps = [
  'Datos Personales',
  'Documentos',
  'Pago',
  'Términos'
]

const handleStepChange = (step: number) => {
  currentStep.value = step
}

const getStepClasses = (index: number) => {
  if (index < currentStep.value - 1) {
    return 'bg-blue-600 text-white'
  } else if (index === currentStep.value - 1) {
    return 'bg-blue-600 text-white'
  } else {
    return 'bg-gray-300 text-gray-600'
  }
}

const getStepTextClasses = (index: number) => {
  if (index < currentStep.value) {
    return 'text-blue-600'
  } else {
    return 'text-gray-500'
  }
}
</script>
