## Playground — overview

Purpose

- Live, sandboxed playground to visualize JSX → IR JSON and preview SSR/hydration behavior.

Architecture

- Monaco editor + custom JSX runtime; Worker-based transpile/compile; panes for IR JSON, SSR HTML, hydrate log.
- Deterministic ids for reproducible snapshots; JSON Schema validation for IR in dev.
