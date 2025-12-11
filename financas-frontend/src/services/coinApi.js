// src/services/coinApi.js
import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export default {
  async getCoin(coinId) {
    try {
      const response = await axios.get(`${BASE_URL}/coins/markets`, {
        params: {
          vs_currency: "usd",
          ids: coinId,
          order: "market_cap_desc",
          per_page: 1,
          page: 1,
          sparkline: false
        }
      });
      return response.data[0];
    } catch (error) {
      console.error("Erro ao buscar coin:", error);
      return null;
    }
  },
  
  async getCoins(coinIds) {
    const results = [];
    for (const id of coinIds) {
      const coin = await this.getCoin(id);
      if (coin) results.push(coin);
    }
    return results;
  }
};
