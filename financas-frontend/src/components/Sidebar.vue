<template>
  <aside class="sidebar">
    <a @click="$router.push('/dashboard')">🏠 Dashboard</a>
    <a @click="$router.push('/transacoes')">📊 Transações</a>
    <a @click="$router.push('/configuracoes')">⚙️ Configurações</a>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 70px; /* abaixo do header */
  width: 240px;
  height: calc(100vh - 70px);
  background: #161b22;
  border-right: 1px solid #30363d;

  overflow-y: auto;
  overflow-x: hidden; /* garantido */
  padding: 20px;
}

a {
  display: block;
  margin-top: 18px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

a:hover {
  color: #2ea043;
}

@media (max-width: 900px) {
  .sidebar {
    display: none; /* sidebar some em telas pequenas */
  }
}
</style>
