import { assertEquals } from "@std/assert"

import _convertUnknownToData from "./index.ts"

Deno.test("_convertUnknownToData", async function convertUnknownToDataTests(t) {
	await t.step(
		"returns empty object for empty props",
		function returnsEmptyObject() {
			const result = _convertUnknownToData({})

			assertEquals(result, {})
		},
	)

	await t.step(
		"converts camelCase to kebab-case data attributes",
		function convertsToKebabCase() {
			const result = _convertUnknownToData({
				onClick: "handleClick",
				customProp: "value",
			})

			assertEquals(result, {
				"data-on-click": "handleClick",
				"data-custom-prop": "value",
			})
		},
	)

	await t.step(
		"converts values to strings",
		function convertsValuesToStrings() {
			const result = _convertUnknownToData({
				count: 42,
				enabled: true,
			})

			assertEquals(result, {
				"data-count": "42",
				"data-enabled": "true",
			})
		},
	)

	await t.step(
		"handles already kebab-case properties",
		function handlesKebabCase() {
			const result = _convertUnknownToData({
				"custom-value": "test",
			})

			assertEquals(result, {
				"data-custom-value": "test",
			})
		},
	)
})
