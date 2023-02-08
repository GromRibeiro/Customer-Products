<template>
  <div>
  <div class="main-container">
    <h1>Cadastre seu Produto:</h1>
    <ProdutosForm />
  </div>
  </div>
</template>

<script>
import ProdutosForm from '../components/ProdutosForm'

export default {
  name: 'Home',
  components: {
    ProdutosForm
  }
}
</script>