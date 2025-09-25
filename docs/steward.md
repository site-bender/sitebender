# Steward (@sitebender/steward) — Design, Commands, Integration (Alpha)

Purpose
- Deterministic, non-configurable enforcement of Studio style/shape with safe autofixes.
- Runs before Warden to normalize surface area, reduce governance noise, and simplify downstream tools (Envoy, Auditor).
- Uses Arborist (TypeScript compiler) for AST-precise analysis; zero runtime deps in libraries remain intact.

Scope boundaries
- Steward: formatting, structure, naming, imports shape/order, comment syntax, a subset of FP/error-handling checks that are mechanical and/or automatable.
- Warden: architectural contracts, privacy/import governance, cryptographic hashes, CI gating policy. Steward defers to Warden for governance.

Execution order
1) Steward fix (safe transforms)
2) deno fmt (stable printing)
3) Steward check (must be clean)
4) Warden enforce (governance) → CI policy (PR warn, main block)
5) Optional: axe (accessibility), coverage gates

Commands (alpha stubs)
- deno task steward:check → deno run -A libraries/steward/src/cli/check.ts
  - Read-only checks, JSON+pretty diagnostics, exit non-zero on issues (planned).
- deno task steward:fix → deno run -A libraries/steward/src/cli/fix.ts [--dry-run]
  - Safe autofixes, then fmt, then re-check (planned).

Diagnostics (contract, draft)
- JSON file shape (see README and docs/steward-rules.md for schema):
  - version, summary, issues[]
  - Each issue: rule, severity, path, position, message, suggestedFix? (textEdit | rename | move)
- Pretty console output mirrors JSON to aid local dev; JSON is CI artifact.

Rule inventory
- The consolidated rule list is maintained in docs/steward-rules.md.
- Sources synthesized:
  - .continue/rules and .continue/rulesets
  - docs/studio-overview.(yaml|md)
  - scripts/enforce* (reference only)

Initial fix-capable set (alpha)
- export_on_same_line (AST)
- code_style_formatting (fmt + Steward post-pass for blank-line semantics)
- import_order_grouping (group realms, alphabetize, single blank lines)
- direct_tree_imports_only (normalize deep paths where policy confirms)
- envoy_comment_syntax (spacing/prefix normalization only)

Initial check-only set (alpha)
- one_function_per_file (codemod plan JSON for safe moves)
- named_functions_only (fix only when trivial)
- privacy_folder_convention (codemod plan JSON)
- no_barrel_files (export … from …)
- functional_programming_canon subset (no class, no throw)
- error_handling_monadic (flag throw/new Error)
- no_web_components (Shadow DOM)
- no_react_vdom_and_related_props (React-isms)
- envoy_markers_mandatory_for_exports (//++ presence)

Advisory/process (reported as info/warn)
- dependency_hierarchy, naming_conventions, accessibility_policy, data_privacy_local_first, tests_co_located_and_canonical, git_discipline, assistant_compliance, seven_deadly_sins
- enforcement_order, diagnostics_schema, performance_targets

Performance targets (alpha)
- check ≤ ~2–3s repo-wide typical
- fix ≤ ~4–5s with ≤ 2 passes
- zero false positives goal; any exceptions documented with reproduction and tests

Integration plan
- Package-level deno.jsonc provides tasks (stubs now)
- Root CI:
  - PR: steward:check (warn gate in alpha), warden:enforce (warn)
  - main: steward:check (block), warden:enforce (block)
- Artifacts: Steward JSON diagnostics stored per run; summarized in job logs

Open confirmations requested (see docs/steward-rules.md)
- direct_tree_imports_only vs imports.yaml policy on @sitebender/* cross-library imports
- Arrow function allowance when assigned to const with clear name
- Envoy block comment “|” margins applicability

References
- docs/steward-rules.md (rule inventory + mapping)
- libraries/steward/README.md (spec + JSON schema)
- docs/studio-overview.(yaml|md) (authoritative Studio overview)
