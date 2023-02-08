<template>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="burger-form" method="POST" @submit="createProduto">
        <div class="input-container">
          <label for="nome">Nome do Produto:</label>
          <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome">
        </div>
        <div class="input-container">
          <label for="produto">Escolha o tipo do produto:</label>
          <select name="produto" id="produto" v-model="produto">
            <option value="">Selecione o tipo de produto</option>
            <option v-for="produto in produtos" :key="produto.id" :value="produto.tipo">{{ produto.tipo }}</option>
          </select>
        </div>
        <div class="input-container">
          <input class="submit-btn" type="submit" value="Cadastrar!">
        </div>
      </form>
    </div>
  </template>


<script>
import Message from './Message'

export default {
  name: "ProdutosForm",
  data() {
    return {
      nome: null,
      produtos: null,
      produto: null,
      status: "Ativo",
      msg: null
    }
  },
  methods: {
    async getProdutos() {
      const req = await fetch('http://localhost:3000/produtos')
      const data = await req.json()

      this.produtos = data.produtos
    },
    async createProduto(e) {

      e.preventDefault()

      const data = {
        nome: this.nome,
        produto: this.produto,
        status: "Ativo"
      }

      const dataJson = JSON.stringify(data)

      const req = await fetch("http://localhost:3000/cadastros", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });

      const res = await req.json()
      this.msg = "Pedido realizado com sucesso!"
      // clear message
      setTimeout(() => this.msg = "", 3000)
      // limpar campos
      this.nome = ""
    }
  },
  mounted () {
    this.getProdutos()
  },
  components: {
    Message
  }
}
</script>

<style scoped>
#burger-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

input, select {
  padding: 5px 10px;
  width: 300px;
}

#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#opcionais-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color:#fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: .5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>