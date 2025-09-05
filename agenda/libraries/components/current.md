## Components — current

What works today (grounded in source/tests)
- Wrappers in `src/transform/*` return marker/constructor objects:
	- Injectors: `Constant`, `FromElement`.
	- Operators: `Add` (plus `Min/Max/Multiply` constructors in the compiler path).
	- Comparators: `NotEmpty`, `IsEqualTo`, `Matches`, `InSet`, temporal families via engine (behind feature detection).
	- Actions: `SetValue`, `SetQueryString`, `Publish`.
	- Control: `On`, `If` (compiles to `Act.If`), `Validation` (marker recognized by the minimal compiler and slated for full IR attach).
- Compiler `toEngineIr`:
	- Scans JSX for control markers and transform constructors; produces Engine IR with `on` nodes and actions, anchored to previous elements.
	- Inference: If `On` has no `target`, it uses the last seen element with `id`/`data-ir-id`; some actions (e.g., `SetValue`) provide an inferred anchor via their args.
	- Normalizes comparator/operator tags to the engine’s registry naming (`Is.EqualTo`, `Op.Add`, etc.) and attaches non-fatal debug warnings for arity issues.
- `<Program>` renders a `<script id="ir-root" type="application/engine+json">…</script>` with the compiled IR.

Limitations and gaps
- `Validation` is recognized in the minimal compile, but full attach to Engine IR validators is still being wired end-to-end.
- Only a core subset of operators/comparators wrapped; others are planned but not yet mapped in Components.
- Deterministic `data-ir-id` synthesis exists in compile walk, but prod stripping policy is not yet implemented in apps.

JSX examples in use

- Conditional with sugar props, compiles to `Act.If` under the hood:

```tsx
import If from "@sitebender/components/transform/control/If/index.tsx"
import IsEqualTo from "@sitebender/components/transform/comparators/IsEqualTo/index.tsx"
import Constant from "@sitebender/components/transform/injectors/Constant/index.tsx"
import Publish from "@sitebender/components/transform/actions/Publish/index.tsx"

<If
	condition={<IsEqualTo><FromElement id="role" /><Constant value="admin" /></IsEqualTo>}
	then={<Publish topic="audit" payload={{ level: "admin" }} />}
	else={<Publish topic="audit" payload={{ level: "user" }} />}
/>
```

- Event chaining with explicit target override:

```tsx
import On from "@sitebender/components/transform/control/On/index.tsx"
import SetQueryString from "@sitebender/components/transform/actions/SetQueryString/index.tsx"
import FromElement from "@sitebender/components/transform/injectors/FromElement/index.tsx"

<On event="Change" target="filter">
	<SetQueryString key="filter" value={<FromElement id="filter" />} />
</On>
```

Quality snapshot
- Thin, one-function-per-folder wrappers; zero deps; SSR-first HTML for element components; progressive enhancement maintained.
- Tests in `libraries/components/tests` exercise compiler mapping, arity warnings, and golden IR for control flows.
