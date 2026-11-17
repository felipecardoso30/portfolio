# Conteúdo aprovado do portfólio (fonte de verdade)

**Regras para quem for implementar**
- Use estes textos como estão. Não acrescente fatos, números, ferramentas ou resultados.
- Campos marcados com `[INSERIR]` **não aparecem no site publicado**: omita o campo inteiro, sem deixar espaço vazio.
- Rótulos de número: **Medido**, **Observado no meu uso**, **Estimativa**, **Meta projetada**. Mostre o rótulo ao lado do número.
- Status permitidos: *Publicado*, *Em desenvolvimento*, *Entregue em 2025 · desativado*.
- Nenhum dado real de cliente, paciente, ticket ou nota fiscal em texto, prints ou vídeos.

---

## Topo (Hero)

- **Promessa:** "Construo agentes de IA que tiram trabalho manual do time."
- **Apoio:** "Estagiário de TI no Hydro e estudante de Sistemas de Informação (UFRA). Em IT Operations, projetei e construí agentes e automações por iniciativa própria."
- **Provas (3):** "+340 tickets resolvidos em 6 meses" · "97,6% de SLA" · "4 agentes entregues".
- **Botões:** Ver projetos (primário) · Baixar currículo (PDF) · Contato.
- **Mockup do topo:** conversa do **ORAC** (rótulo "ORAC · Copilot Studio · Teams"), com ticket e dados **fictícios** (por exemplo, "INC-0000000"). Sem menção a n8n nesse mockup.

## Ordem das seções

Topo → Projetos → Como eu construo → Experiência (resumida) → Stack → Formação e sobre → Evidências (galeria) → Contato.

---

## Projetos

### 1. ORAC — Agente de IA para IT Operations
- **Status:** Publicado · em melhoria contínua
- **Stack:** Copilot Studio · GPT · Power Automate · Microsoft Fabric (SQL) · ServiceNow · Teams
- **Iniciativa:** própria, fora do escopo do cargo de suporte
- **Problema:** para investigar e documentar cada ticket, o analista alternava entre ServiceNow, base de KBs, SOPs e documentos.
- **Solução:** agente no Microsoft Teams que consulta tickets do ServiceNow via Power Automate, pesquisa mais de 16 mil KBs no Fabric (SQL) e SOPs, gera work notes e comentários padronizados e prepara escalonamentos P1/P2. Um Health Score (0–100) ajuda a priorizar o backlog.
- **Decisões de arquitetura:**
  - Agente principal com subagentes por função (escalonamento P1/P2 e work notes), para manter cada instrução curta e específica.
  - O agente fecha chamados resolvidos somente depois que o analista confirma por botões **Sim/Não** (humano no controle).
- **Falha e correção:**
  - *O que aconteceu:* ao gerar comentários para tickets em estados diferentes (On Hold, Awaiting Caller, In Progress), o agente perguntava o status mesmo quando eu já tinha informado ou quando o contexto da conversa já mostrava.
  - *Causa:* o prompt principal não tinha regras e prioridades claras por tipo de comentário.
  - *Correção:* defini regras e prioridades em formato Markdown nos prompts e dividi a lógica em tópicos do Copilot Studio. O prompt principal chama o tópico certo, e o prompt de cada tópico é restrito e específico, o que evita respostas inventadas.
  - *Efeito:* o agente deixou de repetir a pergunta de status. Validei com mais de 50 testes.
- **Resultado:** cerca de 20 min economizados por ticket, variando com o caso (maior ganho em problemas internos que não estão na web, já foram resolvidos por outra pessoa e estão na base do agente). **Estimativa baseada no meu uso.**
- **Limitações e próximos passos:** o tempo de resposta varia conforme o caso; estou testando a arquitetura (tópicos ou subagentes) para gastar menos tokens. `[confirmar antes de publicar]`

### 2. Agente de agendamento para clínica dermatológica
- **Status:** Entregue em 2025 · desativado
- **Stack:** n8n · MCP (servidor) · Google Calendar · WhatsApp · LLM
- **Problema:** agendar consultas por WhatsApp, incluindo mensagens de áudio e imagem, sem marcar horários em conflito.
- **Solução:** agente que transcreve áudios, analisa imagens, informa horários disponíveis, confirma os dados do paciente antes de agendar, marca e consulta horários no Google Calendar por um servidor MCP, envia a confirmação com local e orientações, pede confirmação de presença e avisa a clínica a cada consulta. Há uma ferramenta para acionar um humano.
- **Decisões de arquitetura:** subagente exclusivo para agendamentos, usando o modelo de linguagem mais avançado que eu tinha, para entender bem mensagem e contexto; o agente principal só conversa e delega.
- **Falha e correção:**
  - *O que aconteceu:* o agente marcava data e hora de consulta erradas.
  - *Causa:* o prompt do agente principal tinha ficado grande demais.
  - *Correção:* criei um subagente só para agendamentos, com o modelo mais avançado, para entender a mensagem e o contexto e marcar a data e o horário certos no Google Agenda.
  - *Efeito:* os agendamentos passaram a sair com data e hora corretas. Validei com mais de 50 testes.
- **Resultado:** validação do horário no Google Calendar antes de confirmar. Sem número medido de uso em produção.
- **Limitações e próximos passos:** `[INSERIR]`
- **Privacidade:** descrever apenas como "clínica dermatológica", sem nome, endereço ou profissional; prints com cabeçalho borrado e só dados de teste meus.

### 3. CreaAI — Atendente virtual do CREA-PA
- **Status:** Entregue em 2025 · desativado
- **Stack:** n8n · RAG (Supabase Vector Store + embeddings OpenAI) · Redis · WhatsApp
- **Problema:** o atendimento recebia perguntas repetitivas sobre anuidade e emissão de ART.
- **Solução:** atendente no WhatsApp com base de conhecimento vetorial, memória de conversa em Redis, transcrição de áudio e análise de imagem, junção de mensagens cortadas, resposta dividida em mensagens menores e ferramenta para chamar um atendente humano. Responde sobre valores de anuidade e explica a ART com passo a passo e link do sistema.
- **Falha e correção:**
  - *O que aconteceu:* o atendente repetia mensagens ao cliente e voltava a perguntar nome e dados a cada mensagem nova.
  - *Causa:* o agente não tinha uma referência estável do que já havia sido informado.
  - *Correção:* criei variáveis para esses dados e as passei em JSON entre as etapas dos fluxos do n8n, para o agente sempre ter a referência.
  - *Efeito:* o atendimento deixou de repetir perguntas. Validei com mais de 50 testes.
- **Resultado:** `[INSERIR]` (sem número medido).
- **Limitações e próximos passos:** `[INSERIR]`

### 4. Automação de Notas Fiscais Dell
- **Status:** Publicado (em uso no Hydro)  `[confirmar]`
- **Stack:** Power Automate · AI Builder (OCR) · SharePoint · Teams · Outlook
- **Iniciativa:** própria
- **Problema:** cada nota fiscal digitalizada exigia escanear, abrir o PDF, renomear no padrão, subir no SharePoint e mover para a pasta de enviadas.
- **Solução:** fluxo que recebe as notas digitalizadas, lê o PDF com IA (OCR), extrai número da NF, ordem de compra, itens e o usuário escrito à mão, renomeia o arquivo, salva no SharePoint, avisa o solicitante no Teams e envia o PDF por e-mail. Usa apenas ferramentas Microsoft já disponíveis, em conformidade com a política de DLP.
- **Resultado:**
  - Tempo por nota: de ~8 min para ~15 s (~97% menos). **Observado no meu uso.**
  - ~31 h por ano liberadas. **Estimativa** (~20 notas por mês × 12 × ~7 min 45 s).
- **Limitações e próximos passos:** `[INSERIR]`
- **Mídia:** diagrama "antes e depois" com dados fictícios. **Não publicar o vídeo real** até ser revisado quadro a quadro ou regravado com dados fictícios.

### 5. TI Informa — Agente de comunicados de TI
- **Status:** Em desenvolvimento
- **Stack:** Copilot Studio · Power Automate · Outlook
- **Iniciativa:** própria
- **Problema:** comunicados de queda de link e indisponibilidade levavam tempo para redigir e saíam sem padrão.
- **Solução:** agente que identifica o tipo de ocorrência, escolhe o modelo a partir do histórico de comunicados e gera o texto, com validação do solicitante antes do envio.
- **Resultado:** de 10–20 min para 2–5 min por comunicado. **Meta projetada, ainda não medida.**
- **Próximos passos:** publicação automática após a aprovação (planejada).

### 6. CuidAI — Assistente para enfermeiros da Atenção Primária
- **Status:** Entregue em 2025 · desativado
- **Stack:** n8n · IA · VPS Linux · WhatsApp
- **Descrição:** assistente de IA no WhatsApp para apoio ao atendimento de enfermeiros da Atenção Primária, construído em n8n e hospedado em VPS Linux.
- **Exibição:** cartão compacto em "Outros projetos", sem prints e sem métricas. Nenhuma afirmação sobre uso, TCCs ou resultados.

---

## Como eu construo (bloco curto)

"Nos três agentes que mais evoluí, o problema começou do mesmo jeito: um agente fazendo coisa demais. A correção foi sempre dividir por função (tópicos, subagentes, variáveis de estado) em vez de aumentar o prompt. Cada correção foi validada com mais de 50 testes, e os agentes importantes mantêm um humano no controle antes de ações críticas."

---

## Experiência (resumida, sem repetir os projetos)

- **Hydro, Estagiário de TI, GBS Global IT Support South America (05/2026 – Presente):** +340 tickets resolvidos em 6 meses com 97,6% de SLA no ServiceNow; suporte e gerenciamento de endpoints (Intune, SCCM, Entra ID); PC Refresh 2026 (43 de 118 notebooks); piloto de redesign de RBAC no Intune; implantação de videoconferência em 5 andares.
- **CREA-PA, Estagiário de TI (02/2025 – 04/2026):** suporte a usuários em Windows, Linux e iOS; gerenciamento de chamados internos.
- **IFPA, Monitor de laboratório (03/2023 – 12/2023):** instalação e manutenção de sistemas, hardware e redes locais.

## Stack

IA e agentes: Copilot Studio · Claude · GPT · Microsoft Copilot · MCP · RAG · engenharia de prompts · orquestração de subagentes
Automação e dados: n8n · Power Automate · AI Builder · Microsoft Fabric · SQL · Power BI · SharePoint · webhooks
Desenvolvimento com IA: Claude · Antigravity · JavaScript · HTML · CSS · Git
Suporte e endpoint: ServiceNow · Intune · SCCM · Entra ID · Active Directory · Microsoft 365 · Windows · Linux · VPS

## Formação e idiomas

UFRA, Bacharelado em Sistemas de Informação (08/2024 – conclusão prevista: início de 2028) · IFPA, Técnico em Informática Integrado ao Ensino Médio (2021–2023) · Português nativo · Inglês em desenvolvimento (Minds School).

## Contato

E-mail, LinkedIn e WhatsApp. Botão de baixar currículo apontando para o PDF em `public/`.
