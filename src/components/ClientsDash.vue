<template>
  <div id="burger-table" v-if="cadastrosC">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Documento:</div>
        <div>Telefone:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="cadastro in cadastrosC" :key="cadastro.id">
        <div class="order-number">{{ cadastro.id }}</div>
        <div>{{ cadastro.nome }}</div>
        <div>{{ cadastro.documento }}</div>
        <div>{{ cadastro.telefone }}</div>
        <div>
          <select name="status" class="status" @change="updateClient($event, cadastro.id)">
            <option :value="s.tipo" v-for="s in status" :key="s.id" :selected="cadastro.status === s.tipo">
              {{ s.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteClient(cadastro.id)">Apagar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Não há clientes no momento!</h2>
  </div>
</template>
<script>
export default {
  name: "ClientsDash",
  data() {
    return {
      cadastrosC: null,
      cadastros_id: null,
      status: []
    }
  },
  methods: {
    async getCliente() {
      const req = await fetch('http://localhost:3000/cadastrosC')
      this.cadastrosC = await req.json()

      // Resgata os status de pedidos
      await this.getStatus()

    },
    async getStatus() {

      const req = await fetch('http://localhost:3000/status')
      this.status = await req.json()

    },
    async deleteClient(id) {

      const req = await fetch(`http://localhost:3000/cadastrosC/${id}`, {
        method: "DELETE"
      });
      await this.getCliente()
    },
    async updateClient(event, id) {

      const option = event.target.value;

      const dataJson = JSON.stringify({status: option});

      const req = await fetch(`http://localhost:3000/cadastrosC/${id}`, {
        method: "PATCH",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });

      const res = await req.json()

      console.log(res)

    }
  },
  mounted () {
    this.getCliente()
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