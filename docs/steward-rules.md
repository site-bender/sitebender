# Steward Rule Inventory (Alpha Draft)

Scope
- Steward enforces deterministic, non-configurable Studio style/shape rules with safe autofixes where possible. Governance (privacy/import contracts, cryptographic hashes) remains the responsibility of Warden.
- This inventory consolidates rules from:
  - .continue/rules/*
    - architecture(-naming-conventions).yaml, assistant-compliance.yaml, code-style.(md|yaml), core-philosophy*.yaml, data-privacy.yaml, envoy-style.yaml, error-handling.yaml, functional-programming.md, git-discipline.yaml, guardrails.yaml, imports.(md|yaml), no-web-components.yaml, one-function-one-file.md, prime-directive.md, seven-deadly-sins.yaml, stable-header.yaml, testing.yaml, toolsmith-fp.yaml
  - .continue/rulesets/*
    - architecture.yaml, core-philosophy.yaml
  - docs/studio-overview.(yaml|md) (authoritative for Studio)
  - scripts/enforce* (reference-only: prior art)

Legend
- Mode: check | fix | codemod (machine-generated move/rename plan only) | advisory (non-automatable, surfaced as info)
- Severity: error | warn (alpha: PR warn, main block later)
- Source: canonical origin (file[s]) guiding policy
- Notes: implementation sketch/nuance

Global hard lines (non-negotiable)
- ZERO arrow functions anywhere. Ever. No anonymous functions. All functions are named and use the function keyword.
- No classes and no interfaces (unless explicitly permitted by an approved exception).
- No any. No unknown without explicit permission (documented where used).
- Private helpers naming convention: BOTH the folder AND the function name are prefixed with an underscore (example: src/foo/_bar/index.ts exports function _bar()).
- Naming conventions:
  - Functions: camelCase
  - Components: PascalCase
  - Constants: SCREAMING_SNAKE_CASE
  - Types: PascalCase

## A. Core Style and Structure

1) one_function_per_file
- Description: Each function in its own folder with index.ts; tests in index.test.ts; types in types/index.ts; constants in constants/index.ts.
- Mode: check (codemod plan in JSON for safe moves)
- Severity: error
- Source: core-philosophy-one-function-one-file.yaml, one-function-one-file.md, studio-overview.yaml
- Notes: Identify multiple exported functions per file (excluding index.test.ts). Suggest split plan; do not auto-split in alpha.

2) named_functions_only (ZERO arrow functions)
- Description: Only named function declarations. ZERO arrow functions anywhere (including callbacks and returned functions). No anonymous functions of any kind.
- Mode: check (fix where trivial by generating a named function wrapper only when semantics are guaranteed)
- Severity: error
- Source: studio-overview.yaml, toolsmith-fp.yaml + explicit directive above
- Notes: Curried APIs must be expressed with named function declarations at each layer.

3) export_on_same_line
- Description: Export keyword on the same line as the declaration; no trailing re-aggregation exports from the same file scope.
- Mode: fix (safe)
- Severity: error
- Source: studio-overview.yaml
- Notes: Move export into declaration; forbid `export { foo }` to re-export a local declaration.

4) privacy_folder_convention (underscore rule)
- Description: Public vs private foldering:
  - Public function: `src/functionName/index.ts` (exports functionName)
  - Private helper: `src/functionName/_helperName/index.ts` AND exported function is `_helperName`
  - Shared private at LCA: `src/_sharedHelper/index.ts` AND exported function is `_sharedHelper`
  - No generic “utils/helpers” buckets.
- Mode: check (codemod plan; rename + move suggestions)
- Severity: error
- Source: studio-overview.yaml + clarification above
- Notes: Validate folder names, function names, and underscore boundaries; no cross-underscore imports.

5) envoy_comment_syntax
- Description: Structured comment markers with placement:
  - //++ above exported entities; mandatory for exports (no blank line between //++ and the element)
  - //?? help examples/gotchas with one blank line above
  - //-- tech debt with reason and plan
  - //!! critical with categories
  - //>> references with Markdown link syntax
  - Multi-line via block comments with | margins; do not stack // lines for multi-line prose
- Mode: check (minor fix for spacing/prefix only)
- Severity: warn → error before prod
- Source: envoy-style.yaml
- Notes: Check placement and categories; avoid heavy rewrites.

6) code_style_formatting
- Description: Formatting canon: tabs, soft 80 cols, no semicolons, Array<T> over T[], spaces around operators, object/array spacing, param spacing, trailing commas (multi-line only), blank-line policies (before return, between statement types, etc.).
- Mode: fix (prefer deno fmt + Steward post-pass where needed)
- Severity: error
- Source: code-style.(md|yaml), stable-header.yaml
- Notes: Let deno fmt set baseline; Steward enforces rules fmt doesn’t cover (blank-line semantics, special spacing).

7) stable_header
- Description: Keep stable cache-friendly header text (for agents) byte-identical where mandated.
- Mode: advisory
- Severity: warn
- Source: stable-header.yaml

## B. Imports and Modularity

8) no_barrel_files
- Description: Forbid barrels or re-exports (export * from …, export {…} from …, default re-exports). A mod.ts may exist as a warning-only sentinel but must not aggregate re-exports.
- Mode: check (optionally remove unsafe re-exports)
- Severity: error
- Source: studio-overview.yaml, imports.(md|yaml), guardrails.yaml
- Notes: AST-based detection; suggest direct imports.

9) direct_tree_imports_only
- Description: Use deep paths to the precise module; no blanket barrels or alias-based aggregation. Imports must resolve deterministically to a single file.
- Mode: fix (normalize paths), check
- Severity: error
- Source: studio-overview.yaml, scripts/enforceImports (reference)
- Notes: Repo policy forbids barrels; import maps in apps may map to local libs, but still resolve to precise files. No package-level alias re-exports.

10) import_order_grouping
- Description: Group and order by realms; alphabetize within group; single blank line between groups.
- Mode: fix (sort + group), check
- Severity: error
- Source: imports.(md|yaml), guardrails.yaml
- Notes: Types with `type` keyword grouped first.

11) dependency_hierarchy
- Description: One-directional flow; no cycles; deleting folder deletes feature; hierarchy is the graph.
- Mode: advisory (Warden/analysis tool)
- Severity: warn
- Source: architecture.yaml, rulesets/architecture.yaml

12) naming_conventions (expanded)
- Description:
  - Functions: camelCase
  - Components: PascalCase
  - Constants: SCREAMING_SNAKE_CASE
  - Types (type aliases): PascalCase
- Mode: check (advisory → error where reliable)
- Severity: warn (alpha)
- Source: architecture-naming-conventions.yaml + explicit clarification above

## C. FP Discipline and Error Handling

13) functional_programming_canon
- Description: No classes, no interfaces (unless explicitly permitted); immutable data; pure functions with explicit IO boundaries.
- Mode: check (tractable subsets)
- Severity: error
- Source: core-philosophy-functional-programming.yaml, functional-programming.md, guardrails.yaml, toolsmith-fp.yaml + clarification above

14) toolsmith_first
- Description: Use toolsmith functions (vanilla/lifted) rather than JS OOP methods; no external FP libs; use Result/Validation/Task… monads for effects/errors.
- Mode: check (advisory + targeted checks)
- Severity: warn → error for forbidden libs
- Source: toolsmith-fp.yaml

15) error_handling_monadic
- Description: No thrown exceptions; use Result/Validation; accumulate errors where relevant; graceful failure patterns.
- Mode: check (trace throw/new Error usage)
- Severity: error
- Source: error-handling.yaml

16) no_any_no_unknown_without_permission
- Description: Forbid any; forbid unknown unless explicitly permitted and documented at the use site.
- Mode: check
- Severity: error
- Source: strict typing policy (typescript in studio-overview + clarification above)

## D. Accessibility, Web Policies, Privacy

17) accessibility_policy
- Description: Enforce semantic HTML/ARIA via components; axe gating (warn → hard-fail).
- Mode: advisory
- Severity: warn
- Source: studio-overview.yaml

18) no_web_components
- Description: Forbid Shadow DOM/Web Components.
- Mode: check
- Severity: error
- Source: no-web-components.yaml

19) data_privacy_local_first
- Description: Local-first; explicit consent for network requests; minimize data collection.
- Mode: advisory
- Severity: warn
- Source: data-privacy.yaml

## E. Docs, Tests, Git Discipline

20) envoy_markers_mandatory_for_exports
- Description: All exported entities documented with //++ description (and optional categorized help/comments as per Envoy style).
- Mode: check
- Severity: warn → error
- Source: envoy-style.yaml, studio-overview.yaml

21) tests_co_located_and_canonical
- Description: One test per function (index.test.ts) beside the implementation; tests follow same style rules; use Deno.test; determinism; coverage rules and ignore protocol.
- Mode: advisory (check skeleton presence)
- Severity: warn
- Source: testing.yaml, studio-overview.yaml

22) git_discipline
- Description: Atomic commits; Conventional Commits; pre-commit gates must run green (fmt, lint, test, typecheck).
- Mode: advisory
- Severity: warn
- Source: git-discipline.yaml

23) assistant_compliance
- Description: AIs must comply with rules, avoid speculative imports, ask when unsure.
- Mode: advisory
- Severity: warn
- Source: assistant-compliance.yaml

24) seven_deadly_sins
- Description: Cultural guidance (avoid assumptions, premat. opt, etc.).
- Mode: advisory
- Severity: info
- Source: seven-deadly-sins.yaml

## F. React/VDOM-Prohibition (from Studio + scripts)

25) no_react_vdom_and_related_props
- Description: No React, no VDOM; forbid React-isms where they leak into code:
  - dangerouslySetInnerHTML, className, htmlFor, direct createElement usage/imports
- Mode: check
- Severity: error
- Source: studio-overview.yaml; scripts/enforceNoReactJunk (reference)
- Notes: Implement with AST (identify identifiers/JSX attributes precisely). Suggest replacements (class, for, JSX).

## G. Steward-Oriented Execution Rules

26) enforcement_order
- Description: Steward (autofixes/checks) → deno fmt → Warden governance; re-check to stability (max 2 passes).
- Mode: process
- Severity: n/a
- Source: studio-overview.(yaml|md)

27) diagnostics_schema
- Description: Uniform JSON diagnostics with pretty console companion; include rule id, severity, path, position, message, suggestedFix (textEdit/rename/move) where applicable.
- Mode: output contract
- Severity: n/a
- Source: Steward README/spec

28) performance_targets
- Description: Repo-wide check ≤ 2–3s typical; fix ≤ 4–5s; zero false positives target; document exceptions.
- Mode: target
- Severity: n/a
- Source: Steward README/spec

Potential Conflicts / Clarifications (tracked)
- direct_tree_imports_only vs imports.yaml “cross-library use @sitebender namespace”:
  - Repo policy forbids barrels; deep, precise paths are required. Import maps may provide roots but still must resolve to precise files. No alias aggregation.
- Envoy block comment “|” margins and multi-line guidance:
  - Required for multi-line prose (module-level and long documentation blocks).

Steward Rule Keys (stable identifiers)
- one_function_per_file
- named_functions_only (ZERO arrow)
- export_on_same_line
- privacy_folder_convention (folder+function underscore)
- envoy_comment_syntax
- code_style_formatting
- no_barrel_files
- direct_tree_imports_only
- import_order_grouping
- dependency_hierarchy (advisory)
- naming_conventions (functions camelCase, components PascalCase, constants SCREAMING_SNAKE_CASE, types PascalCase)
- functional_programming_canon (no classes/interfaces unless explicit exception)
- toolsmith_first
- error_handling_monadic
- no_any_no_unknown_without_permission
- accessibility_policy (advisory)
- no_web_components
- data_privacy_local_first (advisory)
- envoy_markers_mandatory_for_exports
- tests_co_located_and_canonical (advisory)
- git_discipline (advisory)
- assistant_compliance (advisory)
- seven_deadly_sins (advisory)
- no_react_vdom_and_related_props
- enforcement_order (process)
- diagnostics_schema (process)
- performance_targets (process)

Implementation mapping (initial)
- fix-capable (alpha): export_on_same_line, code_style_formatting (fmt+post), import_order_grouping, direct_tree_imports_only (path normalization), envoy_comment_syntax (spacing/prefix), naming_conventions (where safe)
- check-only (alpha): one_function_per_file, named_functions_only (ZERO arrow), privacy_folder_convention, no_barrel_files, functional_programming_canon (subset), error_handling_monadic (no throw), no_web_components, no_react_vdom_and_related_props, envoy_markers_mandatory_for_exports, no_any_no_unknown_without_permission
- codemod-plan (alpha): one_function_per_file splits, privacy_folder_convention moves
- advisory/process: dependency_hierarchy, accessibility_policy, data_privacy_local_first, tests_co_located_and_canonical, git_discipline, assistant_compliance, seven_deadly_sins, enforcement_order, diagnostics_schema, performance_targets

Appendix: References
- .continue/rules/* and rulesets/* (see repository)
- docs/studio-overview.yaml (authoritative)
- scripts/enforceImports/*, enforceEnvoyStyle/*, enforceNoReactJunk/* (prior art to supersede)
