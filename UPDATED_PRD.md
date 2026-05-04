# Agentic Digital Twin App PRD

## 1. Product Summary

The Agentic Digital Twin App is a React Native Android application that uses an AI agent to help users reduce distracting app usage. The product combines local mobile telemetry, native Android permissions, an LLM-driven tool-calling loop, and Digital Twin style interventions to guide the user toward healthier digital habits.

Instead of acting like a rigid blocker, the app is designed to observe usage patterns, understand the user's current digital behavior, and intervene when the user's actual habits drift away from their intended or "ideal twin" behavior.

## 2. Problem Statement

Existing screen-time tools usually depend on fixed timers, manual limits, or hard app blocks. Users often bypass these tools because they feel generic, annoying, or disconnected from the real reason the user opened the distracting app.

Users need a more adaptive system that:

- Learns from implicit device usage data.
- Understands which apps are becoming distractions.
- Nudges the user at the right moment.
- Keeps the experience personal, local, and agent-driven.
- Helps users align their current behavior with their ideal productive self.

## 3. Product Objective

Build an Android-first React Native mobile app powered by an AI agent that can:

- Gather app usage information from the device.
- Store conversational memory and agent observations locally.
- Allow the user or agent to define usage limits for distracting apps.
- Monitor selected apps through Android native services.
- Trigger contextual Digital Twin interventions when limits are exceeded.
- Communicate with a local LLM server for tool-calling and agent reasoning.

## 4. Target Users

### Primary Users

- Students.
- Self-improvement focused users.
- Professionals who struggle with attention drift.
- Users with high daily usage of social media, games, browsers, or other non-essential apps.

### Main Pain Points

- High screen time on distracting apps.
- Present bias and doomscrolling.
- Notification fatigue.
- Bypassing traditional app timers.
- Wanting support without feeling punished by the app.

### User Goals

- Reduce usage of distracting apps.
- Build more intentional digital habits.
- Receive personalized intervention instead of generic blocking.
- Keep personal usage data local where possible.
- Use an AI assistant as a coach for digital behavior.

## 5. Product Scope

### In Scope

- React Native Android application.
- Drawer-based navigation with Home, Chat, Apps, Settings, and Intervention areas.
- Local LLM integration through configurable LM Studio compatible endpoint.
- Agent tool-calling loop.
- Native Android usage stats access.
- Native Android accessibility service for app usage limit monitoring.
- Local app usage list with app names, icons, usage time, and limits.
- Digital Twin usage limit storage.
- Deep-link based intervention screen when a monitored app exceeds its limit.
- Local chat memory using SQLite and Drizzle.
- Permission flows for notification, SMS, contacts, usage stats, and accessibility.
- Native bridge tools for usage stats, contacts, SMS, notifications, Twitter composer, and app limits.

### Out of Scope For Current Version

- iOS implementation.
- Biometric or health tracking.
- Full background analytics engine.
- Hard OS-level app lockout.
- Cloud-hosted user profile syncing.
- Advanced psychological personalization model.
- Production-grade safety, privacy, and observability systems.
- Fully autonomous posting or messaging without user confirmation.

## 6. Current Implementation Status

### Completed

- React Native Android project setup.
- Android native modules registered through the React Native bridge.
- Local LLM agent loop that sends conversation history and tool definitions to an LM Studio compatible server.
- Multi-step tool-calling loop with native tool execution and observation feedback.
- Local chat and tool memory stored in SQLite.
- Chat interface that loads previous assistant/user messages from local memory.
- Configurable LM Studio URL in Settings.
- Usage stats native module for reading today's app usage.
- Usage permission check and system settings redirect.
- Apps screen that displays detected apps, icons, usage duration, and configured Digital Twin limits.
- Accessibility-based Digital Twin monitoring service.
- App limit bridge that sends user-defined package limits from React Native to Android native service.
- Digital Twin limit storage through local async storage.
- Settings screen for viewing Digital Twin limits.
- Deep-link route for intervention flow.
- Intervention screen shown when a monitored app exceeds its configured usage limit.
- Native notification scheduling and immediate notification capability.
- Native SMS sending capability with confirmation from the agent flow.
- Native contacts reading capability with confirmation from the agent flow.
- Twitter/X composer opening capability with user confirmation before posting.
- Background color control tool used as a simple agent-to-UI action.
- First-launch/onboarding screen structure exists.

### Partially Completed

- JITAI behavior exists as an intervention screen and native notification capability, but the current intervention is mostly rule/limit based rather than fully LLM-personalized.
- Usage limit setting exists through agent tool calls and storage, but manual editing of individual limits from the Apps screen is not fully built.
- The app can read usage stats, but unlock count, current foreground app telemetry, and richer session analysis are not fully modeled as structured agent context.
- The accessibility service can monitor selected packages and trigger the app, but battery/performance tuning is not validated.
- Local data storage exists, but privacy controls, deletion UX, and export controls are not complete.
- Permission handling exists, but onboarding could better guide the user through each required permission.
- The original "Actual Twin vs Perfect Twin" concept is represented through limits and intervention messaging, but there is not yet a complete twin profile model.

### Not Yet Completed

- Dynamic baseline learning for weekday/weekend/context-aware behavior.
- Full psychological personalization system based on user personality, intent, and recurring patterns.
- Automated JITAI success tracking, such as whether the user leaves the distracting app within 5 minutes.
- Unlock count collection.
- Continuous passive telemetry queue when the LLM is unreachable.
- Production-grade error handling around LLM failures and native module failures.
- Formal privacy/security review.
- Battery drain measurement.
- API latency measurement.
- Automated tests for the agent loop, database behavior, and native bridge flows.

## 7. Core Features And User Stories

### 7.1 Agent Chat And Tool Calling

**User Story:** As a user, I want to chat with the AI agent so I can ask it to inspect my usage patterns, adjust limits, and help me manage digital habits.

**Status:** Completed.

**Implemented Behavior:**

- User can send chat messages.
- Agent sends chat history and available tool schemas to a local LLM endpoint.
- Agent can receive tool calls from the LLM.
- Native tool results are inserted back into memory.
- Agent continues the loop until a final assistant response is produced.

**Acceptance Criteria:**

- User message appears in chat immediately.
- Assistant response appears after LLM completion.
- Tool calls can be executed and fed back to the agent.
- Conversation history persists locally.

### 7.2 Local LLM Configuration

**User Story:** As a user, I want to configure my local LLM server URL so I can run the agent through LM Studio or another compatible local endpoint.

**Status:** Completed.

**Implemented Behavior:**

- Settings includes an LM Studio URL modal.
- Stored URL overrides the default local emulator endpoint.
- Agent requests use the configured URL when available.

**Acceptance Criteria:**

- User can save an endpoint URL.
- App reuses the saved endpoint for later agent calls.
- Default Android emulator host remains available when no custom URL is set.

### 7.3 Digital Exhaust / Usage Data Gathering

**User Story:** As the agent, I need to fetch implicit app usage data so I can understand the user's current digital behavior.

**Status:** Partially completed.

**Implemented Behavior:**

- Android usage stats are read through a native module.
- Today's app usage is returned with package names, total foreground time, app labels, and icons.
- Apps screen displays the results.
- Agent has a tool for requesting usage stats.

**Remaining Work:**

- Add unlock count collection.
- Add richer foreground/session context.
- Normalize usage payloads for long-term analysis.
- Add background telemetry capture rather than only on-demand reads.

### 7.4 Apps Usage Dashboard

**User Story:** As a user, I want to see which apps I used today and how long I used them so I can understand my behavior.

**Status:** Completed.

**Implemented Behavior:**

- Apps screen lists apps detected from Android usage stats.
- Each app can display icon, name, package usage time, and configured limit.
- Empty/permission-missing state tells the user usage permission is required.

**Acceptance Criteria:**

- Usage data appears after permission is granted.
- App usage time is human-readable.
- Stored Digital Twin limits are shown alongside app usage.

### 7.5 Digital Twin Limits

**User Story:** As a user or agent, I want app-specific limits so the Digital Twin can know when an app has crossed a healthy threshold.

**Status:** Completed at foundation level.

**Implemented Behavior:**

- Agent can set package-based usage limits through a tool call.
- Limits are persisted locally.
- Limits are sent to the Android native Digital Twin service.
- Settings can display currently stored limits.

**Remaining Work:**

- Add a full manual UI for editing limits per app.
- Add presets for common distracting apps.
- Add recommended limits generated from observed behavior.

### 7.6 Accessibility-Based Monitoring

**User Story:** As the Digital Twin system, I need to notice when a monitored app is opened so I can respond when the user has exceeded their limit.

**Status:** Completed for Android prototype.

**Implemented Behavior:**

- Android accessibility service listens for app window changes.
- Service checks whether the opened app has a configured limit.
- Service compares today's usage against the configured limit.
- If usage exceeds the limit, the service opens the intervention route.
- If usage is below the limit, the service starts a timer for the remaining allowed time.

**Acceptance Criteria:**

- Accessibility permission can be checked.
- User can be sent to Android accessibility settings.
- Monitored apps trigger limit logic.
- Exceeded apps open the intervention flow.

### 7.7 JITAI / Intervention Flow

**User Story:** As the agent, I need to intervene at the right time so the user receives a contextual nudge instead of a generic block.

**Status:** Partially completed.

**Implemented Behavior:**

- Intervention screen opens through deep link.
- Screen identifies the app package and maps known packages to user-friendly names.
- Messaging explains that the daily limit has been exceeded.
- Native notification capability exists separately.

**Remaining Work:**

- Connect intervention copy directly to LLM-generated personalized reasoning.
- Track whether the intervention changes behavior.
- Add soft actions like "reflect", "set intention", "return home", or "adjust tomorrow's limit".
- Add a notification-based JITAI path that includes Perfect Twin style copy.

### 7.8 Permission And Safety Flow

**User Story:** As a user, I want control over sensitive permissions so I understand what the agent can access.

**Status:** Partially completed.

**Implemented Behavior:**

- Runtime permission requests exist for notifications, SMS, contacts, and related Android permissions.
- Usage stats permission can be checked and opened in settings.
- Accessibility permission can be checked and opened in settings.
- Sensitive agent actions like SMS, contacts, and UI color changes ask for confirmation.

**Remaining Work:**

- Improve permission onboarding.
- Add clearer permission explanations before system prompts.
- Add privacy controls for clearing stored agent memory and limits.

### 7.9 Additional Native Agent Tools

**User Story:** As the agent, I want controlled access to native phone capabilities so I can perform useful actions with user confirmation.

**Status:** Completed for prototype tools.

**Implemented Behavior:**

- Send SMS through native Android bridge.
- Read contacts through native Android bridge.
- Open Twitter/X composer with prefilled content.
- Schedule or show local notifications.
- Change UI background color.

**Acceptance Criteria:**

- User confirmation is required for sensitive tool execution.
- Native modules return observations or status messages to the agent.
- User remains in control before externally visible actions are completed.

## 8. Success Metrics

### Product Metrics

- Reduction in usage time for selected distraction apps.
- Number of successful Digital Twin interventions.
- Percentage of interventions after which the user exits the distracting app.
- Number of users who configure limits for at least one distracting app.
- Chat engagement with the AI agent.

### Technical Metrics

- Usage stats read success rate.
- Accessibility service uptime.
- LLM response latency.
- Tool-call completion rate.
- Local database write/read success rate.
- Battery impact over 24 hours.

## 9. Non-Functional Requirements

### Privacy

Sensitive app usage data should stay local by default. When sent to the LLM endpoint, the user should be aware that the selected endpoint receives that context.

**Current Status:** Partially complete. Local storage and local LLM support exist, but privacy settings and user-facing controls need more work.

### Performance

The intervention should happen quickly enough to matter while the user is still in the distracting context.

**Current Status:** Not validated. The native service can trigger immediately, but latency measurement has not been added.

### Battery

The monitoring service should avoid excessive background work and keep battery usage low.

**Current Status:** Not validated.

### Reliability

The app should handle LLM failures, permission denials, and native module failures gracefully.

**Current Status:** Partially complete. Some errors are caught, but user-facing recovery flows need improvement.

### Offline Resilience

The app should still collect or preserve usage context when the LLM endpoint is unavailable.

**Current Status:** Not complete.

## 10. Risks And Open Questions

- Accessibility services are powerful and sensitive; the app needs clear user trust and permission rationale.
- Usage stats permission is manual and may confuse users without better onboarding.
- LLM-generated interventions need guardrails to stay supportive rather than shaming.
- Native monitoring behavior should be tested across Android versions and OEM devices.
- Current intervention logic is limit-based; the richer agentic personalization layer still needs a stronger model.
- The app currently depends on a local LLM server being reachable from the Android emulator or device.

## 11. Recommended Next Milestones

### Milestone 1: Stabilize Prototype

- Fix permission onboarding flow.
- Add manual editing for app limits.
- Add memory clear/reset controls.
- Add better LLM error states in chat.
- Add tests for local memory and agent loop behavior.

### Milestone 2: Complete Digital Twin Model

- Create structured Actual Twin profile.
- Create structured Ideal Twin goals/preferences.
- Track app usage over multiple days.
- Add dynamic baselines by app, time, weekday/weekend, and focus context.

### Milestone 3: Upgrade JITAI System

- Generate personalized intervention copy from the agent.
- Track intervention outcomes.
- Add soft nudges before hard redirects.
- Add notification-based interventions for selected contexts.

### Milestone 4: Production Readiness

- Validate battery usage.
- Validate latency.
- Harden permission and privacy flows.
- Add analytics that respect local-first privacy.
- Add regression tests for native bridge behavior.

