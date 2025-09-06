import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import reduce from "../../../../src/simple/array/reduce/index.ts"

// Test all JSDoc examples
Deno.test("reduce - sum numbers", () => {
	const result = reduce((acc: number, n: number) => acc + n)(0)([1, 2, 3])
	assertEquals(result, 6)
})

Deno.test("reduce - build new array (map)", () => {
	const result = reduce((acc: Array<number>, n: number) => [...acc, n * 2])(
		[],
	)(
		[1, 2, 3],
	)
	assertEquals(result, [2, 4, 6])
})

Deno.test("reduce - filter", () => {
	const result = reduce((acc: Array<number>, n: number) =>
		n > 2 ? [...acc, n] : acc
	)([])([1, 2, 3, 4])
	assertEquals(result, [3, 4])
})

Deno.test("reduce - build object", () => {
	const result = reduce((
		acc: Record<string, number>,
		[k, v]: [string, number],
	) => ({ ...acc, [k]: v }))({})([["a", 1], ["b", 2]])
	assertEquals(result, { a: 1, b: 2 })
})

Deno.test("reduce - flatten", () => {
	const result = reduce((acc: Array<number>, arr: Array<number>) =>
		acc.concat(arr)
	)([])([[1, 2], [3, 4]])
	assertEquals(result, [1, 2, 3, 4])
})

// Additional tests
Deno.test("reduce - product of numbers", () => {
	const result = reduce((acc: number, n: number) => acc * n)(1)([2, 3, 4])
	assertEquals(result, 24)
})

Deno.test("reduce - find maximum", () => {
	const result = reduce((acc: number, n: number) => Math.max(acc, n))(
		-Infinity,
	)([3, 1, 4, 1, 5])
	assertEquals(result, 5)
})

Deno.test("reduce - find minimum", () => {
	const result = reduce((acc: number, n: number) => Math.min(acc, n))(
		Infinity,
	)(
		[3, 1, 4, 1, 5],
	)
	assertEquals(result, 1)
})

Deno.test("reduce - count occurrences", () => {
	const result = reduce((acc: Record<string, number>, item: string) => {
		acc[item] = (acc[item] || 0) + 1
		return acc
	})({})(["a", "b", "a", "c", "b", "a"])
	assertEquals(result, { a: 3, b: 2, c: 1 })
})

Deno.test("reduce - reverse array", () => {
	const result = reduce((acc: Array<number>, n: number) => [n, ...acc])([])([
		1,
		2,
		3,
		4,
	])
	assertEquals(result, [4, 3, 2, 1])
})

Deno.test("reduce - empty array returns initial value", () => {
	const result = reduce((acc: number, n: number) => acc + n)(42)([])
	assertEquals(result, 42)
})

Deno.test("reduce - null input returns initial value", () => {
	const result = reduce((acc: number, n: number) => acc + n)(10)(null)
	assertEquals(result, 10)
})

Deno.test("reduce - undefined input returns initial value", () => {
	const result = reduce((acc: number, n: number) => acc + n)(20)(undefined)
	assertEquals(result, 20)
})

Deno.test("reduce - non-array inputs return initial value", () => {
	assertEquals(reduce(() => 0)(42)("string" as any), 42)
	assertEquals(reduce(() => 0)(42)(123 as any), 42)
	assertEquals(reduce(() => 0)(42)({} as any), 42)
	assertEquals(reduce(() => 0)(42)(true as any), 42)
	assertEquals(reduce(() => 0)(42)((() => {}) as any), 42)
	assertEquals(reduce(() => 0)(42)(new Map() as any), 42)
	assertEquals(reduce(() => 0)(42)(new Set() as any), 42)
})

Deno.test("reduce - single element array", () => {
	const result = reduce((acc: number, n: number) => acc + n)(10)([5])
	assertEquals(result, 15)
})

Deno.test("reduce - with index parameter", () => {
	const indices: Array<number> = []
	reduce((acc: number, n: number, index?: number) => {
		if (index !== undefined) indices.push(index)
		return acc + n
	})(0)([10, 20, 30])
	assertEquals(indices, [0, 1, 2])
})

Deno.test("reduce - group by property", () => {
	interface Person {
		name: string
		age: number
	}

	const people: Array<Person> = [
		{ name: "Alice", age: 25 },
		{ name: "Bob", age: 30 },
		{ name: "Charlie", age: 25 },
	]

	const result = reduce(
		(acc: Record<number, Array<Person>>, person: Person) => {
			const key = person.age
			if (!acc[key]) acc[key] = []
			acc[key].push(person)
			return acc
		},
	)({} as Record<number, Array<Person>>)(people)

	assertEquals(result, {
		25: [{ name: "Alice", age: 25 }, { name: "Charlie", age: 25 }],
		30: [{ name: "Bob", age: 30 }],
	})
})

Deno.test("reduce - string concatenation", () => {
	const result = reduce((acc: string, s: string) => acc + s)("")([
		"Hello",
		" ",
		"World",
	])
	assertEquals(result, "Hello World")
})

Deno.test("reduce - complex transformation", () => {
	const result = reduce((acc: { sum: number; count: number }, n: number) => ({
		sum: acc.sum + n,
		count: acc.count + 1,
	}))({ sum: 0, count: 0 })([1, 2, 3, 4, 5])

	assertEquals(result, { sum: 15, count: 5 })
})

Deno.test("reduce - partial application", () => {
	const sumReducer = reduce((acc: number, n: number) => acc + n)
	const sumFrom0 = sumReducer(0)
	const sumFrom10 = sumReducer(10)

	assertEquals(sumFrom0([1, 2, 3]), 6)
	assertEquals(sumFrom10([1, 2, 3]), 16)
})

Deno.test("reduce - currying order (fn)(initial)(array)", () => {
	const step1 = reduce((acc: number, n: number) => acc + n)
	const step2 = step1(0)
	const result = step2([1, 2, 3])
	assertEquals(result, 6)
})

Deno.test("reduce - handles sparse arrays", () => {
	const sparse: Array<number | undefined> = [1, , 3] // eslint-disable-line no-sparse-arrays
	const result = reduce((
		acc: Array<number | undefined>,
		n: number | undefined,
	) => [...acc, n])([])
	// Note: reduce skips empty slots in sparse arrays
	const applied = result(sparse)
	assertEquals(applied.length, 2) // Only 2 elements, not 3
	assertEquals(applied, [1, 3])
})

Deno.test("reduce - handles functions that throw", () => {
	const throwingFn = (acc: number, n: number) => {
		if (n === 2) throw new Error("test error")
		return acc + n
	}

	try {
		reduce(throwingFn)(0)([1, 2, 3])
		assertEquals(true, false, "Should have thrown")
	} catch (e) {
		assertEquals((e as Error).message, "test error")
	}
})

Deno.test("reduce - NaN and Infinity", () => {
	const result = reduce((acc: number, n: number) => acc + n)(0)([
		NaN,
		Infinity,
		-Infinity,
		1,
	])
	assertEquals(Number.isNaN(result), true)
})

// Property-based tests
Deno.test("reduce - associativity for addition", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: -1000, max: 1000 })),
			(array) => {
				const sumLeft = reduce((acc: number, n: number) => acc + n)(0)(
					array,
				)
				const sumRight = array.reduceRight((acc, n) => acc + n, 0)
				assertEquals(sumLeft, sumRight)
			},
		),
	)
})

Deno.test("reduce - identity element", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(array) => {
				// For addition, 0 is identity
				const sum = reduce((acc: number, n: number) => acc + n)(0)(
					array,
				)
				const expected = array.reduce((acc, n) => acc + n, 0)
				assertEquals(sum, expected)

				// For multiplication, 1 is identity
				const product = reduce((acc: number, n: number) => acc * n)(1)(
					array,
				)
				const expectedProduct = array.reduce((acc, n) => acc * n, 1)
				assertEquals(product, expectedProduct)
			},
		),
	)
})

Deno.test("reduce - builds same array when used as identity", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(array) => {
				const rebuilt = reduce((
					acc: Array<any>,
					item: any,
				) => [...acc, item])(
					[],
				)(array)
				assertEquals(rebuilt, array)
			},
		),
	)
})

Deno.test("reduce - length counting", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(array) => {
				const length = reduce((acc: number, _: any) => acc + 1)(0)(
					array,
				)
				assertEquals(length, array.filter(() => true).length) // Filter to handle sparse arrays
			},
		),
	)
})

Deno.test("reduce - respects currying structure", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, initial) => {
				const fn = (acc: number, n: number) => acc + n

				// All these should be equivalent
				const result1 = reduce(fn)(initial)(array)
				const curriedFn = reduce(fn)
				const curriedWithInitial = curriedFn(initial)
				const result2 = curriedWithInitial(array)

				assertEquals(result1, result2)
			},
		),
	)
})

Deno.test("reduce - different initial types", () => {
	const numbers = [1, 2, 3]

	// Initial as string
	const asString = reduce((acc: string, n: number) => acc + n)("")(numbers)
	assertEquals(asString, "123")

	// Initial as object
	const asObject = reduce((acc: { values: Array<number> }, n: number) => ({
		values: [...acc.values, n],
	}))({ values: [] })(numbers)
	assertEquals(asObject, { values: [1, 2, 3] })

	// Initial as boolean
	const asBoolean = reduce((acc: boolean, n: number) => acc && n > 0)(true)(
		numbers,
	)
	assertEquals(asBoolean, true)
})

Deno.test("reduce - immutability of initial value", () => {
	const initial = { count: 0, values: [] as Array<number> }
	const result = reduce((acc: typeof initial, n: number) => ({
		count: acc.count + 1,
		values: [...acc.values, n],
	}))(initial)([1, 2, 3])

	// Initial should be unchanged
	assertEquals(initial, { count: 0, values: [] })
	// Result should be new
	assertEquals(result, { count: 3, values: [1, 2, 3] })
})
