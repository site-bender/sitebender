# Behavior anchoring (for vs anchor)

Anchoring links reactive behavior to a DOM element. We prefer the explicit "for" property when possible, and fall back to automatic anchoring by nearest element id/name.

- for: string | CSS selector — explicit target ID or selector
- anchor: string — legacy or alternative; treated the same if provided
- Auto-ID: When no id is present on the target, an ID is generated and applied during SSR/CSR so relations remain stable.

## Example: explicit for override

Given a checkbox that toggles a help panel:

```html
<input type="checkbox" id="agree" />
<label for="agree">I agree</label>

<div id="help" hidden>
	This panel is shown when checkbox is checked.
</div>
```

Architect config for display behavior with an explicit for override:

```ts
const behavior = {
	v: 1,
	id: "toggle-help",
	type: "operator",
	tag: "Conditional",
	predicate: {
		type: "injector",
		tag: "FromElement",
		datatype: "Boolean",
		source: "#agree", // explicit target via CSS selector
	},
	then: {
		type: "operator",
		tag: "Display",
		for: "#help", // explicit for override
		action: "show",
	},
	else: {
		type: "operator",
		tag: "Display",
		for: "#help",
		action: "hide",
	},
}
```

Notes:

- The predicate injector observes the checkbox state.
- The Display operation targets the help panel via `for: "#help"` regardless of nearest anchor.
- If the help element lacks an id, the renderer will generate one deterministically and update `for` accordingly.
