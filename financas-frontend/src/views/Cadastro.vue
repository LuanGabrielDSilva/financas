<template>
  <div class="cadastro-page">
    <div class="cadastro-box">
      <h1>Cadastro</h1>
      <form @submit.prevent="cadastrarUsuario">
        <input type="text" v-model="nome" placeholder="Nome" required>
        <input type="email" v-model="email" placeholder="Email" required>
        <input type="password" v-model="senha" placeholder="Senha" required>
        <button :disabled="enviando">{{ enviando ? 'Cadastrando...' : 'Cadastrar' }}</button>
      </form>
      <p>Já tem conta? <router-link to="/login">Faça login</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { nome: '', email: '', senha: '', enviando: false };
  },
  methods: {
    async cadastrarUsuario() {
      this.enviando = true;
      try {
        const res = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: this.nome, email: this.email, senha: this.senha })
        });
        const data = await res.json();
        if(res.ok){
          alert('Cadastro realizado!');
          this.$router.push('/login');
        } else {
          alert(data.message);
        }
      } catch(e){ console.error(e); alert('Erro no cadastro'); }
      finally{ this.enviando = false; }
    }
  }
}
</script>

<style scoped>
.cadastro-page { width: 100%; height: 100vh; background: url('/img/login.jpg') center/cover no-repeat; display: flex; justify-content: center; align-items: center; }
.cadastro-box { background: rgba(0,0,0,0.8); padding: 40px; border-radius: 20px; color: white; text-align: center; width: 350px; }
.cadastro-box input { width: 100%; padding: 12px; margin: 10px 0; border-radius: 10px; border: none; }
.cadastro-box button { width: 100%; padding: 12px; background: #00bfff; color: black; border: none; border-radius: 10px; cursor: pointer; transition: 0.3s; }
.cadastro-box button:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
