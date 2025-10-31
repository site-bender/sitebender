import { assertEquals } from "@std/assert"

import _validateAriaAttributes from "./index.ts"

Deno.test("_validateAriaAttributes", async function validateAriaAttributesTests(t) {
	await t.step(
		"returns empty object for empty aria object",
		function returnsEmptyObject() {
			const result = _validateAriaAttributes({})

			assertEquals(result, {})
		},
	)

	await t.step(
		"converts aria object to aria-* attributes",
		function convertsAriaObject() {
			const result = _validateAriaAttributes({
				label: "Main content",
				hidden: "true",
			})

			assertEquals(result, {
				"aria-label": "Main content",
				"aria-hidden": "true",
			})
		},
	)

	await t.step(
		"converts values to strings",
		function convertsValuesToStrings() {
			const result = _validateAriaAttributes({
				level: 2,
				expanded: false,
			})

			assertEquals(result, {
				"aria-level": "2",
				"aria-expanded": "false",
			})
		},
	)
})
