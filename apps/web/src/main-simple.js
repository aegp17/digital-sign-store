import { createApp } from 'vue'

console.log('Loading Vue...')

const app = createApp({
  template: `
    <div>
      <h1>Zelda Sign - Firma Electrónica</h1>
      <p>¡Aplicación Vue funcionando!</p>
      <p>Fecha: {{ new Date().toLocaleString() }}</p>
    </div>
  `,
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})

console.log('Mounting Vue app...')
app.mount('#app')
console.log('Vue app mounted successfully')
