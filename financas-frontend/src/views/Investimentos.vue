<template>
  <div class="site-fundo">
    <div class="investimentos-container">

      <!-- Formulário -->
      <form @submit.prevent="adicionarInvestimento" class="form-investimento">
        <input v-model="nova.tipoInvestimento" placeholder="Tipo de investimento" required />
        <input v-model.number="nova.valor" type="number" placeholder="Valor" min="0" required />
        <button type="submit" class="btn-add">Adicionar</button>
      </form>

      <!-- Mensagem de ajuda -->
      <p class="ajuda">
        Não sabe por onde começar? Comece registrando pequenos valores em investimentos seguros como renda fixa ou fundos conservadores.
        Você poderá acompanhar seus rendimentos aqui!
      </p>

      <!-- Lista de investimentos -->
      <div v-if="investimentos.length" class="tabela">
        <div class="tabela-cabecalho">
          <span>Tipo</span>
          <span>Valor</span>
          <span>Data</span>
        </div>
        <div v-for="inv in investimentos" :key="inv._id" class="tabela-linha">
          <span>{{ inv.tipoInvestimento }}</span>
          <span>R$ {{ inv.valor.toFixed(2) }}</span>
          <span>{{ new Date(inv.data).toLocaleDateString() }}</span>
        </div>
      </div>
      <div v-else class="vazio">Nenhum investimento registrado.</div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      investimentos: [],
      nova: { tipoInvestimento: "", valor: null }
    };
  },
  mounted() {
    this.carregarInvestimentos();
  },
  methods: {
    async carregarInvestimentos() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Usuário não autenticado');

        const res = await axios.get('http://localhost:5000/api/investimentos', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.investimentos = res.data;
      } catch (err) {
        console.error(err);
        Swal.fire('Erro', 'Não foi possível carregar os investimentos', 'error');
      }
    },
    async adicionarInvestimento() {
      if (this.nova.valor < 0) {
        return Swal.fire('Erro', 'Valor não pode ser negativo', 'error');
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Usuário não autenticado');

        const res = await axios.post('http://localhost:5000/api/investimentos', this.nova, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        this.investimentos.unshift(res.data);
        this.nova = { tipoInvestimento: "", valor: null };
        Swal.fire('Sucesso', 'Investimento adicionado!', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Erro', 'Não foi possível salvar o investimento', 'error');
      }
    }
  }
};
</script>

<style scoped>
.site-fundo {
  background: #121212;
  min-height: 100vh;
  padding: 20px;
  font-family: "Poppins", sans-serif;
  color: white;
}
.investimentos-container {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(20,20,20,0.95);
  padding: 40px;
  border-radius: 25px;
  box-shadow: 0 10px 50px rgba(0,0,0,0.7);
}
.form-investimento {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}
.form-investimento input {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #444;
  background: #111;
  color: white;
}
.btn-add {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg,#009dff,#0057ff);
  color: white;
  cursor: pointer;
  transition: .3s;
}
.btn-add:hover { transform: scale(1.05); }
.ajuda {
  margin-bottom: 20px;
  color: #aaa;
  font-size: 14px;
}
.tabela-cabecalho, .tabela-linha {
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  border-radius: 15px;
}
.tabela-cabecalho { background: rgba(40,40,40,0.6); font-weight: bold; }
.tabela-linha { background: rgba(30,30,30,0.7); margin-bottom: 10px; }
.vazio { text-align: center; margin-top: 20px; color: #aaa; }
</style>
