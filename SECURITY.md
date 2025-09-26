# SECURITY.md — Política de Segurança

> Versão inicial criada por Guilherme Portella — contato para triagem: [**guilhermeportella.dev@gmail.com**](mailto\:guilhermeportella.dev@gmail.com)

---

## Supported Versions

Use esta seção para informar quais versões do projeto recebem atualizações de segurança.

| Versão | Suportada?             |
| ------ | ---------------------- |
| 5.1.x  | ✅ (mantida)            |
| 5.0.x  | ❌ (fim de vida)        |
| 4.0.x  | ✅ (manutenção crítica) |
| < 4.0  | ❌ (sem suporte)        |

> Atualize esta tabela sempre que lançar uma nova versão ou estender o suporte.

---

## Política de Divulgação Responsável (Responsible Disclosure)

Queremos que vulnerabilidades sejam reportadas de forma responsável para podermos corrigir sem expor usuários. Siga os passos abaixo:

1. Envie um relatório para [**guilhermeportella.dev@gmail.com**](mailto\:guilhermeportella.dev@gmail.com) com o assunto: `Security Report — [Projeto] — [Resumo curto]`.
2. No corpo do e-mail inclua (use o template em *pentest-report-template.md* abaixo ou anexe um arquivo preenchido).
3. Se a informação for sensível, solicite via e-mail instruções para envio criptografado (PGP). Podemos providenciar chave pública mediante solicitação.
4. Evite publicar detalhes técnicos ou PoC até confirmarmos o recebimento e estabelecermos um cronograma coordenado de correção (embargo coordenado).

### O que você pode esperar

- **Confirmação de recebimento:** dentro de **72 horas úteis**.
- **Triage inicial / classificação de severidade:** dentro de **7 dias úteis**.
- **Plano inicial de mitigação/ETA de correção:** normalmente em até **30 dias**, sujeito à severidade e recursos.
- Para vulnerabilidades críticas com exploração ativa, priorizamos correção imediata e comunicação rápida.

---

## Restrições sobre Testes Automatizados e Comportamentos Perigosos

Para proteger usuários e infraestrutura, **não execute** os seguintes testes em ambientes de produção **sem autorização prévia por escrito**:

- Testes que causem interrupção de serviço (DoS/DDoS), consumo extremo de CPU/memória, ou esgotamento de quotas.
- Fuzzing massivo que gere carga indevida nas APIs.
- Scans automatizados de credenciais (credential stuffing) ou brute force em endpoints de autenticação.
- Crawlers/scrapers intensivos que ignorem `robots.txt` e provoquem rate limits.
- Explorações que modifiquem, corrompam ou apaguem dados de usuários reais.
- Uso de ferramentas que possam injetar malware, shells reversos ou persistência na infraestrutura.

Se desejar rodar testes que se enquadrem nesses pontos, solicite **autorização prévia** enviando:

- Escopo (URLs/endpoints) e janelas de execução.
- Ferramentas e versões que serão usadas.
- Contato do responsável pelo teste e retorno de emergência.

Sem autorização, qualquer atividade listada acima será considerada comportamento malicioso e poderemos bloquear IPs e notificar autoridades quando aplicável.

---

## Ambientes de Teste (Test Environments)

Para permitir testes sem risco real:

- Posso disponibilizar **ambientes de teste** (staging) com dados sintéticos, endpoints separados e contas de teste. Para solicitar:
  - Envie o escopo desejado e o período (datas).
  - Indique as credenciais ou peça que eu gere contas de teste.
- Se você executou um teste em produção por engano, informe IMEDIATAMENTE por e-mail com: hora, IPs usados, e o que foi executado — ajudaremos a mitigar.

---

## Formato Recomendado para Relatório de Pentest / Vulnerability Report

Inclua as seções abaixo. Relatórios que seguem o template facilitam triagem e resposta.

1. **Resumo executivo (1–3 linhas)**

   - Ex.: `SQLi em /api/transactions — possível extração de dados de carteira.`

2. **Impacto potencial**

   - Confidencialidade / Integridade / Disponibilidade / Exfiltração / Escalada de privilégio.

3. **Severidade sugerida**

   - CVSS (se possível) + justificativa.

4. **Passos para reproduzir (PoC passo-a-passo)**

   - Requisições HTTP completas (headers, body), parâmetros, valores usados.
   - Logs ou screenshots relevantes (truncate/obscure dados sensíveis quando necessário).

5. **Ambiente de teste usado**

   - IP, time, ferramenta (e versão), contas de usuário (teste ou real).

6. **Evidências**

   - Respostas do servidor, diffs, dumps, arquivos, ou captura de tela.

7. **Mitigação sugerida**

   - Patches técnicos, filtros, validações, regras WAF recomendadas, ajustes de configuração.

8. **Contato para dúvidas / follow-up**

   - Nome, e-mail, telefone (opcional).

9. **Assinatura/declaração**

   - Confirmação de que a exploração foi feita de boa-fé e sem intenção de dano (se aplicável).

---

## Divulgação Coordenada / Política de Embargo

- Preferimos um período de divulgação coordenada para permitir correção. Sugerimos inicialmente **90 dias** de embargo após a confirmação da vulnerabilidade, sujeito a negociação dependendo da severidade.
- Caso haja exploração ativa ou risco imediato aos usuários, poderemos reduzir o embargo e comunicar conforme necessário.

---

## Safe Harbor (Proteção para pesquisadores)

Pesquisadores que realizarem testes **de boa-fé** e dentro do escopo definido, seguindo o processo de divulgação responsável, **não serão** objeto de ação legal por parte do mantenedor. Esta proteção é aplicável apenas se:

- O pesquisador não executar testes listados em *Restrições* sem autorização.
- O pesquisador fornecer relatórios completos e cooperar na triagem.
- O pesquisador não divulgar PoC publicamente enquanto o problema estiver em embargo.

> Isto não é um substituto para aconselhamento legal—se você tem dúvidas legais, consulte um advogado.

---

## Contato

- **E-mail para relatório:** [guilhermeportella.dev@gmail.com](mailto\:guilhermeportella.dev@gmail.com)
- Para comunicações criptografadas, solicite a chave PGP via este mesmo e-mail.

---

## Acknowledgements (Reconhecimentos)

Se desejar, podemos creditar responsáveis por reports válidos (nome/handle) no repositório (arquivo `SECURITY.md`), a menos que o pesquisador peça anonimato.

---

## Requisitos operacionais e recomendações técnicas (para o time / infra)

- Implementar limites de taxa (rate limits) por endpoint e by client id.
- WAF com regras customizadas (bloqueio de payloads SQLi/XSS conhecidos).
- Monitoramento / alertas para anomalias de taxa e padrões de erro (500s).
- Tracing e logs de auditoria para requests críticas (com mascaramento de PII).
- Processo de resposta a incidentes com playbook (contato, contenção, comunicação).
- CI/CD: varredura automática (SAST) em PRs + dependabot/renovate para libs com vulnerabilidades conhecidas.
- Política de segredos: proibir segredos em código; usar vault/cicd secrets.

---

## Análise crítica e trade-offs (observações do mantenedor)

1. **Proibir testes em produção é simples, mas nem sempre exequível.**

   - Pesquisadores mal-intencionados podem ignorar a política; por isso a combinação **bloqueio técnico** (WAF, rate limiting) + **processo de autorização** é mais efetiva.

2. **Ambientes de teste são essenciais**, mas custam: replicar infra pode ser caro. Alternativa: usar feature flags e toggles para ativar modos “safe test” em staging que isolam efeitos sobre dados reais.

3. **Embargo padrão de 90 dias** é razoável, mas para vulnerabilidades críticas (RCE, exfiltration) esse prazo pode ser curto — esteja preparado para acelerar patches e mitigações temporárias.

4. **Oferecer safe harbor aumenta colaboração**, mas não elimina a necessidade de logs e possíveis ações contra abuso. Tenha procedimentos e evidências para distinguir pesquisa legítima de ataque.

5. **Automação de triagem** (p.ex. classificação preliminar por scripts que analisam PoC) pode acelerar, mas **não substitui** um engenheiro para validar impacto real em infra complexa.

---

# pentest-report-template.md — Template de Relatório de Pentest (preenchível)

> **Instruções:** Preencha este arquivo com informações claras e reproduzíveis. Envie como anexo ou no corpo do e-mail para `guilhermeportella.dev@gmail.com` com o assunto: `Security Report — [Projeto] — [Resumo curto]`.

---

## 0. Identificação

- **Nome do pesquisador / handle:**
- **E-mail:**
- **Telefone (opcional):**
- **Data e hora (UTC) da atividade:**

## 1. Resumo executivo (1–3 linhas)

## 2. Impacto potencial

- Confidencialidade:
- Integridade:
- Disponibilidade:
- Exfiltração / Escalada de privilégios:

## 3. Severidade sugerida

- CVSS v3.x (se conhecido):
- Severidade sugerida (Baixa / Média / Alta / Crítica) e justificativa:

## 4. Escopo do teste

- Endpoints / URLs testados:
- Contas/roles usadas (teste ou real):
- Ambiente (produção/staging/local):
- Janelas de execução (datas/horários):

## 5. Ferramentas e versões utilizadas

- Ferramentas (ex.: nmap 7.92, burp suite 2024.x, sqlmap 1.x):
- Scripts personalizados (colocar link ou anexar):

## 6. Passos para reproduzir (PoC passo-a-passo)

- Passo 1:
- Passo 2:
- ...

**HTTP requests (completas)**

```
[Cole aqui a requisição HTTP completa, incluindo headers e body]
```

**Observações sobre timing, pré-condições ou autenticação:**

## 7. Evidências

- Capturas de tela (anexar):
- Trechos de logs (obscure dados sensíveis):
- Respostas do servidor (ex.: status code, body):

## 8. Mitigação sugerida

- Ação imediata:
- Correção recomendada:
- Mitigação temporária (WAF, rate limit, feature flag):

## 9. Impacto reproduzível (sim/não)

- Se sim, detalhe as condições necessárias:

## 10. Comunicação e follow-up

- Deseja ser creditado nos acknowledgements? (Sim/Não)
- Prefere anonimato? (Sim/Não)
- Melhor canal para contato (e-mail / telefone / outro):

## 11. Assinatura

- Declaro que esta atividade foi conduzida de boa-fé para o propósito de melhorar a segurança do projeto. (Assinatura / handle / data)

---

## Observações finais

- Relatórios incompletos podem atrasar a triagem. Forneça o máximo de detalhes possíveis.
- Se precisar enviar arquivos sensíveis, peça instruções para transferência segura via e-mail.

---

*Arquivos sugeridos para adicionar ao repositório:* `SECURITY.md` (público), `pentest-report-template.md` (público), e um `SECURITY-PLAYBOOK.md` interno (não público) com procedimentos operacionais completos.

*Fim do documento.*

