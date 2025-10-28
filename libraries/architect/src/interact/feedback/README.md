# Feedback

Contract

- ErrorMessage: inline error content, `role="alert"`, reference via `aria-describedby`.
- HelpMessage: inline help content, `role="note"`, reference via `aria-describedby`.
- HelpTooltip: trigger + content; accessible string label; progressive enhancement-friendly.

Imports

- Direct: `import ErrorMessage from "./ErrorMessage/index.tsx"`
- Barrel: `import { ErrorMessage, HelpMessage, HelpTooltip } from "./index.ts"`
- From interact: `import { feedback } from "../index.ts"` → `feedback.ErrorMessage`
