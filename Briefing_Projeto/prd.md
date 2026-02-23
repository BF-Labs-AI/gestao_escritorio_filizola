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

## 6. Arquitetura de Banco de Dados e Storage (Resumo Técnico)

*   O sistema roda sobre PostgreSQL (Supabase) gerindo as tabelas de `clientes`, `processos`, `documentos_ia` e os `logs_inss`.
*   As regras do Kanban rodam como *Triggers/Workers*, avaliando diariamente se um processo "caminhou para frente".
*   Os buckets são RLS (Storage Blindado) isolando a base suja (O que o advogado enviou) da base limpa (A Auditada).

*(O desenvolvimento deve guiar-se pelos DataGrids financeiros repassados no Figma original).*
