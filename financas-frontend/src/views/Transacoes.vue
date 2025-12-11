<template>
  <div class="site-fundo">

    <!-- BANNER HERO -->
    <div class="banner-transacoes">
      <img src="/img/transacoesBanner.png" alt="Banner Transações" />
      <div class="overlay"></div>
      <h1 class="banner-titulo">Transações</h1>
    </div>

    <!-- CONTAINER PRINCIPAL -->
    <div class="transacoes-container">

      <!-- CARDS DE RESUMO -->
      <div class="cards">
        <div class="card entrada">
          <h3>Entradas</h3>
          <p :style="{ color: totalEntrada >= 0 ? '#38ff73' : '#ff9f1c' }">
            R$ {{ totalEntrada.toFixed(2) }}
          </p>
        </div>

        <div class="card saida">
          <h3>Saídas</h3>
          <p :style="{ color: totalSaida >= 0 ? '#ff4444' : '#ff9f1c' }">
            R$ {{ totalSaida.toFixed(2) }}
          </p>
        </div>

        <div class="card saldo">
          <h3>Saldo</h3>
          <p :style="{ color: saldo >= 0 ? '#2faaff' : '#ff9f1c' }">
            R$ {{ saldo.toFixed(2) }}
          </p>
        </div>
      </div>

      <!-- FORMULÁRIO DE ADIÇÃO -->
      <form @submit.prevent="adicionarTransacao()" class="form-transacao">
        <input 
          v-model="nova.descricao" 
          placeholder="Descrição" 
          required 
        />

        <input 
          v-model.number="nova.valor" 
          type="number" 
          placeholder="Valor" 
          min="0" 
          required 
        />

        <select v-model="nova.tipo">
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        <button class="btn-add" type="submit">Adicionar</button>
      </form>

      <!-- LISTA DE TRANSACOES -->
      <div v-if="transacoes.length" class="tabela">

        <div class="tabela-cabecalho">
          <span class="descricao">Descrição</span>
          <span class="valor">Valor</span>
          <span class="acoes">Ações</span>
        </div>

        <div
          v-for="t in transacoes"
          :key="t._id"
          :class="['tabela-linha', t.tipo]"
        >
          <span class="descricao">{{ t.descricao }}</span>
          <span 
            class="valor"
            :style="{ color: corTransacao(t) }"
          >
            {{ t.tipo === 'entrada' ? '+ ' : '- ' }}R$ {{ t.valor.toFixed(2) }}
          </span>
          <span class="acoes">
            <button class="btn-edit" @click="abrirModalEdicao(t)">Editar</button>
            <button class="btn-delete" @click="excluirTransacao(t._id)">Excluir</button>
          </span>
        </div>

      </div>

      <div v-else class="vazio">
        Nenhuma transação registrada.
      </div>

    </div>

    <!-- MODAL DE EDIÇÃO -->
    <div v-if="modalEdicao" class="modal-overlay">
      <div class="modal-card">
        <h2>Editar Transação</h2>
        <input v-model="editar.descricao" placeholder="Descrição" />
        <input v-model.number="editar.valor" type="number" min="0" placeholder="Valor" />
        <select v-model="editar.tipo">
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <div class="modal-buttons">
          <button class="btn-save" @click="salvarEdicao">Salvar</button>
          <button class="btn-cancel" @click="fecharModal">Cancelar</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      transacoes: [],
      nova: { descricao: "", valor: null, tipo: "entrada" },
      modalEdicao: false,
      editar: { _id: null, descricao: "", valor: null, tipo: "entrada" },
    };
  },

  computed: {
    totalEntrada() {
      return this.transacoes.filter(t => t.tipo === "entrada").reduce((acc, t) => acc + t.valor, 0);
    },
    totalSaida() {
      return this.transacoes.filter(t => t.tipo === "saida").reduce((acc, t) => acc + t.valor, 0);
    },
    saldo() {
      return this.totalEntrada - this.totalSaida;
    },
  },

  mounted() {
    this.carregarTransacoes();
  },

  methods: {
    async carregarTransacoes() {
      try {
        const res = await axios.get("http://localhost:5000/api/transacoes");
        this.transacoes = res.data;
      } catch (err) {
        console.error("Erro ao carregar transações:", err);
      }
    },

    async adicionarTransacao() {
      if (this.nova.valor < 0) { 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Valor não pode ser menor que 0!',
          confirmButtonColor: '#0057ff',
          customClass: { popup: 'swal-popup-rounded' }
        });
        return; 
      }
      try {
        const res = await axios.post("http://localhost:5000/api/transacoes", this.nova);
        this.transacoes.push(res.data);
        this.nova = { descricao: "", valor: null, tipo: "entrada" };
      } catch (err) { console.error(err); }
    },

    abrirModalEdicao(transacao) {
      this.editar = { ...transacao };
      this.modalEdicao = true;
    },

    fecharModal() {
      this.modalEdicao = false;
      this.editar = { _id: null, descricao: "", valor: null, tipo: "entrada" };
    },

    async salvarEdicao() {
      if (this.editar.valor < 0) { 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Valor não pode ser menor que 0!',
          confirmButtonColor: '#0057ff',
          customClass: { popup: 'swal-popup-rounded' }
        });
        return; 
      }

      const { isConfirmed } = await Swal.fire({
        title: 'Você tem certeza?',
        text: "A Imperium Capital não vai impedir, mas podemos ter inconsistências se algo der errado.",
        imageUrl: '/img/logo.png',
        imageWidth: 80,
        imageHeight: 80,
        showCancelButton: true,
        confirmButtonText: 'Sim, continuar!',
        cancelButtonText: 'Não, cancelar',
        reverseButtons: true,
        background: '#1e1e1e',
        color: '#fff',
        iconColor: '#ffd700',
        customClass: { popup: 'swal-popup-rounded' }
      });

      if (!isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Nada alterado',
          timer: 1500,
          showConfirmButton: false,
          background: '#1e1e1e',
          color: '#fff',
          customClass: { popup: 'swal-popup-rounded' }
        });
        this.fecharModal();
        return;
      }

      try {
        const res = await axios.put(`http://localhost:5000/api/transacoes/${this.editar._id}`, {
          descricao: this.editar.descricao,
          valor: this.editar.valor,
          tipo: this.editar.tipo,
        });

        const index = this.transacoes.findIndex(t => t._id === this.editar._id);
        if (index !== -1) this.transacoes.splice(index, 1, res.data);

        this.fecharModal();

        Swal.fire({
          icon: 'success',
          title: 'Transação editada!',
          timer: 1500,
          showConfirmButton: false,
          background: '#1e1e1e',
          color: '#fff',
          customClass: { popup: 'swal-popup-rounded' }
        });
      } catch (err) {
        console.error("Erro ao salvar edição:", err);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível salvar a transação. Verifique o backend.',
          confirmButtonColor: '#e63946',
          customClass: { popup: 'swal-popup-rounded' }
        });
      }
    },

    async excluirTransacao(id) {
      const { isConfirmed } = await Swal.fire({
        title: 'Tem certeza?',
        text: "Deseja realmente excluir esta transação?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
        background: '#1e1e1e',
        color: '#fff',
        customClass: { popup: 'swal-popup-rounded' }
      });

      if (!isConfirmed) return;

      try {
        await axios.delete(`http://localhost:5000/api/transacoes/${id}`);
        this.transacoes = this.transacoes.filter(t => t._id !== id);
        Swal.fire({
          icon: 'success',
          title: 'Transação excluída!',
          timer: 1500,
          showConfirmButton: false,
          background: '#1e1e1e',
          color: '#fff',
          customClass: { popup: 'swal-popup-rounded' }
        });
      } catch (err) { console.error(err); }
    },

    corTransacao(t) {
      if (t.tipo === "entrada") return '#38ff73';
      if (t.tipo === "saida") return '#ff4444';
      return '#fff';
    },
  },
};
</script>

<style scoped>
.site-fundo { background: #121212; min-height: 100vh; padding: 20px 0; }
.banner-transacoes { position: relative; width: 100%; height: 500px; overflow: hidden; margin-bottom: 50px; border-radius: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
.banner-transacoes img { width: 100%; height: 100%; object-fit: cover; filter: brightness(50%); border-radius: 30px; }
.banner-transacoes .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.35); border-radius: 30px; }
.banner-titulo { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 60px; font-weight: 700; color: #fff; letter-spacing: 2px; text-shadow: 0px 8px 20px rgba(0,0,0,0.8); text-align: center; }

.transacoes-container { max-width: 1000px; margin: 0 auto 60px auto; background: rgba(20,20,20,0.95); padding: 40px; border-radius: 25px; box-shadow: 0 10px 50px rgba(0,0,0,0.7); color: white; font-family: "Poppins", sans-serif; border: 3px solid; border-image: linear-gradient(90deg, #fff, #ffd700) 1; }

.cards { display: flex; gap: 25px; margin-bottom: 35px; }
.card { flex: 1; padding: 25px; background: rgba(40,40,40,0.6); border-radius: 20px; backdrop-filter: blur(8px); box-shadow: 0 8px 20px rgba(0,0,0,0.5); transition: .3s; }
.card:hover { transform: translateY(-5px) scale(1.02); }
.card h3 { color: #bbbbbb; margin-bottom: 10px; }
.card p { font-size: 22px; font-weight: bold; }

.form-transacao { display: flex; gap: 15px; margin-bottom: 35px; }
.form-transacao input, .form-transacao select { flex: 1; padding: 14px; border-radius: 12px; border: 1px solid #444; background: #111; color: white; font-size: 16px; }
.btn-add { padding: 14px 28px; border: none; background: linear-gradient(135deg, #009dff, #0057ff); color: white; border-radius: 12px; font-weight: bold; cursor: pointer; transition: .3s; }
.btn-add:hover { transform: scale(1.08); }

.tabela-cabecalho, .tabela-linha { display: flex; align-items: center; padding: 14px 20px; margin-bottom: 12px; border-radius: 15px; }
.tabela-cabecalho { background: rgba(40,40,40,0.6); font-weight: bold; color: #dadada; }
.tabela-linha { background: rgba(30,30,30,0.7); box-shadow: 0px 4px 12px rgba(0,0,0,0.5); transition: .3s; color: white; }
.tabela-linha:hover { transform: translateX(4px) scale(1.01); }

.descricao { flex: 2; text-align: left; }
.valor { flex: 1; text-align: center; }
.acoes { flex: 1; text-align: right; display: flex; justify-content: flex-end; gap: 10px; }

.btn-edit, .btn-delete { padding: 6px 12px; border-radius: 10px; cursor: pointer; border: none; font-size: 14px; transition: .3s; }
.btn-edit { background: #007bff; color: white; }
.btn-edit:hover { background: #0062cc; transform: scale(1.05); }
.btn-delete { background: #e63946; color: white; }
.btn-delete:hover { background: #c92d35; transform: scale(1.05); }

.modal-overlay { position: fixed; top: 0; left:0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-card { background: #1e1e1e; padding: 30px; border-radius: 20px; width: 400px; max-width: 90%; display: flex; flex-direction: column; gap: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
.modal-card input, .modal-card select { padding: 12px; border-radius: 10px; border: 1px solid #444; background: #111; color: white; font-size: 16px; }
.modal-buttons { display: flex; justify-content: flex-end; gap: 10px; }
.btn-save { background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; transition: .3s; }
.btn-save:hover { transform: scale(1.05); background: #1e7e34; }
.btn-cancel { background: #ff4444; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; transition: .3s; }
.btn-cancel:hover { transform: scale(1.05); background: #c92d35; }

.vazio { text-align: center; color: #aaa; margin-top: 30px; font-size: 18px; }

/* BORDAS ARREDONDADAS PARA SWAL */
.swal-popup-rounded {
  border-radius: 25px !important;
}
</style>
