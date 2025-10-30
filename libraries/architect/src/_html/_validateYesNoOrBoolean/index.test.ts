import { assertEquals } from "@std/assert"

import _validateYesNoOrBoolean from "./index.ts"

Deno.test(
	"_validateYesNoOrBoolean",
	async function _validateYesNoOrBooleanTests(t) {
		await t.step(
			"returns empty object when attribute absent",
			function returnsEmptyWhenAbsent() {
				const validateTranslate = _validateYesNoOrBoolean("translate")
				const result = validateTranslate({})

				assertEquals(result, {})
			},
		)

		await t.step(
			"converts boolean true to string yes",
			function convertsTrueToYes() {
				const validateTranslate = _validateYesNoOrBoolean("translate")
				const result = validateTranslate({ translate: true })

				assertEquals(result, { translate: "yes" })
			},
		)

		await t.step(
			"converts boolean false to string no",
			function convertsFalseToNo() {
				const validateTranslate = _validateYesNoOrBoolean("translate")
				const result = validateTranslate({ translate: false })

				assertEquals(result, { translate: "no" })
			},
		)

		await t.step(
			"accepts lowercase string yes",
			function acceptsLowercaseYes() {
				const validateTranslate = _validateYesNoOrBoolean("translate")
				const result = validateTranslate({ translate: "yes" })

				assertEquals(result, { translate: "yes" })
			},
		)

		await t.step(
			"accepts lowercase string no",
			function acceptsLowercaseNo() {
				const validateTranslate = _validateYesNoOrBoolean("translate")
				const result = validateTranslate({ translate: "no" })

				assertEquals(result, { translate: "no" })
			},
		)

		await t.step(
			"normalizes uppercase Yes to lowercase yes",
			function normalizesUppercaseYes() {
				const validateTranslate = _validateYesNoOrBoolean("translate")
				const result = validateTranslate({ translate: "Yes" })

				assertEquals(result, { translate: "yes" })
			},
		)

		await t.step(
			"normalizes uppercase NO to lowercase no",
			function normalizesUppercaseNo() {
				const validateTranslate = _validateYesNoOrBoolean("translate")
				const result = validateTranslate({ translate: "NO" })

				assertEquals(result, { translate: "no" })
			},
		)

		await t.step(
			"normalizes mixed case YeS to lowercase yes",
			function normalizesMixedCaseYes() {
				const validateTranslate = _validateYesNoOrBoolean("translate")
				const result = validateTranslate({ translate: "YeS" })

				assertEquals(result, { translate: "yes" })
			},
		)

		await t.step(
			"returns empty object for invalid string",
			function returnsEmptyForInvalidString() {
				const validateTranslate = _validateYesNoOrBoolean("translate")
				const result = validateTranslate({ translate: "invalid" })

				assertEquals(result, {})
			},
		)

		await t.step(
			"returns empty object for non-boolean non-string",
			function returnsEmptyForInvalidType() {
				const validateTranslate = _validateYesNoOrBoolean("translate")

				assertEquals(validateTranslate({ translate: 123 }), {})
				assertEquals(validateTranslate({ translate: null }), {})
				assertEquals(validateTranslate({ translate: { foo: "bar" } }), {})
			},
		)

		await t.step(
			"works with different attribute names",
			function worksWithDifferentAttributes() {
				const validateSomeAttr = _validateYesNoOrBoolean("someattr")

				assertEquals(validateSomeAttr({ someattr: true }), { someattr: "yes" })
				assertEquals(validateSomeAttr({ someattr: "No" }), { someattr: "no" })
			},
		)
	},
)
