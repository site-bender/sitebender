# Scripts

This folder contains maintenance and analysis scripts used across the repo. CLIs follow a consistent interface with:

- --help to show usage
- --version to print the tool version
- --dry-run for no-op runs when applicable

## analyze-files

Analyze TS/TSX source files for size and function length outliers with a focus on default-exported units (one function or component per file).

Usage:

    analyze-files [--root <path>] [--folders a,b] [--exclude x,y] [--max-fn-lines N] [--concurrency N] [--no-barrels] [--json]

Flags:

- --root: root folder to scan (defaults to current working folder)
- --folders: comma-separated folders under root to scan (defaults to: libraries, scripts, docs, playground)
  - Alias: --dirs (kept for compatibility)
- --exclude: comma-separated folder names to exclude anywhere in the tree (defaults include node_modules, dist, build, coverage, fixtures, tests, constants, types)
- --max-fn-lines: threshold for flagging long functions (default 60)
- --concurrency: number of files analyzed in parallel (default 8, max 64)
- --json: emit machine-readable output
  Behavior:
- Only .ts and .tsx files are scanned by default (we exclude .js/.jsx to avoid noise).
- Only default-exported functions/components are counted; named-only utilities in a file are ignored.
- Barrel files are excluded by default (index.ts/tsx and files with many export aggregations). Pass --no-barrels to include them.

JSON schema (shape):

{
"root": string,
"scannedFiles": number,
"threshold": number,
"fileStats": {
"longestFile": { "path": string, "lines": number },
"mean": number,
"median": number,
"stdDev": number
},
"functionStats": {
"total": number,
"mean": number,
"median": number,
"stdDev": number
},
"longFunctions": [
{
"name": string,
"startLine": number,
"endLine": number,
"loc": number,
"file": string
}
]
}

Notes:

- The default exclusions include constants and types to match our folder conventions.
- Only .ts and .tsx files are scanned by default (changeable in code if needed).

# Scripts

Deno-first, workspace-wide automation for build, quality, and developer workflows. Every script is a small, focused function that can run as a library (import and call) or a CLI (via import.meta.main).

## Conventions (applied here)

- One function per folder; function file is `index.ts` and is the default export.
- Helpers live under the function folder; promote only when shared by multiple functions.
- Named exports for shared types and constants live under `scripts/types` and `scripts/constants`.
- Keep functions pure and parameterized; use DI for filesystem/process when needed for testability.
- Gate CLI behavior with `if (import.meta.main) { … }` and exit with a non-zero code on failures.

## What lives here and why

These scripts are centralized at the repo root because they address cross-cutting concerns and operate across multiple packages. Keeping them here avoids duplicating tooling per package and makes tasks consistent.

## Key functions by area

Build and serve

- build/ — Orchestrates site builds for docs/apps. Fast dev variants and asset-copy helpers live under this folder.
- serve/ — Local dev server and file watching utilities.

Quality gates and maintenance

- sortImports/ — Stable, repo-wide import ordering used by format tasks and pre-commit.
- enforceFP/ — Functional style checks specific to this repo’s canon.
- enforceImports/aliasGuards/ — Prevents deep/forbidden imports; suggests alias-based replacements. CLI prints violations and exits non-zero. Types under `enforceImports/aliasGuards/types` and walker in `helpers/findViolations`.
- enforceNoReactJunk/ — Lints for stray React-isms not used by Sitebender.
- findUnformatted/ — Detects files needing formatting.

Coverage and reporting

- coverage/ — Helpers to run and aggregate coverage for targeted areas.
- reportIgnored/ — Reports ignore markers and coverage gaps; supports dependency injection for scanning roots.

Developer workflow

- hooks/install/ — Installs a pre-commit hook that runs format/lint/type-check and (optionally) alias guard. Set `SKIP_ALIAS_GUARD=1` to bypass alias checks in the hook when working offline.
- setup/ — One-time workspace setup tasks.
- clean/ — Removes build artifacts.

Examples and demos

- jsx/ — A tiny TSX-to-IR demo pipeline used for experimentation and documentation.

## How to run

Most entry points are exposed as Deno tasks in the root `deno.jsonc` (and app-specific tasks in `docs/deno.jsonc`). From the repository root:

```bash
# Quality
deno task type-check
deno task lint:aliases

# Coverage reporters
deno task coverage:report:ignored

# Git hook installation
deno task hooks:install
```

You can also run any function directly:

```bash
deno run -A scripts/enforceImports/aliasGuards/index.ts
deno run -A scripts/reportIgnored/index.ts
```

## Tests

- Location: `scripts/tests/**`
- Style: behavioral/integration/property-based only. We test outcomes, not internals.
- FS and process interactions: pass in dependencies (DI) or use synthetic files/folders. No ad-hoc global stubbing.

Run tests locally:

```bash
deno test --unstable-temporal --allow-read --allow-write 'scripts/tests/**/*.test.ts'
```

Coverage status (at last update):

- Overall scripts: ~87% branches / ~91% lines
- Biggest gap: CLI branches guarded by `import.meta.main` (not exercised by library-mode tests)

## Import paths

Scripts use relative imports to remain location-agnostic and to avoid build tooling:

- Docs/app code: `../../docs/src/...`
- Libraries: `../../libraries/<name>/src/...`

## Current status and recent cleanup

- All legacy, single-file wrappers were removed in favor of the one-function-per-folder structure (for example: `aliasGuards.ts`, `hooks/install.ts`, `jsx.ts`). Tasks point directly at foldered modules.
- Types for alias-guard violations live under `scripts/enforceImports/aliasGuards/types`.
- Tests pass; type-check and lint pass in CI.

## Next steps

- Add CLI smoke tests that execute `import.meta.main` paths to close branch coverage gaps for:
  - `enforceImports/aliasGuards/index.ts`
  - `reportIgnored/index.ts`
- Push coverage toward 100% by exercising edge cases in reporters and walkers.
- Continue auditing `scripts/` to ensure every public function follows the one-function-per-folder convention.
- Keep deno task definitions in sync with moved/renamed scripts.

## Troubleshooting

- Using zsh: be sure to quote globs (e.g., `'scripts/tests/**/*.test.ts'`).
- If alias guard is too noisy during local exploration, set `SKIP_ALIAS_GUARD=1` when installing hooks or running the hook manually.
- If a script unexpectedly fails to find files, verify your cwd and provided root paths; prefer absolute paths in CI.
