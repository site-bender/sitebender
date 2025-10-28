# @sitebender/steward (Studio: “Steward”)

Deterministic, non-configurable Studio style and structure enforcer. Steward normalizes code shape and folder layout up-front so downstream tools (Envoy, Auditor, Artificer, Warden) operate on a predictable surface. It complements Warden by focusing on mechanical style/shape with safe autofixes; Warden remains the source of truth for architectural governance and cryptographic contracts.

Status: alpha (spec + stubs)
Runtime: Deno + TypeScript, pure ESM, zero runtime deps (uses Arborist/TS compiler for AST in dev tooling)
Policy: Opinionated, no user overrides. Studio rules only.

## Goals

- Enforce Studio style guide and folder privacy conventions with zero configuration.
- Provide high-quality autofixes where safe; stabilize printing via `deno fmt`.
- Emit machine- and human-friendly diagnostics (JSON + pretty).
- Run fast (repo-wide target ≤ ~2–3s for checks/fixes on typical laptops).
- Reduce Warden false positives by normalizing input shape before governance checks.

## Non-goals

- Replace Warden (contracts, imports governance, privacy boundaries, hash locking).
- Become a general-purpose linter/formatter for non-Studio projects.
- Support user configuration to weaken rules.

## Relationship to Warden

- Steward runs first: format/shape normalization + safe autofixes.
- Then `deno fmt` for canonical printing.
- Then Warden for governance (imports, privacy boundaries, contract validation).
- CI Policy (alpha): PR warn gate; main hard-fail (aligned with Warden).

## Commands (planned)

- `steward:check`
  - Validate repository or specified paths and exit non-zero on violations.
  - Outputs both pretty text and JSON diagnostics.
- `steward:fix`
  - Apply safe autofixes, re-run `deno fmt`, and re-check.
  - Prints summary (fixed, remaining, suppressed).

These will be exposed as Deno tasks in this package and embeddable in root-level automation.

## Rule Matrix (initial)

Legend:

- Mode: check (diagnose only), fix (safe autofix)
- Severity: error (blocks), warn (PR-warn), info (advice)
- Source of truth: Studio rules (this repo), Warden (contracts), Deno fmt/lint (baseline)

1. export_on_same_line

- Intent: Exports must be declared on the same line as the named function/const.
- Mode: fix (rewrite where safe), check for complex cases (e.g., re-export patterns).
- Severity: error
- Notes: Uses AST to move `export` keyword into the declaration where allowed.

2. named_functions_only

- Intent: No anonymous functions assigned to identifiers; require `function name(...)` or `const name = namedFn`.
- Mode: check; optional fix where name inference is unambiguous.
- Severity: error
- Notes: Arrow functions must be assigned to a const with a clear name.

3. one_function_per_file

- Intent: Production files define one public function per file; helpers live under `_helper` folders as per privacy convention.
- Mode: check; codemod suggestion emitted (no auto split in alpha).
- Severity: error
- Notes: Test files and clearly-marked script files are exempt (policy list TBD).

4. envoy_comment_syntax

- Intent: Enforce Envoy comment markers and placement:
  - `//++` description
  - `//--` tech debt
  - `//??` help/examples
  - `//!!` critical
  - `//>>` links
- Mode: check; fix (normalize prefixes and spacing).
- Severity: warn (alpha), error (pre-prod)
- Notes: Ensures comments are near declarations and follow structured layout.

5. import_normalization (direct tree imports only)

- Intent: Ban barrel usage and blanket re-exports; normalize import paths to direct-tree form, sorted deterministically.
- Mode: fix (path normalization and sorting), check (disallowed forms).
- Severity: error
- Notes: Coordinate with Warden to ensure governance rules match normalized form.

6. privacy_folder_convention

- Intent: File and folder naming must reflect privacy boundaries:
  - Public function: `src/functionName/index.ts`
  - Private helper: `src/functionName/_helperName/index.ts`
  - Shared private at LCA: `src/_sharedHelper/index.ts`
- Mode: check; fix (rename/move) gated by dry-run confirmation (alpha: diagnose only).
- Severity: error
- Notes: For safety, default to suggestions with a codemod plan in JSON.

7. ban_barrel_files

- Intent: Forbid index-like “barrel” modules that re-export trees (e.g., `mod.ts` serving as a barrel). A `mod.ts` may exist as a warning-only sentinel but must not perform re-export aggregation.
- Mode: check; fix (remove disallowed re-exports) optional; prefer explicit imports.
- Severity: error
- Notes: Aligns with “no barrel files” policy in Studio overview.

### Additional considerations

- TypeScript strictness: prefer strict types, curried functions; no ambient any. Steward may surface advisory checks; enforcement remains in tsconfig and Warden.
- Test layout: co-located `index.test.ts` near functions, as per Warden docs.

## Diagnostics: JSON schema (draft)

Steward emits a stable JSON diagnostic stream suitable for CI and IDE integration.

```json
{
	"version": "0.1.0",
	"summary": {
		"checkedFiles": 123,
		"issues": 45,
		"fixed": 32,
		"elapsedMs": 1870
	},
	"issues": [
		{
			"rule": "export_on_same_line",
			"severity": "error",
			"path": "libraries/toolsmith/src/foo/index.ts",
			"position": { "line": 12, "column": 1 },
			"message": "Export must be on the same line as declaration.",
			"suggestedFix": {
				"type": "textEdit",
				"description": "Move export keyword to declaration.",
				"edits": [
					{
						"range": {
							"start": { "line": 12, "column": 1 },
							"end": { "line": 12, "column": 1 }
						},
						"newText": "export "
					}
				]
			}
		}
	]
}
```

TypeScript types (reference):

```ts
export interface StewardPosition {
	line: number
	column: number
}
export interface StewardRange {
	start: StewardPosition
	end: StewardPosition
}

export type StewardSeverity = "info" | "warn" | "error"

export interface StewardTextEdit {
	range: StewardRange
	newText: string
}

export interface StewardIssue {
	rule: string
	severity: StewardSeverity
	path: string
	position?: StewardPosition
	message: string
	suggestedFix?: {
		type: "textEdit" | "rename" | "move"
		description?: string
		edits?: StewardTextEdit[]
	}
}

export interface StewardReport {
	version: string
	summary: {
		checkedFiles: number
		issues: number
		fixed?: number
		elapsedMs: number
	}
	issues: StewardIssue[]
}
```

## Execution model

1. Parse with Arborist (TS compiler) → AST.
2. Run rule pipeline:
   - Checkers collect issues (with fixers where available).
   - Fixers apply safe transforms; then `deno fmt` for stable print.
3. Re-check until stable or max 2 passes.
4. Emit diagnostics and exit code (0 when clean; non-zero if issues remain in `check`, or if fixes failed in `fix`).

## Performance targets (alpha)

- Repo-wide `steward:check` ≤ 2–3s typical; `steward:fix` ≤ 4–5s with two passes.
- Zero false positives target; failing cases must be documented with reproduction and test.

## CI integration (proposal)

- PR: Steward check runs; surfaces warnings/errors; configurable “warn gate” during alpha.
- main: Hard-fail on any error.
- Output artifacts: JSON diagnostics stored for audit; pretty output to console.

## Tasks (to be wired in this package)

- `deno task steward:check` → `deno run -A src/cli/check.ts [paths...]`
- `deno task steward:fix` → `deno run -A src/cli/fix.ts [paths...]`

## Repository layout (package)

```
libraries/steward/
  deno.jsonc
  README.md
  src/
    cli/
      check.ts            # entry, args → runner
      fix.ts              # entry, args → runner (with fix=true)
    diagnostics/
      toJson/index.ts     # serialize to StewardReport
      toPretty/index.ts   # human-readable summary
    rules/
      exportOnSameLine/index.ts
      namedFunctionsOnly/index.ts
      oneFunctionPerFile/index.ts
      envoyCommentSyntax/index.ts
      importNormalization/index.ts
      privacyFolderConvention/index.ts
      banBarrelFiles/index.ts
    runner/
      runChecks/index.ts  # orchestrates parse → rules → report
      applyFixes/index.ts # applies transforms; re-run fmt
```

## Open items

- Carve exact exemptions (tests, fixtures).
- Finalize JSON schema and pretty formatting styles.
- Rule-by-rule unit/property tests (Quarrier + Auditor later).
- Wire deno tasks and minimal CLI stubs.
