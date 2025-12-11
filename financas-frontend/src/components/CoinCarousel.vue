<template>
  <div class="carousel-container">
    <div class="carousel" :style="{ transform: `translateX(-${currentIndex * cardWidth}px)` }">
      <div
        class="coin-card"
        v-for="(coin, index) in coins"
        :key="index"
        @click="selectCoin(coin)"
      >
        <img :src="coin.image" class="coin-img" />

        <div class="coin-info">
          <h3>{{ coin.name }}</h3>
        </div>

        <img :src="coin.flag" class="flag" :class="{ 'flag-japan': coin.code === 'JPY' }" />
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <div v-if="selectedCoin" class="modal" @click.self="selectedCoin = null">
      <div class="modal-content">
        <h2>{{ selectedCoin.name }}</h2>
        <img :src="selectedCoin.flag" class="flag-large" :class="{ 'flag-japan': selectedCoin.code === 'JPY' }" />
        <p><strong>Origem:</strong> {{ selectedCoin.origin }}</p>
        <p><strong>Criador:</strong> {{ selectedCoin.creator }}</p>
        <p><strong>País:</strong> {{ selectedCoin.country }}</p>

        <button @click="selectedCoin = null" class="close-btn">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      cardWidth: 250,
      selectedCoin: null,
      coins: [
        {
          name: "Euro",
          code: "EUR",
          image: "/img/coins/euro.png",
          flag: "/img/flags/eu.png",
          country: "União Europeia",
          origin: "Criada em 1999",
          creator: "Tratado de Maastricht"
        },
        {
          name: "Dólar Americano",
          code: "USD",
          image: "/img/coins/dollar.png",
          flag: "/img/flags/usa.png",
          country: "Estados Unidos",
          origin: "Criada em 1792",
          creator: "Alexander Hamilton"
        },
        {
          name: "Iene Japonês",
          code: "JPY",
          image: "/img/coins/yen.png",
          flag: "/img/flags/japan.png",
          country: "Japão",
          origin: "Criada em 1871",
          creator: "Governo Meiji"
        }
      ]
    };
  },

  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.coins.length;
    }, 3000); // mais lento
  },

  methods: {
    selectCoin(coin) {
      this.selectedCoin = coin;
    }
  }
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-top: 40px;
}

.carousel {
  display: flex;
  transition: transform 1s ease;
}

.coin-card {
  min-width: 250px;
  height: 260px;
  background: #111;
  border-radius: 14px;
  margin: 0 15px;
  padding: 20px;
  color: white;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  transition: 0.3s;
}

.coin-card:hover {
  transform: scale(1.05);
}

.coin-img {
  width: 90px;
  margin: 0 auto;
}

.coin-info h3 {
  margin-top: 15px;
  font-size: 20px;
  font-weight: 600;
}

.flag {
  width: 55px;
  height: auto;
  margin-top: 15px;
  border-radius: 5px;
}

/* Somente a bandeira do Japão */
.flag-japan {
  box-shadow: 0 0 8px rgba(0,0,0,0.5);
  border: 1px solid rgba(0,0,0,0.4);
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  width: 420px;
  padding: 25px;
  border-radius: 18px;
  text-align: center;
  animation: fadeIn 0.4s ease;
}

.flag-large {
  width: 120px;
  margin: 20px 0;
}

.close-btn {
  background: black;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
