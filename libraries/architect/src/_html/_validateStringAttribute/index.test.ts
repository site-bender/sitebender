import { assertEquals } from "@std/assert"

import _validateStringAttribute from "./index.ts"

Deno.test(
	"_validateStringAttribute",
	async function _validateStringAttributeTests(t) {
		await t.step(
			"returns empty object when attribute absent",
			function returnsEmptyWhenAbsent() {
				const validateId = _validateStringAttribute("id")
				const result = validateId({})

				assertEquals(result, {})
			},
		)

		await t.step(
			"accepts valid string value for id attribute",
			function acceptsStringForId() {
				const validateId = _validateStringAttribute("id")
				const result = validateId({ id: "test-id" })

				assertEquals(result, { id: "test-id" })
			},
		)

		await t.step(
			"accepts valid string value for lang attribute",
			function acceptsStringForLang() {
				const validateLang = _validateStringAttribute("lang")
				const result = validateLang({ lang: "en-US" })

				assertEquals(result, { lang: "en-US" })
			},
		)

		await t.step(
			"accepts valid string value for title attribute",
			function acceptsStringForTitle() {
				const validateTitle = _validateStringAttribute("title")
				const result = validateTitle({ title: "Tooltip text" })

				assertEquals(result, { title: "Tooltip text" })
			},
		)

		await t.step(
			"accepts empty string",
			function acceptsEmptyString() {
				const validateNonce = _validateStringAttribute("nonce")
				const result = validateNonce({ nonce: "" })

				assertEquals(result, { nonce: "" })
			},
		)

		await t.step(
			"returns data-§-bad-* for non-string values",
			function returnsBadForNonString() {
				const validateId = _validateStringAttribute("id")

				assertEquals(validateId({ id: 123 }), { "data-§-bad-id": "123" })
				assertEquals(validateId({ id: true }), { "data-§-bad-id": "true" })
				assertEquals(validateId({ id: null }), { "data-§-bad-id": "null" })
				assertEquals(validateId({ id: { foo: "bar" } }), {
					"data-§-bad-id": "[object Object]",
				})
				assertEquals(validateId({ id: ["test"] }), { "data-§-bad-id": "test" })
			},
		)

		await t.step(
			"works with different attribute names",
			function worksWithDifferentAttributes() {
				assertEquals(_validateStringAttribute("slot")({ slot: "header" }), {
					slot: "header",
				})
				assertEquals(_validateStringAttribute("part")({ part: "button" }), {
					part: "button",
				})
				assertEquals(
					_validateStringAttribute("style")({ style: "color: red" }),
					{ style: "color: red" },
				)
			},
		)
	},
)
