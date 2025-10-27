import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _convertAttributeEntry from "./index.ts"

Deno.test("_convertAttributeEntry", async function convertAttributeEntryTests(t) {
	await t.step(
		"converts string value to string attribute",
		function convertsStringValue() {
			const result = _convertAttributeEntry({}, [
				"id",
				"test",
			])

			assertEquals(result, { id: "test" })
		},
	)

	await t.step(
		"converts number value to string attribute",
		function convertsNumberValue() {
			const result = _convertAttributeEntry({}, [
				"width",
				42,
			])

			assertEquals(result, { width: "42" })
		},
	)

	await t.step(
		"converts boolean value to string attribute",
		function convertsBooleanValue() {
			const result = _convertAttributeEntry({}, [
				"disabled",
				true,
			])

			assertEquals(result, { disabled: "true" })
		},
	)

	await t.step(
		"filters out null values",
		function filtersNull() {
			const result = _convertAttributeEntry({}, [
				"removed",
				null,
			])

			assertEquals(result, {})
		},
	)

	await t.step(
		"filters out undefined values",
		function filtersUndefined() {
			const result = _convertAttributeEntry({}, [
				"missing",
				undefined,
			])

			assertEquals(result, {})
		},
	)

	await t.step(
		"preserves existing accumulator",
		function preservesAccumulator() {
			const result = _convertAttributeEntry({ existing: "value" }, ["new", "attr"])

			assertEquals(result, { existing: "value", new: "attr" })
		},
	)

	await t.step(
		"handles empty string value",
		function handlesEmptyString() {
			const result = _convertAttributeEntry({}, [
				"title",
				"",
			])

			assertEquals(result, { title: "" })
		},
	)

	await t.step(
		"handles zero value",
		function handlesZero() {
			const result = _convertAttributeEntry({}, [
				"value",
				0,
			])

			assertEquals(result, { value: "0" })
		},
	)

	await t.step(
		"handles false value",
		function handlesFalse() {
			const result = _convertAttributeEntry({}, [
				"checked",
				false,
			])

			assertEquals(result, { checked: "false" })
		},
	)

	await t.step(
		"is uncurried for use with reduce",
		function isUncurried() {
			/*++
			 + [EXCEPTION] This test verifies the uncurried function signature
			 + reduce expects: (accumulator, item) => result
			 + _convertAttributeEntry provides this signature
			 */
			const entries: ReadonlyArray<readonly [string, unknown]> = [
				["id", "test"],
				["width", 100],
			]

			const result = entries.reduce(_convertAttributeEntry, {})

			assertEquals(result, {
				id: "test",
				width: "100",
			})
		},
	)
})

Deno.test("_convertAttributeEntry - property: always returns object", function alwaysReturnsObject() {
	fc.assert(
		fc.property(
			fc.dictionary(fc.string(), fc.string()),
			fc.string(),
			fc.oneof(fc.string(), fc.integer(), fc.boolean(), fc.constant(null), fc.constant(undefined)),
			function propertyReturnsObject(acc, key, value) {
				const result = _convertAttributeEntry(acc, [key, value])
				assertEquals(typeof result, "object")
				assertEquals(Array.isArray(result), false)
			},
		),
	)
})

Deno.test("_convertAttributeEntry - property: non-nullish values converted to strings", function nonNullishToString() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.oneof(fc.string(), fc.integer(), fc.boolean()),
			function propertyConvertsToString(key, value) {
				const result = _convertAttributeEntry({}, [key, value])
				if (key in result) {
					assertEquals(typeof result[key], "string")
					assertEquals(result[key], String(value))
				}
			},
		),
	)
})

Deno.test("_convertAttributeEntry - property: nullish values filtered", function nullishFiltered() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.oneof(fc.constant(null), fc.constant(undefined)),
			function propertyFiltersNullish(key, value) {
				const result = _convertAttributeEntry({}, [key, value])
				assertEquals(result, {})
			},
		),
	)
})

Deno.test("_convertAttributeEntry - property: preserves accumulator keys", function preservesAccumulator() {
	fc.assert(
		fc.property(
			fc.dictionary(fc.string(), fc.string()),
			fc.string(),
			fc.string(),
			function propertyPreservesAcc(acc, key, value) {
				/*++
				 + Only test when key doesn't exist in accumulator
				 + If key exists, it will be overwritten (standard object behavior)
				 */
				if (key in acc) return

				const result = _convertAttributeEntry(acc, [key, value])
				Object.keys(acc).forEach((accKey) => {
					assertEquals(result[accKey], acc[accKey])
				})
			},
		),
	)
})

Deno.test("_convertAttributeEntry - property: works with Array.reduce", function worksWithReduce() {
	fc.assert(
		fc.property(
			fc.array(fc.tuple(fc.string(), fc.oneof(fc.string(), fc.integer(), fc.boolean()))),
			function propertyWorksWithReduce(entries) {
				/*++
				 + [EXCEPTION] Array.reduce is acceptable for testing reduce compatibility
				 + Verify that uncurried _convertAttributeEntry works correctly as a reduce callback
				 */
				const result = entries.reduce(_convertAttributeEntry, {})

				assertEquals(typeof result, "object")
				entries.forEach(([key, value]) => {
					assertEquals(result[key], String(value))
				})
			},
		),
	)
})
