# Sitebender Agent

Conventions used in this folder (summary):

- One function per folder. The folder name is the function name (camelCase). The file is `index.ts` (or `.js` for VS Code glue).
- Default exports for functions and components. This keeps call sites clean and the sidebar readable.
- Types and constants are centralized:
  - `agent/types/index.ts` – named exports for shared types. Import with `type` and place type imports above value imports with a blank line between groups.
  - `agent/constants/index.ts` – named exports for shared constants.
- Formatting for readability (proximity):
  - Put a blank line above `return` statements.
  - Put a blank line below the block of variable declarations.
  - Surround multi-line blocks (if/try/function bodies, object literals spanning >1 line) with single blank lines above and below.
  - Never use more than a single blank line between lines of code.
- Strict FP style: pure functions, immutability, no `let` or `for` loops.
- Helper functions are nested under the consumer function’s folder unless they are used in multiple places (then promote to `utilities/`, `types/`, or `constants/`).

Notes about VS Code glue:

- VS Code’s extension host runs on Node and expects CommonJS `require` in many examples. We keep the Node glue minimal and place all heavy logic in Deno TypeScript scripts under `scripts/`.
- If Deno tooling attempts to typecheck Node files, exclude the `agent/extension/` and `agent/commands/` folders in your Deno config, or keep them JS-only.
