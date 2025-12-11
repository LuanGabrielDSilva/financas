<template>
  <div class="login-page">
    <div class="login-box">
      <h1>Login</h1>
      <form @submit.prevent="loginUser">
        <input type="email" v-model="email" placeholder="Email" required>
        <input type="password" v-model="senha" placeholder="Senha" required>
        <button :disabled="enviando">{{ enviando ? 'Entrando...' : 'Login' }}</button>
      </form>
      <p>Não tem conta? <router-link to="/cadastro">Cadastre-se</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      senha: '',
      enviando: false
    }
  },
  methods: {
    async loginUser() {
      this.enviando = true;
      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, senha: this.senha })
        });

        const data = await res.json();

        if(res.ok){
          if(!data.token){
            alert('Erro: token não retornado pelo servidor');
            this.enviando = false;
            return;
          }

          // Salva token JWT
          localStorage.setItem('token', data.token);

          // Salva usuário (nome, email, id)
          localStorage.setItem('usuario', JSON.stringify(data.user));

          // Entra no dashboard
          this.$router.push('/dashboard');
        } else {
          alert(data.message || 'Erro no login');
        }
      } catch(e) { 
        console.error(e); 
        alert('Erro no login'); 
      } finally { 
        this.enviando = false; 
      }
    }
  }
}
</script>

<style scoped>
.login-page { width: 100%; height: 100vh; background: url('/img/login.jpg') center/cover no-repeat; display: flex; justify-content: center; align-items: center; }
.login-box { background: rgba(0,0,0,0.8); padding: 40px; border-radius: 20px; color: white; text-align: center; width: 350px; }
.login-box input { width: 100%; padding: 12px; margin: 10px 0; border-radius: 10px; border: none; }
.login-box button { width: 100%; padding: 12px; background: #00bfff; color: black; border: none; border-radius: 10px; cursor: pointer; transition: 0.3s; }
.login-box button:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
