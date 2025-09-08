import { assert, assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import indexBy from "../../../../src/simple/array/indexBy/index.ts"

Deno.test("indexBy", async (t) => {
	await t.step("indexes by id property", () => {
		const users = [
			{ id: 1, name: "Alice" },
			{ id: 2, name: "Bob" },
			{ id: 3, name: "Charlie" },
		]
		const result = indexBy((u: { id: number }) => u.id)(users)
		assertEquals(result, {
			1: { id: 1, name: "Alice" },
			2: { id: 2, name: "Bob" },
			3: { id: 3, name: "Charlie" },
		})
	})

	await t.step("indexes by string property", () => {
		const items = [
			{ code: "USD", name: "US Dollar" },
			{ code: "EUR", name: "Euro" },
			{ code: "GBP", name: "British Pound" },
		]
		const result = indexBy((item: { code: string }) => item.code)(items)
		assertEquals(result, {
			USD: { code: "USD", name: "US Dollar" },
			EUR: { code: "EUR", name: "Euro" },
			GBP: { code: "GBP", name: "British Pound" },
		})
	})

	await t.step("indexes by computed key", () => {
		const strings = ["a", "bb", "ccc", "dddd"]
		const result = indexBy((s: string) => s.length)(strings)
		assertEquals(result, {
			1: "a",
			2: "bb",
			3: "ccc",
			4: "dddd",
		})
	})

	await t.step("last value wins for duplicate keys", () => {
		const items = [
			{ type: "A", value: 1 },
			{ type: "B", value: 2 },
			{ type: "A", value: 3 },
			{ type: "B", value: 4 },
		]
		const result = indexBy((item: { type: string }) => item.type)(items)
		assertEquals(result, {
			A: { type: "A", value: 3 },
			B: { type: "B", value: 4 },
		})
	})

	await t.step("receives index parameter", () => {
		const items = ["a", "b", "c"]
		const result = indexBy((_: string, index: number) => index)(items)
		assertEquals(result, {
			0: "a",
			1: "b",
			2: "c",
		})
	})

	await t.step("receives array parameter", () => {
		const items = ["a", "b", "c"]
		const receivedArrays: Array<ReadonlyArray<string>> = []
		indexBy((_: string, __: number, array: ReadonlyArray<string>) => {
			receivedArrays.push(array)
			return "key"
		})(items)
		assert(receivedArrays.every((arr) => arr === items))
	})

	await t.step("handles symbol keys", () => {
		const sym1 = Symbol("a")
		const sym2 = Symbol("b")
		const items = [
			{ key: sym1, value: 1 },
			{ key: sym2, value: 2 },
		]
		const result = indexBy((item: { key: symbol }) => item.key)(items)
		assertEquals(result[sym1], { key: sym1, value: 1 })
		assertEquals(result[sym2], { key: sym2, value: 2 })
	})

	await t.step("filters out null/undefined keys", () => {
		const items = [
			{ id: 1, name: "Alice" },
			{ id: null, name: "Bob" },
			{ id: 2, name: "Charlie" },
			{ id: undefined, name: "David" },
			{ id: 3, name: "Eve" },
		]
		const result = indexBy((item: { id: number | null | undefined }) =>
			item.id as number | null | undefined
		)(items)
		assertEquals(result, {
			1: { id: 1, name: "Alice" },
			2: { id: 2, name: "Charlie" },
			3: { id: 3, name: "Eve" },
		})
	})

	await t.step("handles empty array", () => {
		const result = indexBy((x: number) => x)([])
		assertEquals(result, {})
	})

	await t.step("handles null", () => {
		const result = indexBy((x: number) => x)(null)
		assertEquals(result, {})
	})

	await t.step("handles undefined", () => {
		const result = indexBy((x: number) => x)(undefined)
		assertEquals(result, {})
	})

	await t.step("handles single element", () => {
		const result = indexBy((x: number) => x * 2)([5])
		assertEquals(result, { 10: 5 })
	})

	await t.step("is curried", () => {
		const indexByLength = indexBy((s: string) => s.length)
		assertEquals(indexByLength(["a", "bb"]), { 1: "a", 2: "bb" })
		assertEquals(indexByLength(["cat", "dog"]), { 3: "dog" })
	})

	await t.step("works with complex key derivation", () => {
		const people = [
			{ firstName: "John", lastName: "Doe", age: 30 },
			{ firstName: "Jane", lastName: "Doe", age: 25 },
			{ firstName: "John", lastName: "Smith", age: 35 },
		]
		const result = indexBy((p: typeof people[0]) =>
			`${p.firstName}-${p.lastName}`
		)(people)
		assertEquals(result, {
			"John-Doe": { firstName: "John", lastName: "Doe", age: 30 },
			"Jane-Doe": { firstName: "Jane", lastName: "Doe", age: 25 },
			"John-Smith": { firstName: "John", lastName: "Smith", age: 35 },
		})
	})

	await t.step("works with numeric string keys", () => {
		const items = [
			{ id: "001", value: "first" },
			{ id: "002", value: "second" },
			{ id: "003", value: "third" },
		]
		const result = indexBy((item: { id: string }) => item.id)(items)
		assertEquals(result["001"], { id: "001", value: "first" })
		assertEquals(result["002"], { id: "002", value: "second" })
		assertEquals(result["003"], { id: "003", value: "third" })
	})

	await t.step("handles special numeric values as keys", () => {
		const items = [
			{ key: 0, value: "zero" },
			{ key: -0, value: "negative zero" },
			{ key: Infinity, value: "infinity" },
			{ key: -Infinity, value: "negative infinity" },
			{ key: NaN, value: "not a number" },
		]
		const result = indexBy((item: { key: number; value: string }) => item.key)(
			items,
		)

		// 0 and -0 are the same key
		assertEquals(result[0], { key: -0, value: "negative zero" })
		assertEquals(result[Infinity], { key: Infinity, value: "infinity" })
		assertEquals(result[-Infinity], {
			key: -Infinity,
			value: "negative infinity",
		})
		// NaN becomes "NaN" when used as object key
		assertEquals(result.NaN, { key: NaN, value: "not a number" })
	})

	await t.step("property tests", async (t) => {
		await t.step("always returns an object", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.func(fc.oneof(fc.string(), fc.integer())),
					(arr, keyFn) => {
						const result = indexBy(keyFn)(arr)
						assert(typeof result === "object")
						assert(result !== null)
						assert(!Array.isArray(result))
					},
				),
			)
		})

		await t.step("number of unique keys <= array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						const result = indexBy((x: number) => x)(arr)
						const keyCount = Object.keys(result).length
						assert(keyCount <= arr.length)
					},
				),
			)
		})

		await t.step("all values in result are from original array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						const result = indexBy((x: number) => x.toString())(arr)
						const values = Object.values(result)
						assert(values.every((v) => arr.includes(v)))
					},
				),
			)
		})

		await t.step("with unique keys preserves all elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						// Use index as key to ensure uniqueness
						const result = indexBy((_: number, i: number) => i)(arr)
						assertEquals(Object.keys(result).length, arr.length)
						arr.forEach((val, i) => {
							assertEquals(result[i], val)
						})
					},
				),
			)
		})

		await t.step("constant key function results in single entry", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						const result = indexBy(() => "constant")(arr)
						assertEquals(Object.keys(result).length, 1)
						assertEquals(result.constant, arr[arr.length - 1])
					},
				),
			)
		})

		await t.step("keys match the keyFn output", () => {
			fc.assert(
				fc.property(
					fc.array(
						fc.record({
							id: fc.integer({ min: 0, max: 100 }),
							value: fc.string(),
						}),
						{ minLength: 1, maxLength: 20 },
					),
					(arr) => {
						const result = indexBy((item: { id: number }) => item.id)(arr)
						Object.entries(result).forEach(([key, value]) => {
							assertEquals(Number(key), value.id)
						})
					},
				),
			)
		})
	})

	await t.step("works with partial application", () => {
		type Item = { id: string; val: number }
		const indexById = indexBy((x: Item) => x.id)
		const items: Item[] = [
			{ id: "a", val: 1 },
			{ id: "b", val: 2 },
		]
		const result = indexById(items)
		assertEquals(result, {
			a: { id: "a", val: 1 },
			b: { id: "b", val: 2 },
		})
	})

	await t.step("key function is called in order", () => {
		const calls: number[] = []
		const items = [1, 2, 3, 4, 5]
		indexBy((x: number) => {
			calls.push(x)
			return x.toString()
		})(items)
		assertEquals(calls, [1, 2, 3, 4, 5])
	})

	await t.step(
		"handles arrays with mixed types when key function works",
		() => {
			const mixed = [1, "two", { three: 3 }, [4], null, undefined]
			const result = indexBy((_: unknown, i: number) => i)(mixed)
			assertEquals(result, {
				0: 1,
				1: "two",
				2: { three: 3 },
				3: [4],
				4: null,
				5: undefined,
			})
		},
	)
})
