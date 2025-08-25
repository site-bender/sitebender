# @sitebender/docs

Documentation for the Sitebender project.

## Playground (Monaco) Design Notes

- Run user code in a sandboxed Web Worker (or sandboxed iframe) with strict capability gates.
- Capture console logs and errors; display in a dedicated output pane.
- Preload curated examples organized by user tasks (build a form wizard, conditional display, JSON-LD injection, etc.).
- Show IR JSON and SSR HTML side-by-side; provide a “Hydrate” preview toggle.
- Enforce `evaluation: "eager" | "lazy"` toggles in examples to demonstrate behavior.
- Provide import alias shims for the three libraries to keep examples concise.

## Security and CSP

- Adopt a strict CSP: default-src 'self'; script-src 'self' 'wasm-unsafe-eval' blob:; worker-src 'self' blob:; connect-src allowlist (docs API only); style-src 'self' 'unsafe-inline' (if needed by Monaco), font-src 'self' data:; frame-ancestors 'none'.
- Pin external CDNs and add integrity when possible; consider local mirrors for offline.
- Deny-by-default network policy inside the playground Worker; allowlist selectively.

## Performance & Offline

- Load Monaco lazily when the playground route is opened.
- Move TypeScript transpile to the Worker to keep the UI thread responsive; debounce edits.
- Add a Service Worker to cache docs and example assets; ensure playground works offline for curated examples.

## Browser Support

- Baseline: all pages usable without JS/CSS (semantic HTML, forms submit traditionally).
- Enhancements progressively add validation, reactivity, and interactive playgrounds.

## Offline-first and Collaboration

- Design the docs app as offline-first: content and user artifacts (notes, exercises, playground snippets) stored locally with background sync.
- Synchronization via OSS CRDTs (e.g., Y.js/Automerge) layered behind an adapter; no vendor lock-in.
- Collaborative editing for courses/tutorials and playgrounds: multi-user sessions with conflict-free merges; presence indicators and cursors as a later enhancement.
- Storage adapters: IndexedDB (primary), File System Access API (optional export/backups), and server sync via HTTP/WebTransport.

## AI/LLM Integration (MCP)

- Integrate with Model Context Protocol to provide task-focused, just-in-time support.
- Guardrails: read-only by default; explicit user consent for code changes; comply with privacy settings.
- Pluggable tools: code generation, IR inspectors, test runners, and linters exposed via MCP.

## Future Plans (High-level)

- Real-time transport: evaluate WebTransport/HTTP/3 for low-latency sync; fall back to WebSocket/EventSource.
- Peer-to-peer options: WebRTC data channels for collaborative sessions when a rendezvous server is available.
- Content addressing: optional use of content hashes for lesson materials to enable verifiable caching.
- Modular sync service: server component remains optional; offline-only mode must remain fully usable.
