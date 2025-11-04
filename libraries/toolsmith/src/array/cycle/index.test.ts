import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import cycle from "./index.ts"

//++ Tests for cycle (creates infinite repeating cycle of array elements)

//++ Basic functionality tests

Deno.test("cycle with single element repeats infinitely", function testCycleSingle() {
	const generator = cycle([1])
	const first10 = []

	for (let i = 0; i < 10; i++) {
		const next = generator.next()
		if (!next.done) {
			first10.push(next.value)
		}
	}

	assertEquals(first10, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
})

Deno.test("cycle with multiple elements repeats in order", function testCycleMultiple() {
	const generator = cycle([1, 2, 3])
	const first12 = []

	for (let i = 0; i < 12; i++) {
		const next = generator.next()
		if (!next.done) {
			first12.push(next.value)
		}
	}

	assertEquals(first12, [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3])
})

Deno.test("cycle with strings repeats correctly", function testCycleStrings() {
	const generator = cycle(["a", "b"])
	const first6 = []

	for (let i = 0; i < 6; i++) {
		const next = generator.next()
		if (!next.done) {
			first6.push(next.value)
		}
	}

	assertEquals(first6, ["a", "b", "a", "b", "a", "b"])
})

Deno.test("cycle with empty array yields nothing", function testCycleEmpty() {
	const generator = cycle<number>([])
	const next = generator.next()

	assertEquals(next.done, true)
})

Deno.test("cycle with null yields nothing", function testCycleNull() {
	const generator = cycle<number>(null)
	const next = generator.next()

	assertEquals(next.done, true)
})

Deno.test("cycle with undefined yields nothing", function testCycleUndefined() {
	const generator = cycle<number>(undefined)
	const next = generator.next()

	assertEquals(next.done, true)
})

Deno.test("cycle preserves order within cycle", function testCycleOrder() {
	const generator = cycle([1, 2, 3, 4])
	const first8 = []

	for (let i = 0; i < 8; i++) {
		const next = generator.next()
		if (!next.done) {
			first8.push(next.value)
		}
	}

	assertEquals(first8, [1, 2, 3, 4, 1, 2, 3, 4])
})

Deno.test("cycle with objects preserves references", function testCycleObjects() {
	const obj1 = { id: 1 }
	const obj2 = { id: 2 }
	const generator = cycle([obj1, obj2])
	const first4 = []

	for (let i = 0; i < 4; i++) {
		const next = generator.next()
		if (!next.done) {
			first4.push(next.value)
		}
	}

	assertEquals(first4, [obj1, obj2, obj1, obj2])
})

Deno.test("cycle can be iterated with for-of", function testCycleForOf() {
	const generator = cycle([1, 2, 3])
	const first9 = []
	let count = 0

	for (const value of generator) {
		first9.push(value)
		count++
		if (count >= 9) break
	}

	assertEquals(first9, [1, 2, 3, 1, 2, 3, 1, 2, 3])
})

Deno.test("cycle with different types", function testCycleMixed() {
	const generator = cycle<number | string>([1, "a", 2, "b"])
	const first8 = []

	for (let i = 0; i < 8; i++) {
		const next = generator.next()
		if (!next.done) {
			first8.push(next.value)
		}
	}

	assertEquals(first8, [1, "a", 2, "b", 1, "a", 2, "b"])
})

//++ Edge cases

Deno.test("cycle multiple independent generators", function testCycleIndependent() {
	const gen1 = cycle([1, 2])
	const gen2 = cycle([3, 4])

	const val1a = gen1.next().value
	const val2a = gen2.next().value
	const val1b = gen1.next().value
	const val2b = gen2.next().value

	assertEquals(val1a, 1)
	assertEquals(val2a, 3)
	assertEquals(val1b, 2)
	assertEquals(val2b, 4)
})

Deno.test("cycle with large array cycles correctly", function testCycleLarge() {
	const largeArray = Array.from({ length: 100 }, function makeElement(_, i) {
		return i
	})
	const generator = cycle(largeArray)
	const first250 = []

	for (let i = 0; i < 250; i++) {
		const next = generator.next()
		if (!next.done) {
			first250.push(next.value)
		}
	}

	//++ Should have 2.5 complete cycles
	assertEquals(first250.length, 250)
	assertEquals(first250[0], 0)
	assertEquals(first250[99], 99)
	assertEquals(first250[100], 0) //++ Second cycle starts
	assertEquals(first250[249], 49) //++ Halfway through third cycle
})

Deno.test("cycle generator can be stopped early", function testCycleStop() {
	const generator = cycle([1, 2, 3])
	const values = []

	for (let i = 0; i < 5; i++) {
		const next = generator.next()
		if (!next.done) {
			values.push(next.value)
		}
	}

	//++ Generator stopped after 5 values
	assertEquals(values.length, 5)
	assertEquals(values, [1, 2, 3, 1, 2])
})

//++ Property-based tests

Deno.test("cycle maintains element frequency", function testCycleFrequencyProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 10 }), {
				minLength: 1,
				maxLength: 5,
			}),
			function propertyCycleFrequency(arr: ReadonlyArray<number>) {
				const generator = cycle(arr)
				const iterations = arr.length * 3 //++ 3 complete cycles
				const values: Array<number> = []

				for (let i = 0; i < iterations; i++) {
					const next = generator.next()
					if (!next.done) {
						values.push(next.value)
					}
				}

				//++ Each unique element should appear as many times as it appears in arr, times 3
				const uniqueElements = Array.from(new Set(arr))
				uniqueElements.forEach(function checkFrequency(element: number) {
					//++ Count occurrences in original array
					const originalCount = arr.filter(function countInOriginal(x) {
						return x === element
					}).length

					//++ Count occurrences in cycled values
					const cycledCount = values.filter(function countInCycled(x) {
						return x === element
					}).length

					//++ Should appear originalCount * 3 times (3 complete cycles)
					assertEquals(cycledCount, originalCount * 3)
				})
			},
		),
	)
})

Deno.test("cycle always repeats pattern", function testCyclePatternProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 10 }),
			function propertyCyclePattern(arr: ReadonlyArray<number>) {
				const generator = cycle(arr)
				const values: Array<number> = []
				const iterations = arr.length * 2

				for (let i = 0; i < iterations; i++) {
					const next = generator.next()
					if (!next.done) {
						values.push(next.value)
					}
				}

				//++ First cycle should match second cycle
				for (let i = 0; i < arr.length; i++) {
					assertEquals(values[i], values[i + arr.length])
				}
			},
		),
	)
})
