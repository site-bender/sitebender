import { assertEquals } from "@std/assert"

import _validateGlobalAttributes from "./index.ts"

Deno.test(
	"_validateGlobalAttributes",
	async function validateGlobalAttributesTests(t) {
		await t.step(
			"returns empty object for empty props",
			function returnsEmptyForEmptyProps() {
				const result = _validateGlobalAttributes({})

				assertEquals(result, {})
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
			"converts boolean attributes",
			function convertsBooleanAttributes() {
				const result = _validateGlobalAttributes({
					spellcheck: true,
					translate: false,
				})

				assertEquals(result, {
					spellcheck: "true",
					translate: "no",
				})
			},
		)

		await t.step(
			"omits invalid attributes",
			function omitsInvalidAttributes() {
				const result = _validateGlobalAttributes({
					id: "valid-id",
					dir: "invalid-direction",
					lang: "en",
				})

				assertEquals(result, {
					id: "valid-id",
					lang: "en",
				})
			},
		)

		await t.step(
			"ignores non-global attributes",
			function ignoresNonGlobalAttributes() {
				const result = _validateGlobalAttributes({
					id: "test-id",
					customAttribute: "should-be-ignored",
					anotherProp: 123,
				})

				assertEquals(result, { id: "test-id" })
			},
		)
	},
)
