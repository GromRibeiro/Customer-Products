<template>
  <Message :msg="msg" v-show="msg" />
  <div>
    <form id="burger-form" method="POST" @submit="createClient">
      <div class="input-container">
        <label for="nome">Nome do cliente:</label>
        <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome">
      </div>
      <div class="input-container">
        <label for="nome">Documento do cliente:</label>
        <input type="number" id="documento" name="documento" v-model="documento" placeholder="Digite o seu documento">
      </div>
      <div class="input-container">
        <label for="nome">Telefone do cliente:</label>
        <input type="text" id="telefone" name="telefone" v-model="telefone" placeholder="Digite o seu telefone">
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
  name: "ClientForm",
  data() {
    return {
      nome: null,
      documento: null,
      telefone: null,
      status: "Ativo",
      msg: null
    }
  },
  methods: {
    async getClientes() {
      const req = await fetch('http://localhost:3000/clientes')
      const data = await req.json()

      this.status = data.status
    },
    async createClient(e) {

      e.preventDefault()

      const data = {
        nome: this.nome,
        documento:this.documento,
        telefone:this.telefone,
        status: "Ativo"
      }

      const dataJson = JSON.stringify(data)    

      const req = await fetch("http://localhost:3000/cadastros", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });

      const res = await req.json()
      console.log(res)
      this.msg = "Cliente Cadastrado com sucesso!"

      // clear message
      setTimeout(() => this.msg = "", 3000)

      // limpar campos
      this.nome = ""
      this.documento = ""
      this.telefone = ""

    }
  },
  mounted () {
    this.getClientes()
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