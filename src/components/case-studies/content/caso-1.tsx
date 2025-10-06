import React from 'react';

const CaseStudy1 = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Estudo de Caso 1: Título do Caso</h2>
      <p className="mb-4">
        Esta é a descrição detalhada do primeiro estudo de caso. O conteúdo pode ser estruturado
        com parágrafos, listas e outros elementos de JSX.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Ponto chave 1</li>
        <li>Ponto chave 2</li>
        <li>Ponto chave 3</li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Conclusão</h3>
      <p>
        A conclusão do estudo de caso, resumindo os aprendizados e os resultados.
      </p>
    </div>
  );
};

export default CaseStudy1;
