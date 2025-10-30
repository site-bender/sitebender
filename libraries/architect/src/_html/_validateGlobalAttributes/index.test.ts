import { assertEquals } from "@std/assert"
import { assert } from "@std/assert/assert"

import _validateGlobalAttributes from "./index.ts"

Deno.test(
	"_validateGlobalAttributes",
	async function validateGlobalAttributesTests(t) {
		await t.step(
			"generates id when no props provided",
			function generatesIdWhenEmpty() {
				const result = _validateGlobalAttributes({})

				assert("id" in result)
				assert(typeof result.id === "string")
				assert(result.id.startsWith("_"))
			},
		)

		await t.step(
			"validates single attribute",
			function validatesSingleAttribute() {
				const result = _validateGlobalAttributes({ id: "test-id" })

				assertEquals(result, { id: "test-id" })
			},
		)

		await t.step(
			"validates multiple attributes",
			function validatesMultipleAttributes() {
				const result = _validateGlobalAttributes({
					id: "test-id",
					lang: "en",
					dir: "ltr",
					title: "Test title",
				})

				assertEquals(result, {
					id: "test-id",
					lang: "en",
					dir: "ltr",
					title: "Test title",
				})
			},
		)

		await t.step(
			"converts boolean attributes and generates id",
			function convertsBooleanAttributesWithId() {
				const result = _validateGlobalAttributes({
					spellcheck: true,
					translate: false,
				})

				assert("id" in result)
				assertEquals(result.spellcheck, "true")
				assertEquals(result.translate, "no")
			},
		)

		await t.step(
			"returns bad values as data-§-bad-*",
			function returnsBadValues() {
				const result = _validateGlobalAttributes({
					id: "valid-id",
					dir: "invalid-direction",
					lang: "en",
				})

				assertEquals(result, {
					id: "valid-id",
					"data-§-bad-dir": "invalid-direction",
					lang: "en",
				})
			},
		)

		await t.step(
			"converts unknown attributes to data-*",
			function convertsUnknownAttributes() {
				const result = _validateGlobalAttributes({
					id: "test-id",
					customAttribute: "custom-value",
					anotherProp: 123,
				})

				assertEquals(result, {
					id: "test-id",
					"data-customAttribute": "custom-value",
					"data-anotherProp": "123",
				})
			},
		)
	},
)
