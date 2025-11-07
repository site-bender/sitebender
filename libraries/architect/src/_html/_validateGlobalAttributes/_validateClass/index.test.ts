import { assertEquals } from "@std/assert"

import _validateClass from "./index.ts"

Deno.test("_validateClass", async function _validateClassTests(t) {
	await t.step(
		"returns empty object when class absent",
		function returnsEmptyWhenAbsent() {
			const result = _validateClass({})

			assertEquals(result, {})
		},
	)

	await t.step(
		"accepts string class value",
		function acceptsStringValue() {
			const result = _validateClass({ class: "container flex" })

			assertEquals(result, { class: "container flex" })
		},
	)

	await t.step(
		"accepts array of class names",
		function acceptsArrayValue() {
			const result = _validateClass({ class: ["container", "flex", "center"] })

			assertEquals(result, { class: "container flex center" })
		},
	)

	await t.step(
		"accepts array with single class name",
		function acceptsSingleItemArray() {
			const result = _validateClass({ class: ["container"] })

			assertEquals(result, { class: "container" })
		},
	)

	await t.step(
		"accepts empty array",
		function acceptsEmptyArray() {
			const result = _validateClass({ class: [] })

			assertEquals(result, { class: "" })
		},
	)

	await t.step(
		"returns data-§-bad-class for non-string non-array values",
		function returnsBadForInvalidTypes() {
			assertEquals(_validateClass({ class: 123 }), {
				"data-§-bad-class": "123",
			})
			assertEquals(_validateClass({ class: true }), {
				"data-§-bad-class": "true",
			})
			assertEquals(_validateClass({ class: null }), {
				"data-§-bad-class": "null",
			})
			assertEquals(_validateClass({ class: { foo: "bar" } }), {
				"data-§-bad-class": "[object Object]",
			})
		},
	)
})
