export default function EstudosDeCasoPage() {
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold leading-tight">
          Estudo de Caso: Neurofibromatose Tipo 1 com Escoliose Distrófica
          Grave, Neurofibromas Plexiformes e Repercussão Funcional Respiratória
        </h1>
      </header>

      {/* Sugestão: Adicionar uma imagem de capa representativa do caso clínico aqui. Ex: uma composição de imagens de RM da coluna e do tórax. */}

      <section className="space-y-4">
        <h2 className="text-2xl font-medium">Abstract</h2>
        <blockquote className="border-l-4 pl-4 italic opacity-80">
          <p>
            We report the case of a 27-year-old male patient with
            neurofibromatosis type 1 (NF1) presenting with a severe dystrophic
            scoliosis associated with a hemivertebra, multiple plexiform and
            nodular neurofibromas, and dural ectasia. Imaging revealed extensive
            skeletal deformities, rigid angular scoliosis, and remodeling of
            posterior vertebral walls. Pulmonary function tests demonstrated a
            moderate obstructive ventilatory disorder with reduced vital
capacity,
            highlighting functional compromise. The complexity of this case
            illustrates the interplay between genetic predisposition, structural
            deformity, tumor burden, and functional deterioration. The case
            emphasizes the need for multidisciplinary management and illustrates
            the challenges of surgical contraindication in advanced NF1.
          </p>
        </blockquote>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-medium">Introdução</h2>
        <p className="opacity-90 leading-relaxed">
          A neurofibromatose tipo 1 (NF1) é uma desordem genética autossômica
          dominante caracterizada por mutações no gene NF1, responsável pela
          codificação da neurofibromina, proteína reguladora da via RAS/MAPK. A
          condição se associa ao desenvolvimento de múltiplos tumores da bainha
          do nervo periférico, incluindo neurofibromas plexiformes, e a diversas
          manifestações musculoesqueléticas, como displasias ósseas e escoliose
          distrófica.
        </p>
        {/* Sugestão: Adicionar imagem ilustrando a via RAS/MAPK ou um neurofibroma plexiforme. */}
        <p className="opacity-90 leading-relaxed">
          A escoliose distrófica em NF1 distingue-se das formas idiopáticas por
          sua evolução rápida, rigidez, angulação curta e associação com
          cifose, hemivértebra e ectasia dural. Tais deformidades frequentemente
          apresentam alto risco neurológico e instabilidade estrutural, tornando
          o tratamento cirúrgico arriscado. Além disso, os neurofibromas
          plexiformes, infiltrativos e inoperáveis em muitos casos, contribuem
          para o remodelamento ósseo e podem gerar compressão neural progressiva
          ou transformação maligna.
        </p>
        <p className="opacity-90 leading-relaxed">
          O presente estudo descreve um caso clínico de NF1 com escoliose
          distrófica grave, destacando a integração entre achados radiológicos,
          funcionais e clínicos, e discutindo suas implicações prognósticas e
terapêuticas.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-medium">Discussão</h2>
        <p className="opacity-90 leading-relaxed">
          Os achados de imagem revelam uma escoliose torácica grave (&gt;80°
          estimado), com convexidade à esquerda e componente rotacional,
          associada a cifotização, fusão parcial e hipoplasia vertebral,
          compatíveis com deformidade distrófica. O laudo de tomografia e
          ressonância demonstra ainda ectasia dural em região lombossacra,
          levando a remodelamento posterior dos corpos de L5-S2.
        </p>
        {/* Sugestão: Adicionar imagem da TC ou RM mostrando a escoliose distrófica e a ectasia dural. */}
        <p className="opacity-90 leading-relaxed">
          Além da deformidade óssea, foram identificados múltiplos
          neurofibromas em trajetos nervosos lombossacrais e musculatura
          paravertebral, bem como nódulos paravertebrais e subcutâneos. A
          infiltração tumoral, característica da NF1, contribui para o
          remodelamento ósseo e aumenta o risco de compressão radicular ou
          medular. O risco de transformação em tumor maligno da bainha do nervo
          periférico (MPNST), embora relativamente baixo, justifica vigilância
          sistemática com RM e, em casos suspeitos, PET/CT.
        </p>
        <p className="opacity-90 leading-relaxed">
          Do ponto de vista funcional, a espirometria evidenciou um distúrbio
          ventilatório obstrutivo moderado com redução da capacidade vital, sem
          resposta significativa ao broncodilatador, achado que reflete a
          repercussão torácica da deformidade e possivelmente a obstrução
          funcional condicionada por massas paravertebrais. A combinação de
          limitação respiratória, deformidade rígida e risco neurológico
          caracteriza este caso como de alto risco clínico e cirúrgico.
        </p>
        {/* Sugestão: Adicionar gráfico dos resultados da espirometria. */}
        <p className="opacity-90 leading-relaxed">
          O manejo terapêutico deve privilegiar abordagens multidisciplinares.
          Cirurgia corretiva extensa não é recomendada devido ao risco
          neurológico catastrófico e instabilidade estrutural. Entre
          alternativas não cirúrgicas, destaca-se o uso de inibidores de MEK
          (selumetinibe), já aprovados para neurofibromas plexiformes
          inoperáveis, com evidência de redução volumétrica e melhora
          funcional. Medidas adicionais incluem reabilitação física e
          respiratória, analgesia multimodal, suporte postural e vigilância por
          RM seriada e WBMRI para estratificação tumoral.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-medium">Conclusão</h2>
        <p className="opacity-90 leading-relaxed">
          Este caso ilustra a complexidade clínica da NF1 quando associada a
          escoliose distrófica grave, hemivértebra, ectasia dural e
          neurofibromas múltiplos inoperáveis. A condição já repercute em
          função respiratória, mobilidade e qualidade de vida, configurando
          quadro de alto risco cirúrgico e com prognóstico reservado.
        </p>
        <p className="opacity-90 leading-relaxed">
          O estudo reforça a importância de uma abordagem integrada, combinando
          diagnóstico por imagem avançado, monitoramento funcional e terapias
          alvo, em detrimento de intervenções cirúrgicas de risco. Além disso,
          sublinha a relevância de casos como este para ensino, pesquisa e
          discussão em nível de mestrado, dada a confluência de genética,
          oncologia, ortopedia e pneumologia em um mesmo paciente.
        </p>
      </section>
    </main>
  );
}
