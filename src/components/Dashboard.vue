<template>
  <div id="burger-table" v-if="cadastrosP">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Tipo do Produto:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="cadastro in cadastrosP" :key="cadastro.id" >
        <div class="order-number">{{ cadastro.id }}</div>
        <div>{{ cadastro.name }}</div>
        <div>{{ cadastro.produto }}</div>
        <div>
          <select name="status" class="status" @change="updateProduto($event, cadastro.id)">
            <option :value="s.tipo" v-for="s in status" :key="s.id" :selected="cadastro.status == s.tipo">
              {{ s.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteProduto(cadastro.id)">Apagar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Não há produtos no momento!</h2>
  </div>
</template>
<script>
  export default {
    name: "Dashboard",
    data() {
      return {
        cadastrosP: null,
        cadastrosP_id: null,
        status: []
      }
    },
    methods: {
      async getProdutos() {
        const req = await fetch('http://localhost:3000/cadastrosP')
        this.cadastrosP = await req.json()

        // Resgata os status de pedidos
        await this.getStatus()

      },
      async getStatus() {

        const req = await fetch('http://localhost:3000/status')
        this.status = await req.json()

      },
      async deleteProduto(id) {

        const req = await fetch(`http://localhost:3000/cadastrosP/${id}`, {
          method: "DELETE"
        });

        const res = await req.json()

        await this.getProdutos()

      },
      async updateProduto(event, id) {

        const option = event.target.value;

        const dataJson = JSON.stringify({status: option});

        const req = await fetch(`http://localhost:3000/cadastrosP/${id}`, {
          method: "PATCH",
          headers: { "Content-Type" : "application/json" },
          body: dataJson
        });

        const res = await req.json()
        console.log(res)

      }
    },
    mounted () {
    this.getProdutos()
    }
  }
</script>

<style scoped>
  #burger-table {
    max-width: 1200px;
    margin: 0 auto;
  }

  #burger-table-heading,
  #burger-table-rows,
  .burger-table-row {
    display: flex;
    flex-wrap: wrap;
  }

  #burger-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  .burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
  }

  #burger-table-heading div,
  .burger-table-row div {
    width: 19%;
  }

  #burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 5%;
  }

  select {
    padding: 12px 6px;
    margin-right: 12px;
  }

  .delete-btn {
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
  
  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }
  
</style>