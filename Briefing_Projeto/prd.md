# Product Requirements Document (PRD)

**Produto:** CRM Fábrica Jurídica Dantas & Filizola  
**Versão:** 1.1.0 (Versão Estendida Técnico-Visual)  
**Data:** 23 de Fevereiro de 2026  
**Status:** Em Definição Estratégica  

---

## 1. Visão Geral Executiva

O **CRM Fábrica Jurídica Dantas & Filizola** é um ecossistema operacional desenhado para gerir e escalar o core business previdenciário do escritório em alta velocidade. O sistema transforma fluxos analógicos baseados em intervenção humana constante em uma "esteira de fábrica" invisível, previsível e baseada em IA. 

O coração do sistema é composto por **11 Robôs de Automação** que ingerem documentos desestruturados (fotos/PDFs), processam, validam, geram peças jurídicas (Petições/Relatórios) e monitoram ativamente os portais do governo (Meu INSS).

**Objetivo Central:** Reduzir o tempo de triagem documental, eliminar o risco de "processos esquecidos" ou "prazos perdidos", e permitir que a liderança (Gestora) apenas audite visualmente e tome decisões de protocolo sem precisar manipular papéis.

---

## 2. Perfis de Usuário (Personas) e Permissões

A plataforma terá três níveis primários de interação humana, todas ocorrendo em um painel Web dinâmico e seguro:

| Perfil | Acesso no Frontend | Responsabilidade Principal |
| :--- | :--- | :--- |
| **Advogado/Atendente** | Nível Operacional | Inserção bruta. Atende o cliente presencialmente, tira fotos dos documentos físicos e faz o _upload dry_ diretamente no painel do cliente no CRM. Preenche dados cadastrais base. |
| **Gestora/Revisora** | Nível Decisão (Painel Gerencial) | Analisa a fila do "Pacote Final" gerado pelos robôs. Utiliza o modo "Split Screen" (Relatório Inteligente à esquerda + PDF Mesclado à direita) para dar o crivo de aprovação ou devolver o ticket com pendências objetivas. |
| **Sócio/Admin** | Nível Sistêmico (Full Access) | Visão executiva. Acompanha métricas (painel do Figma), status dos 2.000+ processos e controla a "fila de alarme" do Robô 10 (exigências e prazos críticos no limite). |

---

## 3. Especificações de Banco de Dados (Supabase Postgres)

A modelagem de dados foi desenhada para suportar a esteira dos 11 robôs de forma assíncrona. O esquema utilizará chaves estrangeiras (fks) robustas e UUIDs.

### 3.1. Entidades Principais (Tabelas)

1.  **`clientes` (Tabela Mestre de Cadastro)**
    *   **Colunas:** `id` (uuid, PK), `nome_completo`, `cpf` (unique), `data_nascimento`, `telefone`, `email`, `endereco_json`, `status_processual` (Enum: INATIVO, COLETANDO_DOCS, PRONTO_GOVERNO, PROTOCOLADO, CONCLUIDO).
    *   **Relacionamento:** 1 para N com `processos`.

2.  **`processos` (Tabela do Benefício em si)**
    *   **Colunas:** `id` (uuid, PK), `cliente_id` (fk -> clientes), `tipo_beneficio` (ex: BPC, Auxilio-Doença), `status_robo_atual` (integer, ref ao robô na esteira), `decisao_gestora` (boolean, nulo se não avaliado), `der` (data entrada requerimento), `numero_beneficio` (varchar, nulo até o protocolo).
    *   **Relacionamento:** 1 para N com `documentos` e `logs_inss`.

3.  **`documentos` (Trilha do Robô 1, 2 e 6)**
    *   **Colunas:** `id` (uuid, PK), `processo_id` (fk -> processos), `storage_path` (caminho no bucket), `tipo_original` (image/jpeg, application/pdf), `tipo_classificado_robo_1` (Enum: RG, CNH, LAUDO, COMPROVANTE_RESIDENCIA), `bucket_categoria` (Enum: 01_DADOS_PESSOAIS, 04_MEDICOS_LAUDOS...), `metadados_ia` (jsonb - guarda o CID, data de validade, nome lido p/ bater com cadastro), `status_qualidade` (Enum: LEGIVEL, ILEGIVEL_TRAVA).

4.  **`pecas_juridicas` (Trilha do Robô 8 e 9)**
    *   **Colunas:** `id` (uuid, PK), `processo_id` (fk -> processos), `tipo_peca` (Enum: PETICAO_INICIAL, RELATORIO_GESTORA, PACOTE_FINAL_PDF), `storage_path` (caminho do arquivo gerado), `versao` (integer).

5.  **`historico_inss` (Trilha do Robô 10 - Scraping)**
    *   **Colunas:** `id` (uuid, PK), `processo_id` (fk -> processos), `evento` (Enum: EXIGENCIA, PERICIA_AGENDADA, DEFERIDO, INDEFERIDO), `conteudo_texto` (varchar, texto extraido do portal), `data_evento_portal` (timestamp), `prazo_fatal` (date, nulo se não houver exigência), `storage_print_path` (pdf ou print da tela do inss).

### 3.2. Como essas Tabelas se Completam (Explicação Simples)

Pense neste banco de dados como um arquivo físico de escritório hiper-organizado:

*   **`clientes` é a Ficha Cadastral da pessoa.** Ela guarda apenas dados permanentes: quem é fulano, onde mora e como entrar em contato. Se o João tiver 3 problemas diferentes na justiça, a ficha dele (`clientes`) continua sendo uma só.
*   **`processos` é a "Pasta de Papelão" daquele caso específico.** Nela está anotada qual é o benefício que o João quer agora (ex: BPC) e em qual "mesa" do escritório a pasta está parada (Status do Robô). A pasta (`processos`) sempre tem o nome do dono grudada nela (`cliente_id`).
*   **`documentos` são as Folhas Soltas dentro da pasta.** Cada folha (ex: RG, Laudo 1, Laudo 2) forma uma linha nessa tabela. Elas são coladas na Pasta (`processo_id`), e o sistema já carimba se aquela folha está legível ou se a IA conseguiu achar um CID nela.
*   **`pecas_juridicas` são os Documentos Finais Oficiais.** Depois que os robôs leram as folhas soltas, eles escrevem a Petição e o Relatório. O sistema guarda esses documentos "Premium" separados das folhas soltas, mas ainda colados na mesma Pasta (`processo_id`).
*   **`historico_inss` é o Diário de Bordo do Carteiro.** Depois que a pasta foi enviada para o INSS, o Robô 10 escreve uma linha aqui toda vez que o governo responde algo (Exigência, Perícia Marcada). É um histórico intocável de tudo que aconteceu com a Pasta lá fora.

Resumindo o fluxo da fábrica: O **Cliente** abre um **Processo**, o Robô 1 enche ele de **Documentos**, o Robô 9 lê tudo e cria as **Peças Jurídicas**, o escritório envia tudo pro governo, e o Robô 10 preenche o **Histórico INSS** até o final.

### 3.3. Diagrama Mental Crítico de Relacionamento
`clientes` (1) ---> (N) `processos`
                     |---> (N) `documentos` (Originais + Extratos IA)
                     |---> (1) `pecas_juridicas` (Petição/Relatório gerados)
                     |---> (N) `historico_inss` (Eventos do Robô 10 contínuos)

---

## 4. Estrutura de Storage (Buckets do Supabase)

Teremos **DOIS BUCKETS** principais no Supabase Storage para isolar a privacidade e o ciclo de vida:

### Bucket 1: `raw-uploads` (Privado total)
*   **Propósito:** Receber a "sujeira" (fotos de whatsapp, jpegs cortados, pdfs de 50 páginas) que o Advogado joga para dentro do sistema.
*   **Estrutura Interna:** Nenhuma hierarquia fixa, os arquivos vivem aqui temporariamente apenas durante a execução do **Robô 1** e depois são purgados.
*   **Acesso (RLS):** Somente a role `operacional` (INSERT) e as `edge-functions` (SELECT, DELETE).

### Bucket 2: `dossies-validados` (Privado com RLS de Time)
*   **Propósito:** Onde o Robô 2 deposita os PDFs formatados, tratados e categorizados. Onde o Robô 9 deposita a Petição final.
*   **Hierarquia de Pastas:** (Mantendo a taxonomia original exigida)
    *   `/cliente_uuid/processo_uuid/00_INDICE/`
    *   `/cliente_uuid/processo_uuid/01_DADOS_PESSOAIS/` (apenas PDFs do RG/CPF)
    *   `/cliente_uuid/processo_uuid/02_CADASTRO_E_SOCIAL/`
    *   `/cliente_uuid/processo_uuid/03_RENDA/`
    *   `/cliente_uuid/processo_uuid/04_MEDICOS_LAUDOS/`
    *   `/cliente_uuid/processo_uuid/05_MEDICOS_EXAMES/`
    *   `/cliente_uuid/processo_uuid/06_INSS/` (Prints do RPA Robô 10 e DER do Robô 5)
    *   `/cliente_uuid/processo_uuid/07_ASSINADOS/`
    *   `/cliente_uuid/processo_uuid/90_PECAS_GERADAS/` (Petição DOCX e Pacote Final PDF do Robô 9)

---

## 5. Catálogo de Edge Functions (Supabase)

O processamento cognitivo ("cérebro") da plataforma rodará em Deno Edge Functions hospedadas no Supabase.

1.  **`robo-1-vision-ocr`:** 
    *   **Trigger:** Disparada pelo client Side ou via Webhook no upload para `raw-uploads`.
    *   **Ação:** Envia imagem/PDF para `OpenAI gpt-4o`, pede classificação da tipologia documental, extrai textos básicos (Nome, Cidadania, Endereço), avalia blur/corte.
    *   **Saída:** Insere um registro na tabela `documentos`, grava o PDF limpo em `dossies-validados/99_OUTROS` e atualiza a flag do cliente.
2.  **`robo-2-e-3-router-validador`:**
    *   **Ação:** Lê os metadados do banco. Move fisicamente os arquivos de `99_OUTROS` para `/01_DADOS_PESSOAIS`, etc. Compara o Nome extraído vs Nome Cadastrado (Robô 3). Se faltar CID em documento tipo LAUDO, levanta Exception.
3.  **`robo-6-analise-clinica`:**
    *   **Trigger:** Disparada após a consolidação da pasta `04_MEDICOS_LAUDOS`.
    *   **Ação:** Lê o texto/PDF do laudo. Usa `OpenAI` para prompt hiper-específico ("Você é perito de INSS... extraia Data da Doença, CID, e limitações motoras explícitas").
    *   **Saída:** Dá um `UPDATE` no jsonb `metadados_ia` da tabela `documentos`.
4.  **`robo-9-peças-e-pacote`:**
    *   **Ação:** Coleta o JSON clínico (Robô 6) e o Cadastro. Usa biblioteca Node (`docx`) para preencher as variáveis do template da Petição Inicial. Usa biblioteca Node (`pdf-lib`) para criar o arquivo final aglutinando tudo da pasta em um megabyte PDF. Avisa via Webhook ao front-end: "Processo X Pronto para Gestão".

*(Nota: Os robôs 5 e 10 rodam em Cloud Tasks/Worker Node.js fora de Edge Functions devido a dependerem de scripts intensos de automação de interface E2E - Playwright/Puppeteer)*

---

## 6. Guias de Identidade Visual e UI/UX (Frontend)

Baseado nos 4 painéis de referência (Figma) do universo Financeiro e de Vendas Analíticas, o design do CRM se esquivará da linguagem conservadora jurídica (bordô, balança da justiça, papel velho) em favor de uma estéitica de **Mesa de Alta Frequência (High-Frequency Trading Desk)**.

### 6.1. Paleta de Cores & Estilo
*   **Filosofia:** Clean, alto contraste para leitura densa por horas, _"Data is UI"_.
*   **Fundo Secundário (App Background):** `#F8FAFC` (Slate 50) ou um Dark Mode sofisticado `#0F172A` (Slate 900) para descanso visual da Gestora.
*   **Fundo Primário (Cards/Painéis):** Branco puro `#FFFFFF` (ou `#1E293B` em Dark).
*   **Trilha Semântica de Status (Badges vitais para escaneabilidade):**
    *   🟢 **Aprovado / Sucesso / Deferido:** Verde Pinho ou Esmeralda (`#10B981`).
    *   🔴 **Travado / Exigência Crítica / Indeferido:** Vermelho Coral Carmesim (`#EF4444`). Usar o fundo translúcido para badges (`bg-red-100 text-red-700`).
    *   🟡 **Pendente / Analisando IA:** Âmbar ou Ouro (`#F59E0B`).
    *   🔵 **Ação Necessária (Gestora/Botão):** Azul Royal Profundo (`#2563EB`) - Cor primária unicamente focada na ação (o "Continue").

### 6.2. Mapa Mental das Telas Principais

A arquitetura de informação se baseia em navegação lateral contínua (Sidebar).

*   **Página 1: Dashboard Executivo (Home Sócio/Admin)**
    *   Semelhante ao *Figma 1 e 4*.
    *   Gráficos Donut de Pizza: "Processos por Status" (Triagem, Aguardando Petição, Protocolados INSS).
    *   Gráficos Lineares: Ritmo de aprovações diárias vs Taxa de Exigências pelo INSS.
    *   Card de Alerta Superior (Vermelho): Fila de tarefas críticas ("3 Exigências Vencem D-3").
*   **Página 2: Célula de Triagem (Mesa do Advogado)**
    *   Tela ultra-despoluída. 
    *   **Ação Central:** Botão gigante "Novo Processo" -> Abre Modal Full Screen de Dropzone (para arrastar e soltar PDFs e Fotos + forms curtos com Nome, CPF, Benefício).
    *   Feedback imediato (Pulse animation indicando "Robô 1 Analisando IA...").
*   **Página 3: Painel de Aprovação (A Tela de Guerra da Gestora)**
    *   Semelhante à tabela dinâmica do *Figma 2 e 3*.
    *   **Visão Padrão:** Um `DataGrid` (Tabela Densa). Colunas: Cliente | Benefício | Flags do Robô | Data Entrada | **Ação**.
    *   O grid é ordenado pela prioridade de finalização do Robô 9 (arquivos mais velhos aguardando crivo aparecem no topo).
*   **Página 4: A "Auditoria Rápida" (A alma do negócio) - Modal ou Nova Rota**
    *   Quando a Gestora clica em uma linha do Painel de Aprovação, ela não vê formulários e sim **Split View (Tela Dividida)**.
    *   **Lado Esquerdo (30% da tela):** O Relatório de IA condensado. (Nome, CID, Limitações Fortes extraídas, Pontos de Risco do Robô 6 e 9).
    *   **Lado Direito (70% da tela):** Um iFrame/Viewer de PDF carregando direto do Supabase Storage o `PACOTE_FINAL_[NOME].pdf`. Ela _scrolla_ rápido o original enquanto lê o resumo à direita.
    *   **Rodapé Fixo Inferior:** Dois botões enormes: 🛑 `Devolver Operacional (Motivo)` e 🟢 `APROVAR PARA PROTOCOLO`.

### 6.3. Tipografia Sugerida
*   Fontes limpas, sem serifa (sans-serif), alta legibilidade tática: **Inter, Plus Jakarta Sans, ou Outfit**. 

---

## 7. Proposta de MVP e Cronograma Ágil (Próximos Passos)
Para evitar gargalos, a inicialização se dará particionada:

1.  **Fase 1 (Banco de Dados, Edge Functions Iniciais e UI de Upload):** Parametrização Supabase (Tabelas e Buckets listados acima). Estruturação fundamental com criação da Tela de Inserção do Advogado e testes reais de processamento de PDFs para o Supabase Storage.
2.  **Fase 2 (Painel de Auditoria da Gestora e Extração Total):** Construção da Edge Function que chama OpenAI para os laudos médicos. Implementação UI da "Semântica de Cores" e da Tela Dividida.
3.  **Fase 3 (Geração de Peças Automáticas):** Construção da lógica Node.js e Edge Functions que transformam os templates .DocX originais do escritório nas petições preenchidas.
4.  **Fase 4 (Scraping Hardcore INSS - Robô 5 e 10):** Construção do Worker autônomo.
5.  **Fase 5 (Comunicação - Robô 11):** Notificações a clientes viáveis.
