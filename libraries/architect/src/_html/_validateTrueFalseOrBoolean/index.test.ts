import { assertEquals } from "@std/assert"

import _validateTrueFalseOrBoolean from "./index.ts"

Deno.test(
	"_validateTrueFalseOrBoolean",
	async function _validateTrueFalseOrBooleanTests(t) {
		await t.step(
			"returns empty object when attribute absent",
			function returnsEmptyWhenAbsent() {
				const validateSpellcheck = _validateTrueFalseOrBoolean("spellcheck")
				const result = validateSpellcheck({})

				assertEquals(result, {})
			},
		)

		await t.step(
			"converts boolean true to string true",
			function convertsTrueToString() {
				const validateSpellcheck = _validateTrueFalseOrBoolean("spellcheck")
				const result = validateSpellcheck({ spellcheck: true })

				assertEquals(result, { spellcheck: "true" })
			},
		)

		await t.step(
			"converts boolean false to string false",
			function convertsFalseToString() {
				const validateSpellcheck = _validateTrueFalseOrBoolean("spellcheck")
				const result = validateSpellcheck({ spellcheck: false })

				assertEquals(result, { spellcheck: "false" })
			},
		)

		await t.step(
			"accepts lowercase string true",
			function acceptsLowercaseTrue() {
				const validateSpellcheck = _validateTrueFalseOrBoolean("spellcheck")
				const result = validateSpellcheck({ spellcheck: "true" })

				assertEquals(result, { spellcheck: "true" })
			},
		)

		await t.step(
			"accepts lowercase string false",
			function acceptsLowercaseFalse() {
				const validateSpellcheck = _validateTrueFalseOrBoolean("spellcheck")
				const result = validateSpellcheck({ spellcheck: "false" })

				assertEquals(result, { spellcheck: "false" })
			},
		)

		await t.step(
			"normalizes uppercase True to lowercase true",
			function normalizesUppercaseTrue() {
				const validateSpellcheck = _validateTrueFalseOrBoolean("spellcheck")
				const result = validateSpellcheck({ spellcheck: "True" })

				assertEquals(result, { spellcheck: "true" })
			},
		)

		await t.step(
			"normalizes uppercase FALSE to lowercase false",
			function normalizesUppercaseFalse() {
				const validateSpellcheck = _validateTrueFalseOrBoolean("spellcheck")
				const result = validateSpellcheck({ spellcheck: "FALSE" })

				assertEquals(result, { spellcheck: "false" })
			},
		)

		await t.step(
			"normalizes mixed case TrUe to lowercase true",
			function normalizesMixedCaseTrue() {
				const validateSpellcheck = _validateTrueFalseOrBoolean("spellcheck")
				const result = validateSpellcheck({ spellcheck: "TrUe" })

				assertEquals(result, { spellcheck: "true" })
			},
		)

		await t.step(
			"returns data-§-bad-* for invalid string",
			function returnsBadForInvalidString() {
				const validateSpellcheck = _validateTrueFalseOrBoolean("spellcheck")
				const result = validateSpellcheck({ spellcheck: "invalid" })

				assertEquals(result, { "data-§-bad-spellcheck": "invalid" })
			},
		)

		await t.step(
			"returns data-§-bad-* for non-boolean non-string",
			function returnsBadForInvalidType() {
				const validateSpellcheck = _validateTrueFalseOrBoolean("spellcheck")

				assertEquals(validateSpellcheck({ spellcheck: 123 }), {
					"data-§-bad-spellcheck": "123",
				})
				assertEquals(validateSpellcheck({ spellcheck: null }), {
					"data-§-bad-spellcheck": "null",
				})
				assertEquals(validateSpellcheck({ spellcheck: { foo: "bar" } }), {
					"data-§-bad-spellcheck": "[object Object]",
				})
			},
		)

		await t.step(
			"works with different attribute names",
			function worksWithDifferentAttributes() {
				const validateContenteditable = _validateTrueFalseOrBoolean(
					"contenteditable",
				)

				assertEquals(validateContenteditable({ contenteditable: true }), {
					contenteditable: "true",
				})
				assertEquals(validateContenteditable({ contenteditable: "False" }), {
					contenteditable: "false",
				})
			},
		)
	},
)
