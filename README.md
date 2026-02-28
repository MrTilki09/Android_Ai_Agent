# Android AI Agent (React Native)

> ⚠️ **Disclaimer:** This project is an experimental proof-of-concept built to test the boundaries of fully local, sovereign AI agents on mobile devices. It was designed to bypass bloated Node.js SDKs and test bare-metal Native Function Calling on Android. It is intended for educational, testing, and research purposes. If you plan to adapt this architecture for a production environment, ensure you implement robust React Native state management, background task handling, and appropriate error boundaries.

A bare-metal, zero-dependency architecture for running a sovereign, locally-hosted AI agent inside a React Native CLI Android application. 

This project bypasses bloated cloud orchestration frameworks (like LangChain or the official OpenAI Node.js SDK) which often cause Metro bundler conflicts. Instead, it relies purely on **Native Function Calling** and standard React Native `fetch()` to communicate with a local LLM via [LM Studio](https://lmstudio.ai/).

## Features
* **Zero-Dependency Agent Loop:** No Node.js core modules (`fs`, `crypto`) required. Fully compatible with the Hermes engine.
* **Absolute Data Sovereignty:** Prompts and context windows are processed entirely on your local machine. No data is sent to external cloud APIs.
* **Zero API Costs:** Run infinite agentic loops and test function calling freely without burning through cloud API credits.
* **Native Execution Routing:** Execute native mobile device functions (SQLite, Calendar, GPS) safely from within the React Native state.

## Architecture: The "Ping-Pong" Loop
Because this project does not use an external framework, the agent's memory and reasoning loop are managed manually via a 3-step native cycle:

1. **Context Request:** The React Native app sends the user's prompt, the conversation history, and a strict JSON schema of available tools to the local LM Studio server.
2. **Native Intercept:** If the LLM determines a tool is needed, it halts text generation and returns a JSON command. The app intercepts this, pauses the LLM, and executes the requested native React Native function.
3. **Observation Feedback:** The app captures the real-world output of the executed function, injects it back into the conversation history, and fires a second request to the LLM to synthesize the final response.

## Prerequisites
* **React Native CLI:** Environment set up for Android development.
* **LM Studio:** Installed and running on your host machine.
* **Android Emulator:** Running locally (or a physical device connected to your local network).

## Getting Started

### 1. Set Up LM Studio
1. Download and open [LM Studio](https://lmstudio.ai/).
2. Download a model that excels at tool calling/JSON formatting (e.g., Llama 3 or Qwen).
3. Navigate to the **Local Server** tab (`<->` icon).
4. Start the server on port `1234`. Make sure CORS is enabled if needed.

### 2. Set Up the React Native App
Clone the repository and install the standard dependencies:

```bash
git clone [https://github.com/MrTilki09/Android_Ai_Agent.git](https://github.com/MrTilki09/Android_Ai_Agent.git)
cd Android_Ai_Agent
npm install
