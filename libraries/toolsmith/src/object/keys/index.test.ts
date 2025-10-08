import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import keys from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"

Deno.test("keys", async function (t) {
	await t.step("returns Ok with keys for plain object", function () {
		const obj = { a: 1, b: 2, c: 3 }
		const result = keys(obj)

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, ["a", "b", "c"])
		}
	})

	await t.step("returns Ok with empty array for empty object", function () {
		const obj = {}
		const result = keys(obj)

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, [])
		}
	})

	await t.step(
		"returns Ok with keys for object with various value types",
		function () {
			const obj = {
				str: "hello",
				num: 42,
				bool: true,
				nul: null,
				undef: undefined,
			}
			const result = keys(obj)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value.length, 5)
				assertEquals(result.value.includes("str"), true)
				assertEquals(result.value.includes("num"), true)
				assertEquals(result.value.includes("bool"), true)
				assertEquals(result.value.includes("nul"), true)
				assertEquals(result.value.includes("undef"), true)
			}
		},
	)

	await t.step("returns Ok with keys for nested objects", function () {
		const obj = { a: { nested: true }, b: { also: "nested" } }
		const result = keys(obj)

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, ["a", "b"])
		}
	})

	await t.step("returns Error when input is null", function () {
		const result = keys(null as unknown as Record<string, unknown>)

		assertEquals(isError(result), true)
		if (isError(result)) {
			assertEquals(result.error.code, "KEYS_INVALID_INPUT")
			assertEquals(result.error.field, "obj")
			assertEquals(result.error.severity, "requirement")
		}
	})

	await t.step("returns Error when input is undefined", function () {
		const result = keys(undefined as unknown as Record<string, unknown>)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is a string", function () {
		const result = keys("not an object" as unknown as Record<string, unknown>)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is a number", function () {
		const result = keys(42 as unknown as Record<string, unknown>)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is an array", function () {
		const result = keys([1, 2, 3] as unknown as Record<string, unknown>)

		assertEquals(isError(result), true)
	})

	await t.step(
		"property: valid object input always returns Ok result",
		function () {
			fc.assert(
				fc.property(fc.object(), function (obj) {
					const result = keys(obj)
					assertEquals(isOk(result), true)
				}),
			)
		},
	)

	await t.step(
		"property: number of keys matches Object.keys length",
		function () {
			fc.assert(
				fc.property(fc.object(), function (obj) {
					const result = keys(obj)
					if (isOk(result)) {
						assertEquals(result.value.length, Object.keys(obj).length)
					}
				}),
			)
		},
	)
})
