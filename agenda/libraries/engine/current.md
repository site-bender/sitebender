# Engine — current

Reality snapshot (as of 2025-09-05)

- Registries: explicit registries exist for actions, comparators, events, injectors, operators; default executors are registered at hydrate time.
- Injectors: `From.Constant`, `From.Authenticator` (reads `ctx.localValues` with safe dot-path), `From.Element`, `From.QueryString`, `From.LocalStorage` implemented.
- Operators: `Op.Add`, `Op.Multiply`, `Op.Ternary` implemented in defaults; evaluator composes async and reduces values safely with coercions.
- Comparators: Logical (`Is.And`, `Is.Or`, `Is.Not`), equality (`Is.EqualTo`, `Is.UnequalTo`), string (`Matches`, `DoesNotMatch`), length (`Is.NotEmpty`, `Is.NoShorterThan`, `Is.NoLongerThan`), set membership (`InSet`). Temporal families (Date/Time/DateTime) are conditionally registered when Temporal is available.
- Actions: `Act.SetValue`, `Act.Submit`, `Act.SetQueryString`, `Act.Publish`, and conditional `Act.If` (executes nested action graph based on comparator result).
- Events: Binders for `On.Input`, `On.Change`, `On.Blur`, and a special `On.Submit` that prevents default navigation and delegates to actions.
- Hydration: `runtime/hydrator` resolves anchors, binds events, and evaluates validators eagerly/once (MVP). It wires registries via `registerDefaultExecutors()` with a `ComposeContext` created for the client.
- ComposeContext: available via `context/composeContext` and threaded into executors; bus publishes for `Act.Publish`.
- IR types: live under `libraries/engine/types/ir`; discriminated nodes used across runtime and registries.

What’s demonstrably working end-to-end

- Input/Change/Blur/Submit event → action graphs (SetValue, SetQueryString, Submit, Publish) with anchor resolution and dispatch.
- Conditional execution pipeline (`Act.If`), logical composition (And/Or/Not), string matching (Matches/DoesNotMatch), and length bounds.
- Temporal comparators under feature detection when `Temporal` exists, avoiding runtime errors on unsupported targets.

JSX example (compiled to Act.If)

```tsx
<If
	condition={
		<IsEqualTo>
			<FromElement id="status" />
			<Constant value="active" />
		</IsEqualTo>
	}
	then={<Publish topic="audit" payload={{ status: "active" }} />}
	else={<Publish topic="audit" payload={{ status: "other" }} />}
/>
```

Docs/tests/quality guardrails

- README outlines constructor-based architecture and migration to registries; TODOs list dynamic-import removal and IR base-field additions.
- Tests exist for core behaviors and are green on the current slice in recent status notes; more coverage is needed across operations and adapters.

Known gaps and imperfections

- IR JSON Schema isn’t yet codified in the repo; base fields (`v`, `id`, `meta`) aren’t consistently enforced at construction time.
- Some operator/comparator families are not yet wired (full math set, full temporal set, numeric/boolean coercion helpers, etc.).
- Eager vs lazy evaluation policy is ad-hoc; caching by node id is not implemented.
- Server env guards exist in practice (feature detection), but SSR-side adapters and explicit error modes need to be formalized.
