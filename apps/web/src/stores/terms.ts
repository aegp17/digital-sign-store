import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ApiResponse } from '@/types'

export const useTermsStore = defineStore('terms', () => {
  const termsContent = ref<string>('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchTerms = async (): Promise<string> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/terms`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<{ content: string }> = await response.json()
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to fetch terms')
      }

      termsContent.value = result.data.content
      
      return result.data.content
    } catch (err) {
      // Fallback to mock terms if API fails
      termsContent.value = getMockTerms()
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
      
      return termsContent.value
    } finally {
      isLoading.value = false
    }
  }

  const getMockTerms = (): string => {
    return `
      <h2>Términos y Condiciones - Firma Electrónica</h2>
      
      <h3>1. Objeto y Ámbito de Aplicación</h3>
      <p>Los presentes términos y condiciones regulan el uso del servicio de firma electrónica proporcionado a través de esta plataforma. Al utilizar este servicio, el usuario acepta expresamente estos términos.</p>
      
      <h3>2. Definiciones</h3>
      <ul>
        <li><strong>Firma Electrónica:</strong> Conjunto de datos en forma electrónica, consignados junto a otros o asociados con ellos, que pueden ser utilizados como medio de identificación del firmante.</li>
        <li><strong>Certificado Digital:</strong> Documento electrónico que vincula una clave pública con una persona física o jurídica.</li>
        <li><strong>Usuario:</strong> Persona natural o jurídica que solicita y utiliza el servicio de firma electrónica.</li>
      </ul>
      
      <h3>3. Requisitos para la Obtención</h3>
      <h4>3.1 Documentación Requerida</h4>
      <ul>
        <li>Cédula de identidad vigente</li>
        <li>Comprobante de domicilio</li>
        <li>Documentos adicionales según el tipo de solicitud</li>
      </ul>
      
      <h4>3.2 Validación de Identidad</h4>
      <ul>
        <li>Verificación biométrica mediante huella dactilar</li>
        <li>Validación de documentos de identidad</li>
        <li>Verificación de datos personales</li>
      </ul>
      
      <h3>4. Uso del Servicio</h3>
      <h4>4.1 Obligaciones del Usuario</h4>
      <ul>
        <li>Proporcionar información veraz y actualizada</li>
        <li>Mantener la confidencialidad de sus credenciales</li>
        <li>Notificar inmediatamente cualquier uso no autorizado</li>
        <li>Cumplir con las políticas de seguridad establecidas</li>
      </ul>
      
      <h4>4.2 Prohibiciones</h4>
      <ul>
        <li>Utilizar el servicio para actividades ilegales</li>
        <li>Compartir credenciales de acceso</li>
        <li>Intentar vulnerar la seguridad del sistema</li>
        <li>Suplantar la identidad de terceros</li>
      </ul>
      
      <h3>5. Validez y Vigencia</h3>
      <h4>5.1 Períodos de Validez</h4>
      <ul>
        <li>Una semana</li>
        <li>Un mes</li>
        <li>Un año</li>
        <li>Dos años</li>
        <li>Tres años</li>
        <li>Cuatro años</li>
        <li>Cinco años</li>
      </ul>
      
      <h3>6. Responsabilidades</h3>
      <h4>6.1 Del Proveedor</h4>
      <ul>
        <li>Garantizar la seguridad del sistema</li>
        <li>Mantener la disponibilidad del servicio</li>
        <li>Proteger la información del usuario</li>
        <li>Cumplir con las normativas vigentes</li>
      </ul>
      
      <h4>6.2 Del Usuario</h4>
      <ul>
        <li>Utilizar el servicio de manera responsable</li>
        <li>Mantener actualizada su información</li>
        <li>Reportar incidentes de seguridad</li>
        <li>Cumplir con las obligaciones legales</li>
      </ul>
      
      <h3>7. Protección de Datos</h3>
      <p>Los datos personales serán tratados conforme a la normativa de protección de datos vigente, garantizando su confidencialidad y seguridad.</p>
      
      <h3>8. Limitaciones de Responsabilidad</h3>
      <p>El proveedor no se hace responsable por:</p>
      <ul>
        <li>Uso indebido del servicio por parte del usuario</li>
        <li>Pérdida de datos por negligencia del usuario</li>
        <li>Daños derivados de la no actualización de información</li>
        <li>Interrupciones del servicio por causas de fuerza mayor</li>
      </ul>
      
      <h3>9. Modificaciones</h3>
      <p>El proveedor se reserva el derecho de modificar estos términos y condiciones, notificando a los usuarios con la debida antelación.</p>
      
      <h3>10. Ley Aplicable y Jurisdicción</h3>
      <p>Estos términos se rigen por la legislación ecuatoriana. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes.</p>
      
      <h3>11. Contacto</h3>
      <p>Para consultas o reclamos relacionados con estos términos y condiciones, los usuarios pueden contactar a través de los canales oficiales establecidos.</p>
      
      <hr>
      <p><strong>Fecha de última actualización:</strong> Diciembre 2024</p>
      <p><strong>Versión:</strong> 1.0</p>
      <p><strong>Servicio:</strong> Zelda Sign</p>
    `
  }

  const clearError = () => {
    error.value = null
  }

  return {
    termsContent,
    isLoading,
    error,
    fetchTerms,
    clearError,
  }
})
