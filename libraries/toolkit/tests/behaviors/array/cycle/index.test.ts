import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "fast-check"

import cycle from "../../../../src/simple/array/cycle/index.ts"
import not from "../../../../src/simple/logic/not/index.ts"

Deno.test("cycle", async (t) => {
	await t.step("should cycle through array elements infinitely", () => {
		const gen = cycle([1, 2, 3])
		const result = Array.from({ length: 7 }, () => gen.next().value)
		assertEquals(result, [1, 2, 3, 1, 2, 3, 1])
	})

	await t.step("should handle single element array", () => {
		const gen = cycle([42])
		const result = Array.from({ length: 5 }, () => gen.next().value)
		assertEquals(result, [42, 42, 42, 42, 42])
	})

	await t.step("should handle empty array", () => {
		const gen = cycle([])
		const result = gen.next()
		assertEquals(result.done, true)
		assertEquals(result.value, undefined)
	})

	await t.step("should handle null array", () => {
		const gen = cycle(null)
		const result = gen.next()
		assertEquals(result.done, true)
		assertEquals(result.value, undefined)
	})

	await t.step("should handle undefined array", () => {
		const gen = cycle(undefined)
		const result = gen.next()
		assertEquals(result.done, true)
		assertEquals(result.value, undefined)
	})

	await t.step("should work for round-robin assignment", () => {
		const workers = ["Alice", "Bob", "Charlie"]
		const tasks = ["Task1", "Task2", "Task3", "Task4", "Task5"]
		const workerCycle = cycle(workers)
		const assignments = tasks.map((task) => ({
			task,
			assignedTo: workerCycle.next().value,
		}))
		assertEquals(assignments, [
			{ task: "Task1", assignedTo: "Alice" },
			{ task: "Task2", assignedTo: "Bob" },
			{ task: "Task3", assignedTo: "Charlie" },
			{ task: "Task4", assignedTo: "Alice" },
			{ task: "Task5", assignedTo: "Bob" },
		])
	})

	await t.step("should work for alternating styles", () => {
		const styles = cycle(["odd", "even"])
		const rows = ["Row1", "Row2", "Row3", "Row4"]
		const styledRows = rows.map((row) => ({
			content: row,
			class: styles.next().value,
		}))
		assertEquals(styledRows, [
			{ content: "Row1", class: "odd" },
			{ content: "Row2", class: "even" },
			{ content: "Row3", class: "odd" },
			{ content: "Row4", class: "even" },
		])
	})

	await t.step("should cycle through string array", () => {
		const gen = cycle(["a", "b", "c"])
		const result = Array.from({ length: 8 }, () => gen.next().value)
		assertEquals(result, ["a", "b", "c", "a", "b", "c", "a", "b"])
	})

	await t.step("should cycle through boolean array", () => {
		const gen = cycle([true, false])
		const result = Array.from({ length: 6 }, () => gen.next().value)
		assertEquals(result, [true, false, true, false, true, false])
	})

	await t.step("should cycle through mixed type array", () => {
		const gen = cycle([1, "two", true, null])
		const result = Array.from({ length: 9 }, () => gen.next().value)
		assertEquals(result, [1, "two", true, null, 1, "two", true, null, 1])
	})

	await t.step("should handle object arrays", () => {
		const objects = [{ id: 1 }, { id: 2 }]
		const gen = cycle(objects)
		const result = Array.from({ length: 5 }, () => gen.next().value)
		assertEquals(result, [
			{ id: 1 },
			{ id: 2 },
			{ id: 1 },
			{ id: 2 },
			{ id: 1 },
		])
	})

	await t.step("should allow multiple iterations", () => {
		const gen = cycle([1, 2])
		// First cycle
		assertEquals(gen.next().value, 1)
		assertEquals(gen.next().value, 2)
		// Second cycle
		assertEquals(gen.next().value, 1)
		assertEquals(gen.next().value, 2)
		// Third cycle
		assertEquals(gen.next().value, 1)
		assertEquals(gen.next().value, 2)
	})

	await t.step("should work with for...of loop (limited)", () => {
		const gen = cycle([1, 2, 3])
		const result: number[] = []
		let count = 0
		for (const value of gen) {
			result.push(value)
			count++
			if (count >= 10) break
		}
		assertEquals(result, [1, 2, 3, 1, 2, 3, 1, 2, 3, 1])
	})

	await t.step("should create independent generators", () => {
		const arr = [1, 2, 3]
		const gen1 = cycle(arr)
		const gen2 = cycle(arr)

		assertEquals(gen1.next().value, 1)
		assertEquals(gen1.next().value, 2)

		assertEquals(gen2.next().value, 1)
		assertEquals(gen1.next().value, 3)
		assertEquals(gen2.next().value, 2)
	})

	await t.step("should handle large arrays", () => {
		const largeArray = Array.from({ length: 1000 }, (_, i) => i)
		const gen = cycle(largeArray)

		// First element
		assertEquals(gen.next().value, 0)

		// Skip to end
		for (let i = 1; i < 1000; i++) {
			gen.next()
		}

		// Should cycle back to beginning
		assertEquals(gen.next().value, 0)
		assertEquals(gen.next().value, 1)
	})

	// Property-based tests
	await t.step(
		"property: should always yield elements from the original array",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1, maxLength: 10 }),
					fc.integer({ min: 1, max: 100 }),
					(arr, iterations) => {
						const gen = cycle(arr)
						for (let i = 0; i < iterations; i++) {
							const result = gen.next()
							if (not(result.done) && result.value !== undefined) {
								assertEquals(arr.includes(result.value as number), true)
							}
						}
					},
				),
			)
		},
	)

	await t.step(
		"property: should repeat pattern after array.length iterations",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.string(), { minLength: 1, maxLength: 10 }),
					(arr) => {
						const gen = cycle(arr)
						const firstCycle = Array.from(
							{ length: arr.length },
							() => gen.next().value,
						)
						const secondCycle = Array.from(
							{ length: arr.length },
							() => gen.next().value,
						)
						assertEquals(firstCycle, arr)
						assertEquals(secondCycle, arr)
					},
				),
			)
		},
	)

	await t.step(
		"property: empty arrays should always return done immediately",
		() => {
			fc.assert(
				fc.property(
					fc.constant([]),
					(emptyArr) => {
						const gen = cycle(emptyArr)
						const result = gen.next()
						assertEquals(result.done, true)
						assertEquals(result.value, undefined)
					},
				),
			)
		},
	)

	await t.step(
		"property: single element arrays should always return same element",
		() => {
			fc.assert(
				fc.property(
					fc.integer(),
					fc.integer({ min: 1, max: 50 }),
					(element, iterations) => {
						const gen = cycle([element])
						for (let i = 0; i < iterations; i++) {
							assertEquals(gen.next().value, element)
						}
					},
				),
			)
		},
	)

	await t.step("property: generator state is independent", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer(), { minLength: 2, maxLength: 10 }),
				(arr) => {
					const gen1 = cycle(arr)
					const gen2 = cycle(arr)

					// Advance gen1 by some amount
					for (let i = 0; i < 5; i++) {
						gen1.next()
					}

					// gen2 should still start from beginning
					assertEquals(gen2.next().value, arr[0])
				},
			),
		)
	})
})