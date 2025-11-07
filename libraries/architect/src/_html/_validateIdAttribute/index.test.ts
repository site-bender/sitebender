import { assertEquals } from "@std/assert"
import { assert } from "@std/assert/assert"

import _validateIdAttribute from "./index.ts"

Deno.test("_validateIdAttribute", async function _validateIdAttributeTests(t) {
	await t.step(
		"returns valid id when string provided",
		function returnsValidId() {
			const result = _validateIdAttribute({ id: "my-element" })

			assertEquals(result, { id: "my-element" })
		},
	)

	await t.step(
		"generates id when absent",
		function generatesIdWhenAbsent() {
			const result = _validateIdAttribute({})

			assert("id" in result)
			assert(typeof result.id === "string")
			assert(result.id.length > 0)
			assert(result.id.startsWith("_"))
		},
	)

	await t.step(
		"generates different ids for each call",
		function generatesDifferentIds() {
			const result1 = _validateIdAttribute({})
			const result2 = _validateIdAttribute({})

			assert(result1.id !== result2.id)
		},
	)

	await t.step(
		"returns data-§-bad-id for number",
		function returnsDataBadForNumber() {
			const result = _validateIdAttribute({ id: 123 })

			assertEquals(result, { "data-§-bad-id": "123" })
		},
	)

	await t.step(
		"returns data-§-bad-id for boolean",
		function returnsDataBadForBoolean() {
			const result = _validateIdAttribute({ id: true })

			assertEquals(result, { "data-§-bad-id": "true" })
		},
	)

	await t.step(
		"returns data-§-bad-id for object",
		function returnsDataBadForObject() {
			const result = _validateIdAttribute({ id: { foo: "bar" } })

			assertEquals(result, { "data-§-bad-id": "[object Object]" })
		},
	)

	await t.step(
		"returns data-§-bad-id for null",
		function returnsDataBadForNull() {
			const result = _validateIdAttribute({ id: null })

			assertEquals(result, { "data-§-bad-id": "null" })
		},
	)

	await t.step(
		"accepts empty string as valid id",
		function acceptsEmptyString() {
			const result = _validateIdAttribute({ id: "" })

			assertEquals(result, { id: "" })
		},
	)
})
