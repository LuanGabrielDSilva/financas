<template>
  <footer class="footer">
    <div class="footer-logo">Imperium Capital</div>
    <div class="links">
      <router-link to="/contato">Contato</router-link>
      <router-link to="/privacidade">Políticas de Privacidade</router-link>
      <router-link to="/termos">Termos de Uso</router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #0e0e0e;
  color: white;
  box-shadow: 0 -4px 20px rgba(0,0,0,.3);
}
.footer-logo {
  font-weight: bold;
  font-size: 20px;
  color: #00bfff;
}
.links a {
  margin-left: 20px;
  text-decoration: none;
  color: white;
  transition: 0.3s;
}
.links a:hover {
  color: #00d4ff;
}
</style>
