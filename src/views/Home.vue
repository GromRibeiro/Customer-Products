<template>
  <div>
    <div class="main-container">
      <h1>Cadastre seu cliente:</h1>
      <ClientForm />
    </div>
  </div>
</template>

<script>
import ClientForm from '../components/ClientForm'

export default {
  name: 'Home',
  components: {
    ClientForm
  }
}
</script>