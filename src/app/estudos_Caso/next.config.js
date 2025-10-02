/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera um site estático na pasta /out
  output: 'export',

  // Substitua <repository-name> pelo nome do seu repositório
  basePath: process.env.NODE_ENV === 'production' ? '/<repository-name>' : '',

  // Desativa a otimização de imagem baseada em servidor
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;