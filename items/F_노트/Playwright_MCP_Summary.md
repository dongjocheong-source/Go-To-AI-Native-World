# Playwright MCP 정리

## 1) 목적

**Playwright MCP**는 Microsoft Playwright를 **MCP(Model Context Protocol)**를 통해 AI Agent가 사용할 수 있도록 만든 브라우저 자동화 MCP Server입니다.

사람이 Playwright 코드를 직접 작성하지 않아도 AI에게 자연어로 요청하여 웹 브라우저를 조작할 수 있습니다.

### 주요 활용 목적

- 웹페이지 탐색 및 정보 확인
- 버튼 클릭, 텍스트 입력, 폼 작성
- 로그인 및 웹 업무 자동화
- 웹 애플리케이션 기능 테스트
- E2E / Exploratory Testing
- AI Coding Agent의 개발 결과 검증
- 반복적인 Browser Task 자동화

### 기본 구조

```text
사용자
  │
  │ 자연어 요청
  ▼
AI Agent / LLM
  │
  │ MCP
  ▼
Playwright MCP Server
  │
  │ Playwright
  ▼
Chrome / Edge / Firefox / WebKit
  │
  ▼
Web Application
```

즉, **AI에게 웹 브라우저를 직접 조작할 수 있는 '손'을 제공하는 MCP**라고 이해할 수 있습니다.

---

## 2) 특장점

### 2.1 Accessibility Snapshot 기반

Playwright MCP의 핵심 특징 중 하나는 단순 화면 좌표가 아니라 **Accessibility Tree 기반의 구조화된 Snapshot**을 활용한다는 점입니다.

예를 들어 웹페이지에 로그인 화면이 있다면 AI는 다음과 유사한 구조를 전달받을 수 있습니다.

```text
heading "Login"

textbox "Email" [ref=e5]
textbox "Password" [ref=e7]
button "Login" [ref=e9]
```

AI는 이를 기반으로 다음과 같이 의미 있는 UI 요소를 판단하고 조작합니다.

```text
e5 → Email 입력창
e7 → Password 입력창
e9 → Login 버튼
```

따라서 화면상의 좌표를 추측하는 방식보다 UI 요소를 의미 기반으로 다룰 수 있습니다.

### 2.2 LLM 친화적인 페이지 표현

브라우저의 전체 HTML을 그대로 처리하는 대신 필요한 UI 구조를 Snapshot으로 전달하기 때문에 AI가 페이지 상태를 비교적 효율적으로 이해할 수 있습니다.

```text
전체 HTML / DOM
       ↓
Accessibility Snapshot
       ↓
button "Submit" [ref=e12]
textbox "Email" [ref=e15]
```

### 2.3 다양한 Browser Action

Playwright MCP를 통해 다음과 같은 브라우저 작업을 수행할 수 있습니다.

- Navigation
- Click
- Type
- Form Fill
- Dropdown 선택
- Keyboard / Mouse 입력
- Drag & Drop
- Dialog 처리
- Tab 관리
- Screenshot
- File Upload
- Network 관련 작업
- Storage 관리
- Tracing

### 2.4 Cross Browser

Playwright 기반이므로 다양한 브라우저 환경을 지원합니다.

- Chrome / Chromium
- Microsoft Edge
- Firefox
- WebKit

예를 들어 Firefox를 지정할 수 있습니다.

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--browser=firefox"
      ]
    }
  }
}
```

### 2.5 로그인 Session 활용

Persistent Profile이나 브라우저 Extension 연결 방식을 이용하면 로그인 상태, 쿠키 등 기존 브라우저 상태를 활용하는 시나리오를 구성할 수 있습니다.

```text
기존 Browser
   │
   ├── Login Session
   ├── Cookies
   └── Browser State
           │
           ▼
 Playwright Extension
           │
           ▼
    Playwright MCP
           │
           ▼
       AI Agent
```

SSO나 인증이 필요한 업무 환경에서는 유용할 수 있으나, 사내 시스템 적용 시 조직의 보안 및 AI 도구 사용 정책을 확인해야 합니다.

---

## 3) 동작구조

Playwright MCP의 핵심적인 Agent Loop는 다음과 같이 이해할 수 있습니다.

**Navigate → Snapshot → AI 판단 → Action → Re-Snapshot**

### Step 1. 사용자 요청

```text
"Todo 사이트에 접속해서
Buy Milk를 추가해줘."
```

### Step 2. AI Agent가 MCP Tool 호출

```text
AI Agent
    │
    ▼
browser_navigate
```

### Step 3. Playwright가 브라우저 접속

```text
Playwright MCP
      │
      ▼
Playwright
      │
      ▼
Browser
      │
      ▼
Todo Web App
```

### Step 4. Accessibility Snapshot 획득

```text
heading "todos"

textbox
"What needs to be done?"
[ref=e5]
```

### Step 5. AI 판단

AI는 Snapshot을 보고 `e5`가 Todo 입력창이라고 판단합니다.

### Step 6. Browser Action 수행

```text
browser_type

target = e5
text   = "Buy Milk"
```

### Step 7. 새로운 Snapshot 확인

```text
heading "todos"

textbox "What needs to be done?" [ref=e5]

listitem
    checkbox [ref=e10]
    text "Buy Milk"
```

### Step 8. 결과 판단

AI가 변경된 페이지 상태를 확인하여 작업 성공 여부를 판단하고, 필요하면 다음 Action을 수행합니다.

### 전체 구조

```text
┌───────────────────┐
│       User        │
└─────────┬─────────┘
          │ 자연어 요청
          ▼
┌───────────────────┐
│     AI Agent      │◀─────────────┐
│       LLM         │              │
└─────────┬─────────┘              │
          │ MCP Tool Call          │
          ▼                        │
┌───────────────────┐              │
│  Playwright MCP   │              │
└─────────┬─────────┘              │
          ▼                        │
┌───────────────────┐              │
│    Playwright     │              │
└─────────┬─────────┘              │
          ▼                        │
┌───────────────────┐              │
│      Browser      │              │
└─────────┬─────────┘              │
          ▼                        │
┌───────────────────┐              │
│  Web Application  │              │
└─────────┬─────────┘              │
          │ Accessibility Snapshot│
          └────────────────────────┘
```

핵심은 **AI가 페이지 상태를 읽고 → 행동하고 → 변경된 상태를 다시 읽고 → 다음 행동을 결정하는 반복 구조**입니다.

---

## 4) 설치방법

### 4.1 사전 준비

- Node.js 20 이상
- npm / npx
- MCP를 지원하는 Client
  - VS Code
  - Cursor
  - Claude Code
  - Claude Desktop
  - Windsurf 등

Node.js 설치 여부는 다음 명령으로 확인할 수 있습니다.

```bash
node --version
npm --version
```

### 4.2 기본 MCP 설정

일반적인 MCP 설정은 다음과 같습니다.

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

핵심 실행 명령은 다음과 같습니다.

```bash
npx @playwright/mcp@latest
```

### 4.3 VS Code

CLI에서 MCP Server를 등록하는 예:

```bash
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'
```

### 4.4 Cursor

Cursor에서 MCP 설정 화면을 열고 Playwright MCP Server를 등록합니다.

```text
Cursor Settings
       ↓
MCP
       ↓
Add new MCP Server
       ↓
npx @playwright/mcp@latest
```

### 4.5 Claude Code

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

### 4.6 설치 후 테스트 예제

AI Agent에게 다음과 같이 요청할 수 있습니다.

```text
Navigate to https://demo.playwright.dev/todomvc

Add:
- Buy milk
- Study MCP
- Exercise

Check the first item.
```

정상적으로 연결되었다면 다음 흐름으로 동작합니다.

```text
User Prompt
    ↓
AI Agent
    ↓
Playwright MCP
    ↓
Browser Open
    ↓
Snapshot
    ↓
UI 요소 탐색
    ↓
Type / Click
    ↓
Re-Snapshot
    ↓
결과 확인
```

---

## 요약

| 구분 | 내용 |
|---|---|
| **1. 목적** | AI Agent에게 Browser Automation 능력 제공 |
| **2. 특장점** | Accessibility Snapshot 기반, LLM 친화적, 다양한 Browser Action, Cross Browser, Session 활용 |
| **3. 동작구조** | Navigate → Snapshot → AI 판단 → Action → Re-Snapshot 반복 |
| **4. 설치** | Node.js + MCP Client → `npx @playwright/mcp@latest` 등록 |
| **대표 활용** | 웹 자동화, E2E/Exploratory Test, AI Coding Agent 검증 |
| **핵심 역할** | AI에게 웹을 직접 조작할 수 있는 **Action 능력** 제공 |

## 참고 자료

- Microsoft Playwright MCP: https://github.com/microsoft/playwright-mcp
- Playwright MCP Getting Started: https://github.com/microsoft/playwright/blob/main/docs/src/getting-started-mcp.md
- Playwright: https://playwright.dev/
