<template>
  <div class="politica">

    <!-- Fundo escuro com imagem -->
    <div class="header-background"></div>

    <div class="conteudo">
      <h1>Política de Privacidade - Imperium Capital</h1>

      <p>Na Imperium Capital, respeitamos sua privacidade e estamos comprometidos em proteger seus dados pessoais.</p>

      <h2>1. Coleta de Informações</h2>
      <p>
        Coletamos dados fornecidos diretamente pelo usuário, como nome, e-mail
        e informações financeiras necessárias para operação da plataforma.
        Também podemos coletar informações automaticamente, como endereço IP e comportamento de navegação.
      </p>

      <h2>2. Finalidade do Uso dos Dados</h2>
      <p>
        Os dados coletados são utilizados para fornecer nossos serviços, garantir a segurança da plataforma,
        personalizar a experiência do usuário e melhorar nossos produtos.
      </p>

      <h2>3. Compartilhamento de Informações</h2>
      <p>
        Não vendemos ou compartilhamos dados pessoais sem consentimento, exceto quando exigido por lei
        ou para parceiros confiáveis que auxiliem na prestação de nossos serviços.
      </p>

      <h2>4. Segurança dos Dados</h2>
      <p>
        Implementamos protocolos avançados de criptografia e medidas de segurança para proteger suas informações contra acessos não autorizados.
      </p>

      <!-- 🔥 CAIXA CENTRALIZADA -->
      <div class="caixa-especial">
        <h2>Cookies e Tecnologias Semelhantes</h2>
        <p>
          Utilizamos cookies e tecnologias similares para analisar o uso da plataforma,
          melhorar a experiência do usuário e fornecer anúncios relevantes.
        </p>

        <h2>Retenção de Dados</h2>
        <p>
          Mantemos os dados do usuário apenas pelo tempo necessário para cumprir as finalidades descritas
          ou obrigações legais.
        </p>

        <h2>Direitos do Usuário</h2>
        <p>
          Você tem o direito de solicitar acesso, correção, exclusão ou portabilidade dos seus dados pessoais.
          Também pode limitar ou se opor ao processamento de suas informações a qualquer momento.
        </p>

        <h2>Alterações na Política</h2>
        <p>
          Podemos atualizar esta política periodicamente. Recomendamos que revise esta página regularmente
          para se manter informado sobre quaisquer alterações.
        </p>

        <h2>Contato</h2>
        <p>
          Em caso de dúvidas sobre nossa Política de Privacidade, entre em contato através do e-mail
          <strong>privacidade@imperiumcapital.com</strong>.
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.politica {
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
              url("/img/privacidade.jpg") center/cover no-repeat;
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
