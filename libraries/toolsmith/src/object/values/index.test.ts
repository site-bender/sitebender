import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import values from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"

Deno.test("values", async function (t) {
	await t.step("returns Ok with values for plain object", function () {
		const obj = { a: 1, b: 2, c: 3 }
		const result = values(obj)

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, [1, 2, 3])
		}
	})

	await t.step("returns Ok with empty array for empty object", function () {
		const obj = {}
		const result = values(obj)

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, [])
		}
	})

	await t.step(
		"returns Ok with values for object with various value types",
		function () {
			const obj = {
				str: "hello",
				num: 42,
				bool: true,
				nul: null,
				undef: undefined,
			}
			const result = values(obj)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value.length, 5)
				assertEquals(result.value.includes("hello"), true)
				assertEquals(result.value.includes(42), true)
				assertEquals(result.value.includes(true), true)
				assertEquals(result.value.includes(null), true)
				assertEquals(result.value.includes(undefined), true)
			}
		},
	)

	await t.step("returns Ok with values for nested objects", function () {
		const obj = { a: { nested: true }, b: { also: "nested" } }
		const result = values(obj)

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value.length, 2)
			assertEquals(result.value[0], { nested: true })
			assertEquals(result.value[1], { also: "nested" })
		}
	})

	await t.step(
		"returns Ok with values in same order as Object.values",
		function () {
			const obj = { x: 10, y: 20, z: 30 }
			const result = values(obj)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, Object.values(obj))
			}
		},
	)

	await t.step("returns Error when input is null", function () {
		const result = values(null as unknown as Record<string, unknown>)

		assertEquals(isError(result), true)
		if (isError(result)) {
			assertEquals(result.error.code, "VALUES_INVALID_INPUT")
			assertEquals(result.error.field, "obj")
			assertEquals(result.error.severity, "requirement")
		}
	})

	await t.step("returns Error when input is undefined", function () {
		const result = values(undefined as unknown as Record<string, unknown>)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is a string", function () {
		const result = values("not an object" as unknown as Record<string, unknown>)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is a number", function () {
		const result = values(42 as unknown as Record<string, unknown>)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is an array", function () {
		const result = values([1, 2, 3] as unknown as Record<string, unknown>)

		assertEquals(isError(result), true)
	})

	await t.step(
		"property: valid object input always returns Ok result",
		function () {
			fc.assert(
				fc.property(fc.object(), function (obj) {
					const result = values(obj)
					assertEquals(isOk(result), true)
				}),
			)
		},
	)

	await t.step(
		"property: number of values matches Object.values length",
		function () {
			fc.assert(
				fc.property(fc.object(), function (obj) {
					const result = values(obj)
					if (isOk(result)) {
						assertEquals(result.value.length, Object.values(obj).length)
					}
				}),
			)
		},
	)

	await t.step(
		"property: values match Object.values output",
		function () {
			fc.assert(
				fc.property(fc.object(), function (obj) {
					const result = values(obj)
					if (isOk(result)) {
						assertEquals(result.value, Object.values(obj))
					}
				}),
			)
		},
	)
})
