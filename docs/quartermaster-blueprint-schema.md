# Quartermaster Blueprint Schema (Draft)

Purpose
- Declarative blueprint format that Quartermaster uses to plan and (later) apply deterministic app scaffolds.
- Zero runtime deps; import‑map policy matches Studio: Dev → local src; Prod → published libraries.
- This document defines the JSON shape and provides example blueprints and a sample dry‑run plan.

Hard constraints
- ZERO arrow functions in generator code; one function per file; export on same line; Envoy `//++` markers on exports.
- No barrel files; direct tree imports; underscore privacy for helpers.
- Types in Quartermaster are type aliases (no interfaces/classes).

Schema (JSON shape)
- id: string
- name: string
- description: string
- outputs.appPath: string (target app directory, relative to repo root)
- files[] (optional): array of file specs (empty in placeholders during stubs phase)
  - targetPath: string (path relative to outputs.appPath)
  - mode: "copy" | "template"
  - sourcePath?: string (for copy/template sources)
  - substitutions?: object of string|number|boolean
  - executable?: boolean
- importMap (optional):
  - dev.imports: object (alias → path)
  - prod.imports: object (alias → published URL)
- denoTasks (optional): object mapping task names → command strings
- postScaffoldMessages (optional): array of strings
- seed (optional):
  - wardenContract?: string
  - axeAllowlistSeed?: string
- variants (optional):
  - architect?: boolean
  - envoy?: boolean
  - (future toggles may be added)

Type aliases (reference)
See libraries/quartermaster/src/schema/blueprint/index.ts for the authoritative type aliases:
- FileMode, FileSpec, ImportMapSpec, ImportMaps, DenoTasksSpec, SeedSpec, VariantToggles, OutputsSpec, Blueprint

Example blueprint: the‑athenaeum (Envoy docs app; placeholder)
```json
{
  "id": "athenaeum",
  "name": "mission-control",
  "description": "Docs app (Envoy) skeleton (placeholder)",
  "outputs": { "appPath": "./applications/mission-control" },
  "files": [],
  "postScaffoldMessages": [
    "Stub blueprint: metadata and target path only. No templates yet."
  ],
  "variants": { "envoy": true, "architect": false }
}
```

Example blueprint: the‑workshop (Architect the-workshop; placeholder)
```json
{
  "id": "workshop",
  "name": "the-workshop",
  "description": "Playground (Architect pipeline) skeleton (placeholder)",
  "outputs": { "appPath": "./applications/the-workshop" },
  "files": [],
  "postScaffoldMessages": [
    "Stub blueprint: metadata and target path only. No templates yet."
  ],
  "variants": { "architect": true, "envoy": false }
}
```

Example blueprint: minimal (Pagewright‑only; placeholder)
```json
{
  "id": "minimal",
  "name": "minimal-app",
  "description": "Pagewright-only minimal app skeleton (placeholder)",
  "outputs": { "appPath": "./applications/minimal-app" },
  "files": [],
  "postScaffoldMessages": [
    "Stub blueprint: metadata and target path only. No templates yet."
  ],
  "variants": { "architect": false, "envoy": false }
}
```

Import‑map policy (what blueprints should encode for generated apps)
- Dev (deno.dev.jsonc equivalent):
  - "@sitebender/toolsmith/": "./libraries/toolsmith/src/"
  - "@sitebender/architect/": "./libraries/architect/src/"
  - "@sitebender/pagewright/": "./libraries/pagewright/src/"
  - etc.
- Prod (deno.prod.jsonc equivalent):
  - "@sitebender/toolsmith/": "https://deno.land/x/sitebender_toolsmith@v0.0.0/src/"
  - "@sitebender/architect/": "https://deno.land/x/sitebender_architect@v0.0.0/src/"
  - "@sitebender/pagewright/": "https://deno.land/x/sitebender_pagewright@v0.0.0/src/"
  - etc.

Deno tasks (generated app expectations)
- steward:check, steward:fix (calls into libraries/steward)
- warden:enforce (calls into libraries/warden)
- axe:check (warn mode initially)
- test scaffolds (index.test.ts per function) where functions exist

Sample dry‑run plan (what quartermaster:dry‑run will print later; no writes)
```json
{
  "blueprint": "athenaeum",
  "outputs": {
    "appPath": "./applications/mission-control"
  },
  "files": [
    // Example, once templates exist:
    // { "targetPath": "deno.jsonc", "mode": "template", "sourcePath": "templates/deno.dev.jsonc", "substitutions": { "name": "mission-control" } }
  ],
  "importMap": {
    "dev": {
      "imports": {
        "@sitebender/toolsmith/": "./libraries/toolsmith/src/",
        "@sitebender/architect/": "./libraries/architect/src/",
        "@sitebender/pagewright/": "./libraries/pagewright/src/"
      }
    },
    "prod": {
      "imports": {
        "@sitebender/toolsmith/": "https://deno.land/x/sitebender_toolsmith@v0.0.0/src/",
        "@sitebender/architect/": "https://deno.land/x/sitebender_architect@v0.0.0/src/",
        "@sitebender/pagewright/": "https://deno.land/x/sitebender_pagewright@v0.0.0/src/"
      }
    }
  },
  "denoTasks": {
    "steward:check": "deno task --cwd ../../libraries/steward steward:check",
    "steward:fix": "deno task --cwd ../../libraries/steward steward:fix",
    "warden:enforce": "deno task --cwd ../../libraries/warden enforce",
    "axe:check": "echo \"axe warn-only placeholder\""
  },
  "postScaffoldMessages": [
    "Run steward:check and warden:enforce to verify governance.",
    "axe:check is warn-only during alpha; finalize allowlists before production."
  ],
  "seed": {}
}
```

Authoring notes
- Blueprints are static JSON files stored under libraries/quartermaster/src/blueprints/.
- The dry‑run architect will read the blueprint and toggles, then print a deterministic plan:
  - Sorted file list (by targetPath), sorted object keys, stable indentation/newlines.
- Apply mode is deferred; stubs only print help for now.

Conventions to enforce in generated code (when templates arrive)
- Public function file path: src/functionName/index.ts (export function functionName() {})
- Private helper path: src/functionName/_helperName/index.ts (export function _helperName() {})
- Envoy `//++` markers on all exported functions.
- No barrels; direct file imports only.
