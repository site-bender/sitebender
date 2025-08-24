# Adaptive Work-in-Progress Prompt

Date: 2025-08-24

This document captures the exact state of the ongoing work so we can resume seamlessly next session.

## Ground rules
- See CLAUDE.md (prime directive: do not assume; progressive enhancement; accessibility; relative imports in libraries; one function/component per folder; zero-deps mindset).
- Follow PLAN_OF_ATTACK.md (JSX → IR → SSR/SSG + hydration; registries; ComposeContext; versioned schema; tests).
- Strict FP: avoid `let` and imperative loops. Prefer pure functions, immutability, and declarative transforms (`map`, `reduce`, `filter`, recursion when needed). Public surfaces return Result/ResultAsync; no thrown exceptions.

## Current state
- IR types created at `libraries/adaptive/src/types/json/ir/index.ts` (v "0.1.0").
- Deterministic ID util added: `libraries/adaptive/src/runtime/id.ts` (SHA-256→base58(12) placeholder for blake3) with `makeNodeId(parts, 12)`.
- ComposeContext defaults to local bus; broadcast is opt-in via `busMode: 'broadcast'`: `libraries/adaptive/src/context/composeContext.ts`.
- IR embed helper: `libraries/adaptive/src/rendering/embedIr.ts` (single `<script type="application/adaptive+json" id="ir-root">…`).
- Hydrator skeleton: `libraries/adaptive/src/runtime/hydrator.ts` (parse IR, walk, resolve anchors by `data-ir-id` then DOM id).
- Registries skeletons:
  - `libraries/adaptive/src/operations/registries/operators.ts`
  - `libraries/adaptive/src/operations/registries/injectors.ts`
  - `libraries/adaptive/src/operations/registries/comparators.ts`
- PLAN_OF_ATTACK.md updated with locked decisions (namespaces From/Op/When/Act/On, ID scheme base58(12), IR embedding strategy, bus scopes, MVP set).

## Decisions locked
- Namespaces: `From.*`, `Op.*`, `When.*`, `Act.*`, `On.*`.
- Version: `v = "0.1.0"` semver.
- IDs: `"n_" + base58(blake3(input)).slice(0, 12)`; route path as pageSeed; extend to 14 chars on rare collision.
- IR embedding: single root script `#ir-root` + per-element `data-ir-id`.
- Bus: default local (DOM CustomEvent); BroadcastChannel/WebSocket opt-in only.
- Comparators naming: `When.MinLength` (>=), `When.GreaterThan`, `When.GreaterThanOrEqual`, `When.LessThan`, `When.LessThanOrEqual`, `When.IsEmailAddress`, `When.Equals`, `When.Not`.

## Next actions
1) Wire registries to existing adaptive executors (minimal MVP):
   - Injectors: `From.Constant`, `From.Element`, `From.QueryString`, `From.LocalStorage`.
   - Operators: `Op.Add`, `Op.Multiply`.
   - Comparators: `When.And`, `When.MinLength`, `When.IsEmailAddress`, `When.Equals`, `When.Not`.
   - Actions: `Act.SetValue`, `Act.Submit`, `Act.SetQueryString`, `Act.Publish`.
   - Events: `On.Input`, `On.Change`, `On.Blur`, `On.Submit`.
2) Implement namespaced JSX wrappers in components under `libraries/components/src/transform/` using existing structure; ensure 1:1 mapping to adaptive constructors.
3) Minimal SSR renderer pass to output semantic HTML + `data-ir-id` and include the `ir-root` script (no React/Preact). Consider extending `rendering/ssrRenderAdaptive` or a new entry aligning with IR.
4) Hydrator: build composition from registries, bind events, evaluate graphs; honor `ValidatorNode.mode` default accumulate within validation.
5) Tests (behavioral + snapshots):
   - Golden: JSX → IR → SSR HTML snapshot.
   - Smoke: registry resolution, SSR render returns string, hydrator attaches handlers.
   - Accessibility: basic axe check on the form demo.
6) Demo: simple form with email + When.MinLength + Op.Add total calculation; SSR works without JS; hydration enhances.

## Open notes
- Replace SHA-256 with blake3 when available (same API). Keep base58 length at 12 (extend to 14 on intra-page collision).
- Reserve topics with `sys:*` prefix for internal events. Cross-tab/device opt-in per publish/subscribe.
- Temporal: prefer `PlainDate`, `PlainDateTime`, `ZonedDateTime` in datatypes.

## References
- CLAUDE.md — project rules, progressive enhancement, accessibility, code style.
- PLAN_OF_ATTACK.md — authoritative plan, updated with locked decisions.

Resume by starting at “Next actions → 1) Wire registries …”.
