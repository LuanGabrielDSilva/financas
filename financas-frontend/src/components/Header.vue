<template> 
  <header class="header"> 

    <div class="inner-header">
      
      <div class="logo">
        <img src="/img/logo.png" alt="Logo" />
        <span>Imperium Capital</span>
      </div>

      <nav>
        <ul>
          <li>
            <router-link to="/dashboard">Início</router-link>
          </li>
          <li>
            <router-link to="/transacoes">Transações</router-link> 
          </li> 
          <li> 
            <router-link to="/investimentos">Investimentos</router-link>
          </li>
          <li>
            <router-link to="/perfil">
              <img src="/img/user-placeholder.png" alt="Perfil" class="user-icon"/>
            </router-link>
          </li>
        </ul>
      </nav>

    </div>

  </header> 
</template> 
 
<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center; /* Centraliza o container interno */
  align-items: center;

  height: 80px;
  padding: 0 20px;

  background-color: #0e0e0e;
  color: white;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* Container interno para limitar a largura */
.inner-header {
  width: 100%;
  max-width: 1300px;      /* Limita largura do conteúdo */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  width: 40px;
  height: 40px;
}

/* Menu */
nav ul {
  display: flex;
  list-style: none;
  gap: 25px;
  align-items: center;
  margin: 0;
  padding: 0 15px; /* garante um espaço da borda direita */
}

nav ul li a { 
  color: white; 
  text-decoration: none; 
  font-weight: 500;
}

nav ul li a:hover {
  color: #00bfff;
}

/* Perfil */
.user-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px; /* afasta o perfil da borda direita */
}
</style>
