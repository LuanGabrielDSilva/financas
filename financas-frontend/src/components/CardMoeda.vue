<template>
  <div class="card">
    <img :src="coin.icon" :alt="coin.name" class="coin-icon" />
    <div class="coin-info">
      <h3>{{ coin.name }}</h3>
      <p>Valor: {{ coin.current_price.toLocaleString('pt-BR', { style: 'currency', currency: coin.currency }) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardMoeda",
  props: {
    coin: { type: Object, required: true }
  }
};
</script>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  flex: 1 1 200px;
}

.coin-icon {
  width: 50px;
  height: 50px;
}

.coin-info h3 {
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 600;
}

.coin-info p {
  font-size: 16px;
  color: #555;
}
</style>
