import { assertEquals } from "@std/assert"

import _validateDir from "./index.ts"

Deno.test("_validateDir", async function validateDirTests(t) {
	await t.step(
		"returns empty object when dir absent",
		function returnsEmptyWhenAbsent() {
			const result = _validateDir({})

			assertEquals(result, {})
		},
	)

	await t.step("returns valid dir value", function returnsValidValue() {
		const result = _validateDir({ dir: "ltr" })

		assertEquals(result, { dir: "ltr" })
	})

	await t.step("validates all valid values", function validatesAllValues() {
		const validValues = ["ltr", "rtl", "auto"]

		validValues.forEach((value) => {
			const result = _validateDir({ dir: value })
			assertEquals(result, { dir: value })
		})
	})

	await t.step(
		"returns empty object for invalid value",
		function returnsEmptyForInvalid() {
			const result = _validateDir({ dir: "invalid" })

			assertEquals(result, {})
		},
	)

	await t.step(
		"returns empty object for non-string value",
		function returnsEmptyForNonString() {
			const result = _validateDir({ dir: true })

			assertEquals(result, {})
		},
	)
})
