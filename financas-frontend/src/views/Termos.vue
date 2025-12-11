<template>
  <div class="termos">

    <!-- Fundo escuro com imagem -->
    <div class="header-background"></div>

    <div class="conteudo">
      <h1>Termos de Uso - Imperium Capital</h1>

      <p>Bem-vindo à Imperium Capital. Estes Termos de Uso estabelecem as regras para utilização do nosso site.</p>

      <h2>1. Aceitação dos Termos</h2>
      <p>Ao acessar nosso site, você confirma que leu, compreendeu e concorda com estes termos.</p>

      <h2>2. Uso do Serviço</h2>
      <p>Você concorda em utilizar nossa plataforma de forma responsável e lícita.</p>

      <h2>3. Privacidade</h2>
      <p>Respeitamos sua privacidade e tratamos seus dados conforme nossa Política de Privacidade.</p>

      <h2>4. Responsabilidades</h2>
      <p>Não nos responsabilizamos por danos causados por mau uso da plataforma.</p>

      <h2>5. Alterações nos Termos</h2>
      <p>Podemos atualizar estes termos periodicamente, refletindo mudanças legais ou melhorias do serviço.</p>

      <!-- 🔥 CAIXA CENTRALIZADA A PARTIR DAQUI -->
      <div class="caixa-especial">
        <h2>Política de Cookies</h2>
        <p>Utilizamos cookies para melhorar sua experiência e analisar o uso da plataforma.</p>

        <h2>Coleta de Dados</h2>
        <p>Coletamos informações mínimas necessárias para funcionamento e segurança.</p>

        <h2>Segurança</h2>
        <p>Implementamos medidas avançadas para proteger seus dados de acessos não autorizados.</p>

        <h2>Direitos do Usuário</h2>
        <p>Você tem o direito de solicitar acesso, correção ou remoção de seus dados pessoais.</p>

        <h2>Contato</h2>
        <p>Em caso de dúvidas, você pode nos contatar através da página de Contato.</p>
      </div>

    </div>
  </div>
</template>


<style scoped>
.termos {
  width: 100%;
  min-height: 100vh;
  background: #0e0e0e;
  color: white;
  padding-bottom: 50px;
}

.header-background {
  width: 100%;
  height: 400px;
  background: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)),
              url("/img/fundo.termo.jpg") center/cover no-repeat;
}

.conteudo {
  max-width: 900px;
  margin: 0 auto;
  margin-top: -100px;
  background: rgba(20,20,20,0.85);
  padding: 40px 50px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0,0,0,.35);
}

.conteudo h1 {
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
  color: #00bfff;
}

.conteudo h2 {
  margin-top: 25px;
  color: #00bfff;
}

.conteudo p {
  margin-top: 10px;
  line-height: 1.6;
  color: #ddd;
}

/* 🔥 CAIXA CENTRALIZADA ESPECIAL */
.caixa-especial {
  margin-top: 40px;
  text-align: center;
  padding: 35px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 12px;
  backdrop-filter: blur(8px);
}

.caixa-especial h2 {
  color: #4dc7ff;
  margin-top: 25px;
}

.caixa-especial p {
  color: #e0e0e0;
  margin-top: 10px;
}
</style>
