## Components — overview

Purpose

- Give authors a small, readable JSX vocabulary that produces semantic HTML and a compact Engine IR for behaviors. No VDOM or client framework required.
- Split by “what it does” (interact/identify/format/layout/…) and provide thin transform wrappers for behaviors (injectors, operators, comparators, control, actions).

Authoring model (at a glance)

- Element components render HTML (SSR/SSG-first, a11y-first). They’re just functions that return { type, props } and degrade gracefully without JS.
- Control/transform wrappers don’t render DOM. They return marker/constructor objects consumed by the Components compiler which lowers to Engine IR.
- Hydration is optional. A single `<Program>` emits the IR JSON as a `<script type="application/engine+json">` node that the Engine hydrator reads on the client.

What’s in scope here

- Control wrappers: `Program`, `On`, `If`/`Conditional`, `Validation`.
- Transform wrappers: `FromElement`, `Constant`, `Add`, `NotEmpty`, `IsEqualTo`, `SetValue`, `Publish`, `SetQueryString`, etc. (thin facades over Engine constructors).
- Compiler: `toEngineIr` walks the JSX tree, finds wrapper markers, and produces Engine IR with event bindings and actions anchored to stable element ids.

Anchoring rules (how behaviors attach)

- Behaviors attach to the nearest previous element with a stable anchor: prefer explicit `id`, otherwise a deterministic `data-ir-id` is synthesized.
- `On` supports `target` to override the inferred anchor.
- Some actions (e.g., `SetValue`) infer a target from their arguments when possible (e.g., selector like `#price`).

JSX examples

- Minimal “echo” with progressive enhancement (no JavaScript required for base HTML):

```tsx
import Program from "@sitebender/components/transform/control/Program/index.tsx"
import On from "@sitebender/components/transform/control/On/index.tsx"
import SetValue from "@sitebender/components/transform/actions/SetValue/index.tsx"
import FromElement from "@sitebender/components/transform/injectors/FromElement/index.tsx"

export function Example() {
	return (
		<>
			<label for="name">Name</label>
			<input id="name" name="name" />

			<p>
				Hello, <span id="greet" />
			</p>

			{/* Attach behavior: when input, copy value into #greet */}
			<On event="Input">
				<SetValue selector="#greet" value={<FromElement id="name" />} />
			</On>

			{/* Emit the compiled Engine IR */}
			<Program />
		</>
	)
}
```

- Simple required validation (advisory-only without JS; with JS it runs live):

```tsx
import Validation from "@sitebender/components/transform/control/Validation/index.tsx"
import NotEmpty from "@sitebender/components/transform/comparators/NotEmpty/index.tsx"

export function RequiredEmail() {
	return (
		<>
			<label for="email">Email</label>
			<input
				id="email"
				name="email"
				required
				aria-describedby="email-hint"
			/>
			<small id="email-hint">We’ll never share your email.</small>

			<Validation when="input">
				<NotEmpty>
					<FromElement id="email" />
				</NotEmpty>
			</Validation>

			<Program />
		</>
	)
}
```

Progressive enhancement guarantees

- With JS off: you still see labels, inputs, and static text; native `required` and semantics continue to work.
- With JS on: events/validation/conditionals run via the Engine hydrator using the IR emitted by `<Program>`.

Testing and quality

- Unit tests cover compiler mapping and diagnostics for common mistakes (e.g., arity checks for operators/comparators).
- Golden tests verify JSX → IR for conditionals and events.
