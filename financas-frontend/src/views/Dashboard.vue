<template>
  <div class="dashboard">
    <!-- Banner Hero -->
    <section class="banner">
      <img src="/img/fundo.jpg" alt="Banner" class="banner-img" />
      <div class="banner-overlay"></div>
      <div class="banner-text">
        <!-- Saudação maior -->
        <h1 class="bem-vindo">Bem-vindo, {{ usuario.nome }}!</h1>
        <!-- Mensagem menor abaixo -->
        <h2 class="mensagem-banner">Transforme suas oportunidades em sucesso com Imperium Capital.</h2>
      </div>
    </section>

    <!-- Conteúdo principal -->
    <main class="conteudo">

      <!-- Botão centralizado "Valores das moedas" -->
      <div class="btn-titulo-moedas">Valores das moedas</div>

      <!-- CARROSSEL SUPERIOR -->
      <div class="carousel-wrapper">
        <div class="carousel track-left">
          <div
            class="carousel-item"
            v-for="coin in oldCoins"
            :key="'original-'+coin.id"
            @click="abrirMoeda(coin)"
          >
            <img :src="coin.icon" class="carousel-icon" />
            <div class="coin-name">{{ coin.name }}</div>
            <div class="coin-value">R$ {{ coin.current_price }}</div>
          </div>
          <div
            class="carousel-item"
            v-for="coin in oldCoins"
            :key="'repeat-'+coin.id"
            @click="abrirMoeda(coin)"
          >
            <img :src="coin.icon" class="carousel-icon" />
            <div class="coin-name">{{ coin.name }}</div>
            <div class="coin-value">R$ {{ coin.current_price }}</div>
          </div>
        </div>
      </div>

      <!-- CARROSSEL INFERIOR -->
      <div class="carousel-wrapper">
        <div class="carousel track-right">
          <div
            class="carousel-item"
            v-for="coin in newCoins"
            :key="'original-'+coin.id"
            @click="abrirMoeda(coin)"
          >
            <img :src="coin.icon" class="carousel-icon" />
            <div class="coin-name">{{ coin.name }}</div>
            <div class="coin-value">R$ {{ coin.current_price }}</div>
          </div>
          <div
            class="carousel-item"
            v-for="coin in newCoins"
            :key="'repeat-'+coin.id"
            @click="abrirMoeda(coin)"
          >
            <img :src="coin.icon" class="carousel-icon" />
            <div class="coin-name">{{ coin.name }}</div>
            <div class="coin-value">R$ {{ coin.current_price }}</div>
          </div>
        </div>
      </div>

      <!-- Banner abaixo dos carrosséis -->
      <div class="sub-banner">
        <img src="/img/MaisUmBanner.png" alt="Banner adicional" class="sub-banner-img" />
      </div>

      <!-- Linha do tempo -->
      <section class="timeline">
        <h2 class="timeline-title">Linha do Tempo</h2>
        <div class="timeline-container">
          <div class="timeline-event" v-for="(event, index) in timeline" :key="index">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3>{{ event.year }}</h3>
              <p>{{ event.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Modal da moeda -->
      <div v-if="modalAtivo" class="modal-overlay" @click="fecharModal">
        <div class="modal-content" @click.stop>
          <img :src="moedaSelecionada.icon" class="modal-icon" />

          <h2>{{ moedaSelecionada.name }}</h2>

          <!-- Bandeira -->
          <img
            v-if="moedaSelecionada.flag && moedaSelecionada.flag !== ''"
            :src="moedaSelecionada.flag"
            class="modal-flag flag-shadow"
          />

          <!-- País de origem ou “Moeda Global (status)” -->
          <h3 class="modal-country" v-if="moedaSelecionada.flag === '/img/flags/global.png'">
            {{ moedaSelecionada.name }} — Moeda Global
            <span v-if="isWeakGlobal(moedaSelecionada.name)"> (Uso fraco) </span>
            <span v-else> (Utilizável) </span>
          </h3>
          <h3 class="modal-country" v-else>
            País de origem: {{ moedaSelecionada.country }}
          </h3>

          <p class="modal-bio">{{ moedaSelecionada.bio }}</p>
          <p class="modal-origin" v-if="moedaSelecionada.origin">
            Origem: {{ moedaSelecionada.origin }}
          </p>
          <p class="modal-creator" v-if="moedaSelecionada.creator">
            Criado por: {{ moedaSelecionada.creator }}
          </p>
          <button class="btn-fechar" @click="fecharModal">Fechar</button>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalAtivo: false,
      moedaSelecionada: {},
      usuario: {},

      oldCoins: [
        { id: 1, name: "Bitcoin", current_price: 120000, icon: "/img/Bitcoin.png", flag: "/img/flags/global.png", country: "Global", origin: "Criada em 2009.", creator: "Satoshi Nakamoto", bio: "Primeira criptomoeda descentralizada." },
        { id: 2, name: "Ethereum", current_price: 8000, icon: "/img/ethereum.png", flag: "/img/flags/global.png", country: "Global", origin: "Criada em 2015.", creator: "Vitalik Buterin", bio: "Base de contratos inteligentes." },
        { id: 3, name: "Dólar Americano", current_price: 5.12, icon: "/img/dolar.png", flag: "/img/flags/eua.png", country: "Estados Unidos", origin: "Criado em 1792.", creator: "Sistema do Tesouro", bio: "Moeda mais usada no mundo." },
        { id: 4, name: "Euro", current_price: 6.18, icon: "/img/euro.png", flag: "/img/flags/eu.png", country: "União Europeia", origin: "Introduzido em 1999.", creator: "União Europeia", bio: "Moeda forte e estável." },
        { id: 5, name: "Iene", current_price: 0.038, icon: "/img/iene.png", flag: "/img/flags/japao.png", country: "Japão", origin: "Criado em 1871.", creator: "Governo Japonês", bio: "Importante moeda asiática." },
        { id: 6, name: "Libra Esterlina", current_price: 7.24, icon: "/img/libra.png", flag: "/img/flags/reino-unido.png", country: "Reino Unido", origin: "Moeda mais antiga.", creator: "Reino Unido", bio: "Extremamente valorizada." }
      ],

      newCoins: [
        { id: 7, name: "Franco Suíço", current_price: 5.30, icon: "/img/franco.png", flag: "/img/flags/suíça.png", country: "Suíça", origin: "Moeda do Banco Nacional Suíço.", creator: "BNS", bio: "Famosa por sua estabilidade." },
        { id: 8, name: "Dólar Canadense", current_price: 4.10, icon: "/img/canada.png", flag: "/img/flags/canada.png", country: "Canadá", origin: "Moeda oficial do Canadá.", creator: "Banco do Canadá", bio: "Muito utilizada em comércio internacional." },
        { id: 9, name: "Yuan Chinês", current_price: 0.76, icon: "/img/yuan.png", flag: "/img/flags/china.png", country: "China", origin: "Moeda oficial da China.", creator: "Banco Popular da China", bio: "Importante moeda asiática." },
        { id: 10, name: "Rúpia Indiana", current_price: 0.063, icon: "/img/rupia.png", flag: "/img/flags/india.png", country: "Índia", origin: "Moeda oficial da Índia.", creator: "Banco da Reserva da Índia", bio: "Amplamente utilizada na Ásia." },
        { id: 11, name: "Dólar Australiano", current_price: 3.70, icon: "/img/australia.png", flag: "/img/flags/australia.png", country: "Austrália", origin: "Moeda oficial da Austrália.", creator: "Reserve Bank of Australia", bio: "Importante para comércio no Pacífico." },
        { id: 12, name: "Bitcoin Cash", current_price: 7000, icon: "/img/bch.png", flag: "/img/flags/global.png", country: "Global", origin: "Fork do Bitcoin em 2017.", creator: "Desenvolvedores da comunidade", bio: "Criptomoeda alternativa ao Bitcoin." }
      ],

      timeline: [
        { year: "1960", description: "Fundação da Imperium Capital como pequena corretora de ações." },
        { year: "1975", description: "Expansão internacional com filiais na Europa." },
        { year: "1985", description: "Início das operações em investimentos tecnológicos." },
        { year: "1995", description: "Primeiros investimentos em empresas de internet." },
        { year: "2005", description: "Criação de fundo especializado em moedas digitais." },
        { year: "2010", description: "Lançamento do primeiro índice de criptomoedas." },
        { year: "2015", description: "Adoção de contratos inteligentes e blockchain interno." },
        { year: "2020", description: "Expansão global com escritórios em 10 países." },
        { year: "2025", description: "Imperium Capital atinge liderança no mercado de ativos digitais." }
      ]
    };
    
  },
  
  

  computed: {
    allCoins() {
      return [...this.oldCoins, ...this.newCoins];
    }
  },

  mounted() {
    this.verificarUsuario();
  },

  methods: {
    isWeakGlobal(name) {
      return ["Bitcoin Cash"].includes(name);
    },

    verificarUsuario() {
      const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
      if (!usuarioLogado) {
        this.$router.push("/login");
      } else {
        this.usuario = usuarioLogado;
      }
    },

    abrirMoeda(coin) {
      this.moedaSelecionada = coin;
      this.modalAtivo = true;
    },

    fecharModal() {
      this.modalAtivo = false;
    }
  }
};
</script>

<style scoped>
/* Banner */
.banner {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 80px;
}
.banner-img {
  width: 100%;
  height: auto;
  display: block;
}
.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}
.banner-text {
  position: absolute;
  left: 70px;
  color: #fff;
  z-index: 2;
}
.bem-vindo {
  font-size: 42px; /* aumento do tamanho da saudação */
  margin-bottom: 15px;
}
.mensagem-banner {
  font-size: 24px;
  max-width: 700px;
}

/* Conteúdo */
.conteudo {
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Botão centralizado */
.btn-titulo-moedas {
  display: inline-block;
  background-color: #222;
  color: #fff;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 40px 0 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  cursor: default;
}

/* Carrossel */
.carousel-wrapper {
  overflow: hidden;
  width: 100%;
  padding: 20px 0;
}
.carousel {
  display: flex;
}
.carousel-item {
  width: 150px;
  min-height: 170px;
  margin-right: 22px;
  text-align: center;
  cursor: pointer;
  background: #fff;
  border-radius: 20px;
  padding: 15px 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.12);
  transition: transform .3s ease;
}
.carousel-item:hover {
  transform: translateY(-6px);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.18);
}
.carousel-icon {
  width: 150px;
  height: 65px;
  object-fit: contain;
  margin-bottom: 20px;
}

/* Animação carrossel */
.track-left {
  animation: scroll-left 30s linear infinite;
}
.track-right {
  animation: scroll-right 30s linear infinite;
}
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

/* Banner inferior */
.sub-banner {
  text-align: center;
  margin: 40px 0;
}
.sub-banner-img {
  width: 90%;
  max-width: 1200px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

/* Linha do tempo */
.timeline {
  padding: 40px 20px;
  background: #f8f9fa;
  border-radius: 15px;
  margin: 20px auto;
  max-width: 1000px;
}
.timeline-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
}
.timeline-container {
  position: relative;
  padding-left: 30px;
}
.timeline-container::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  width: 4px;
  height: 100%;
  background: #00bfff;
  border-radius: 2px;
}
.timeline-event {
  position: relative;
  margin-bottom: 30px;
  padding-left: 20px;
}
.timeline-dot {
  position: absolute;
  left: -5px;
  top: 0;
  width: 14px;
  height: 14px;
  background: #00bfff;
  border-radius: 50%;
}
.timeline-content h3 {
  margin: 0;
  font-size: 20px;
}
.timeline-content p {
  margin: 5px 0 0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  border-radius: 15px;
  padding: 30px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
}
.modal-icon {
  width: 120px;
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
  object-fit: contain;
}
.modal-flag {
  width: 100px;
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
  object-fit: contain;
}
.flag-shadow {
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
.btn-fechar {
  padding: 8px 15px;
  margin-top: 15px;
  background: #00bfff;
  border: none;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
}
</style>
