import { assertEquals } from "@std/assert"

import _validateTranslate from "./index.ts"

Deno.test("_validateTranslate", async function validateTranslateTests(t) {
	await t.step(
		"returns empty object when translate absent",
		function returnsEmptyWhenAbsent() {
			const result = _validateTranslate({})

			assertEquals(result, {})
		},
	)

	await t.step(
		"converts boolean true to string yes",
		function convertsTrueToYes() {
			const result = _validateTranslate({ translate: true })

			assertEquals(result, { translate: "yes" })
		},
	)

	await t.step(
		"converts boolean false to string no",
		function convertsFalseToNo() {
			const result = _validateTranslate({ translate: false })

			assertEquals(result, { translate: "no" })
		},
	)

	await t.step("accepts string yes value", function acceptsStringYes() {
		const result = _validateTranslate({ translate: "yes" })

		assertEquals(result, { translate: "yes" })
	})

	await t.step("accepts string no value", function acceptsStringNo() {
		const result = _validateTranslate({ translate: "no" })

		assertEquals(result, { translate: "no" })
	})

	await t.step(
		"returns empty object for invalid string",
		function returnsEmptyForInvalidString() {
			const result = _validateTranslate({ translate: "invalid" })

			assertEquals(result, {})
		},
	)

	await t.step(
		"returns empty object for non-boolean non-string",
		function returnsEmptyForInvalid() {
			const result = _validateTranslate({ translate: 123 })

			assertEquals(result, {})
		},
	)
})
