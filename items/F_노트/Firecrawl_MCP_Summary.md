# Firecrawl MCP 정리

> 조사 기준: 2026-08-26 / Firecrawl 공식 문서 및 공식 GitHub

## 1) 목적

**Firecrawl MCP Server**는 MCP(Model Context Protocol)를 지원하는 AI Agent가 **실시간 웹을 검색하고, 웹페이지를 수집·정제하며, 여러 페이지를 탐색하고, 필요한 데이터를 구조화하여 활용할 수 있게 하는 MCP 서버**입니다.

쉽게 말하면 AI에게 **웹 리서치 및 웹 데이터 수집 능력**을 제공합니다.

```text
사용자
  │ 자연어 요청
  ▼
AI Agent / LLM
  │ MCP
  ▼
Firecrawl MCP Server
  │
  ▼
Firecrawl
  ├─ Search
  ├─ Scrape / Parse
  ├─ Map
  ├─ Crawl
  ├─ Extract
  ├─ Interact
  └─ Agent / Research
  │
  ▼
Live Web
```

### 대표 활용

- 최신 웹 정보 검색 및 리서치
- 특정 URL의 본문 추출
- 웹사이트 전체/여러 페이지 수집
- 웹사이트 URL 구조 파악
- Markdown/JSON 등 LLM 친화적 데이터 생성
- 경쟁사 및 시장 조사
- RAG/Knowledge Base용 웹 데이터 수집
- 동적 웹페이지와 상호작용
- 여러 출처를 활용한 Deep Research

**핵심 역할:** `Live Web → Clean, Agent-ready Context`

---

## 2) 특장점

### 2.1 AI/LLM에 적합한 웹 데이터로 변환

일반 웹페이지에는 메뉴, 광고, 헤더, 푸터 등 AI 분석에 불필요한 정보가 많습니다. Firecrawl은 웹 콘텐츠를 가져와 **정제된 Markdown 또는 구조화된 JSON**으로 제공할 수 있습니다.

```text
Web Page
   │
   ├─ Navigation / Ads
   ├─ Header / Footer
   ├─ JavaScript
   └─ Main Content
           │
           ▼
       Firecrawl
           │
           ▼
Clean Markdown / Structured JSON
           │
           ▼
        AI Agent
```

### 2.2 웹 정보 수집의 여러 단계를 하나의 MCP에서 제공

| 기능 | 주요 용도 |
|---|---|
| **Search** | 웹에서 관련 자료/페이지 검색 |
| **Scrape** | 알고 있는 특정 URL의 콘텐츠 추출 |
| **Parse** | PDF/문서 등을 사용 가능한 텍스트로 변환 |
| **Map** | 사이트 내부 URL 구조 탐색 |
| **Crawl** | 사이트의 여러 페이지를 순회하며 콘텐츠 수집 |
| **Extract** | 필요한 정보를 구조화된 데이터로 추출 |
| **Interact** | 클릭, 스크롤, 입력 등 동적 페이지 조작 |
| **Agent** | 여러 출처를 활용하는 비동기/Deep Research |

예:

```text
Search
  ↓
관련 페이지 발견
  ↓
Map
  ↓
제품/뉴스/문서 URL 파악
  ↓
Scrape / Crawl
  ↓
콘텐츠 수집
  ↓
Extract
  ↓
구조화된 정보
  ↓
AI 분석
```

### 2.3 동적 웹사이트 처리

Firecrawl은 JavaScript가 많은 동적 페이지 등 단순 HTTP 요청으로 콘텐츠 확보가 어려운 사이트를 처리하도록 설계되어 있습니다. 필요한 경우 `Interact` 기능을 통해 클릭, 이동, 입력, 대기 등의 작업도 수행할 수 있습니다.

다만 **복잡한 UI 테스트/E2E 자동화가 목적이면 Playwright MCP가 더 적합**하고, Firecrawl은 웹 콘텐츠 검색·수집·정제에 더 초점이 있습니다.

### 2.4 여러 페이지/사이트 단위 데이터 수집

Firecrawl은 Documentation 수집, 경쟁사 사이트 분석, Knowledge Base 구축, 시장 리서치, 데이터셋 구축 등 **다수 페이지를 다루는 작업**에 특히 적합합니다.

```text
사이트 조사
   ↓
Map
   ↓
관련 URL 발견
   ↓
Crawl
   ↓
페이지 콘텐츠 수집
   ↓
Clean Context
   ↓
AI 분석
```

### 2.5 Hosted MCP + Local/Open-source MCP

Firecrawl MCP는 **Hosted 서비스**와 **로컬 실행 방식**을 모두 지원합니다.

```text
              Firecrawl MCP
                   │
       ┌───────────┴───────────┐
       ▼                       ▼
  Hosted MCP               Local MCP
       │                       │
Firecrawl 운영             사용자 실행
       │                       │
Remote HTTP               npx / npm
```

### 2.6 Keyless 시작 지원

Hosted MCP 주소:

```text
https://mcp.firecrawl.dev/v2/mcp
```

공식 문서 기준 인증 없이도 **Search, Scrape, Parse**를 제한된 사용량으로 시작할 수 있습니다. 전체 Toolset과 더 높은 사용 한도가 필요하면 OAuth 또는 API Key를 사용하는 것이 권장됩니다.

### 2.7 Search-only Endpoint

검색만 필요한 read-only 환경을 위한 별도 endpoint도 있습니다.

```text
https://mcp.firecrawl.dev/v2/mcp-search
```

이 surface는 검색 중심의 제한된 read-only Toolset을 제공하며 Scrape/Crawl 같은 페이지 콘텐츠 수집 기능은 노출하지 않습니다.

---

## 3) 동작구조

기본 구조:

```text
┌───────────────────────┐
│        User           │
└───────────┬───────────┘
            │ 자연어 요청
            ▼
┌───────────────────────┐
│     AI Agent / LLM    │
└───────────┬───────────┘
            │ MCP Tool Call
            ▼
┌───────────────────────┐
│   Firecrawl MCP       │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│      Firecrawl        │
│ Search / Scrape       │
│ Map / Crawl / Parse   │
│ Extract / Interact    │
│ Agent                 │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│       Live Web        │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│ Clean / Structured    │
│ Web Context           │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│      AI Analysis      │
└───────────────────────┘
```

### 예: 경쟁사 AI 전략 조사

사용자:

```text
"경쟁사 A의 최근 AI 전략을 조사해서
핵심 발표와 제품 전략을 정리해줘."
```

동작 예:

```text
AI Agent
   ↓
Search
   ↓
공식 Newsroom / Product / Blog / 문서 발견
   ↓
Scrape
   ↓
Clean Markdown / JSON
```

사이트 전반의 조사가 필요하면:

```text
Map
 ↓
관련 URL 발견
 ↓
Crawl
 ↓
여러 페이지 콘텐츠 수집
 ↓
Extract
 ↓
구조화된 정보
 ↓
AI 종합 분석
```

핵심 흐름은 다음과 같이 요약할 수 있습니다.

```text
Discover
   ↓
Retrieve
   ↓
Clean / Structure
   ↓
Analyze
```

---

## 4) 설치방법

Firecrawl MCP는 **Hosted MCP 연결 방식**과 **Local `npx` 실행 방식**을 모두 지원합니다.

### 방법 A. Hosted MCP

가장 간단한 방법입니다. MCP Client에 다음 Remote MCP URL을 등록합니다.

```text
https://mcp.firecrawl.dev/v2/mcp
```

인증 없이 제한적으로 시작할 수 있으며, 전체 기능에는 OAuth 또는 Firecrawl API Key를 사용하는 것이 좋습니다.

> 보안상 API Key를 URL에 직접 넣기보다는 최신 공식 문서가 권장하는 OAuth 또는 `Authorization` header 방식을 사용하는 것이 좋습니다.

### 방법 B. Local MCP (`npx`)

#### Step 1. Node.js/npm 확인

```bash
node --version
npm --version
```

#### Step 2. Firecrawl API Key 준비

Firecrawl 계정에서 API Key를 발급받아 환경변수/Secret으로 관리합니다.

```text
FIRECRAWL_API_KEY=fc-...
```

#### Step 3. 실행

macOS/Linux 예:

```bash
env FIRECRAWL_API_KEY=fc-YOUR_API_KEY npx -y firecrawl-mcp
```

전역 설치도 가능합니다.

```bash
npm install -g firecrawl-mcp
```

### 일반적인 stdio MCP 설정 예

```json
{
  "mcpServers": {
    "firecrawl-mcp": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

실제 환경에서는 API Key를 설정 파일에 평문으로 저장하지 않고 Secret/환경변수 입력 기능을 사용하는 것이 권장됩니다.

### VS Code 예

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "apiKey",
      "description": "Firecrawl API Key",
      "password": true
    }
  ],
  "servers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "${input:apiKey}"
      }
    }
  }
}
```

### Cursor 예

```json
{
  "mcpServers": {
    "firecrawl-mcp": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

### Firecrawl CLI를 이용한 설정

최신 Firecrawl CLI에는 지원되는 AI coding editor에 MCP를 설정하는 명령도 있습니다.

```bash
npm install -g firecrawl-cli
firecrawl setup mcp
```

초기 설정을 함께 수행하는 방법:

```bash
npx -y firecrawl-cli@latest init -y --browser
```

---

## Firecrawl MCP vs Playwright MCP

| 구분 | Firecrawl MCP | Playwright MCP |
|---|---|---|
| 핵심 역할 | **Web Data / Research** | **Browser Action / Testing** |
| Search | **강점** | 주목적 아님 |
| Scraping | **강점** | 가능하지만 주목적 아님 |
| 사이트 전체 Crawl | **강점** | 상대적으로 비효율적 |
| Markdown/JSON 추출 | **강점** | 주목적 아님 |
| 버튼/폼 조작 | Interact 지원 | **강점** |
| E2E/UI Test | 주목적 아님 | **강점** |
| 대표 활용 | 리서치, RAG, 데이터 수집 | 브라우저 자동화, QA |

```text
Firecrawl MCP
= AI에게 "웹을 조사하고 읽는 능력" 제공

Playwright MCP
= AI에게 "웹 브라우저를 직접 조작하는 능력" 제공
```

---

## 요약

| 구분 | 내용 |
|---|---|
| **1. 목적** | AI Agent에게 실시간 웹 검색·수집·정제 능력 제공 |
| **2. 특장점** | Search/Scrape/Parse/Map/Crawl/Extract/Interact/Agent, LLM 친화적 데이터, Hosted + Local 지원 |
| **3. 동작구조** | Discover → Retrieve → Clean/Structure → Analyze |
| **4. 설치방법** | Hosted MCP 또는 `npx -y firecrawl-mcp` |
| **Hosted Endpoint** | `https://mcp.firecrawl.dev/v2/mcp` |
| **Search-only Endpoint** | `https://mcp.firecrawl.dev/v2/mcp-search` |
| **대표 활용** | Web Research, 경쟁사 조사, RAG, Knowledge Base, 데이터 수집 |
| **핵심 역할** | AI Agent의 **Web Research / Data Acquisition Layer** |

## 참고 자료

- Firecrawl MCP 공식 GitHub: https://github.com/firecrawl/firecrawl-mcp-server
- Firecrawl 공식 문서: https://docs.firecrawl.dev/mcp-server
- Firecrawl 공식 GitHub Organization: https://github.com/firecrawl
- Firecrawl CLI: https://github.com/firecrawl/cli

> **한 줄 요약:** Firecrawl MCP는 AI Agent가 실시간 웹을 검색하고, 필요한 페이지를 찾아 수집·정제·구조화하여 LLM이 바로 분석할 수 있는 Context로 제공하는 웹 리서치/데이터 수집 MCP입니다.
