// ============================================================
// INFORMAÇÕES PESSOAIS & CONTATO (DO CURRÍCULO)
// ============================================================
export const NOME = "Felipe Cardoso das Neves";
export const CARGO = "Estagiário de TI | Agentes de IA e Automação";
export const LOCATION = "Belém, PA";
export const EMAIL = "felipecardoso3005@gmail.com";
export const WHATSAPP = "5591987382169";
export const LINKEDIN = "https://linkedin.com/in/felipe-cardoso-1425652a9";
export const CURRICULO_PDF = "#contato";

export const WHATSAPP_MSG = encodeURIComponent(
  "Olá, Felipe! Vi seu portfólio e gostaria de conversar sobre oportunidades em IA e Automação."
);
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`;

// ============================================================
// HERO
// ============================================================
export const hero = {
  badge: "Disponível para novas oportunidades • Belém, PA",
  title: "Felipe Cardoso das Neves",
  role: "IA e Automação em IT Operations",
  description:
    "Estudante de Sistemas de Informação e estagiário de TI na Hydro. Por iniciativa própria, construo agentes de IA e automações que substituem trabalho manual, aceleram atendimentos e padronizam operações corporativas.",
  highlights: [
    { label: "Tickets resolvidos (Hydro)", value: "+340" },
    { label: "SLA no ServiceNow", value: "97,6%" },
    { label: "Agentes de IA entregues", value: "4+" },
  ],
};

// ============================================================
// SOBRE MIM & FORMAÇÃO
// ============================================================
export const about = {
  resumo:
    "Estudante de Sistemas de Informação na UFRA e estagiário de TI na Hydro (GBS Global IT Support South America). Atuo no suporte corporativo a usuários, ServiceNow, Microsoft Intune e M365. Por iniciativa própria, construo soluções de inteligência artificial e automação que resolvem gargalos reais: desde o agente corporativo ORAC e a automação de NFs com OCR na Hydro, até atendentes virtuais de WhatsApp em n8n com RAG para clientes externos.",
  education: [
    {
      institution: "Universidade Federal Rural da Amazônia (UFRA)",
      degree: "Bacharelado em Sistemas de Informação",
      period: "08/2024 – início de 2028 (previsto)",
      details: "5º semestre em andamento, foco em engenharia de software e inteligência artificial.",
    },
    {
      institution: "IFPA — Instituto Federal do Pará",
      degree: "Técnico em Informática Integrado ao Ensino Médio",
      period: "06/2021 – 12/2023",
      details: "Formação técnica em redes, hardware, arquitetura de computadores e lógica de programação.",
    },
  ],
  languages: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Em desenvolvimento (Minds School)" },
  ],
};

// ============================================================
// EXPERIÊNCIA PROFISSIONAL (DO CURRÍCULO)
// ============================================================
export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  department?: string;
  bullets: string[];
  tags: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "hydro",
    company: "Hydro (Norsk Hydro Brasil)",
    role: "Estagiário de TI",
    period: "05/2026 – Presente",
    location: "Belém - PA",
    department: "GBS Global IT Support South America · Service Point Belém",
    bullets: [
      "Mais de 340 tickets resolvidos em 6 meses com 97,6% de SLA no ServiceNow: troubleshooting, work notes, additional comments e acompanhamento até a resolução.",
      "Diagnóstico ágil de problemas em aplicações corporativas, orientação técnica direta a usuários e escalonamentos estruturados para equipes de suporte especializado.",
      "Suporte a endpoints com Microsoft Intune, SCCM e Entra ID: suporte remoto, preparação, substituição de equipamentos e gestão do ciclo de vida dos notebooks.",
      "PC Refresh 2026: substituição direta de 43 notebooks de um escopo de 118 equipamentos corporativos em Belém.",
      "Participação ativa no piloto de redesign de RBAC no Intune (Client Operations / Modern Workplace): validação de permissões, ações remotas, troca de Primary User e decommissioning.",
      "Implantação de salas de videoconferência em 5 andares (EGA, Finance, RH, Procurement e Projects/Control) e suporte à infraestrutura local do escritório.",
      "Elaboração de um guia padrão de work notes e comentários técnicos para o time de analistas.",
    ],
    tags: ["ServiceNow", "Microsoft Intune", "Entra ID", "SCCM", "M365", "Suporte Corporativo"],
  },
  {
    id: "crea-pa",
    company: "CREA-PA (Conselho Regional de Engenharia e Agronomia)",
    role: "Estagiário de Tecnologia da Informação",
    period: "02/2025 – 04/2026",
    location: "Belém - PA",
    department: "Departamento de Tecnologia da Informação",
    bullets: [
      "Suporte técnico a usuários em ambientes Windows, Linux e iOS, com instalação e configuração de softwares, impressoras e manutenção de hardware.",
      "Gerenciamento de chamados internos de TI, com triagem e acompanhamento das demandas até o encerramento.",
      "Atuação em ambientes corporativos com suporte a redes locais e conectividade de estações.",
      "Automação de atendimentos via WhatsApp com uso de inteligência artificial, contribuindo para a otimização de fluxos operacionais internos.",
    ],
    tags: ["Suporte a Usuários", "Windows", "Linux", "iOS", "Redes Corporativas", "Hardware"],
  },
  {
    id: "ifpa",
    company: "IFPA — Instituto Federal do Pará",
    role: "Monitor de Laboratório de Informática",
    period: "03/2023 – 12/2023",
    location: "Ananindeua - PA",
    department: "Laboratórios de Ensino e Pesquisa",
    bullets: [
      "Instalação e configuração de sistemas operacionais e aplicativos.",
      "Manutenção preventiva e corretiva de hardware e suporte técnico a usuários.",
      "Atuação em redes locais, incluindo manutenção de equipamentos e resolução de falhas de conectividade.",
      "Execução de rotinas básicas de segurança e elaboração de documentação técnica.",
    ],
    tags: ["Hardware", "Redes Locais", "Linux", "Windows", "Documentação Técnica"],
  },
];

// ============================================================
// PROJETOS DE IA E AUTOMAÇÃO (COM FOTOS E DETALHES REAIS)
// ============================================================
export interface Project {
  id: string;
  titulo: string;
  categoria: "Hydro (Corporativo)" | "Projetos em n8n & WhatsApp";
  status: string;
  resumo: string;
  problema: string;
  solucao: string[];
  tecnologias: string[];
  resultados: string[];
  imagemDestaque?: string;
  galeria: { src: string; legenda: string }[];
  diagrama?: string;
  demoVideoUrl?: string;
  evolucao?: string;
  proximasEtapas?: string;
}

export const projects: Project[] = [
  // --- HYDRO / CORPORATIVO ---
  {
    id: "orac",
    titulo: "ORAC — Agente de IA para IT Operations",
    categoria: "Hydro (Corporativo)",
    status: "Publicado / Piloto ativo",
    resumo:
      "Agente de IA no Microsoft Teams que consulta tickets do ServiceNow, pesquisa mais de 16 mil KBs no Microsoft Fabric (SQL) e apoia os analistas no troubleshooting.",
    problema:
      "Analistas gastavam tempo excessivo lendo históricos longos de chamados no ServiceNow; KBs e SOPs estavam dispersos; escalonamentos P1/P2 e Work Notes careciam de padronização.",
    solucao: [
      "Agente orquestrador construído no Microsoft Copilot Studio com GPT.",
      "Subagentes especializados para escalonamentos críticos P1/P2 e geração de Work Notes padronizadas com confirmação interativa.",
      "Fluxo no Power Automate que consulta chamados via SQL e normaliza dados em JSON estruturado.",
      "Dados do ServiceNow disponíveis no Microsoft Fabric, consultados por fluxos automatizados que construí.",
      "Mecanismo de Health Score (0–100) para priorização inteligente do backlog.",
    ],
    tecnologias: ["Copilot Studio", "GPT", "Power Automate", "Microsoft Fabric", "ServiceNow", "SQL", "Teams"],
    resultados: [
      "Estimativa baseada no meu uso: cerca de 20 minutos economizados por ticket.",
      "Maior ganho de agilidade em problemas internos recorrentes já documentados na base.",
      "Padronização total dos escalonamentos e registros para equipes de nível 3.",
    ],
    galeria: [],
    diagrama: `[Microsoft Teams] ──> [ORAC: Copilot Studio] ──> [Subagentes P1/P2 & Work Notes] ──> [Power Automate SQL] ──> [Microsoft Fabric / ServiceNow]`,
  },
  {
    id: "nfs",
    titulo: "Automação de Notas Fiscais Dell",
    categoria: "Hydro (Corporativo)",
    status: "Em produção",
    resumo:
      "Fluxo automatizado que lê notas fiscais digitalizadas com IA e OCR, extrai dados cadastrais e manuscritos, arquiva no SharePoint e notifica no Teams sem intervenção manual.",
    problema:
      "Processo manual com seis etapas repetitivas (scan, abrir e-mail, renomear, salvar localmente, upload e arquivamento), demandando ~8 minutos por nota com risco de inconsistência.",
    solucao: [
      "Gatilho no Power Automate disparado a cada e-mail recebido da multifuncional.",
      "Leitura do PDF com AI Builder e OCR, extraindo número da NF, ordem de compra, itens e dados manuscritos.",
      "Renomeação padronizada e upload dinâmico em biblioteca SharePoint Online.",
      "Notificação com o arquivo no Microsoft Teams e envio de cópia por e-mail ao solicitante.",
    ],
    tecnologias: ["Power Automate", "AI Builder", "OCR", "SharePoint Online", "Outlook", "Teams"],
    resultados: [
      "Tempo reduzido de ~8 min para ~15 s por nota (~97% de economia de tempo).",
      "Aproximadamente 31 horas liberadas por ano para a equipe de IT Operations.",
      "Eliminação de erros de digitação e padronização total dos arquivos.",
    ],
    demoVideoUrl: "/videos/automacao-nf-dell.mp4",
    galeria: [],
    diagrama: `[Digitalização Multifuncional] ──> [Power Automate] ──> [AI Builder OCR] ──> [SharePoint Online] ──> [Alerta Microsoft Teams]`,
  },
  {
    id: "tiinforma",
    titulo: "TI Informa — Agente de Comunicados",
    categoria: "Hydro (Corporativo)",
    status: "Em desenvolvimento",
    resumo:
      "Agente de IA para elaboração e padronização rápida de comunicados operacionais de TI (indisponibilidades, quedas de link e manutenções preventivas).",
    problema:
      "Comunicados emergenciais eram escritos manualmente sob pressão, gerando atraso e formatos divergentes a cada ocorrência.",
    solucao: [
      "Agente identifica o tipo de ocorrência a partir do contexto.",
      "Gera o modelo de comunicado adequado com base no histórico corporativo.",
      "Painel de prévia com aprovação em 1 clique pelo solicitante antes da transmissão.",
    ],
    tecnologias: ["Copilot Studio", "Power Automate", "Outlook", "Prompt Engineering"],
    resultados: [
      "Tempo de elaboração estimado de 10–20 min para 2–5 min por comunicado.",
      "Linguagem clara e objetiva para os usuários de negócio.",
    ],
    galeria: [],
    diagrama: `[Registro da Ocorrência] ──> [Copilot Studio Engine] ──> [Validação do Solicitante] ──> [Disparo Outlook/Teams]`,
  },

  // --- PROJETOS INDEPENDENTES EM N8N ---
  {
    id: "clinica",
    titulo: "Agente de Agendamento para Clínica Médica",
    categoria: "Projetos em n8n & WhatsApp",
    status: "Construído e entregue (Demo ativa)",
    resumo:
      "Agente de IA no WhatsApp para clínica dermatológica que transcreve áudios e imagens, orienta sobre valores, consulta disponibilidade e agenda no Google Calendar via MCP.",
    problema:
      "A equipe de recepção perdia horas conciliando horários no chat, conferindo disponibilidades de agenda e confirmando presenças de pacientes.",
    solucao: [
      "Workflow completo desenvolvido em n8n conectando WhatsApp Webhook a modelos de IA.",
      "Integração com Google Calendar via Model Context Protocol (MCP) para leitura e gravação de eventos em tempo real.",
      "Instruções refinadas de diálogo para triagem de especialidade, confirmação de dados e envio de lembrete com preparo pré-consulta.",
      "Tratamento automático de transcrição de áudios e mensagens de imagem.",
    ],
    tecnologias: ["n8n", "WhatsApp API", "MCP (Model Context Protocol)", "Google Calendar", "LLMs", "Webhooks"],
    resultados: [
      "Jornada de agendamento concluída em menos de 1 minuto diretamente no WhatsApp.",
      "Confirmação automática de presença com dados completos (RG, data, horário e orientações).",
      "Eliminação de conflitos de agenda através de validação em tempo real.",
    ],
    imagemDestaque: "/images/clinica-fluxo-n8n.png",
    galeria: [
      { src: "/images/clinica-fluxo-n8n.png", legenda: "Canvas n8n: fluxo completo com webhook, transcrição de áudio, AI Agent e MCP Calendar." },
      { src: "/images/clinica-horarios.png", legenda: "Agente consultando a agenda em tempo real e oferecendo opções de horários." },
      { src: "/images/clinica-dados-confirmacao.png", legenda: "Validação e coleta de dados cadastrais do paciente via WhatsApp." },
      { src: "/images/clinica-agendamento.png", legenda: "Confirmação e registro automático da consulta particular na agenda médica." },
      { src: "/images/clinica-confirmacao.png", legenda: "Mensagem com orientações de preparo e solicitação de confirmação de presença." },
    ],
    diagrama: `[Paciente (WhatsApp)] ──> [n8n Webhook] ──> [Tratamento Áudio/Texto] ──> [AI Agent + MCP] ──> [Google Calendar API] ──> [Confirmação Automática]`,
  },
  {
    id: "creaai",
    titulo: "CreaAI — Atendente Virtual do CREA-PA",
    categoria: "Projetos em n8n & WhatsApp",
    status: "Construído no estágio",
    resumo:
      "Atendente virtual com IA no WhatsApp para o Conselho Regional de Engenharia e Agronomia do Pará, respondendo sobre anuidade, procedimentos e emissão de ART com RAG.",
    problema:
      "Centenas de mensagens repetitivas diárias sobre valores de anuidade, prazos de desconto e passo a passo de ART sobrecarregavam o atendimento.",
    solucao: [
      "Fluxo de IA construído em n8n com integração WhatsApp e memória conversacional com Redis.",
      "Arquitetura RAG com base vetorial no Supabase (Supabase Vector Store) e embeddings da OpenAI.",
      "Instruções e guardrails para respostas precisas sobre a Lei nº 6.496/1977, sistema SITAC e escalonamento para atendente humano quando necessário.",
    ],
    tecnologias: ["n8n", "WhatsApp Cloud API", "RAG", "Supabase Vector Store", "OpenAI Embeddings", "Redis"],
    resultados: [
      "Resolução imediata de dúvidas sobre anuidades com cálculo de descontos por data.",
      "Passo a passo interativo para emissão de ART com link do sistema SITAC.",
      "Escalonamento contextualizado para atendentes quando a demanda foge do escopo.",
    ],
    imagemDestaque: "/images/crea-fluxo-n8n.png",
    galeria: [
      { src: "/images/crea-fluxo-n8n.png", legenda: "Canvas n8n: fluxo WhatsApp, RAG com Supabase Vector Store e AI Agent." },
      { src: "/images/crea-anuidade.png", legenda: "Agente informando valores e regras de desconto da anuidade 2025." },
      { src: "/images/crea-art.png", legenda: "Orientações sobre fundamentação legal e passo a passo para emissão da ART." },
      { src: "/images/crea-art-motivo.png", legenda: "Explicação sobre fundamentação da Lei nº 6.496/1977 e link para o sistema SITAC." },
    ],
    diagrama: `[Profissional (WhatsApp)] ──> [n8n Webhook] ──> [RAG: Supabase Vector Store] ──> [OpenAI LLM + Redis Memory] ──> [Resposta WhatsApp]`,
  },
  {
    id: "cuidai",
    titulo: "CuidAI — Assistente para a Atenção Primária",
    categoria: "Projetos em n8n & WhatsApp",
    status: "Construído em 2025 (Hospedado em VPS)",
    resumo:
      "Assistente de IA no WhatsApp para apoio ao atendimento de enfermeiros da Atenção Primária à Saúde, estruturado em n8n e hospedado em VPS Linux.",
    problema:
      "Necessidade de auxílio ágil na consulta a protocolos clínicos da atenção primária e organização rápida de rotinas assistenciais durante os plantões.",
    solucao: [
      "Assistente desenvolvido em n8n com interface direta no WhatsApp.",
      "Hospedagem dedicada em VPS Linux com alta disponibilidade.",
      "Base de conhecimento com protocolos clínicos estruturados e geração de resumos assistenciais.",
    ],
    tecnologias: ["n8n", "WhatsApp API", "LLMs", "VPS Linux", "JSON"],
    resultados: [
      "Consulta ágil a diretrizes da Atenção Primária diretamente pelo smartphone.",
      "Auxílio na sistematização de anotações e passagem de rotinas.",
    ],
    galeria: [],
    diagrama: `[Enfermeiro (WhatsApp)] ──> [n8n em VPS Linux] ──> [Agente LLM Clínico] ──> [Protocolos Atenção Primária] ──> [Resposta no Chat]`,
  },
];

// ============================================================
// COMPETÊNCIAS / SKILLS (DO CURRÍCULO)
// ============================================================
export const skillCategories = [
  {
    category: "IA e Agentes",
    items: [
      "Microsoft Copilot Studio",
      "Claude (Anthropic)",
      "GPT (OpenAI)",
      "Microsoft Copilot",
      "MCP (Model Context Protocol)",
      "RAG (Retrieval-Augmented Generation)",
      "Engenharia de Prompts",
      "Orquestração de Subagentes",
    ],
  },
  {
    category: "Automação e Dados",
    items: [
      "n8n",
      "Power Automate",
      "AI Builder (OCR)",
      "Microsoft Fabric",
      "SQL",
      "Power BI",
      "SharePoint Online",
      "Webhooks & REST APIs",
    ],
  },
  {
    category: "Suporte e ITSM",
    items: [
      "ServiceNow (Gestão de Tickets & SLAs)",
      "Work Notes & SOPs",
      "Escalonamentos P1/P2",
      "Troubleshooting N1/N2",
      "Hardware & Redes",
    ],
  },
  {
    category: "Endpoint e Identidade",
    items: [
      "Microsoft Intune",
      "SCCM",
      "Entra ID (Azure AD)",
      "Active Directory",
      "Microsoft 365",
      "Windows, Linux e iOS",
      "VPS Linux",
    ],
  },
];

// ============================================================
// GALERIA (COM OS ARQUIVOS E CAPTURAS REAIS ENVIADOS)
// ============================================================
export interface GalleryItem {
  id: string;
  projetoId: string;
  projetoNome: string;
  titulo: string;
  categoria: string;
  src: string;
  legenda: string;
}

export const galleryFilters = [
  "Todos",
  "CreaAI",
  "Agendamento Clínica",
  "ORAC",
  "Notas Fiscais",
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-crea-fluxo",
    projetoId: "creaai",
    projetoNome: "CreaAI",
    titulo: "Workflow n8n: CreaAI no WhatsApp",
    categoria: "CreaAI",
    src: "/images/crea-fluxo-n8n.png",
    legenda: "Workflow completo no n8n: recepção de mensagens, RAG com Supabase Vector Store, OpenAI Chat Model e memória Redis.",
  },
  {
    id: "gal-crea-anuidade",
    projetoId: "creaai",
    projetoNome: "CreaAI",
    titulo: "Consulta de Anuidade no WhatsApp",
    categoria: "CreaAI",
    src: "/images/crea-anuidade.png",
    legenda: "CreaAI informando valores integrais e faixas de desconto proporcional da anuidade 2025 para pessoas físicas.",
  },
  {
    id: "gal-crea-art",
    projetoId: "creaai",
    projetoNome: "CreaAI",
    titulo: "Passo a Passo de Emissão de ART",
    categoria: "CreaAI",
    src: "/images/crea-art.png",
    legenda: "Explicação fundamentada da obrigatoriedade da ART (Lei nº 6.496/1977) com link direto para o sistema SITAC.",
  },
  {
    id: "gal-clinica-fluxo",
    projetoId: "clinica",
    projetoNome: "Agendamento Clínica",
    titulo: "Workflow n8n: Agendamento Médico",
    categoria: "Agendamento Clínica",
    src: "/images/clinica-fluxo-n8n.png",
    legenda: "Pipeline n8n com nó de tratamento de dados, AI Agent, MCP Server Trigger e integração com Google Calendar.",
  },
  {
    id: "gal-clinica-horarios",
    projetoId: "clinica",
    projetoNome: "Agendamento Clínica",
    titulo: "Consulta e Oferta de Horários Livres",
    categoria: "Agendamento Clínica",
    src: "/images/clinica-horarios.png",
    legenda: "Diálogo natural via WhatsApp: o agente verifica a agenda em tempo real e oferece opções nos turnos da manhã e tarde.",
  },
  {
    id: "gal-clinica-agendamento",
    projetoId: "clinica",
    projetoNome: "Agendamento Clínica",
    titulo: "Confirmação de Agendamento Particular",
    categoria: "Agendamento Clínica",
    src: "/images/clinica-agendamento.png",
    legenda: "Agendamento confirmado no calendário com dados do paciente, data, horário e link seguro da conversa.",
  },
  {
    id: "gal-crea-art-motivo",
    projetoId: "creaai",
    projetoNome: "CreaAI",
    titulo: "Dúvidas e Legislação sobre ART",
    categoria: "CreaAI",
    src: "/images/crea-art-motivo.png",
    legenda: "Agente explicando a fundamentação legal da Lei nº 6.496/1977 e orientando sobre regularidade com link direto ao SITAC.",
  },
  {
    id: "gal-clinica-dados",
    projetoId: "clinica",
    projetoNome: "Agendamento Clínica",
    titulo: "Coleta e Validação de Dados",
    categoria: "Agendamento Clínica",
    src: "/images/clinica-dados-confirmacao.png",
    legenda: "Agente coletando dados completos do paciente e confirmando horário específico escolhido pelo usuário.",
  },
  {
    id: "gal-nfs-video",
    projetoId: "nfs",
    projetoNome: "Notas Fiscais Dell",
    titulo: "Vídeo Demonstrativo: Automação com AI Builder & OCR",
    categoria: "Notas Fiscais",
    src: "/videos/automacao-nf-dell.mp4",
    legenda: "Demonstração gravada do fluxo no Power Automate com AI Builder (OCR): extração automática de dados de NF digitalizada, renomeação e upload no SharePoint.",
  },
  {
    id: "gal-clinica-confirmacao",
    projetoId: "clinica",
    projetoNome: "Agendamento Clínica",
    titulo: "Lembrete e Confirmação de Presença",
    categoria: "Agendamento Clínica",
    src: "/images/clinica-confirmacao.png",
    legenda: "Disparo automático de lembrete com endereço, documentos necessários e confirmação de presença com resposta rápida.",
  },
];

// ============================================================
// SOBRE ESTE SITE
// ============================================================
export const aboutSite = {
  declaracao: "Este site foi construído com IA (Antigravity), a partir de prompts, em horas.",
  stack: ["React 19", "Vite 8", "TypeScript", "Tailwind CSS"],
  pontos: [
    "Zero rastreadores e zero cookies de terceiros",
    "Acessibilidade de alto contraste e navegação por teclado",
    "Capturas reais de fluxos no n8n e interações no WhatsApp",
    "Desenvolvido de forma iterativa com assistência de IA",
  ],
};
