import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"
import type { Generator, Seed } from "../../../../types/index.ts"
import createSeed from "../../../../random/createSeed/index.ts"
import _selectGenerator from "./index.ts"

describe("_selectGenerator", function () {
	function makeTestGenerator(id: string): Generator<string> {
		return {
			next: function generateNext(seed: Seed) {
				return { value: id, nextSeed: seed, size: 1 }
			},
			shrink: function shrinkValue(v: string) {
				return {
					value: v,
					children: function getChildren() {
						return []
					},
				}
			},
		}
	}

	it("should return generator and next seed for single generator", function () {
		const gen = makeTestGenerator("only")
		const generators = [gen]
		const seedResult = createSeed(12345)
		if (seedResult._tag === "Error") throw new Error("Failed to create seed")
		const seed = seedResult.value

		const selector = _selectGenerator(generators)
		const result = selector(seed)

		assertEquals(result.generator, gen)
		assertEquals(typeof result.nextSeed.state, "number")
		assertEquals(typeof result.nextSeed.stream, "number")
	})

	it("should select from multiple generators", function () {
		const gen1 = makeTestGenerator("first")
		const gen2 = makeTestGenerator("second")
		const gen3 = makeTestGenerator("third")
		const generators = [gen1, gen2, gen3]

		const selector = _selectGenerator(generators)
		const seedResult = createSeed(54321)
		if (seedResult._tag === "Error") throw new Error("Failed to create seed")
		const seed = seedResult.value
		const result = selector(seed)

		assertEquals(
			result.generator !== undefined && generators.includes(result.generator),
			true,
		)
	})

	it("should be deterministic with same seed", function () {
		const generators = Array.from({ length: 5 }, function (_, i) {
			return makeTestGenerator(`gen${i}`)
		})

		const selector = _selectGenerator(generators)
		const seedResult = createSeed(9999)
		if (seedResult._tag === "Error") throw new Error("Failed to create seed")
		const seed = seedResult.value

		const result1 = selector(seed)
		const result2 = selector(seed)

		assertEquals(result1.generator, result2.generator)
		assertEquals(result1.nextSeed.state, result2.nextSeed.state)
		assertEquals(result1.nextSeed.stream, result2.nextSeed.stream)
	})

	it("should produce different selections with different seeds", function () {
		const generators = Array.from({ length: 10 }, function (_, i) {
			return makeTestGenerator(`gen${i}`)
		})

		const selector = _selectGenerator(generators)
		const selections = new Set<Generator<string>>()

		function collectSelections(index: number): void {
			if (index >= 100) return
			const seedResult = createSeed(1000 + index * 137)
			if (seedResult._tag === "Error") return
			const seed = seedResult.value
			const result = selector(seed)
			if (result.generator) {
				selections.add(result.generator)
			}
			collectSelections(index + 1)
		}

		collectSelections(0)

		assertEquals(
			selections.size > 1,
			true,
			"Should select variety of generators",
		)
	})

	it("should handle empty array", function () {
		const generators: ReadonlyArray<Generator<string>> = []
		const selector = _selectGenerator(generators)
		const seedResult = createSeed(12345)
		if (seedResult._tag === "Error") throw new Error("Failed to create seed")
		const seed = seedResult.value
		const result = selector(seed)

		assertEquals(result.generator, undefined)
		assertEquals(typeof result.nextSeed.state, "number")
		assertEquals(typeof result.nextSeed.stream, "number")
	})

	it("should advance seed differently than selection", function () {
		const generators = [makeTestGenerator("test")]
		const selector = _selectGenerator(generators)
		const seedResult = createSeed(7777)
		if (seedResult._tag === "Error") throw new Error("Failed to create seed")
		const seed = seedResult.value
		const result = selector(seed)

		assertEquals(result.nextSeed.state !== seed.state, true)
	})

	describe("property-based tests", function () {
		it("should always select valid index", function () {
			fc.assert(
				fc.property(
					fc.array(fc.string(), { minLength: 1, maxLength: 20 }),
					fc.integer({ min: 0, max: 100000 }),
					function (ids, seedValue) {
						const generators = ids.map(function (id) {
							return makeTestGenerator(id)
						})
						const selector = _selectGenerator(generators)
						const seedResult = createSeed(seedValue)
						if (seedResult._tag === "Error") return false
						const seed = seedResult.value
						const result = selector(seed)

						return result.generator
							? generators.includes(result.generator)
							: generators.length === 0
					},
				),
			)
		})

		it("should always return advanced seed", function () {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 10 }),
					fc.integer({ min: 0, max: 100000 }),
					function (count, seedValue) {
						const generators = Array.from({ length: count }, function (_, i) {
							return makeTestGenerator(`gen${i}`)
						})
						const selector = _selectGenerator(generators)
						const seedResult = createSeed(seedValue)
						if (seedResult._tag === "Error") return false
						const seed = seedResult.value
						const result = selector(seed)

						return result.nextSeed.state !== seed.state ||
							result.nextSeed.stream !== seed.stream
					},
				),
			)
		})
	})
})
