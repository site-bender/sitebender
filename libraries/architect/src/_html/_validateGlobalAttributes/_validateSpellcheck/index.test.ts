import { assertEquals } from "@std/assert"

import _validateSpellcheck from "./index.ts"

Deno.test("_validateSpellcheck", async function validateSpellcheckTests(t) {
	await t.step(
		"returns empty object when spellcheck absent",
		function returnsEmptyWhenAbsent() {
			const result = _validateSpellcheck({})

			assertEquals(result, {})
		},
	)

	await t.step(
		"converts boolean true to string true",
		function convertsTrueToString() {
			const result = _validateSpellcheck({ spellcheck: true })

			assertEquals(result, { spellcheck: "true" })
		},
	)

	await t.step(
		"converts boolean false to string false",
		function convertsFalseToString() {
			const result = _validateSpellcheck({ spellcheck: false })

			assertEquals(result, { spellcheck: "false" })
		},
	)

	await t.step(
		"accepts string true value",
		function acceptsStringTrue() {
			const result = _validateSpellcheck({ spellcheck: "true" })

			assertEquals(result, { spellcheck: "true" })
		},
	)

	await t.step(
		"accepts string false value",
		function acceptsStringFalse() {
			const result = _validateSpellcheck({ spellcheck: "false" })

			assertEquals(result, { spellcheck: "false" })
		},
	)

	await t.step(
		"returns empty object for invalid string",
		function returnsEmptyForInvalidString() {
			const result = _validateSpellcheck({ spellcheck: "invalid" })

			assertEquals(result, {})
		},
	)

	await t.step(
		"returns empty object for non-boolean non-string",
		function returnsEmptyForInvalid() {
			const result = _validateSpellcheck({ spellcheck: 123 })

			assertEquals(result, {})
		},
	)
})
