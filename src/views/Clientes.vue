<template>
  <div>
    <div class="main-container">
      <h1>Gerenciar Clientes:</h1>
      <ClientsDash />
    </div>
  </div>
</template>

<script>
import ClientsDash from '../components/ClientsDash'

export default {
  name: 'Clientes',
  components: {
    ClientsDash,
  }
}
</script>