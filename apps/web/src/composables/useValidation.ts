import { ref } from 'vue'

export function useValidation() {
  const errors = ref<Record<string, string>>({})

  const validateField = (field: string, value: any, rules: ValidationRule[]): boolean => {
    for (const rule of rules) {
      const error = rule(value)
      if (error) {
        errors.value[field] = error
        return false
      }
    }
    delete errors.value[field]
    return true
  }

  const validateForm = (fields: Record<string, { value: any; rules: ValidationRule[] }>): boolean => {
    let isValid = true
    
    for (const [field, { value, rules }] of Object.entries(fields)) {
      if (!validateField(field, value, rules)) {
        isValid = false
      }
    }
    
    return isValid
  }

  const clearErrors = () => {
    errors.value = {}
  }

  const clearFieldError = (field: string) => {
    delete errors.value[field]
  }

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
  }
}

export type ValidationRule = (value: any) => string | null

// Common validation rules
export const validationRules = {
  required: (message = 'Este campo es requerido'): ValidationRule => 
    (value) => !value ? message : null,

  minLength: (min: number, message?: string): ValidationRule => 
    (value) => value && value.length < min ? (message || `Mínimo ${min} caracteres`) : null,

  maxLength: (max: number, message?: string): ValidationRule => 
    (value) => value && value.length > max ? (message || `Máximo ${max} caracteres`) : null,

  email: (message = 'Email inválido'): ValidationRule => 
    (value) => value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? message : null,

  phone: (message = 'Número de teléfono inválido'): ValidationRule => 
    (value) => value && !/^\+5939\d{8}$/.test(value) ? message : null,

  fingerCode: (message = 'Código de huella inválido'): ValidationRule => 
    (value) => value && !/^(?=(?:.*[A-Z]){1,})(?=(?:.*\d){6,})[A-Z0-9]{10}$/.test(value) ? message : null,

  fileSize: (maxSizeMB: number, message?: string): ValidationRule => 
    (value) => value && value.size > maxSizeMB * 1024 * 1024 ? (message || `Archivo demasiado grande. Máximo ${maxSizeMB}MB`) : null,

  fileType: (allowedTypes: string[], message?: string): ValidationRule => 
    (value) => value && !allowedTypes.includes(value.type) ? (message || `Tipo de archivo no permitido`) : null,
}
