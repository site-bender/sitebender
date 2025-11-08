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

				assert("id" in result.globalAttrs)
				assert(typeof result.globalAttrs.id === "string")
				assert(result.globalAttrs.id.startsWith("_"))
				assertEquals(result.otherAttrs, {})
			},
		)

		await t.step(
			"validates single attribute",
			function validatesSingleAttribute() {
				const result = _validateGlobalAttributes({ id: "test-id" })

				assertEquals(result.globalAttrs, { id: "test-id" })
				assertEquals(result.otherAttrs, {})
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

				assertEquals(result.globalAttrs, {
					id: "test-id",
					lang: "en",
					dir: "ltr",
					title: "Test title",
				})
				assertEquals(result.otherAttrs, {})
			},
		)

		await t.step(
			"converts boolean attributes and generates id",
			function convertsBooleanAttributesWithId() {
				const result = _validateGlobalAttributes({
					spellcheck: true,
					translate: false,
				})

				assert("id" in result.globalAttrs)
				assertEquals(result.globalAttrs.spellcheck, "true")
				assertEquals(result.globalAttrs.translate, "no")
				assertEquals(result.otherAttrs, {})
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

				assertEquals(result.globalAttrs, {
					id: "valid-id",
					"data-§-bad-dir": "invalid-direction",
					lang: "en",
				})
				assertEquals(result.otherAttrs, {})
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

				assertEquals(result.globalAttrs, { id: "test-id" })
				assertEquals(result.otherAttrs, {
					customAttribute: "custom-value",
					anotherProp: 123,
				})
			},
		)
	},
)
