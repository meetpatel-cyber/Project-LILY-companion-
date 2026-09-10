# Project LILY — Engineering Contract

This document establishes the project-level engineering contract and rules that govern all future Project LILY development.

## 1. Companion-First Philosophy
Project LILY is a companion, not an employee. She is not an autonomous agent or a productivity suite.
* **Companionship > Capability**
* **Personality > Raw Intelligence**
* **Presence > Productivity**
* **Expression > Complexity**
* **Quality > Feature Count**

**Golden Rule:**
*"Make her feel alive, without making the computer work hard to pretend she is."*

## 2. Lightweight & Resource Philosophy
* **Lightweight > Maximum Model Size**

The project must remain extremely lightweight and suitable for the primary target hardware:
* **CPU:** Intel Core i5-11400H
* **RAM:** 16 GB DDR4
* **GPU:** NVIDIA GTX 1650
* **VRAM:** 4 GB

The project must strictly **avoid**:
- Continuous GPU-heavy processing or AI inference
- Large unnecessary models or multiple heavy AI models simultaneously
- Continuous screen analysis or microphone processing
- Excessive background polling
- Heavy unnecessary frameworks or 3D rendering

Traditional deterministic software must be used for traditional tasks. AI inference is reserved strictly for tasks that genuinely require language.

## 3. Privacy Rules
* **Privacy > Convenience**
* **User Control > Autonomy**

Project LILY is **local-first** and **privacy-first**.
Do not introduce:
- Mandatory cloud AI
- Hidden telemetry
- Silent microphone recording or clipboard monitoring
- Automatic SSD/file scanning
- Unrestricted shell access
- Silent data collection

Memory must remain entirely user-controlled. The user should always understand exactly what LILY can access.

## 4. AI Resource Usage Rules
AI should **NOT** be responsible for deterministic features:
- Blink, idle animation, mouse/typing detection, poke reactions
- Mood transitions, sleep/wake states, timers, notifications, seasonal switching, basic UI behavior

AI **SHOULD** primarily handle:
- Conversation and personality expression
- Contextual responses
- Memory-aware conversation
- Companion reactions requiring language
- Lightweight reading interaction

## 5. Explicit Access Rules
LILY operates under strict explicit consent protocols. Project LILY must **NOT** become a coding agent, autonomous browser, surveillance system, or unrestricted computer controller.

* **Clipboard:** Explicit invocation only.
* **Files:** Only explicitly selected files.
* **Microphone:** No continuous recording requirement.
* **Application Launching:** Controlled mappings only.
* **Websites:** Open explicitly requested websites only.
* **Memory:** Entirely user-controlled.

## 6. Git Workflow
Every completed phase receives a Git checkpoint. A checkpoint is created only after:
- Automated validation
- Manual QA
- Regression QA
- Acceptance criteria are satisfied

**Rule:** Never commit or tag a phase merely because code compiles. Git changes must be reviewed before committing.

## 7. QA Workflow
Development strictly follows:
`PHASE → UNDERSTAND → PLAN → IMPLEMENT → INSPECT CHANGES → AUTOMATED VALIDATION → MANUAL QA → BUG FIXES → REGRESSION QA → DOCUMENT → GIT CHECKPOINT → NEXT PHASE`

**Rule:** Build success does not equal runtime success.

## 8. Antigravity Implementation Rules
Antigravity is the implementation assistant, not the product owner. Antigravity does **NOT** decide Project LILY's product direction.

Before modifying code, Antigravity must:
1. Explain the current phase and exact objective.
2. Identify affected systems and what must remain unchanged.
3. Inspect the current implementation and relevant files.
4. Understand the current flow.
5. Implement the smallest safe change.
6. Inspect actual changes and run validation.
7. Report the result clearly.

**Rules:**
- Never blindly rewrite systems.
- Never implement future-phase functionality prematurely.
- Never add a feature simply because it appears useful or impressive.

When something breaks:
`STOP → UNDERSTAND → TRACE → ROOT CAUSE → TARGETED FIX → VALIDATE → QA → REGRESSION → DOCUMENT`
