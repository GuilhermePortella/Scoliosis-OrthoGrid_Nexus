import React from 'react';
import CaseStudy1 from '@/components/case-studies/content/caso-1';
import CasoEscolioseDistrofica from '@/components/case-studies/content/caso-escoliose-distrofica';

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'escoliose-distrofica-grave',
    title: 'NF1 com Escoliose Distrófica Grave e Neurofibromas Plexiformes',
    description: 'Relato de caso de um paciente de 27 anos com múltiplas complicações esqueléticas e tumorais da Neurofibromatose tipo 1.',
    component: CasoEscolioseDistrofica,
  },
  {
    id: 'caso-1',
    title: 'Estudo de Caso de Exemplo',
    description: 'Este é um exemplo de como um novo estudo de caso aparece na lista.',
    component: CaseStudy1,
  },
  // Novos casos serão adicionados aqui
];

export const getCaseStudyById = async (id: string): Promise<CaseStudy | undefined> => {
  return caseStudies.find((study) => study.id === id);
};