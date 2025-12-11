<template>
  <nav class="navbar">
    <router-link to="/dashboard">Início</router-link>
    <router-link to="/transacoes">Transações</router-link>
    <router-link to="/investimentos">Investimentos</router-link>
    <router-link to="/contato">Contato</router-link>
    <button @click="logout">Sair</button>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.navbar {
  display:flex;
  justify-content:center;
  gap:20px;
  background:#0e0e0e;
  padding:15px;
  border-bottom:1px solid rgba(255,255,255,.2);
}
.navbar a {
  color:#00bfff;
  text-decoration:none;
  font-weight:bold;
}
.navbar button {
  background:#00bfff;
  border:none;
  padding:8px 12px;
  border-radius:8px;
  cursor:pointer;
}
.navbar button:hover { background:#00d4ff; }
</style>
