# Sitebender Agent (VS Code Extension)

A thin VS Code extension that drives Deno-first scripts to create, configure, run, and monitor Sitebender apps. The Node-side remains minimal; all heavy lifting runs in Deno TypeScript for portability and testability.

## What this is for

- One-click commands to run common workflows without leaving the editor.
- A discoverable surface (Command Palette) for project automation powered by the repo’s `scripts/` functions.
- A stable bridge from VS Code (Node) to Deno (`deno run -A …`).

## Architecture at a glance

- commands/ — Small JS glue that registers VS Code commands and delegates to Deno.
  - registerPrereqsCheck/ — Adds `sitebenderAgent.prereqs.check`.
  - runDenoScript/ — Opens a terminal and executes `deno run -A <agent/scripts/.../index.ts>` with JSON-stringified args.
- scripts/ — Deno TypeScript functions following the one-function-per-folder convention.
  - checkPrereqs/ — Verifies Deno, Docker, and Docker Compose; prints a human-readable report; exits non-zero when missing.
  - compose/ — Validates an action (up/down/restart/etc), builds docker compose args, and runs them.
  - initProject/ — Creates a minimal Sitebender app skeleton and updates root `deno.jsonc` entries.
  - utilities/runCommand/ — Safe wrapper around `Deno.Command` returning `{ code, stdout, stderr }`.
- types/ and constants/ — Named exports for cross-script types and constants.
- extension/ — Standard VS Code activation wiring (minimal; calls command registrations).

All Deno scripts expose a library function and a CLI entry via `import.meta.main` and return an integer exit code. This lets the same code be called internally or executed from the terminal.

## Commands you can run

Open VS Code Command Palette (Cmd+Shift+P) and search:

- Sitebender: Check prerequisites — Runs `agent/scripts/checkPrereqs/index.ts`

More commands will appear here as they are added. The glue uses `runDenoScript(context, <folderName>, args?, terminalName?)` to locate the script and run it inside the workspace cwd.

## How to develop and test

- Node glue (JS) stays tiny and untyped; keep logic in Deno scripts where we have tests.
- Deno scripts are unit/integration tested using DI for side-effects (filesystem/process) where practical.
- When adding a new script:
  1) Create `agent/scripts/<functionName>/index.ts` with a default export and `import.meta.main` guard.
  2) Add any helpers as subfolders.
  3) Add types to `agent/types/index.ts` if shared.
  4) Wire a VS Code command under `agent/commands/` that calls `runDenoScript` with the new folder name.

## Files of interest

- commands/registerPrereqsCheck/index.js — Registers the command and delegates to `runDenoScript`.
- commands/runDenoScript/index.js — Spawns a VS Code terminal and runs Deno with `-A` permissions in the workspace cwd.
- scripts/checkPrereqs/index.ts — Gathers versions, parses them, prints guidance for macOS users when missing.
- scripts/compose/index.ts — Validates action, builds docker compose args, executes them via `runCommand`.
- scripts/initProject/index.ts — Writes example app files and amends `deno.jsonc`.
- scripts/utilities/runCommand/index.ts — Wrapper for `Deno.Command` with robust error handling.
- types/index.ts — Shared types like `CommandResult` and `PrerequisiteCheckResult`.

## Current status

- Implemented: checkPrereqs, compose, initProject, runCommand, command registration for prerequisites.
- Style: one-function-per-folder, default exports, strict FP in Deno land. JS glue is minimal.
- Tests: live alongside repo tests; Deno scripts are designed for behavioral testing (no brittle internals).

## Next steps

- Add more editor commands (compose up/down, init project, open docs) and wire them to the corresponding Deno scripts.
- Add CLI smoke tests to exercise `import.meta.main` paths for agent scripts where feasible.
- Expand `checkPrereqs` to validate additional tools (e.g., `docker context`, `deno permissions`) and improve guidance per-OS.
- Telemetry-free status notifications using VS Code UI primitives (progress, information messages) to surface outcomes.

## Conventions (quick reference)

- One function per folder. Folder name is the function name (camelCase). File is `index.ts` (or `.js` only for glue).
- Default exports for functions. Types/constants are named exports under `agent/types` and `agent/constants`.
- Strict FP style in TypeScript: pure functions, immutability. Avoid `let`/`for` loops.
- Keep Node glue thin; do real work in Deno.

## Notes about toolchains

- The extension host is Node. We do not bundle Deno into the extension; we invoke the user’s local `deno` binary. Ensure Deno is on PATH (the `checkPrereqs` command verifies this).
- If Deno type-checkers see Node JS files, exclude `agent/commands/` and `agent/extension/` from Deno checks or keep them as JS.
