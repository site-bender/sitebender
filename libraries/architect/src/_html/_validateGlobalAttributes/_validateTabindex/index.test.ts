import { assertEquals } from "@std/assert"

import _validateTabindex from "./index.ts"

Deno.test("_validateTabindex", async function _validateTabindexTests(t) {
	await t.step(
		"returns empty object when tabindex absent",
		function returnsEmptyWhenAbsent() {
			const result = _validateTabindex({})

			assertEquals(result, {})
		},
	)

	await t.step(
		"accepts string tabindex value",
		function acceptsStringValue() {
			const result = _validateTabindex({ tabindex: "0" })

			assertEquals(result, { tabindex: "0" })
		},
	)

	await t.step("accepts number tabindex value", function acceptsNumberValue() {
		const result = _validateTabindex({ tabindex: 5 })

		assertEquals(result, { tabindex: "5" })
	})

	await t.step(
		"accepts negative tabindex",
		function acceptsNegativeTabindex() {
			const result = _validateTabindex({ tabindex: -1 })

			assertEquals(result, { tabindex: "-1" })
		},
	)

	await t.step(
		"returns data-§-bad-tabindex for empty string",
		function returnsBadForEmptyString() {
			const result = _validateTabindex({ tabindex: "" })

			assertEquals(result, { "data-§-bad-tabindex": "" })
		},
	)
})
