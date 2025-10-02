# NF1-Hub

## Visão Geral

O NF1-Hub é uma plataforma central para a comunidade de Neurofibromatose tipo 1 (NF1). Nosso objetivo é conectar pacientes, familiares e médicos, facilitando o acesso a informações, especialistas e estudos de caso.

## Objetivos e Metas

*   **Central de Informações:** Unificar informações relevantes sobre NF1, incluindo artigos, notícias e estudos de caso.
*   **Encontrar Especialistas:** Manter uma lista curada de médicos e especialistas com experiência em NF1, permitindo que pacientes encontrem cuidados qualificados.
*   **Comunidade:** Criar um espaço para a troca de experiências e apoio entre pacientes e familiares.
*   **Facilitar a Indicação:** Simplificar o processo para que profissionais de saúde possam indicar novos colegas para a plataforma.

## Público-Alvo

*   Pacientes com Neurofibromatose tipo 1 e seus familiares.
*   Médicos, pesquisadores e outros profissionais de saúde que trabalham com NF1.
*   Hospitais e clínicas especializadas.

## Como Rodar o Projeto

### Pré-requisitos

*   [Node.js](https://nodejs.org/) (versão 20.x ou superior)
*   [pnpm](https://pnpm.io/installation) (gerenciador de pacotes)

### 1. Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/nf1-hub.git
cd nf1-hub
pnpm install
```

### 2. Variáveis de Ambiente

Este projeto utiliza variáveis de ambiente para configurações sensíveis, como chaves de API e credenciais de e-mail.

1.  Crie um arquivo chamado `.env.local` na raiz do projeto.
2.  Você pode usar o arquivo `.env.example` como um modelo.
3.  Preencha os valores das variáveis em `.env.local`:

```dotenv
# .env.local

# reCAPTCHA v3 (Google)
# Obtenha suas chaves em https://www.google.com/recaptcha/admin/
RECAPTCHA_SECRET_KEY=SUA_CHAVE_SECRETA_AQUI

# Configurações do servidor de e-mail (SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=seu-email@example.com
SMTP_PASS=sua-senha
SMTP_SENDER_EMAIL=no-reply@example.com
```

### 3. Rodando o Servidor de Desenvolvimento

Execute o comando abaixo para iniciar o servidor:

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

## Decisões Técnicas

*   **Framework:** [Next.js](https://nextjs.org/) foi escolhido por sua excelente performance (SSR e SSG), otimização de SEO e ecossistema robusto, ideais para uma plataforma de conteúdo e comunidade.
*   **Hospedagem:** [Vercel](https://vercel.com/) oferece uma integração perfeita com o Next.js, facilitando o deploy contínuo e a gestão de variáveis de ambiente.
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/) foi utilizado para agilizar o desenvolvimento da UI com um sistema de classes utilitárias, garantindo consistência visual.
*   **Segurança (Formulário):** O [Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3) foi implementado no formulário de indicação de médicos para proteger contra spam e abuso de forma transparente para o usuário.
*   **Envio de E-mail:** [Nodemailer](https://nodemailer.com/) é uma solução consolidada e flexível para o envio de e-mails transacionais, como as notificações de novas indicações.

## Como Contribuir

Contribuições são bem-vindas! Por favor, abra uma *issue* para discutir o que você gostaria de mudar ou adicione um *Pull Request*.

## Deploy na Vercel

A maneira mais fácil de fazer o deploy é usar a [Plataforma Vercel](https://vercel.com/new).

Não se esqueça de adicionar as variáveis de ambiente (contidas no seu arquivo `.env.local`) nas configurações de "Environment Variables" do seu projeto na Vercel antes de fazer o deploy.