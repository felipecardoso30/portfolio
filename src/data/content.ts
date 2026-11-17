export const NOME = "Felipe Cardoso das Neves";
export const CARGO = "Estagiário de TI · IA e Automação em IT Operations";
export const LOCATION = "Belém, PA";
export const EMAIL = "felipecardoso3005@gmail.com";
export const WHATSAPP = "5591987382169";
export const LINKEDIN = "https://linkedin.com/in/felipe-cardoso-1425652a9";
export const CURRICULO_PATH = "/curriculo-felipe-cardoso.pdf";

export const WHATSAPP_MSG = encodeURIComponent(
  "Olá, Felipe! Vi seu portfólio e gostaria de conversar."
);
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`;

export type MetricLabel =
  | "Medido"
  | "Observado no meu uso"
  | "Estimativa"
  | "Meta projetada";

export interface HeroMetric {
  valueText: string;
  numericTarget: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  classification: MetricLabel;
}

export const hero = {
  badge: "Estagiário de TI · Sistemas de Informação (UFRA) · Belém, PA",
  promise: "Construo agentes de IA que tiram trabalho manual do time.",
  support:
    "Estagiário de TI no Hydro e estudante de Sistemas de Informação (UFRA). Em IT Operations, projetei e construí agentes e automações por iniciativa própria.",
  metrics: [
    {
      valueText: "+340",
      numericTarget: 340,
      prefix: "+",
      decimals: 0,
      label: "tickets resolvidos em 6 meses",
      classification: "Medido" as MetricLabel,
    },
    {
      valueText: "97,6%",
      numericTarget: 97.6,
      suffix: "%",
      decimals: 1,
      label: "de SLA",
      classification: "Medido" as MetricLabel,
    },
    {
      valueText: "4",
      numericTarget: 4,
      decimals: 0,
      label: "agentes entregues",
      classification: "Medido" as MetricLabel,
    },
  ] satisfies HeroMetric[],
};

export interface ProjectImage {
  src: string;
  legenda: string;
  width: number;
  height: number;
}

export interface ProjectFailureFix {
  oQueAconteceu: string;
  causa: string;
  correcao: string;
  efeito: string;
}

export interface ProjectResult {
  texto: string;
  rotulo?: MetricLabel;
}

export interface Project {
  id: string;
  titulo: string;
  status: string;
  iniciativa?: string;
  stack: string[];
  problema: string;
  solucao: string;
  decisoes?: string[];
  falhaCorrecao?: ProjectFailureFix;
  resultados?: ProjectResult[];
  limitacoes?: string;
  tipoVisual?: "orac-flow" | "nfs-before-after" | "gallery" | "diagram";
  galeria: ProjectImage[];
  diagrama: string;
}

export interface CompactProject {
  id: string;
  titulo: string;
  status: string;
  stack: string[];
  descricao: string;
}

export const projects: Project[] = [
  {
    id: "orac",
    titulo: "ORAC — Agente de IA para IT Operations",
    status: "Publicado · em melhoria contínua",
    iniciativa: "Iniciativa própria, fora do escopo do cargo de suporte",
    stack: [
      "Copilot Studio",
      "GPT",
      "Power Automate",
      "Microsoft Fabric (SQL)",
      "ServiceNow",
      "Teams",
    ],
    problema:
      "Para investigar e documentar cada ticket, o analista alternava entre ServiceNow, base de KBs, SOPs e documentos.",
    solucao:
      "Agente no Microsoft Teams que consulta tickets do ServiceNow via Power Automate, pesquisa mais de 16 mil KBs no Fabric (SQL) e SOPs, gera work notes e comentários padronizados e prepara escalonamentos P1/P2. Um Health Score (0–100) ajuda a priorizar o backlog.",
    decisoes: [
      "Agente principal com subagentes por função (escalonamento P1/P2 e work notes), para manter cada instrução curta e específica.",
      "O agente fecha chamados resolvidos somente depois que o analista confirma por botões Sim/Não (humano no controle).",
    ],
    falhaCorrecao: {
      oQueAconteceu:
        "Ao gerar comentários para tickets em estados diferentes (On Hold, Awaiting Caller, In Progress), o agente perguntava o status mesmo quando eu já tinha informado ou quando o contexto da conversa já mostrava.",
      causa:
        "O prompt principal não tinha regras e prioridades claras por tipo de comentário.",
      correcao:
        "Defini regras e prioridades em formato Markdown nos prompts e dividi a lógica em tópicos do Copilot Studio. O prompt principal chama o tópico certo, e o prompt de cada tópico é restrito e específico, o que evita respostas inventadas.",
      efeito:
        "O agente deixou de repetir a pergunta de status. Validei com mais de 50 testes.",
    },
    resultados: [
      {
        texto:
          "Cerca de 20 min economizados por ticket, variando com o caso (maior ganho em problemas internos que não estão na web, já foram resolvidos por outra pessoa e estão na base do agente).",
        rotulo: "Observado no meu uso",
      },
    ],
    limitacoes:
      "O tempo de resposta varia conforme o caso; estou testando a arquitetura (tópicos ou subagentes) para gastar menos tokens.",
    tipoVisual: "orac-flow",
    galeria: [],
    diagrama: `[Teams: Analista] ──> [ORAC (Copilot Studio · Tópicos)] ──> [Power Automate + Fabric SQL (+16 mil KBs) + SOPs] ──> [Subagentes P1/P2 & Work Notes] ──> [Confirmação Sim/Não] ──> [ServiceNow]`,
  },
  {
    id: "clinica",
    titulo: "Agente de agendamento para clínica dermatológica",
    status: "Entregue em 2025 · desativado",
    stack: ["n8n", "MCP (servidor)", "Google Calendar", "WhatsApp", "LLM"],
    problema:
      "Agendar consultas por WhatsApp, incluindo mensagens de áudio e imagem, sem marcar horários em conflito.",
    solucao:
      "Agente que transcreve áudios, analisa imagens, informa horários disponíveis, confirma os dados do paciente antes de agendar, marca e consulta horários no Google Calendar por um servidor MCP, envia a confirmação com local e orientações, pede confirmação de presença e avisa a clínica a cada consulta. Há uma ferramenta para acionar um humano.",
    decisoes: [
      "Subagente exclusivo para agendamentos, usando o modelo de linguagem mais avançado que eu tinha, para entender bem mensagem e contexto; o agente principal só conversa e delega.",
    ],
    falhaCorrecao: {
      oQueAconteceu: "O agente marcava data e hora de consulta erradas.",
      causa: "O prompt do agente principal tinha ficado grande demais.",
      correcao:
        "Criei um subagente só para agendamentos, com o modelo mais avançado, para entender a mensagem e o contexto e marcar a data e o horário certos no Google Agenda.",
      efeito:
        "Os agendamentos passaram a sair com data e hora corretas. Validei com mais de 50 testes.",
    },
    resultados: [
      {
        texto:
          "Validação do horário no Google Calendar antes de confirmar. Sem número medido de uso em produção.",
      },
    ],
    tipoVisual: "gallery",
    galeria: [
      {
        src: "/images/clinica-fluxo-n8n.webp",
        legenda:
          "Fluxo em n8n com tratamento de áudio/imagem, agente principal, subagente de agendamentos e servidor MCP.",
        width: 1024,
        height: 481,
      },
      {
        src: "/images/clinica-horarios.webp",
        legenda:
          "Consulta de horários disponíveis no WhatsApp (cabeçalho da clínica anonimizado e dados de teste próprios).",
        width: 1024,
        height: 649,
      },
      {
        src: "/images/clinica-dados.webp",
        legenda:
          "Confirmação dos dados antes de gravar o agendamento no Google Calendar.",
        width: 1024,
        height: 589,
      },
      {
        src: "/images/clinica-agendamento.webp",
        legenda:
          "Registro da consulta e aviso automático enviado à clínica (cabeçalho anonimizado).",
        width: 1024,
        height: 665,
      },
      {
        src: "/images/clinica-confirmacao.webp",
        legenda:
          "Orientações pré-consulta e confirmação de presença pelo paciente (endereço anonimizado).",
        width: 1024,
        height: 531,
      },
    ],
    diagrama: `[WhatsApp (Texto/Áudio/Imagem)] ──> [n8n: Agente Principal] ──> [Subagente de Agendamentos] ──> [Servidor MCP ──> Google Calendar] ──> [Confirmação + Aviso à Clínica]`,
  },
  {
    id: "creaai",
    titulo: "CreaAI — Atendente virtual do CREA-PA",
    status: "Entregue em 2025 · desativado",
    stack: [
      "n8n",
      "RAG (Supabase Vector Store + embeddings OpenAI)",
      "Redis",
      "WhatsApp",
    ],
    problema:
      "O atendimento recebia perguntas repetitivas sobre anuidade e emissão de ART.",
    solucao:
      "Atendente no WhatsApp com base de conhecimento vetorial, memória de conversa em Redis, transcrição de áudio e análise de imagem, junção de mensagens cortadas, resposta dividida em mensagens menores e ferramenta para chamar um atendente humano. Responde sobre valores de anuidade e explica a ART com passo a passo e link do sistema.",
    falhaCorrecao: {
      oQueAconteceu:
        "O atendente repetia mensagens ao cliente e voltava a perguntar nome e dados a cada mensagem nova.",
      causa:
        "O agente não tinha uma referência estável do que já havia sido informado.",
      correcao:
        "Criei variáveis para esses dados e as passei em JSON entre as etapas dos fluxos do n8n, para o agente sempre ter a referência.",
      efeito:
        "O atendimento deixou de repetir perguntas. Validei com mais de 50 testes.",
    },
    tipoVisual: "gallery",
    galeria: [
      {
        src: "/images/crea-fluxo-n8n.webp",
        legenda:
          "Fluxo no n8n com variáveis em JSON, memória Redis, Supabase Vector Store e embeddings OpenAI.",
        width: 1024,
        height: 549,
      },
      {
        src: "/images/crea-anuidade.webp",
        legenda:
          "Resposta sobre valores de anuidade e faixas de desconto no WhatsApp.",
        width: 1024,
        height: 674,
      },
      {
        src: "/images/crea-art.webp",
        legenda:
          "Explicação sobre a obrigatoriedade da ART e link para o sistema.",
        width: 1024,
        height: 733,
      },
      {
        src: "/images/crea-passo-a-passo.webp",
        legenda:
          "Passo a passo para emissão de ART e orientação de encaminhamento a atendente humano.",
        width: 1024,
        height: 726,
      },
    ],
    diagrama: `[WhatsApp (Texto/Áudio/Imagem)] ──> [n8n + Variáveis JSON + Memória Redis] ──> [RAG: Supabase Vector Store + Embeddings OpenAI] ──> [Resposta Dividida / Atendente Humano]`,
  },
  {
    id: "nfs",
    titulo: "Automação de Notas Fiscais Dell",
    status: "Publicado · em uso no Hydro",
    iniciativa: "Iniciativa própria",
    stack: [
      "Power Automate",
      "AI Builder (OCR)",
      "SharePoint",
      "Teams",
      "Outlook",
    ],
    problema:
      "Cada nota fiscal digitalizada exigia escanear, abrir o PDF, renomear no padrão, subir no SharePoint e mover para a pasta de enviadas.",
    solucao:
      "Fluxo que recebe as notas digitalizadas, lê o PDF com IA (OCR), extrai número da NF, ordem de compra, itens e o usuário escrito à mão, renomeia o arquivo, salva no SharePoint, avisa o solicitante no Teams e envia o PDF por e-mail. Usa apenas ferramentas Microsoft já disponíveis, em conformidade com a política de DLP.",
    resultados: [
      {
        texto: "Tempo por nota: de ~8 min para ~15 s (~97% menos).",
        rotulo: "Observado no meu uso",
      },
      {
        texto:
          "~31 h por ano liberadas (~20 notas por mês × 12 × ~7 min 45 s).",
        rotulo: "Estimativa",
      },
    ],
    tipoVisual: "nfs-before-after",
    galeria: [],
    diagrama: `[PDF Digitalizado (NF-000000 · Fictício)] ──> [Power Automate] ──> [AI Builder (OCR): Nº NF, PO, Itens e Usuário à mão] ──> [SharePoint] ──> [Teams + E-mail no Outlook]`,
  },
  {
    id: "tiinforma",
    titulo: "TI Informa — Agente de comunicados de TI",
    status: "Em desenvolvimento",
    iniciativa: "Iniciativa própria",
    stack: ["Copilot Studio", "Power Automate", "Outlook"],
    problema:
      "Comunicados de queda de link e indisponibilidade levavam tempo para redigir e saíam sem padrão.",
    solucao:
      "Agente que identifica o tipo de ocorrência, escolhe o modelo a partir do histórico de comunicados e gera o texto, com validação do solicitante antes do envio.",
    resultados: [
      {
        texto: "De 10–20 min para 2–5 min por comunicado.",
        rotulo: "Meta projetada",
      },
    ],
    limitacoes: "Publicação automática após a aprovação (planejada).",
    tipoVisual: "diagram",
    galeria: [],
    diagrama: `[Ocorrência de TI] ──> [Copilot Studio + Histórico de Comunicados] ──> [Texto Gerado no Padrão] ──> [Validação do Solicitante] ──> [Envio no Outlook]`,
  },
];

export const otherProjects: CompactProject[] = [
  {
    id: "cuidai",
    titulo: "CuidAI — Assistente para enfermeiros da Atenção Primária",
    status: "Entregue em 2025 · desativado",
    stack: ["n8n", "IA", "VPS Linux", "WhatsApp"],
    descricao:
      "Assistente de IA no WhatsApp para apoio ao atendimento de enfermeiros da Atenção Primária, construído em n8n e hospedado em VPS Linux.",
  },
];

export const howIBuild = {
  title: "Como eu construo",
  statement:
    "Nos três agentes que mais evoluí, o problema começou do mesmo jeito: um agente fazendo coisa demais. A correção foi sempre dividir por função (tópicos, subagentes, variáveis de estado) em vez de aumentar o prompt. Cada correção foi validada com mais de 50 testes, e os agentes importantes mantêm um humano no controle antes de ações críticas.",
  pillars: [
    {
      title: "Divisão por função",
      detail:
        "Tópicos no Copilot Studio, subagentes dedicados e variáveis de estado em JSON no n8n em vez de um prompt único gigante.",
    },
    {
      title: "Validação com +50 testes",
      detail:
        "Cada ajuste de arquitetura e prompt foi validado com mais de 50 testes práticos nos cenários que falhavam.",
    },
    {
      title: "Humano no controle",
      detail:
        "Botões Sim/Não antes de fechar chamados no ORAC, validação antes de disparos no TI Informa e transbordo humano no WhatsApp.",
    },
  ],
};

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  department?: string;
  period: string;
  summary: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "hydro",
    company: "Hydro",
    role: "Estagiário de TI",
    department: "GBS Global IT Support South America",
    period: "05/2026 – Presente",
    summary:
      "+340 tickets resolvidos em 6 meses com 97,6% de SLA no ServiceNow; suporte e gerenciamento de endpoints (Intune, SCCM, Entra ID); PC Refresh 2026 (43 de 118 notebooks); piloto de redesign de RBAC no Intune; implantação de videoconferência em 5 andares.",
  },
  {
    id: "crea-pa",
    company: "CREA-PA",
    role: "Estagiário de TI",
    period: "02/2025 – 04/2026",
    summary:
      "Suporte a usuários em Windows, Linux e iOS; gerenciamento de chamados internos.",
  },
  {
    id: "ifpa",
    company: "IFPA",
    role: "Monitor de laboratório",
    period: "03/2023 – 12/2023",
    summary:
      "Instalação e manutenção de sistemas, hardware e redes locais.",
  },
];

export const skillCategories = [
  {
    category: "IA e agentes",
    items: [
      "Copilot Studio",
      "Claude",
      "GPT",
      "Microsoft Copilot",
      "MCP",
      "RAG",
      "Engenharia de prompts",
      "Orquestração de subagentes",
    ],
  },
  {
    category: "Automação e dados",
    items: [
      "n8n",
      "Power Automate",
      "AI Builder",
      "Microsoft Fabric",
      "SQL",
      "Power BI",
      "SharePoint",
      "Webhooks",
    ],
  },
  {
    category: "Desenvolvimento com IA",
    items: ["Claude", "Antigravity", "JavaScript", "HTML", "CSS", "Git"],
  },
  {
    category: "Suporte e endpoint",
    items: [
      "ServiceNow",
      "Intune",
      "SCCM",
      "Entra ID",
      "Active Directory",
      "Microsoft 365",
      "Windows",
      "Linux",
      "VPS",
    ],
  },
];

export const about = {
  resumo:
    "Estagiário de TI no Hydro (GBS Global IT Support South America) e estudante de Sistemas de Informação na UFRA. Atuo na operação de suporte corporativo e construo agentes de IA e automações práticas por iniciativa própria.",
  education: [
    {
      institution: "UFRA — Universidade Federal Rural da Amazônia",
      degree: "Bacharelado em Sistemas de Informação",
      period: "08/2024 – conclusão prevista: início de 2028",
    },
    {
      institution: "IFPA — Instituto Federal do Pará",
      degree: "Técnico em Informática Integrado ao Ensino Médio",
      period: "2021 – 2023",
    },
  ],
  languages: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Em desenvolvimento (Minds School)" },
  ],
};

export interface GalleryItem {
  id: string;
  projetoId: string;
  projetoNome: string;
  titulo: string;
  categoria: "ORAC" | "Notas Fiscais Dell" | "Agendamento Clínica" | "CreaAI";
  kind: "image" | "orac-diagram" | "nfs-diagram";
  src?: string;
  width?: number;
  height?: number;
  legenda: string;
}

export const galleryFilters = [
  "Todos",
  "ORAC",
  "Notas Fiscais Dell",
  "Agendamento Clínica",
  "CreaAI",
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-orac-arquitetura",
    projetoId: "orac",
    projetoNome: "ORAC",
    titulo: "Arquitetura do ORAC (Copilot Studio · Fabric SQL · ServiceNow)",
    categoria: "ORAC",
    kind: "orac-diagram",
    legenda:
      "Fluxo com dados fictícios: consulta de ticket via Power Automate, pesquisa em +16 mil KBs no Fabric (SQL), subagentes P1/P2 e work notes com confirmação Sim/Não do analista.",
  },
  {
    id: "gal-nfs-antes-depois",
    projetoId: "nfs",
    projetoNome: "Automação de Notas Fiscais Dell",
    titulo: "Antes e Depois: Fluxo com AI Builder (OCR) e Dados Fictícios",
    categoria: "Notas Fiscais Dell",
    kind: "nfs-diagram",
    legenda:
      "Comparativo do processo manual (~8 min por nota) contra o fluxo automatizado (~15 s por nota, observado no meu uso) com extração via OCR e aviso no Teams.",
  },
  {
    id: "gal-clinica-fluxo",
    projetoId: "clinica",
    projetoNome: "Agendamento Clínica",
    titulo: "Workflow n8n: Agente Principal, Subagente e Servidor MCP",
    categoria: "Agendamento Clínica",
    kind: "image",
    src: "/images/clinica-fluxo-n8n.webp",
    width: 1024,
    height: 481,
    legenda:
      "Fluxo em n8n com transcrição de áudio, análise de imagem, subagente exclusivo de agendamentos e integração com Google Calendar via MCP.",
  },
  {
    id: "gal-clinica-horarios",
    projetoId: "clinica",
    projetoNome: "Agendamento Clínica",
    titulo: "Consulta de Horários Disponíveis (Cabeçalho Anonimizado)",
    categoria: "Agendamento Clínica",
    kind: "image",
    src: "/images/clinica-horarios.webp",
    width: 1024,
    height: 649,
    legenda:
      "Agente verificando horários livres no Google Calendar e respondendo no WhatsApp (dados de teste próprios).",
  },
  {
    id: "gal-clinica-dados",
    projetoId: "clinica",
    projetoNome: "Agendamento Clínica",
    titulo: "Confirmação de Dados Antes de Agendar",
    categoria: "Agendamento Clínica",
    kind: "image",
    src: "/images/clinica-dados.webp",
    width: 1024,
    height: 589,
    legenda:
      "Validação dos dados do paciente antes de registrar o compromisso na agenda.",
  },
  {
    id: "gal-clinica-agendamento",
    projetoId: "clinica",
    projetoNome: "Agendamento Clínica",
    titulo: "Registro da Consulta e Aviso à Clínica (Anonimizado)",
    categoria: "Agendamento Clínica",
    kind: "image",
    src: "/images/clinica-agendamento.webp",
    width: 1024,
    height: 665,
    legenda:
      "Consulta registrada no Google Calendar e resumo enviado para a clínica.",
  },
  {
    id: "gal-clinica-confirmacao",
    projetoId: "clinica",
    projetoNome: "Agendamento Clínica",
    titulo: "Orientações e Confirmação de Presença (Endereço Anonimizado)",
    categoria: "Agendamento Clínica",
    kind: "image",
    src: "/images/clinica-confirmacao.webp",
    width: 1024,
    height: 531,
    legenda:
      "Mensagem com orientações pré-consulta e confirmação de presença pelo paciente.",
  },
  {
    id: "gal-crea-fluxo",
    projetoId: "creaai",
    projetoNome: "CreaAI",
    titulo: "Workflow n8n: RAG no Supabase Vector Store e Estado em JSON",
    categoria: "CreaAI",
    kind: "image",
    src: "/images/crea-fluxo-n8n.webp",
    width: 1024,
    height: 549,
    legenda:
      "Fluxo no n8n com passagem de variáveis em JSON, memória Redis, Supabase Vector Store e embeddings OpenAI.",
  },
  {
    id: "gal-crea-anuidade",
    projetoId: "creaai",
    projetoNome: "CreaAI",
    titulo: "Consulta de Valores e Descontos de Anuidade",
    categoria: "CreaAI",
    kind: "image",
    src: "/images/crea-anuidade.webp",
    width: 1024,
    height: 674,
    legenda:
      "Atendente virtual respondendo sobre valores integrais e prazos de desconto da anuidade.",
  },
  {
    id: "gal-crea-art",
    projetoId: "creaai",
    projetoNome: "CreaAI",
    titulo: "Orientação sobre Emissão de ART",
    categoria: "CreaAI",
    kind: "image",
    src: "/images/crea-art.webp",
    width: 1024,
    height: 733,
    legenda:
      "Explicação da obrigatoriedade da ART e envio do link do sistema.",
  },
  {
    id: "gal-crea-passo",
    projetoId: "creaai",
    projetoNome: "CreaAI",
    titulo: "Passo a Passo para Registro da ART",
    categoria: "CreaAI",
    kind: "image",
    src: "/images/crea-passo-a-passo.webp",
    width: 1024,
    height: 726,
    legenda:
      "Instruções em etapas curtas e opção de encaminhamento para atendente humano.",
  },
];
