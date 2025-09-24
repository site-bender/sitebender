# Quartermaster — Studio Application Generator (Stubs Phase)

Purpose
- Deterministic, blueprint-driven generator for Studio apps.
- Wires import maps (Dev: local src; Prod: published libs), CI tasks (Steward, Warden, Axe), and folder/layout conventions.
- Zero runtime dependencies in libraries; CLI-only tooling is acceptable.

Non‑negotiable constraints
- ZERO arrow functions. Named functions only using the function keyword.
- One function per file. Private helpers live under underscore folders and have underscore‑prefixed names.
- No classes; no interfaces (use type aliases). No any; unknown only with explicit permission.
- No barrel files; direct tree imports only. Export on the same line. Envoy comment markers on exported functions.
- Use @sitebender/* aliases; Dev → local src via import maps; Prod → published URLs.

Status
- Phase: stubs only. quartermaster:new and quartermaster:dry-run print help; no generation side-effects yet.

CLI commands (stubs)
- quartermaster:new
  - deno run -A --config deno.dev.jsonc libraries/quartermaster/src/new/index.ts --help
  - deno run -A --config deno.dev.jsonc libraries/quartermaster/src/new/index.ts --template <athenaeum|workshop|minimal> [--with architect] [--with envoy] [--dry-run] [--name <app-name>] [--out <path>]

- quartermaster:dry-run
  - deno run -A --config deno.dev.jsonc libraries/quartermaster/src/dryRun/index.ts --help
  - deno run -A --config deno.dev.jsonc libraries/quartermaster/src/dryRun/index.ts --plan ./plan.json

Blueprints (initial placeholders)
- mission-control (docs app / Envoy)
- the-workshop (playground / Architect)
- minimal (Codewright-only)

Outputs: guarantees (to be implemented)
- Import maps:
  - Dev: @sitebender/* → ./libraries/*/src/ (see deno.dev.jsonc)
  - Prod: @sitebender/* → published URLs (see deno.prod.jsonc)
- Tasks in generated app:
  - steward:check, steward:fix
  - warden:enforce
  - axe:check (warn until allowlists stabilize)
  - test scaffolds aligned to one-function-per-file conventions
- Folder conventions:
  - Public function: src/functionName/index.ts
  - Private helper: src/functionName/_helperName/index.ts and exported function is _helperName
  - Shared private at LCA: src/_sharedHelper/index.ts
- Contracts:
  - Optionally seed Warden contracts and baseline hash (pattern-dependent).

Integration with import maps
- Dev config (root deno.dev.jsonc) maps @sitebender/* → local src.
- Prod config (root deno.prod.jsonc) maps @sitebender/* → published URLs.
- Generated app deno.jsonc should follow the same policy:
  - Dev: local iteration dogfoods libs without publish.
  - Prod: replace imports with published URLs for deployment pipelines.

Acceptance criteria (stubs phase)
- deno run -A --config deno.dev.jsonc libraries/quartermaster/src/new/index.ts --help prints usage.
- deno run -A --config deno.dev.jsonc libraries/quartermaster/src/dryRun/index.ts --help prints usage.
- No writes; deterministic output planned for the dry-run architect (next phase).

Next phases
1) Read‑only dry‑run architect
   - Input flags or --plan ./plan.json
   - Output a deterministic plan JSON: outputs.appPath, sorted files, importMap dev/prod, denoTasks, postScaffoldMessages, seed.
   - No writes; deterministic ordering and formatting.

2) Apply mode (later; guarded by explicit approval)
   - Use a previously printed plan; perform mkdir, file writes, executable bit toggles where needed.
   - Enforce folder/privacy/naming conventions; place Envoy markers on exports.

References
- docs/studio-overview.(yaml|md) — authoritative policies and import‑map aliasing.
- docs/steward-rules.md — hard lines for style, naming, privacy, imports.
- libraries/steward, libraries/warden — task wiring patterns.
- applications/mission-control, applications/the-workshop — real app structures for blueprint outputs.
