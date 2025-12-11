<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: "CoinChart",
  props: {
    coin: {
      type: Object,
      required: true
    },
    history: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    const ctx = this.$refs.chartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: this.history.map(h => h.date),
        datasets: [
          {
            label: this.coin.name,
            data: this.history.map(h => h.price),
            borderColor: "#00bfff",
            backgroundColor: "rgba(0,191,255,0.2)",
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: { display: true, title: { display: true, text: 'Data' } },
          y: { display: true, title: { display: true, text: 'Preço (R$)' } }
        }
      }
    });
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto 40px auto;
}
</style>
