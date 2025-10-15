import { createApp } from 'vue'

const app = createApp({
  template: `
    <div>
      <h1>Zelda Sign - Test JS</h1>
      <p>¡Funcionando con JavaScript!</p>
      <p>Fecha: {{ new Date().toLocaleString() }}</p>
    </div>
  `,
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})

app.mount('#app')

console.log('Vue app mounted with JS')
