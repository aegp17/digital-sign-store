<template>
  <AppLayout>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Zelda Sign
            <span class="block text-blue-200">Firma Electrónica Segura</span>
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Obtén tu firma electrónica certificada de manera rápida y segura. 
            Simplificamos el proceso de solicitud y validación de documentos.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink 
              to="/request" 
              class="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
            >
              Solicitar Firma
            </RouterLink>
            <RouterLink 
              to="/status" 
              class="btn btn-secondary border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold"
            >
              Consultar Estado
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir Zelda Sign?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Ofrecemos un servicio completo de firma electrónica con las más altas 
            estándares de seguridad y facilidad de uso.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Máxima Seguridad</h3>
            <p class="text-gray-600">
              Utilizamos tecnología de encriptación avanzada y validación biométrica 
              para garantizar la autenticidad de tu firma.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Proceso Rápido</h3>
            <p class="text-gray-600">
              Completa tu solicitud en minutos y recibe tu firma electrónica 
              en el menor tiempo posible.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Certificación Legal</h3>
            <p class="text-gray-600">
              Tu firma electrónica tiene validez legal completa y es reconocida 
              por todas las instituciones oficiales.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Proceso Simple en 4 Pasos
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Obtén tu firma electrónica siguiendo estos simples pasos
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Completa tus Datos</h3>
            <p class="text-gray-600 text-sm">
              Ingresa tu información personal y documentos de identidad
            </p>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Sube Documentos</h3>
            <p class="text-gray-600 text-sm">
              Carga las fotos de tu cédula y selfie para validación
            </p>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Realiza el Pago</h3>
            <p class="text-gray-600 text-sm">
              Completa el proceso de pago de manera segura
            </p>
          </div>

          <!-- Step 4 -->
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              4
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Recibe tu Firma</h3>
            <p class="text-gray-600 text-sm">
              Obtén tu certificado digital por correo electrónico
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-blue-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          ¿Listo para obtener tu firma electrónica?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Comienza el proceso ahora y obtén tu firma electrónica certificada 
          en el menor tiempo posible.
        </p>
        <RouterLink 
          to="/request" 
          class="btn btn-primary bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
        >
          Comenzar Solicitud
        </RouterLink>
      </div>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/Layout/AppLayout.vue'
</script>
