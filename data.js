/**
 * data.js — single source of truth for categories + items.
 *
 * This is the ONLY place you edit to add/remove/change content.
 * - index.html reads this file directly (as a <script> tag) to render
 *   the sidebar and item grid.
 * - generate_items.js reads this same object (via Node's require) to
 *   (re)generate the static detail pages under items/*.html.
 *
 * Schema:
 * {
 *   id: string            // unique category id, used as URL-safe slug
 *   label: string          // sidebar label (Korean)
 *   icon: string           // key into ICONS in icons.js
 *   description: string    // shown under the category title in the main pane
 *   items: [
 *     {
 *       id: string         // unique item id -> items/{id}.html
 *       title: string
 *       meta: string       // small caption line shown on the card (code)
 *       body: string       // paragraph(s) shown on the detail page (\n\n = new paragraph)
 *       hue: number         // 0-360, drives the placeholder "cover art" gradient
 *       skipGenerate: bool  // optional — true if items/{id}.html is hand-written
 *     }, ...
 *   ]
 * }
 *
 * NOTE ON CONTENT: most `body` fields below are short placeholders on
 * purpose — the real write-ups will be dropped in later as finished
 * items/{id}.html pages. This file's job right now is just to lock in the
 * category/item STRUCTURE (ids, labels, ordering) so the site is
 * navigable while content is filled in incrementally.
 */
/**
 * PORTAL_TOOLS — the 12 tiles shown on the main portal (default landing view
 * and whatever appears when the "AI NATIVE WORLD" logo is clicked).
 * This is purely decorative/branding content: clicking a tile does nothing.
 * Category browsing is done exclusively through the sidebar.
 *
 * icon: filename inside assets/portal/
 * bg:   CSS background for the rounded tile
 */
const PORTAL_TOOLS = [
  { label: "ChatGPT", icon: "icon-chatgpt.png", bg: "#ffffff" },
  { label: "Claude", icon: "icon-claude.png", bg: "#d97757" },
  { label: "Claude Code", icon: "icon-claudecode.png", bg: "#141414" },
  { label: "NotebookLM", icon: "icon-notebooklm.png", bg: "#6c5ce7" },
  { label: "Suno", icon: "icon-suno.png", bg: "#ff7a59" },
  { label: "Nano Banana", icon: "icon-nanobanana.png", bg: "#1a1a1e" },
  { label: "Claude Cowork", icon: "icon-claude.png", bg: "#e8734a" },
  { label: "Claude Design", icon: "icon-claude.png", bg: "#141414" },
  { label: "ElevenLabs", icon: "icon-elevenlabs.png", bg: "#141414" },
  { label: "Replit", icon: "icon-replit.png", bg: "#141414" },
  { label: "CapCut", icon: "icon-capcut.png", bg: "#141414" },
  { label: "Higgsfield", icon: "icon-higgsfield.png", bg: "#1e8449" },
];

/**
 * MODALITY_GROUPS — the 6 "modality" cards shown on the main portal, just
 * below the PORTAL_TOOLS grid. Each group bundles the best tool(s) for one
 * data modality (chat, research, image, code, video, audio).
 *
 * tools[].icon: filename inside assets/portal/ (reuses the same icon set
 * as PORTAL_TOOLS above, so bg colors are kept consistent).
 */
const MODALITY_GROUPS = [
  {
    label: "대화 · 채팅",
    icon: "message-circle",
    tools: [
      { icon: "icon-chatgpt.png", bg: "#ffffff" },
      { icon: "icon-claude.png", bg: "#d97757" },
    ],
    desc: "ChatGPT · Claude — 모든 일의 출발점.",
  },
  {
    label: "리서치",
    icon: "device",
    tools: [{ icon: "icon-notebooklm.png", bg: "#6c5ce7" }],
    desc: "NotebookLM — 자료 더미를 인사이트로.",
  },
  {
    label: "이미지 · 디자인",
    icon: "image",
    tools: [
      { icon: "icon-claude.png", bg: "#141414" },
      { icon: "icon-nanobanana.png", bg: "#1a1a1e" },
    ],
    desc: "Claude Design · Nano Banana — 브랜드 자산을 직접.",
  },
  {
    label: "코드 · 빌드",
    icon: "code",
    tools: [
      { icon: "icon-claudecode.png", bg: "#141414" },
      { icon: "icon-replit.png", bg: "#141414" },
    ],
    desc: "Claude Code · Replit — 비개발자도 앱을 띄웁니다.",
  },
  {
    label: "영상",
    icon: "video",
    tools: [
      { icon: "icon-higgsfield.png", bg: "#1e8449" },
      { icon: "icon-capcut.png", bg: "#141414" },
    ],
    desc: "Higgsfield · CapCut — 광고와 숏폼을 한 자리에서.",
  },
  {
    label: "오디오 · 보이스",
    icon: "music",
    tools: [
      { icon: "icon-suno.png", bg: "#ff7a59" },
      { icon: "icon-elevenlabs.png", bg: "#141414" },
    ],
    desc: "Suno · ElevenLabs — BGM부터 더빙까지.",
  },
];


/**
 * LATEST_POSTS — 메인 포털 맨 아래 "최신 글" 카드 3장.
 * 새 글을 올렸으면 이 배열 맨 앞에 한 줄 추가하고 마지막 줄을 지우면 됩니다.
 * cat/item 은 CATEGORIES의 id를 가리키며, 제목과 링크는 거기서 자동으로 가져옵니다.
 * summary 를 비워두면 해당 항목의 body 첫 문장이 쓰입니다.
 */
const LATEST_POSTS = [
  { cat: "e00", item: "e09", date: "2026년 8월 24일",
    summary: "screen, git, Postman으로 AI 서버를 운영하며 쓰는 관리 꿀팁을 정리했습니다." },
  { cat: "h00", item: "h02", date: "2026년 8월 18일",
    summary: "Supabase로 데이터베이스를 처음 붙여보는 초보 개발자용 시작 가이드." },
  { cat: "d00", item: "d06b", date: "2026년 8월 11일",
    summary: "2026년 바이브코딩 트렌드를 정리합니다." },
];


const CATEGORIES = [
  // ── A00 ────────────────────────────────────────────────────────────
  {
    id: "a00",
    folder: "A_AI_Basic",
    label: "AI Basic",
    icon: "file-text",
    description: "AI/LLM의 기본 개념부터 에이전트, 오케스트레이션까지 핵심 용어와 원리를 정리합니다.",
    items: [
      { id: "a01", title: "AI기본용어(신입사원)", meta: "A01", hue: 205,
        skipGenerate: true,
        body: "AI 용어 12개로 배우는, 신입사원 AI의 성장 과정 콘텐츠입니다." },
      { id: "a02", title: "LLM동작원리", meta: "A02", hue: 205,
        skipGenerate: true,
        body: "LLM동작원리에 대한 내용 입니다." },
      { id: "a03", title: "멀티모달", meta: "A03", hue: 205,
        skipGenerate: true,
        body: "멀티모달에 대한 내용 입니다." },
      { id: "a04", title: "RLHF(Reinforcement Learning from Human Feedback)", meta: "A04", hue: 205,
        body: "RLHF에 대한 내용을 준비 중입니다." },
      { id: "a05", title: "파인튜닝", meta: "A05", hue: 205,
        body: "파인튜닝에 대한 내용을 준비 중입니다." },
      { id: "a06", title: "프롬프트엔지니어링_개념과_파라미터", meta: "A06", hue: 205,
        body: "프롬프트엔지니어링_개념과_파라미터" },
      { id: "a07", title: "지식베이스(Knowledge Base)", meta: "A07", hue: 205,
        body: "지식베이스(Knowledge Base)에 대한 내용을 준비 중입니다." },
      { id: "a08a", title: "RAG란_개념과_검색기법", meta: "A08a", hue: 205,
        body: "RAG란_개념과_검색기법." },
      { id: "a08b", title: "RAG_데이터파이프라인_LlamaParse_Chunking", meta: "A08b", hue: 205,
        body: "RAG_데이터파이프라인_LlamaParse_Chunking." },
      { id: "a08c", title: "RAG_임베딩모델선정_VectorDB구축", meta: "A08c", hue: 205,
        body: "RAG_임베딩모델선정_VectorDB구축." },
      { id: "a08d", title: "RAG_고급검색기술_RRF_KG-RAG_ColBERT", meta: "A08d", hue: 205,
        body: "RAG_고급검색기술_RRF_KG-RAG_ColBERT." },
      { id: "a08e", title: "RAG_에이전틱RAG", meta: "A08e", hue: 205,
        body: "에이전틱RAG에 대한 내용입니다." },
      { id: "a09", title: "MCP 연동레시피", meta: "A09", hue: 205,
        body: "MCP 연동레시피에 대한 내용입니다." },
      { id: "a10a", title: "AI_Agent란_무엇인가", meta: "A10a", hue: 205,
        body: "AI_Agent란_무엇인가." },
      { id: "a10b", title: "AI_Agent_vs_Agentic_AI_차이", meta: "A10b", hue: 205,
        body: "AI_Agent_vs_Agentic_AI_차이." },
      { id: "a10c", title: "Tool_Calling_도구호출_완벽가이드", meta: "A10c", hue: 205,
        body: "Tool_Calling_도구호출_완벽가이드." },
      { id: "a10d", title: "Agentic_AI구축기초_prompts포함", meta: "A10d", hue: 205,
        body: "Agentic_AI구축기초(prompts포함)." },
      { id: "a11", title: "워크프로우자동화", meta: "A11", hue: 205,
        body: "워크프로우자동화에 대한 내용 입니다." },
      { id: "a12", title: "하네스엔지니어링", meta: "A12", hue: 205,
        body: "하네스엔지니어링에 대한 내용 입니다." },
      { id: "a13", title: "AGI/ASI", meta: "A13", hue: 205,
        body: "AGI/ASI에 대한 내용 입니다." },
    ],
  },

   // ── B00 ────────────────────────────────────────────────────────────
  {
    id: "b00",
    folder: "B_AI_Advanced",
    label: "AI Advanced",
    icon: "star",
    description: "기본 개념 외의 자료들을 모아둔 폴더 입니다.",
    items: [
      { id: "b01", title: "AI발전역사", meta: "B01", hue: 205,
        skipGenerate: true,
        body: "AI발전역사에 대한 내용 입니다." },
      { id: "b02a", title: "프롬프트_프롬프트엔지니어링_개념과_파라미터", meta: "B02a", hue: 205,
        body: "프롬프트엔지니어링_개념과_파라미터" },
      { id: "b02b", title: "프롬프트_실전꿀팁_4가지국룰과5대작업", meta: "B02b", hue: 205,
        body: "프롬프트_실전꿀팁_4가지국룰과5대작업" },
      { id: "b02c", title: "프롬프트_실전꿀팁_FewShot_CoT_SelfConsistency", meta: "B02c", hue: 205,
        body: "프롬프트_실전꿀팁_4가지국룰과5대작업" },
      { id: "b02d", title: "프롬프트_실전꿀팁_RAG_ReAct_ToT_PAL", meta: "B02d", hue: 205,
        body: "프롬프트_실전꿀팁_RAG_ReAct_ToT_PAL" },
      { id: "b02e", title: "프롬프트_실전꿀팁_DataGen_FunctionCalling", meta: "B02e", hue: 205,
        body: "프롬프트_실전꿀팁_DataGen_FunctionCalling." },
      { id: "b02f", title: "프롬프트_Prompt_Injection_보안가이드", meta: "B02f", hue: 205,
        body: "프롬프트_Prompt_Injection_보안가이드" },
      { id: "b02g", title: "프롬프트_ReAct_vs_CoT_비교", meta: "B02g", hue: 205,
        body: "프롬프트_ReAct_vs_CoT_비교" },   
      { id: "b03", title: "컨텍스트엔지지어링", meta: "B03", hue: 205,
        body: "컨텍스트엔지니어링에 대한 내용을 준비 중입니다." },
      { id: "b04", title: "Loop엔지니어링", meta: "B04", hue: 205,
        body: "Loop엔지니어링에 대한 내용을 준비 중입니다." },
      { id: "b05", title: "Graph엔지니어링", meta: "B05", hue: 205,
        body: "Graph엔지니어링에 대한 내용을 준비 중입니다." },
      { id: "b06", title: "오케스트레이션", meta: "B06", hue: 205,
        body: "오케스트레이션에 대한 내용을 준비 중입니다." },
      { id: "b07", title: "LangChain_LangGraph 개념", meta: "B07", hue: 205,
        body: "LangChain과 LangGraph 개념에 대한 내용입니다." },
      { id: "b08a", title: "Comparison(Claude_Skills_vs_Subagent)", meta: "b08a", hue: 205,
        skipGenerate: true,
        body: "Claude Skills vs Subagent 비교" },
      { id: "b08b", title: "Comparison(CLAUDE.md vs Skill)", meta: "b08b", hue: 205,
        skipGenerate: true,
        body: "CLAUDE.md vs Skill 완벽 비교" },
      { id: "b08c", title: "Comparison(LAUDE.md vs .claude/rules/ vs Skill)", meta: "B08c", hue: 205,
        skipGenerate: true,
        body: "CLAUDE.md vs .claude/rules/ vs Skill 완벽 비교" },
      { id: "b08d", title: "Comparison(Subagent vs Agent team)", meta: "B08d", hue: 205,
        skipGenerate: true,
        body: "Subagent vs Agent team 완벽 비교" },
      { id: "b08e", title: "Comparison(MCP vs Skill)", meta: "B08e", hue: 205,
        skipGenerate: true,
        body: "MCP vs Skill 완벽 비교" },
      { id: "b08f", title: "Comparison(Hook vs Skill)", meta: "B08f", hue: 205,
        skipGenerate: true,
        body: "Hook vs Skill — 자동 실행과 지침 해석의 차이" },
      { id: "b08g", title: "prompt_vs_skill_vs_agent", meta: "B08g", hue: 205,
        skipGenerate: true,
        body: "prompt_vs_skill_vs_agent 비교"},
      { id: "b09", title: "영상관련", meta: "B09", hue: 205,
        body: "영상 관련한 기술들에 대한 내용입니다." },
      { id: "b10a", title: "온톨로지(Ontology)란 무엇인가", meta: "B10a", hue: 205,
        body: "온톨로지 관련 기술에 대한 내용입니다." },
      { id: "b10b", title: "온톨로지(Ontology) 프로젝트 분석", meta: "B10b", hue: 205,
        body: "온톨로지(Ontology) 프로젝트 분석" },
      { id: "b11a", title: "Onpremise-ai-guide", meta: "B11a", hue: 205,
        body: "온프레미스AI(On-premise AI) 완벽가이드." },
      { id: "b11b", title: "vLLM-gemma4-guide", meta: "B11b", hue: 205,
        body: "Docker + vLLM으로 Gemma4 31B 모델 서빙하기" },   
      { id: "b11c", title: "Docker-vLLM-atoz-guide", meta: "B11c", hue: 205,
        body: "Docker로 vLLM 모델 서빙 및 서버 구축." },
      { id: "b11d", title: "Docker-guide", meta: "B11d", hue: 205,
        body: "AI 개발을 위한 Docker 완벽가이드" },
      { id: "b12", title: "Ondevice-ai-guide", meta: "B12", hue: 205,
        body: "온디바이스AI(On-Device AI)에 대해 자세히 알아보자!" },
      { id: "b13", title: "Inference-reasoning-guide", meta: "B13", hue: 205,
        body: "Inference와 Reasoning (추론) 완벽 가이드" },
      { id: "b14a", title: "NLP-guide", meta: "B14a", hue: 205,
        body: "NLP(자연어 처리)란 무엇인가." },
      { id: "b14b", title: "NLU-guide", meta: "B14b", hue: 205,
        body: "자연어 이해(NLU)란 무엇일까" },   
      { id: "b14c", title: "ASR-guide", meta: "B14c", hue: 205,
        body: "ASR(자동 음성 인식)이란 무엇인가." },
      { id: "b15a", title: "Embedding-intro-guide", meta: "B15a", hue: 205,
        body: "임베딩(Embedding)이란" },
      { id: "b15b", title: "Embedding-models-guide", meta: "B15b", hue: 205,
        body: "최신 임베딩 모델과 원리" },
      { id: "b15c", title: "Embedding-practice-guide", meta: "B15c", hue: 205,
        body: "Embedding 실습 및 Vector DB 맛보기" },
     ],
  },

  // ── C00 ────────────────────────────────────────────────────────────
  {
    id: "c00",
    folder: "C_AI_Tools",
    label: "AI Tool",
    icon: "zap",
    description: "대화형 AI부터 영상·오디오·자동화까지, 카테고리별 AI 툴을 정리합니다.",
    items: [
      { id: "c00", title: "AI Tool Intro", meta: "C00", hue: 25,
        skipGenerate: true,
        body: "AI Native World의 12가지 AI Tool과 6가지 모달리티(대화·리서치·이미지·코드·영상·오디오) 소개." },
      { id: "c01a", title: "대화채팅 (Chat_AI_Tools) 소개", meta: "C01a", hue: 25,
        skipGenerate: true,
        body: "대화채팅 툴들 소개(Chat_AI_Tools_Full_Comparison" },
      { id: "c01b", title: "대화채팅 (ChatGPT, Claude, Gemini 비교)", meta: "C01b", hue: 25,
        skipGenerate: true,
        body: "주요 대화채팅(ChatGPT, Claude, Gemini)에 대한 비교" },
      { id: "c01c", title: "Claude Intro", meta: "C01c", hue: 25,
        skipGenerate: true,
        body: "Claude 입문을 위한 기본 가이드" },
      { id: "c01d", title: "Claude-artifacts-manual", meta: "C01d", hue: 25,
        skipGenerate: true,
        body: "Claude 아티팩트 소개 자료" },
      { id: "c02a", title: "리서치 AI Tool (NotebookLM_2.0) 소개", meta: "C02a", hue: 25,
        skipGenerate: true,
        body: "NotebookLM 2.0에서 달라진 7가지 소개" },
      { id: "c02b", title: "리서치 AI Tool(Perplexity)", meta: "C02b", hue: 25,
        skipGenerate: true,
        body: "Perplexity에 대한 소개" },
      { id: "c02c", title: "리서치 (NotebookLM vs Perplexity 비교)", meta: "C02c", hue: 25,
        skipGenerate: true,
        body: "리서치 Tool(NotebookLM, Perplexity)에 대한 비교 입니다." },
      { id: "c03a", title: "이미지 디자인 (Claude Design) 특장점 소개", meta: "C03a", hue: 25,
        skipGenerate: true,
        body: "이미지 디자인(Claude Design) 특장점 소개 내용입니다" },
      { id: "c03b", title: "이미지 디자인 (Nano Banana) 특장점 소개", meta: "C03b", hue: 25,
        skipGenerate: true,
        body: "이미지 디자인(Nano Banana)에 대한 특장점 소개 내용입니다." },
      { id: "c03c", title: "이미지 디자인 (Claude Design, Nano Banana) 비교", meta: "C03c", hue: 25,
        skipGenerate: true,
        body: "이미지 디자인(Claude Design, Nano Banana)에 대한 비교 내용입니다." },
      { id: "c04", title: "코드 빌드 (Claude Code, Replit, Cursor)", meta: "C04", hue: 25,
        body: "코드 빌드(Claude Code, Replit, Cursor)에 대한 내용을 준비 중입니다." },
      { id: "c05", title: "영상 (Higgsfield, CapCut)", meta: "C05", hue: 25,
        body: "영상(Higgsfield, CapCut)에 대한 내용을 준비 중입니다." },
      { id: "c06", title: "오디오 보이스 (Suno, ElevenLabs)", meta: "C06", hue: 25,
        body: "오디오 보이스(Suno, ElevenLabs)에 대한 내용을 준비 중입니다." },
      { id: "c07", title: "자동화 에이전트 (n8n, Zapier, Make)", meta: "C07", hue: 25,
        body: "자동화 에이전트(n8n, Zapier, Make)에 대한 내용을 준비 중입니다." },
      { id: "c08", title: "문서 생산성 (Notion AI, Obsidian)", meta: "C08", hue: 25,
        body: "문서 생산성(Notion AI, Obsidian)에 대한 내용을 준비 중입니다." },
    ],
  },

 // ── D00 ────────────────────────────────────────────────────────────
  {
    id: "d00",
    folder: "D_AI활용",
    label: "AI활용",
    icon: "layers",
    description: "위키, 그래프, 바이브코딩 등 AI를 실제로 활용하는 방법과 서비스를 정리합니다.",
    items: [
      { id: "d01a", title: "LLM-Wiki Architecture", meta: "D01a", hue: 160,
        body: "LLM-Wiki에 대한 내용 입니다." },
      { id: "d01b", title: "LLM-Wiki Approach", meta: "D01b", hue: 160,
        body: "LLM-Wiki에 대한 내용 입니다." },
      { id: "d01c", title: "LLM-Wiki Intro", meta: "D01c", hue: 160,
        body: "LLM-Wiki에 대한 내용 입니다." },
      { id: "d01d", title: "LLM-Wiki with Obsidian", meta: "D01d", hue: 160,
        body: "LLM-Wiki에 대한 내용 입니다." },
      { id: "d02", title: "Graphify-Intro", meta: "D02", hue: 160,
        body: "Graphify에 대한 소개 내용 입니다." },
      { id: "d03a", title: "Graphify Blueprint", meta: "D03a", hue: 160,
        body: "Graphify 청사진에 대해 소개합니다." },
      { id: "d03b", title: "LLM Wiki + Graphify", meta: "D03b", hue: 160,
        body: "LLM Wiki + Graphify에 대한 내용 입니다." },
      { id: "d04", title: "2nd Brain", meta: "D04", hue: 160,
        body: "2nd Brain에 대한 내용 입니다." },
      { id: "d05", title: "LLM-Wiki + NotebookLM", meta: "D05", hue: 160,
        body: "LLM-Wiki + NotebookLM에 대한 내용 입니다." },
      { id: "d06a", title: "바이브코딩 PRD 가이드", meta: "D06a", hue: 160,
        body: "바이브코딩에 대한 내용을 준비 중입니다." },
      { id: "d06b", title: "바이브코딩 2026 트랜드", meta: "D06b", hue: 160,
        body: "바이브코딩에 대한 내용을 준비 중입니다." },
      { id: "d07", title: "Gemini+Playwright", meta: "D07", hue: 160,
        body: "Gemini + Playwright에 대한 내용 입니다." },
    ],
  },

  // ── E00 ────────────────────────────────────────────────────────────
  {
    id: "e00",
    folder: "E_뉴스_타임라인",
    label: "뉴스 타임라인",
    icon: "rss",
    description: "AI 트렌드, 로보틱스, 소형 언어모델 등 최신 동향을 시간순으로 기록합니다.",
    items: [
      { id: "e01", title: "AI시대 생존전략", meta: "E01", hue: 5,
        body: "AI시대를 주도하는 실리콘밸리 엔지니어의 생존공식" },
      { id: "e02", title: "Karpathy LLM", meta: "E04", hue: 5,
        body: "Andrej Karpathy가 제안한 \"LLM을 활용한 개인 지식 베이스 구축 패턴\"입니다." },
      { id: "e03", title: "AI로보틱스", meta: "E03", hue: 5,
        body: "AI로보틱스에 대한 내용을 준비 중입니다." },
      { id: "e04", title: "소형언어모델", meta: "E04", hue: 5,
        body: "소형언어모델에 대한 내용을 준비 중입니다." },
      { id: "e05", title: "Langfuse-guide", meta: "E05", hue: 5,
        body: "Langfuse 설치 및 사용 가이드 (Docker 기반)" },
      { id: "e06", title: "LangChain vs Pure Python", meta: "E06", hue: 5,
        body: " LLM Fallback 메커니즘 완벽 가이드 (LangChain vs Pure Python)." },
      { id: "e07", title: "Speed-Metrics-Guide", meta: "E07", hue: 5,
        body: "LLM 속도 파헤쳐보기 (TTFT, TPOT, Throughput 개념)." },
      { id: "e08", title: "GPU-Monitoring-Guide", meta: "E08", hue: 5,
        body: "NVIDIA GPU 모니터링 완벽 가이드 (정의, 구성요소, 실습)." },
      { id: "e09", title: "Server-ops-guide", meta: "E09", hue: 5,
        body: "개발자를 위한 AI 서버 관리 꿀팁 A to Z (screen, git, Postman)." },
    ],
  },

  // ── H00 ────────────────────────────────────────────────────────────
  {
    id: "h00",
    folder: "H_데이터베이스",
    label: "데이터베이스",
    icon: "database",
    description: "데이터베이스 대한 정보를 제공합니다.",
    items: [
      { id: "h01a", title: "DB-Types-Guide", meta: "H01a", hue: 265,
        body: "개발자의 기본기, 데이터베이스(DB)란 무엇인가." },
      { id: "h01b", title: "Elastic-Search-Guide", meta: "H01b", hue: 265,
        body: "Elastic Search (엘라스틱 서치)란 무엇인가." },
      { id: "h01c", title: "Metadata-Guide", meta: "H01c", hue: 265,
        body: "Metadata(메타데이터)에 대해 자세히 알아보자." },
      { id: "h01d", title: "Qdrant-Guide", meta: "H01d", hue: 265,
        body: " Qdrant란 무엇인가" },
      { id: "h02", title: "Supabase-Guide", meta: "H02", hue: 265,
        body: "초보_개발자용_데이터베이스_시작_가이드- Supabase" },
    ],
  },

  // ── I00 ────────────────────────────────────────────────────────────
  {
    id: "i00",
    folder: "I_ML_DL",
    label: "ML/DL",
    icon: "cpu",
    description: "머신러닝/딥러닝 관련 기술 자료를 정리합니다.",
    items: [
      { id: "i01", title: "Deep-learning-guide", meta: "I01", hue: 320,
        body: "딥러닝(Deep Learning)이란 무엇일까." },
      { id: "i02", title: "ANN-guide", meta: "I02", hue: 320,
        body: "ANN (인공신경망) 완벽 가이드." },
      { id: "i03", title: "CNN-guide", meta: "I03", hue: 320,
        body: "CNN (합성곱 신경망) 완벽 가이드" },
      { id: "i04", title: "RNN-guide", meta: "I04", hue: 320,
        body: "RNN (순환 신경망) 완벽 가이드." },
      { id: "i05", title: "Transformer-Guide", meta: "I05", hue: 320,
        body: "Transformers (트랜스포머) 완벽 가이드." },
      { id: "i06", title: "Logistic-Regression-Guide", meta: "I06", hue: 320,
        body: "로지스틱 회귀 (Logistic Regression) 완벽 가이드." },
      { id: "i07", title: "KNN-guide", meta: "I07", hue: 320,
        body: "KNN (K-Nearest Neighbors) 완벽 가이드." },
      { id: "i08", title: "Naive-Bayes-Guide", meta: "I08", hue: 320,
        body: "나이브 베이즈 (Naive Bayes) 완벽 가이드." },
      { id: "i09", title: "Svm-guide", meta: "I09", hue: 320,
        body: "SVM (Support Vector Machine) 완벽 가이드." },
      { id: "i10", title: "Decision-tree-guide", meta: "I10", hue: 320,
        body: "의사결정 나무 (Decision Tree) 완벽 가이드." },
      { id: "i11", title: "feature-engineering-guide", meta: "I11", hue: 320,
        body: "Feature Engineering이란?" },
      { id: "i12", title: "Random-forest-guide", meta: "I12", hue: 320,
        body: "랜덤 포레스트(Random Forest) 완벽 가이드." },
      { id: "i13", title: "Gradient-boosting-guide", meta: "I13", hue: 320,
        body: "Gradient Boosting(GBM) 완벽 가이드." },
      { id: "i14", title: "XGBoost-guide", meta: "I14", hue: 320,
        body: "XGBoost (eXtreme Gradient Boosting) 완벽 가이드" },
      { id: "i15", title: "Lightgbm-guide", meta: "I15", hue: 320,
        body: "LightGBM 완벽 가이드." },
      { id: "i16", title: "Catboost-guide", meta: "I16", hue: 320,
        body: "CatBoost 완벽 가이드." }, 
      { id: "i17", title: "Machine-learning-guide", meta: "I17", hue: 320,
        body: "머신러닝(Machine Learning)이란 무엇일까 ." },
      { id: "i18", title: "Supervised-learning-guide", meta: "I18", hue: 320,
        body: "지도 학습(Supervised Learning) 파헤쳐 보기." },
      { id: "i19", title: "Unsupervised-learning-guide", meta: "I19", hue: 320,
        body: "비지도 학습(Unsupervised Learning) 파헤쳐 보기." },
      { id: "i20", title: "Semi-supervised-learning-guide", meta: "I20", hue: 320,
        body: "준지도 학습 (Semi-Supervised Learning) 파헤쳐 보기." },
      { id: "i21", title: "Reinforcement-learning-guide", meta: "I21", hue: 320,
        body: "강화 학습(Reinforcement Learning) 파헤쳐보기." },
      { id: "i22", title: "YOLO-Guide", meta: "I22", hue: 320,
        body: "YOLO (You Only Look Once) 완벽 가이드." },
      { id: "i23", title: "Data-labeling-guide", meta: "I23", hue: 320,
        body: "데이터 라벨링(Data Labeling)이란 무엇인가." },
      { id: "i24", title: "Hyperparameter-guide", meta: "I24", hue: 320,
        body: "하이퍼파라미터(Hyperparameter) 종류에 대해 자세히 알아보자!" },
      { id: "i25", title: "Hyperparameter-Tuning-Guide", meta: "I25", hue: 320,
        body: "하이퍼파라미터 튜닝(Hyperparameter Tuning) 완벽 가이드." },
      { id: "i26", title: "Python-pickle-guide", meta: "I26", hue: 320,
        body: "Python Pickle이란 무엇일까." },
    ],
  },
  
// ── P00 ────────────────────────────────────────────────────────────
  {
    id: "p00",
    folder: "P_IT_Tips",
    label: "IT_Tips",
    icon: "book-open",
    description: "IT관련 전반적인 학습 자료를 모읍니다.",
    items: [
      { id: "p01", title: "Ax-guide", meta: "P01", hue: 275,
        body: "AX (AI Transformation)란 무엇인가." },
      { id: "p02", title: "Markitdown-guide", meta: "P02", hue: 275,
        body: "MarkItDown이란 무엇인가." },
      { id: "p03", title: "GPU-CPU-TPU-NPU", meta: "P03", hue: 275,
        body: "GPU, CPU, TPU, NPU 완벽 비교." },
      { id: "p04", title: "VScode-shortcuts-guide", meta: "P04", hue: 275,
        body: "VS Code 자주 쓰는 유용한 단축키 모음." },
      { id: "p05", title: "MVP-PoC-Prototype-Pilot", meta: "P05", hue: 275,
        body: "MVP, PoC, Prototype, Pilot 완벽 비교 및 차이점 총정리." },
      { id: "p06", title: "NAS-guide", meta: "P06", hue: 275,
        body: "NAS(Network Attached Storage)에 대해 자세히 알아보자!." },
      { id: "p07", title: "Nested-structure-guide", meta: "P07", hue: 275,
        body: "Nested(중첩) 구조 완벽 가이드." },
      { id: "p08", title: "npm-npx-yarn-guide", meta: "P08", hue: 275,
        body: "npm, npx, yarn 완벽 가이드." },
      { id: "p09", title: "Im-nobsidian-guide", meta: "P09", hue: 275,
        body: "Obsidian ↔ Notion 양방향 동기화 오픈소스 (Im-Nobsidian) 소개." },
      { id: "p10", title: "RSS-guide", meta: "P10", hue: 275,
        body: "RSS에 대해 자세히 알아보자!." },
      { id: "p11", title: "RTK-guide", meta: "P11", hue: 275,
        body: "RTK (Rust Token Killer) 완벽 가이드." },
      { id: "p12", title: "SDK-guide", meta: "P12", hue: 275,
        body: "SDK(Software Development Kit)에 대해 자세히 알아보자!." },
      { id: "p13", title: "Stack-overflow-error-guide", meta: "P13", hue: 275,
        body: "Stack Overflow(스택 오버플로우)란 무엇일까." },
      { id: "p14", title: "SVN-guide", meta: "P14", hue: 275,
        body: "SVN(Subversion) 완벽 가이드." },
      { id: "p15", title: "Verification-validation-guide", meta: "P15", hue: 275,
        body: "Verification(검증)과 Validation(확인타당성 검증)의 차이 완벽 정리." },
      { id: "p16", title: "Vibe-coding-intro-guide", meta: "P16", hue: 275,
        body: "Vibe Coding(바이브 코딩)에 대해 자세히 알아보자!." },
      { id: "p17", title: "Sync-async-serial-parallel-guide", meta: "P17", hue: 275,
        body: "동기비동기 & 직렬병렬 완벽 가이드." },
      { id: "p18", title: "UI-types-guide", meta: "P18", hue: 275,
        body: "사용자 인터페이스(UI)의 모든 것." },
      { id: "p19", title: "NOTION-forge-guide", meta: "P19", hue: 275,
        body: "채팅으로 맞춤형 Notion Template 자동 제작 AI Agent 소개." },
    ],
  },
  
// ── Q00 ────────────────────────────────────────────────────────────
  {
    id: "q00",
    folder: "Q_HTTP외",
    label: "HTTP외",
    icon: "message-circle",
    description: "HTTP 외 전반적인 프로토콜 학습 자료를 모읍니다.",
    items: [
      { id: "q01", title: "Api-basic-guide", meta: "Q01", hue: 275,
        body: "API란 무엇일까." },
      { id: "q02", title: "Api-operations-guide", meta: "Q02", hue: 275,
        body: "API 운영 가이드." },
      { id: "q03", title: "Communication-stack-guide", meta: "Q03", hue: 275,
        body: "API, 프로토콜, 소켓, JSON, gRPC 통신 스택 총정리" },
      { id: "q04", title: "Beautiful-soup-guide", meta: "Q04", hue: 275,
        body: "Beautiful Soup에 대해 자세히 알아보자!" },
      { id: "q05", title: "Http-status-5xx-3xx-guide", meta: "Q05", hue: 275,
        body: "HTTP 상태 코드 - _서버 오류_와 _리다이렉션_ (5xx, 3xx)" },
      { id: "q06", title: "Http-status-4xx-guide", meta: "Q06", hue: 275,
        body: "HTTP 상태 코드 - _클라이언트 오류_ (4xx)" },
      { id: "q07", title: "Jwt-secret-key-guide", meta: "Q07", hue: 275,
        body: "JWT(JSON Web Token), Secret Key(시크릿 키) 완벽 가이드" },
      { id: "q08", title: "Prometheus-guide", meta: "Q08", hue: 275,
        body: "Prometheus(프로메테우스)에 대해 자세히 알아보자!" },
      { id: "q09", title: "Vite-guide", meta: "Q09", hue: 275,
        body: " Vite(비트)에 대해 자세히 알아보자!" },
      { id: "q10", title: "Nodejs-role-guide", meta: "Q10", hue: 275,
        body: "NodeJS의 기능 및 역활에 대해 알아봅니다." },
    ],
  },

  // ── R00 ────────────────────────────────────────────────────────────
  {
    id: "r00",
    folder: "R_Python",
    label: "Python",
    icon: "code",
    description: "Python Tool에 대해 심화 학습 자료를 모읍니다.",
    items: [
      { id: "r01", title: "uv 실전 가이드", meta: "R01", hue: 275,
        body: "uv 실전 가이드 — 프로젝트, 가상환경, 의존성 관리." },
      { id: "r02", title: "venv, Conda, 그리고 uv", meta: "R02", hue: 275,
        body: "venv, Conda, 그리고 uv." },
      { id: "r03", title: "venv 사용하는 법", meta: "R03", hue: 275,
        body: "파이썬 가상환경(venv) 사용하는 법." },
      { id: "r04", title: "Json-Repair", meta: "R04", hue: 275,
        body: "Json-Repair - AI 시대의 망가진 JSON 자동 복구 라이브러리." },
      { id: "r05", title: "pydantic이란 무엇인가", meta: "R05", hue: 275,
        body: "pydantic이란 무엇인가." },
      { id: "r06", title: "python Poetry", meta: "R06", hue: 275,
        body: "python Poetry에 대해 자세히 알아보자! ." },
      { id: "r07", title: "Mutex vs Semaphore", meta: "R07", hue: 275,
        body: "뮤텍스(Mutex) vs 세마포어(Semaphore) 완벽 정리." },
      { id: "r08", title: "On-Device AI", meta: "R08", hue: 275,
        body: "온디바이스 AI(On-Device AI)에 대해 자세히 알아보자!." },
    ],
  },

   // ── S00 ────────────────────────────────────────────────────────────
  {
    id: "s00",
    folder: "S_Linux",
    label: "Linux",
    icon: "edit-3",
    description: "Linux에 대해 이해하는 자료를 모읍니다.",
    items: [
      { id: "s01", title: "리눅스 관리자의 기본", meta: "S01", hue: 275,
        body: "리눅스 관리자의 기본." },
      { id: "s02", title: "리눅스 네트워크와 원격 접속", meta: "S02", hue: 275,
        body: "리눅스 네트워크와 원격 접속." },
      { id: "s03", title: "리눅스 명령어", meta: "S03", hue: 275,
        body: "리눅스 명령어." },
      { id: "s04", title: "시스템 정보 및 프로세스 관리", meta: "S04", hue: 275,
        body: "리눅스 시스템 정보 및 프로세스 관리." },
      { id: "s05", title: "리눅스 활용 꿀팁", meta: "S05", hue: 275,
        body: "리눅스 활용 꿀팁." },
      { id: "s06", title: "screen 사용법 A to Z", meta: "S06", hue: 275,
        body: "Screen 사용법 A to Z 정의." },
      { id: "s07", title: "우분투 구글드라이브 연동", meta: "S07", hue: 275,
        body: "우분투(Ubuntu)에서 구글 드라이브 연동 및 사용 완벽 가이드." },
    ],
  },
  
  // ── T00 ────────────────────────────────────────────────────────────
  {
    id: "t00",
    folder: "T_Git_and_Github",
    label: "Git_and_Github",
    icon: "terminal",
    description: "Python, Linux, Git, Node.js 등 개발/인프라 기초 기술을 정리합니다.",
    items: [
      { id: "t01", title: "CI/CD 완벽 정복 가이드", meta: "T01", hue: 230,
        body: "[Git] CICD(지속적 통합지속적 배포) 완벽 정복 가이드." },
      { id: "t02", title: "Git Flow vs GitHub Flow", meta: "T02", hue: 230,
        body: "[Git] Git Flow vs GitHub Flow 완전 비교 가이드." },
      { id: "t03", title: "GitHub Actions 완벽 정복", meta: "T03", hue: 230,
        body: "[Git] GitHub Actions 완벽 정복 가이드 코드 푸시부터 자동 배포까지 한 번에." },
      { id: "t04", title: "PR부터 Merge까지", meta: "T04", hue: 230,
        body: "[Git] GitHub Pull Request부터 Merge까지 코드 리뷰의 모든 것." },
      { id: "t05", title: "대용량 파일 업로드 (Git LFS)", meta: "T05", hue: 230,
        body: "[Git] GitHub 100MB 이상 대용량 파일 업로드 완벽 가이드." },
      { id: "t06", title: "GitLab Merge Request", meta: "T06", hue: 230,
        body: "[Git] GitLab Merge Request 완벽 가이드." },
      { id: "t07", title: "로그인 계정 확인 및 변경", meta: "T07", hue: 230,
        body: "[GitHub] 로그인 계정 확인 및 변경 방법." },
      { id: "t08", title: "원격 저장소 연결 (git remote)", meta: "T08", hue: 230,
        body: "Github] 원격 저장소 연결 및 관리 (git remote)." },
      { id: "t09", title: "Git 브랜치 핵심 가이드", meta: "T09", hue: 230,
        body: "[GitHub] Git 브랜치(Branch) 핵심 가이드." },
      { id: "t10", title: "GitHub Copilot SDK", meta: "T10", hue: 230,
        body: "[AIGit] GitHub Copilot SDK 완전 정복 가이드." },
    ],
  },

  // ── U00 ────────────────────────────────────────────────────────────
  {
    id: "u00",
    folder: "U_학습자료",
    label: "학습자료",
    icon: "plus",
    description: "온프레미스/온디바이스 LLM, 추론, 자연어처리 등 심화 학습 자료를 모읍니다.",
    items: [
      { id: "u01", title: "On-Premise LLM", meta: "U01", hue: 275,
        body: "On-Premise LLM에 대한 내용을 준비 중입니다." },
      { id: "u02", title: "OnDeviceAI", meta: "U02", hue: 275,
        body: "OnDeviceAI에 대한 내용을 준비 중입니다." },
      { id: "u04", title: "Inference / Reasoning", meta: "U04", hue: 275,
        body: "Inference / Reasoning에 대한 내용을 준비 중입니다." },
      { id: "u05", title: "자연어이해", meta: "U05", hue: 275,
        body: "자연어이해에 대한 내용을 준비 중입니다." },
      { id: "u06", title: "NLP", meta: "U06", hue: 275,
        body: "NLP에 대한 내용을 준비 중입니다." },
    ],
  },
  
  // ── V00 ────────────────────────────────────────────────────────────
  {
    id: "v00",
    folder: "V_북마크_즐겨찾기",
    label: "북마크 · 즐겨찾기",
    icon: "bookmark",
    description: "나중에 다시 볼 만한 링크·아티클과, 자주 찾는 고정 항목을 함께 모아둡니다.",
    items: [
      { id: "bm-1", title: "디자인 레퍼런스 모음", meta: "링크 12개", hue: 340,
        body: "UI/UX 작업 시 참고하는 웹사이트와 갤러리 링크 모음입니다.\n\n주기적으로 새 레퍼런스를 추가하고 있습니다." },
      { id: "bm-2", title: "개발자 블로그 모음", meta: "링크 8개", hue: 340,
        body: "팀에서 자주 참고하는 기술 블로그 목록입니다.\n\n프론트엔드, 백엔드, 인프라 카테고리로 분류되어 있습니다." },
      { id: "bm-3", title: "뉴스레터 아카이브", meta: "이슈 20개", hue: 340,
        body: "구독 중인 업계 뉴스레터 중 다시 보고 싶은 이슈를 모아둔 아카이브입니다." },
      { id: "bm-4", title: "툴 비교 아티클", meta: "링크 6개", hue: 340,
        body: "생산성 도구, 협업 툴을 비교 분석한 아티클 모음입니다.\n\n툴 도입을 검토할 때 참고합니다." },
      { id: "bm-5", title: "자주 쓰는 템플릿", meta: "고정됨", hue: 45,
        body: "매번 새로 만들지 않고 재사용하는 문서/기획 템플릿 모음입니다." },
      { id: "bm-6", title: "핵심 대시보드 링크", meta: "고정됨", hue: 45,
        body: "업무에 자주 쓰는 대시보드 바로가기 링크 모음입니다." },
      { id: "bm-7", title: "즐겨 찾는 문서", meta: "고정됨", hue: 45,
        body: "가장 자주 열어보는 문서 모음입니다." },
      { id: "bm-8", title: "자주 쓰는 도구", meta: "고정됨", hue: 45,
        body: "업무에서 매일 사용하는 도구와 바로가기 목록입니다." },
    ],
  },
];

// Node/CommonJS export (used by generate_items.js).
if (typeof module !== "undefined") {
  module.exports = { CATEGORIES, PORTAL_TOOLS };
}
