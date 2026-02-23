# Product Requirements Document (PRD)

**Produto:** Sistema de Gestão Previdenciária Dantas & Filizola  
**Versão:** 2.0.0 (Expansão de Frontend, Kanban e Tipificação)  
**Data:** 23 de Fevereiro de 2026  
**Status:** Em Definição Estratégica  

---

## 1. Visão Geral Executiva

O **Sistema de Gestão Previdenciária Dantas & Filizola** não é apenas um CRM clássico, mas um sistema de gestão de escritório (ERP Jurídico especializado). Ele foi desenhado para centralizar e operar todo o escritório em alta velocidade. O sistema transforma fluxos analógicos baseados em intervenção humana constante em uma "esteira de fábrica" automatizada e rastreável.

O coração do sistema é composto por **Módulos de Automação (Inicialmente idealizados como "Robôs")** que atuam organicamente nos bastidores da plataforma para ingerir documentos, processar, validar, gerar peças e monitorar o portal do Meu INSS.

---

## 2. Perfis de Usuário (Personas) e Permissões

A plataforma terá três níveis primários de interação humana, todas ocorrendo em um painel Web dinâmico e seguro:

| Perfil | Acesso no Frontend | Responsabilidade Principal |
| :--- | :--- | :--- |
| **Advogado/Atendente** | Nível Operacional | Inserção bruta. Atende o cliente presencialmente, tira fotos dos documentos físicos e faz o _upload dry_ diretamente no painel do cliente no Sistema. Preenche dados cadastrais base. |
| **Gestora/Revisora** | Nível Decisão (Painel Gerencial) | Analisa a fila do "Pacote Final" gerado pelos módulos. Utiliza a visualização em "Split Screen" (Relatório Inteligente à esquerda + PDF Mesclado à direita) para dar o crivo de aprovação ou devolver o ticket com pendências objetivas. |
| **Sócio/Admin** | Nível Sistêmico (Full Access) | Visão executiva. Acompanha métricas (KPIs), status dos 2.000+ processos e controla a "fila de alarme" de exigências e prazos críticos no limite (Scraping Meu INSS). |

---

## 3. A Linha do Sistema (O Funil Kanban)

O núcleo operacional do escritório — e a visualização principal do Frontend — funcionará sob a ótica de um Funil de Gestão (Kanban Board). Todo processo criado obrigatoriamente passará pelas seguintes Fases (Colunas do Kanban):

1. **Novo Processo:** Fase inicial. O cliente foi recebido, o foco é o atendimento. O Upload das fotos/PDFs desestruturados é feito aqui. O Módulo de Visão/OCR atua nesta fase para converter e ler os papéis iniciais.
2. **Documentação:** O sistema está montando a pasta. Os documentos legíveis foram separados em pastas virtuais (Pessoais, Médicos). Módulos de auditoria rodam no _background_ para achar CIDs e ler chaves.
3. **Documentação Aprovada:** A documentação exigida (Checklist por Benefício, ver seção 4) está 100% verde e legível. A prova material existe e é viável. A Gestora bate o olho e aprova juridicamente.
4. **Pronto para Petição:** O processo aguarda na fila da esteira automatizada de PDFs. O sistema gera a Petição Inicial `.docx` mesclando jurisprudência, histórico e os laudos extraídos. A Gestora audita o "Pacote Final" e aprova (Ação de Envio INSS).
5. **(Fila Invisível) Em Andamento:** Processo foi protocolado (DER Gerado). Sai da prancheta humana e passa a ser vigiado silenciosamente pelo motor de Web Scraping diário.
6. **Exigência / Pendência:** Fila Vermelha/Crítica. Caiu nesta coluna se o Módulo de Scraping detectar uma exigência com prazo ou se houver pendência interna insolúvel.
7. **Processo Finalizado:** Fila verde (Deferido) ou vermelha escura (Indeferido / Encerrado administrativamente).

---

## 4. Tipificação de Processos e Documentação Obrigatória

Cada _card_ no Kanban possuirá um Tipo de Benefício estrito. O sistema (através do Módulo Validador) bloqueará ativamente o avanço do card para a fase "Documentação Aprovada" caso falte algum dos itens abaixo:

### 4.1. BPC LOAS — Pessoa com Deficiência
*   **Pessoais / Família:** RG e CPF (requerente e todos os moradores). Comprovante de Residência atualizado. Comprovantes de renda de todos. CadÚnico atual (< 2 anos).
*   **Documentação Médica (Trava do Sistema):** Opcionais ou Mandatórios: Laudo médico com CID (obrigatório, lido via IA), assinado e com CRM. Exames complementares. Receitas contínuas.
*   **Se houver representante:** Procuração pública, RG e CPF do representante.

### 4.2. BPC LOAS — Idoso
*   **Pessoais / Família:** RG/CPF da casa. Comprovante de residência. Comprovantes de renda de todos. CadÚnico atual.
*   **Trava Mestra:** Comprovante da Idade (Maior de 65 anos lido via OCR no documento base).
*   *Nota Diferencial:* Sem exigência de laudo médico sistêmico.

### 4.3. Auxílio-Doença
*   **Pessoais:** Documento de Identidade, CPF, CTPS, Comprovante Residência recente, Dados Bancários.
*   **Médicos para Perícia (Trava Sistêmica):** Atestado médico *recente* (< 30 dias de validade calculada pelo OCR), constando CID, data de início da incapacidade (DII) e estimativa temporal de afastamento.
*   **Secundários:** Laudos/Exames de incapacidade, Receitas, eventuais relatórios de internação.

### 4.4. Aposentadoria por Invalidez
*   **Pessoais / Trabalhistas:** RG/CNH, CPF, CTPS, Rescisão/Termos se aplicável, Carnês de Contribuição (GPS/RPA), Seguro-Desemprego (se usar).
*   **Médicos:** Laudo médico com código CID atestando situação *permanente*. Diversos exames clínicos comprobatórios.

### 4.5. Salário-Maternidade
*   **Pessoais Básicos:** RG/CNH, CPF, CTPS.
*   **Evento Gatilho (Trava Sistêmica - um dos três):**
    *   *Parto:* Certidão Nascimento.
    *   *Gestação Próvia:* Atestado Médico específico gestante (< 28 dias do parto esperado).
    *   *Adoção/Guarda:* Sentença de adoção transitada ou Termo de Guarda.
*   **Regularização de Categoria:** Anexo de contribuições 10 meses (Autônomas via GPS ou MEIs via DAS), ou registro do eSocial.

---

## 5. Especificações de Frontend (UX, Interface e Design)

O painel foi conceitualizado não como um site genérico, mas como um **Management Board** de alta produtividade inspirado em mesas financeiras.

### 5.1. Mapa Mental de Páginas Frontend

1.  **`/login`** -> Porta de entrada, Auth via Supabase.
2.  **`/dashboard`** -> Home Office (Executivo). Gráficos de gargalo e cards vitais do INSS.
3.  **`/board` (O Kanban Geral)** -> A alma da operação. Todos os processos distribuídos nas 7 fases listadas acima.
4.  **`/processo/[id]`** -> Interface "Split-Screen". Abre ao clicar num card para a Auditoria Fina (onde a Gestora dá o GO ou onde o Advogado insere o Laudo esquecido).
5.  **`/novo-processo`** -> Formulário fluido + Dropzone massiva: onde a sujeira entra pela primeira vez.
6.  **`/clientes`** -> Grid de Contatos Básicos (Agenda do escritório).

### 5.2. Escopo Detalhado de Cada Página

*   **A. Dashboard Inicial (Home do Sócio)**
    *   **Elementos Visualizados:**
        *   Trio de Topo (KPIs): "Processos Protocolados Hoje", "Tempo Médio até Protocolo", "Prazos Vencendo D-0".
        *   Lista de Tráfego Crítico: Tabela abaixo dos KPIs com as Exigências recém-descobertas no Scraping do Meu INSS.

*   **B. Kanban Geral (`/board`) - A Tela de Guerra**
    *   **Estrutura:** Tradicional colunar (estilo Trello/Jira).
    *   **Conteúdo dos Cards:** Compactos porém densos.
        *   Título: Nome do Cliente (+ Número do Processo se já gerado).
        *   Tag Superior (Badge): Classificação por cores do Benefício (Ex: `[🟡 Auxílio Doença]`).
        *   Barra de Progresso (Mini): Quantos % da Documentação Básica o Robô 3 já liberou.
        *   Tag de Alerta: Ex: `🔴 CNH Vencida`.

*   **C. Visão de Processo / Tela de Auditoria (`/processo/[id]`)**
    *   **Conceito (Split-screen Modal):** O foco é a revisão ocular cruzada. Ela divide a tela perfeitamente no meio.
    *   **Esquerda (Dados e Checklist):** Informação estruturada. Histórico de eventos, Tabela de Checklist do Benefício atual (`✓ RG`, `✓ Laudo (< 30) dias`, `✕ Comprovante Residência`). Botão de aprovação flutuante (Call To Action Primário).
    *   **Direita (Provas Nativas - Viewer PDF):** Renderiza dinamicamente o Pacote Final amalgamado pelos Módulos, para o aprovador conferir a página real do laudo físico enquanto checa a coluna da Esquerda.

*   **D. Fluxo Rápido de Inserção (`/novo-processo`)**
    *   **Visual:** Menos botões, atalhos de teclado.
    *   **Elementos:**
        *   Busca Ajax rápida de CPF para auto-completar clientes existentes.
        *   Seletor Master de Benefício (dita qual checklist ativar depois).
        *   Mega-Dropzone Drag 'n Drop para soltar os 30 JPEGs e PDFs do cliente misturados. O Upload ativa de imediato um spinner `[ ⚙️ Analisando Inteligência Documental...]`.

### 5.3. Design System Visual (Identidade & Cores)

*   **Paleta Base (Sem Fundo Poluído):** Fundo Primário de Telas em um leve e confortável `Slate 50` (`#F8FAFC`). Cards obrigatoriamente Brancos puros (com sombras sutis via Tailwind `shadow-sm`). Foco em *Data is UI*, eliminando bordas desnecessárias (Flat Design Limpo).
*   **Paleta de Badges Categorizados (Tipografia no Kanban):**
    *   `Badge` BPC (Ambos): Roxo Frio (`#8B5CF6`).
    *   `Badge` Auxílio Doença: Azul Ciano (`#0EA5E9`).
    *   `Badge` Salário Maternidade: Rosa Rose (`#F43F5E`).
    *   `Badge` Invalidez: Cinza Chumbo Escuro (`#475569`).
*   **Trilha Semântica de Ação/Alerta (Botões e Sinais Críticos):**
    *   🟢 Sucesso/Concluído: Verde Esmeralda (`#10B981`).
    *   🔴 Alerta/Trava INSS: Vermelho Red (`#EF4444`). Usado apenas para pendências severas onde o prazo consome a ação.
    *   🔵 Ação Esperada: Azul Master (`#3B82F6`). Botões onde o mouse deve sempre ir no final (ex: "Enviar ao Governo").

---

## 6. Especificações de Banco de Dados (Supabase Postgres)

A modelagem de dados foi desenhada para suportar a esteira interligada ao Kanban de forma assíncrona. O esquema utilizará chaves estrangeiras (fks) robustas e UUIDs.

### 6.1. Entidades Principais (Tabelas)

1.  **`clientes` (Tabela Mestre de Cadastro)**
    *   **Colunas:** `id` (uuid, PK), `nome_completo`, `cpf` (unique), `data_nascimento`, `telefone`, `email`, `endereco_json`.
    *   **Relacionamento:** 1 para N com `processos`.

2.  **`processos` (A "Pasta" que caminha no Kanban)**
    *   **Colunas:** `id` (uuid, PK), `cliente_id` (fk -> clientes), `tipo_beneficio` (Enum: BPC_DEFICIENTE, AUXILIO_DOENCA, etc.), `fase_kanban` (Enum: NOVO_PROCESSO, DOCUMENTACAO, PRONTO_PETICAO, EXIGENCIA, etc.), `der` (data entrada requerimento), `numero_beneficio` (varchar).
    *   **Relacionamento:** 1 para N com `documentos` e `historico_inss`.

3.  **`documentos` (Trilha de Auditoria e IA)**
    *   **Colunas:** `id` (uuid, PK), `processo_id` (fk -> processos), `storage_path` (caminho no bucket), `tipo_classificado_ia` (Enum: RG, CNH, LAUDO, COMPROVANTE_RESIDENCIA), `bucket_categoria` (Enum: 01_DADOS_PESSOAIS, 04_MEDICOS_LAUDOS...), `metadados_ia` (jsonb - guarda o CID, data de validade do laudo), `status_qualidade` (Enum: LEGIVEL, ILEGIVEL_TRAVA).

4.  **`pecas_juridicas` (Os Documentos Finais Oficiais)**
    *   **Colunas:** `id` (uuid, PK), `processo_id` (fk -> processos), `tipo_peca` (Enum: PETICAO_INICIAL, RELATORIO_GESTORA, PACOTE_FINAL_PDF), `storage_path` (caminho do arquivo gerado).

5.  **`historico_inss` (Diário de Bordo do RPA)**
    *   **Colunas:** `id` (uuid, PK), `processo_id` (fk -> processos), `evento` (Enum: EXIGENCIA, PERICIA_AGENDADA, DEFERIDO, INDEFERIDO), `conteudo_texto` (varchar), `data_evento_portal` (timestamp), `prazo_fatal` (date), `storage_print_path`.

### 6.2. Como essas Tabelas se Completam (A Correlação Simples)

Pense neste banco de dados como um arquivo físico de escritório hiper-organizado alinhado ao seu Kanban:

*   **`clientes` é a Ficha Cadastral da pessoa.** Ela guarda apenas dados permanentes. Se o João tiver 3 problemas diferentes na justiça, a ficha dele (`clientes`) continua sendo uma só.
*   **`processos` é o Card no Kanban ("Pasta de Papelão").** Nela está anotada qual é o benefício (ex: BPC) e em qual Coluna do Kanban a pasta está parada (`fase_kanban`). A pasta (`processos`) sempre tem o nome do dono grudada nela (`cliente_id`).
*   **`documentos` são as Folhas Soltas dentro da pasta.** Cada folha (RG, Laudo) forma uma linha nessa tabela. O sistema cruza os `documentos` legíveis com a regra do Benefício do `processo` para saber se o card pode avançar no Kanban.
*   **`pecas_juridicas` são os Documentos Finais.** Depois que a documentação foi aprovada, o sistema escreve a Petição e o Relatório e anexa aqui.
*   **`historico_inss` é o Radar Externo.** Depois que a pasta vira "Em Andamento", o Robô de Scraping escreve uma linha aqui toda vez que o governo responde algo (Exigência, Perícia). Se ele escreve "Exigência", uma *Trigger* do banco move o `processo` (Card) automaticamente para a coluna vermelha do Kanban.

**Diagrama de Relacionamento:**
`clientes` (1) ---> (N) `processos`
                     |---> (N) `documentos` (Originais + Extratos IA paramétricos)
                     |---> (1) `pecas_juridicas` (Arquivos Premium - Petição/Relatório)
                     |---> (N) `historico_inss` (Eventos do Crawler contínuos)

---

## 7. Estrutura de Storage (Buckets do Supabase para Fotos/PDFs)

Teremos **DOIS BUCKETS** principais no Supabase Storage para isolar as fotos cruas de WhatsApp dos Dossiês Jurídicos tratados:

### Bucket 1: `raw-uploads` (A "Lixeira Temporária")
*   **Propósito:** Receber a "sujeira" (fotos de whatsapp, jpegs cortados) tiradas pelo Advogado no Atendimento Inicial (Card no Kanban: Novo Processo).
*   **Acesso:** Somente a role `operacional` (INSERT) e as `edge-functions` (SELECT, DELETE). Arquivos morrem aqui após a IA processar.

### Bucket 2: `dossies-validados` (O Arquivo Oficial Organizado)
*   **Propósito:** Onde o sistema deposita os PDFs já cortados, rotacionados, tratados pela IA e categorizados. É daqui que a Tela de Auditoria da Gestora puxa o PDF para exibir em Split-Screen.
*   **Hierarquia Interna Rigorosa:**
    *   `/cliente_uuid/processo_uuid/01_DADOS_PESSOAIS/` (Ex: RG.pdf, CPF.pdf, Comp_Residencia.pdf)
    *   `/cliente_uuid/processo_uuid/03_RENDA/` (Ex: CadUnico_2025.pdf)
    *   `/cliente_uuid/processo_uuid/04_MEDICOS_LAUDOS/` (Ex: Laudo_Ortopedista_Com_CID.pdf)
    *   `/cliente_uuid/processo_uuid/06_INSS/` (Ex: Print_Exigencia_Tela_INSS.pdf)
    *   `/cliente_uuid/processo_uuid/90_PECAS_GERADAS/` (Petição DOCX Final)

---

## 8. Catálogo de Edge Functions (Os Módulos de Automação / "Robôs")

O "Cérebro" invisível do sistema rodará em Deno Edge Functions no Supabase, orquestrando o Kanban.

1.  **`module-vision-ocr` (Antigo Robô 1):** 
    *   **Ação:** Disparado logo após o upload no `raw-uploads`. Usa **OpenAI GPT-4o Vision** para classificar qual é aquele documento (É um RG? Um Laudo?), valida a legibilidade (desfocado?), converte a foto .JPG para .PDF e move para o Bucket Oficial `dossies-validados`.
2.  **`module-clinical-extractor` (Antigo Robô 6):**
    *   **Ação:** Quando um PDF cai na pasta `04_MEDICOS_LAUDOS`, esta função lê todo o texto médico, busca a string do CID e a DII (Data de Início da Incapacidade) exigida pelo INSS (ex: Auxílio-Doença) e salva isso estruturado na tabela `documentos` no campo `metadados_ia`.
3.  **`module-checklist-gatekeeper` (Antigo Robô 3/4):**
    *   **Ação:** Uma função de validação de negócio constante. Ela escuta a tabela de `documentos`. Se o `processo` é BPC LOAS e a função achou na tabela um "CadÚnico < 2 anos" + "RG" + "Laudo com CID", ela permite que o Card mude de "Documentação" para "Documentação Aprovada" no Kanban. Se falta algo, mantém travado.
4.  **`module-document-assembler` (Antigo Robô 8/9):**
    *   **Ação:** Acionado na fase "Pronto para Petição". Usa biblioteca Node (`docx`) para preencher um template padrão de Petição injetando os dados do `cliente` e os resumos de laudos encontrados. Aglutina todos os PDFs vitais (RG + Laudo + Petição) em 1 único arquivo Final para a Gestora aprovar com 1 clique (Ação Humana).

*(O Robô 10 de varredura do INSS e Robô 5 de Protocolo rodam fora do modelo serverless do Supabase, como workers de RPA pesados em Node.js/Python).*
