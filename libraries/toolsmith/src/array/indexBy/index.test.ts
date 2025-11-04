import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import indexBy from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for indexBy (indexes elements by a key function)

//++ Plain array path tests

Deno.test("indexBy creates index by key function", function testIndexByBasic() {
	interface User {
		id: number
		name: string
	}

	const users: ReadonlyArray<User> = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" },
	]

	const result = indexBy(function getId(user: User): number {
		return user.id
	})(users)

	assertEquals(result, {
		1: { id: 1, name: "Alice" },
		2: { id: 2, name: "Bob" },
		3: { id: 3, name: "Charlie" },
	})
})

Deno.test("indexBy with string keys", function testIndexByString() {
	interface User {
		id: number
		name: string
	}

	const users: ReadonlyArray<User> = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" },
	]

	const result = indexBy(function getName(user: User): string {
		return user.name
	})(users)

	assertEquals(result, {
		Alice: { id: 1, name: "Alice" },
		Bob: { id: 2, name: "Bob" },
		Charlie: { id: 3, name: "Charlie" },
	})
})

Deno.test("indexBy with empty array", function testIndexByEmpty() {
	const result = indexBy<number, string>(function getId() {
		return "key"
	})([])

	assertEquals(result, {})
})

Deno.test("indexBy with single element", function testIndexBySingle() {
	const result = indexBy(function getIdentity(x: number): string {
		return String(x)
	})([42])

	assertEquals(result, { "42": 42 })
})

Deno.test("indexBy with duplicate keys keeps last", function testIndexByDuplicates() {
	interface Item {
		category: string
		value: number
	}

	const items: ReadonlyArray<Item> = [
		{ category: "A", value: 1 },
		{ category: "B", value: 2 },
		{ category: "A", value: 3 },
	]

	const result = indexBy(function getCategory(item: Item): string {
		return item.category
	})(items)

	// Last value wins
	assertEquals(result, {
		A: { category: "A", value: 3 },
		B: { category: "B", value: 2 },
	})
})

Deno.test("indexBy uses index parameter", function testIndexByWithIndex() {
	const result = indexBy(function getIndex(_element: string, index: number): number {
		return index
	})(["a", "b", "c"])

	assertEquals(result, {
		0: "a",
		1: "b",
		2: "c",
	})
})

Deno.test("indexBy uses array parameter", function testIndexByWithArray() {
	const result = indexBy(
		function getPosition(
			element: string,
			_index: number,
			array: ReadonlyArray<string>,
		): string {
			return element + array.length
		},
	)(["a", "b", "c"])

	assertEquals(result, {
		a3: "a",
		b3: "b",
		c3: "c",
	})
})

Deno.test("indexBy with numeric keys", function testIndexByNumeric() {
	const result = indexBy(function getDouble(x: number): number {
		return x * 2
	})([1, 2, 3, 4, 5])

	assertEquals(result, {
		2: 1,
		4: 2,
		6: 3,
		8: 4,
		10: 5,
	})
})

Deno.test("indexBy with complex objects", function testIndexByComplex() {
	interface Product {
		sku: string
		name: string
		price: number
	}

	const products: ReadonlyArray<Product> = [
		{ sku: "ABC123", name: "Widget", price: 10 },
		{ sku: "DEF456", name: "Gadget", price: 20 },
		{ sku: "GHI789", name: "Doohickey", price: 15 },
	]

	const result = indexBy(function getSku(product: Product): string {
		return product.sku
	})(products)

	assertEquals(result, {
		ABC123: { sku: "ABC123", name: "Widget", price: 10 },
		DEF456: { sku: "DEF456", name: "Gadget", price: 20 },
		GHI789: { sku: "GHI789", name: "Doohickey", price: 15 },
	})
})

Deno.test("indexBy with large array", function testIndexByLarge() {
	const largeArray = Array.from({ length: 1000 }, function makeNumber(_, i) {
		return i
	})

	const result = indexBy(function getIdentity(x: number): string {
		return String(x)
	})(largeArray)

	assertEquals(Object.keys(result).length, 1000)
	assertEquals(result["0"], 0)
	assertEquals(result["500"], 500)
	assertEquals(result["999"], 999)
})

//++ Result monad path tests

Deno.test("indexBy with Result ok creates index", function testIndexByResultOk() {
	interface User {
		id: number
		name: string
	}

	const users: ReadonlyArray<User> = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
	]

	const result = indexBy(function getId(user: User): number {
		return user.id
	})(ok(users))

	assertEquals(result, ok({
		1: { id: 1, name: "Alice" },
		2: { id: 2, name: "Bob" },
	}))
})

Deno.test("indexBy with Result ok and empty array", function testIndexByResultEmpty() {
	const result = indexBy<number, string>(function getId() {
		return "key"
	})(ok([]))

	assertEquals(result, ok({}))
})

Deno.test("indexBy with Result error passes through", function testIndexByResultError() {
	const err = error({ code: "TEST_ERROR", message: "Test error" })
	const result = indexBy(function getId(x: number): string {
		return String(x)
	})(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("indexBy with Validation success creates index", function testIndexByValidationSuccess() {
	interface User {
		id: number
		name: string
	}

	const users: ReadonlyArray<User> = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
	]

	const result = indexBy(function getId(user: User): number {
		return user.id
	})(success(users))

	assertEquals(result, success({
		1: { id: 1, name: "Alice" },
		2: { id: 2, name: "Bob" },
	}))
})

Deno.test("indexBy with Validation success and empty array", function testIndexByValidationEmpty() {
	const result = indexBy<number, string>(function getId() {
		return "key"
	})(success([]))

	assertEquals(result, success({}))
})

Deno.test("indexBy with Validation failure passes through", function testIndexByValidationFailure() {
	const fail = failure([{ code: "TEST_ERROR", message: "Test error" }])
	const result = indexBy(function getId(x: number): string {
		return String(x)
	})(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("indexBy with unique keys has same count as input", function testIndexByUniqueProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyIndexByUnique(arr: ReadonlyArray<number>) {
				const result = indexBy(function getIdentity(x: number): string {
					return String(x)
				})(arr)

				const uniqueCount = new Set(
					arr.map(function stringify(x: number): string {
						return String(x)
					}),
				).size

				assertEquals(Object.keys(result).length, uniqueCount)
			},
		),
	)
})

Deno.test("indexBy all values are from input array", function testIndexByValuesProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 50 })),
			function propertyIndexByValues(arr: ReadonlyArray<number>) {
				const result = indexBy(function getIdentity(x: number): string {
					return String(x)
				})(arr)

				Object.values(result).forEach(function checkValue(value: number) {
					assertEquals(arr.includes(value), true)
				})
			},
		),
	)
})

Deno.test("indexBy always returns Record type", function testIndexByTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyIndexByType(arr: ReadonlyArray<number>) {
				const result = indexBy(function getIdentity(x: number): string {
					return String(x)
				})(arr)

				assertEquals(typeof result, "object")
				assertEquals(result !== null, true)
				assertEquals(Array.isArray(result), false)
			},
		),
	)
})

Deno.test("indexBy lookup by key returns correct element", function testIndexByLookupProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
			function propertyIndexByLookup(arr: ReadonlyArray<number>) {
				const result = indexBy(function getIdentity(x: number): string {
					return String(x)
				})(arr)

				// For any element in array, lookup should return that element
				arr.forEach(function checkLookup(element: number) {
					assertEquals(result[String(element)], element)
				})
			},
		),
	)
})
