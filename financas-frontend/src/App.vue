<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: { Header, Footer }
}
</script>

<style>
body, html, #app {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  /* NÃO mexemos no background aqui */
}

/* Podemos deixar o background padrão como preto para o dashboard */
.dashboard-page {
  background-color: #0e0e0e; /* dashboard continua preto */
  min-height: 100vh;
  color: #fff;
}

/* Todas as outras páginas podem ter seu próprio fundo */
.page-wrapper {
  min-height: 100vh; /* cobre toda a tela */
  background-color: #f8f8f8; /* fundo claro */
  color: #000; /* texto escuro */
}
</style>
