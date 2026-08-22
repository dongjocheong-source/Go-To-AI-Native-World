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
    icon: "file-text",
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
      { id: "b09", title: "영상관련", meta: "B09", hue: 205,
        body: "영상 관련한 기술들에 대한 내용입니다." },
      { id: "b10a", title: "온톨로지(Ontology)란 무엇인가", meta: "B10a", hue: 205,
        body: "온톨로지 관련 기술에 대한 내용입니다." },
      { id: "b10b", title: "온톨로지(Ontology) 프로젝트 분석", meta: "B10b", hue: 205,
        body: "온톨로지(Ontology) 프로젝트 분석" },
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
      { id: "c01a", title: "대화채팅 (Chat_AI_Tools) 소개", meta: "C01a", hue: 25,
        skipGenerate: true,
        body: "대화채팅 툴들 소개(Chat_AI_Tools_Full_Comparison" },
      { id: "c01b", title: "대화채팅 (ChatGPT, Claude, Gemini 비교)", meta: "C01b", hue: 25,
        skipGenerate: true,
        body: "주요 대화채팅(ChatGPT, Claude, Gemini)에 대한 비교" },
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
      { id: "c06", title: "오디오 보이스 (Suno, ElevenLabs)", meta: "c06", hue: 25,
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
    folder: "D_학습자료",
    label: "학습자료",
    icon: "book-open",
    description: "온프레미스/온디바이스 LLM, 추론, 자연어처리 등 심화 학습 자료를 모읍니다.",
    items: [
      { id: "d01", title: "On-Premise LLM", meta: "D01", hue: 275,
        body: "On-Premise LLM에 대한 내용을 준비 중입니다." },
      { id: "d02", title: "OnDeviceAI", meta: "D02", hue: 275,
        body: "OnDeviceAI에 대한 내용을 준비 중입니다." },
      { id: "d04", title: "Inference / Reasoning", meta: "D04", hue: 275,
        body: "Inference / Reasoning에 대한 내용을 준비 중입니다." },
      { id: "d05", title: "자연어이해", meta: "D05", hue: 275,
        body: "자연어이해에 대한 내용을 준비 중입니다." },
      { id: "d06", title: "NLP", meta: "D06", hue: 275,
        body: "NLP에 대한 내용을 준비 중입니다." },
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
        body: "Andrej Karpathy가 제안한 "LLM을 활용한 개인 지식 베이스 구축 패턴"입니다." },
      { id: "e03", title: "AI로보틱스", meta: "E03", hue: 5,
        body: "AI로보틱스에 대한 내용을 준비 중입니다." },
      { id: "e04", title: "소형언어모델", meta: "E04", hue: 5,
        body: "소형언어모델에 대한 내용을 준비 중입니다." },

    ],
  },

  // ── F00 ────────────────────────────────────────────────────────────
  {
    id: "f00",
    folder: "F_AI활용",
    label: "AI활용",
    icon: "layers",
    description: "위키, 그래프, 바이브코딩 등 AI를 실제로 활용하는 방법과 서비스를 정리합니다.",
    items: [
      { id: "f01", title: "LLM-Wiki", meta: "F01", hue: 160,
        body: "LLM-Wiki에 대한 내용 입니다." },
      { id: "f02", title: "Graphify", meta: "F02", hue: 160,
        body: "Graphify에 대한 내용 입니다." },
      { id: "f03", title: "LLM Wiki + Graphify", meta: "F03", hue: 160,
        body: "LLM Wiki + Graphify에 대한 내용 입니다." },
      { id: "f04", title: "LLM-Wiki + NotebookLM", meta: "F04", hue: 160,
        body: "LLM-Wiki + NotebookLM에 대한 내용 입니다." },
      { id: "f05", title: "바이브코딩", meta: "F05", hue: 160,
        body: "바이브코딩에 대한 내용을 준비 중입니다." },
      { id: "f06", title: "2nd Brain", meta: "F06", hue: 160,
        body: "2nd Brain에 대한 내용 입니다." },
      { id: "f10", title: "Services", meta: "F10", hue: 160,
        body: "Services에 대한 내용 입니다." },
    ],
  },
  
  // ── G00 ────────────────────────────────────────────────────────────
  {
    id: "g00",
    folder: "G_프로젝트",
    label: "프로젝트",
    icon: "folder",
    description: "MyWiki, GoToAiNative 등 진행 중인 개인 프로젝트를 관리합니다.",
    items: [
      { id: "g01", title: "MyWiki프로젝트", meta: "G01", hue: 265,
        body: "MyWiki프로젝트에 대한 내용을 준비 중입니다." },
      { id: "g02", title: "GoToAiNative", meta: "G02", hue: 265,
        body: "GoToAiNative에 대한 내용을 준비 중입니다." },
      { id: "g03", title: "주식프로젝트", meta: "G03", hue: 265,
        body: "과거 History 및 패턴 분석을 통한 주식 매매 프로그램 입니다." },
      { id: "g04", title: "영상프로젝트", meta: "G04", hue: 265,
        body: "영상프로젝트에 대한 내용 입니다." },
    ],
  },


  // ── H00 ────────────────────────────────────────────────────────────
  {
    id: "h00",
    folder: "H_데이터베이스",
    label: "데이터베이스",
    icon: "database",
    description: "접속 링크 : https://drive.google.com/drive/u/0/folders/1qtim-BXkK_R6MPnpdo_20HYl2BmAKomt",
  },

  // ── I00 ────────────────────────────────────────────────────────────
  {
    id: "i00",
    folder: "I_ML_DL",
    label: "ML/DL",
    icon: "cpu",
    description: "머신러닝/딥러닝 관련 기술 자료를 정리합니다.",
    items: [
      { id: "i01", title: "HIJ기술", meta: "I01", hue: 320,
        body: "HIJ기술에 대한 내용을 준비 중입니다." },
      { id: "i02", title: "KLM기술", meta: "I02", hue: 320,
        body: "KLM기술에 대한 내용을 준비 중입니다." },
    ],
  },

  // ── S00 ────────────────────────────────────────────────────────────
  {
    id: "s00",
    folder: "S_노트",
    label: "노트",
    icon: "edit-3",
    description: "짧은 메모와 생각을 빠르게 기록합니다.",
    items: [
      { id: "s01", title: "프롬프팅", meta: "오늘", hue: 40,
        body: "프롬프팅 관련한 예제들을 모아 놓았습니다." },
      { id: "s02", title: "Skill References", meta: "1주 전", hue: 40,
        body: "유용한 Skill들과 MCP 들에 대한 정보 제공 용도 입니다." },
      { id: "s03", title: "Skill 활용", meta: "1주 전", hue: 40,
        body: "유용한 Skill들 및 설명을 제공하기 위한 용도 입니다." },
      { id: "s04", title: "MCP 활용", meta: "1주 전", hue: 40,
        body: "유용한 MCP들 및 설명을 제공하기 위한 용도 입니다." },
      { id: "s05", title: "컨넥터 활용", meta: "1주 전", hue: 40,
        body: "유용한 컨넥터들 및 설명을 제공하기 위한 용도 입니다." },
      { id: "s06", title: "디자인 노트", meta: "어제", hue: 40,
        body: "디자인 관련하여 정보들을 모아놓았습니다." },
      { id: "s07", title: "영상_미디어", meta: "어제", hue: 40,
        body: "디자인 관련하여 정보들을 모아놓았습니다." },
      { id: "s08", title: "Claude 활용", meta: "오늘", hue: 40,
        body: "Claude의 활용 방법에 대한 정보들을 모아놓았습니다." },
      { id: "s10", title: "아이디어 스케치", meta: "오늘", hue: 40,
        body: "떠오르는 대로 적어둔 초기 아이디어 메모입니다." },
      { id: "s11", title: "기타 참고 사이트", meta: "어제", hue: 40,
        body: "기타 참고할만한 사이트들에 대한 정보들을 모아놓았습니다." },
    ],
  },
  
  // ── T00 ────────────────────────────────────────────────────────────
  {
    id: "t00",
    folder: "T_IT기술",
    label: "IT기술",
    icon: "terminal",
    description: "Python, Linux, Git, Node.js 등 개발/인프라 기초 기술을 정리합니다.",
    items: [
      { id: "t01", title: "IT", meta: "T01", hue: 230,
        body: "IT에 대한 내용을 준비 중입니다." },
      { id: "t02", title: "HTTP 외", meta: "T02", hue: 230,
        body: "HTTP 외에 대한 내용을 준비 중입니다." },
      { id: "t03", title: "Python", meta: "T03", hue: 230,
        body: "Python에 대한 내용을 준비 중입니다." },
      { id: "t04", title: "Linux", meta: "T04", hue: 230,
        body: "Linux에 대한 내용을 준비 중입니다." },
      { id: "t05", title: "Git / GitHub", meta: "T05", hue: 230,
        body: "Git / GitHub에 대한 내용을 준비 중입니다." },
      { id: "t06", title: "NodeJS", meta: "T06", hue: 230,
        body: "NodeJS에 대한 내용을 준비 중입니다." },
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
