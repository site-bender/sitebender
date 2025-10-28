# Buttons

Contract

- Button: semantic <button> with progressive enhancement hooks; supports `loading`, `pressed`, `label` for accessible states.
- ButtonBar: layout wrapper that positions buttons (`position` prop: top|bottom|inline).

A11y

- Use `aria-busy` when `loading`.
- Use `aria-pressed` for toggle buttons.
- Always provide an accessible name (text or `aria-label`).

Imports

- Direct: `import Button from "./Button/index.tsx"`
- Barrel: `import { Button, ButtonBar } from "./index.ts"`
- From interact: `import { buttons } from "../index.ts"` → `buttons.Button`
