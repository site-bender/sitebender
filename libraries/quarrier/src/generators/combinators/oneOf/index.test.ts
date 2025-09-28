import { assertEquals } from "@std/assert"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"
import type { Generator, Seed, ShrinkTree } from "../../../types/index.ts"
import createSeed from "../../../random/createSeed/index.ts"
import err from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import oneOf from "./index.ts"

describe("oneOf", function () {
	const constGen = function makeConstant<T>(value: T): Generator<T> {
		return {
			next: function generateNext(seed: Seed) {
				return { value, nextSeed: seed, size: 1 }
			},
			shrink: function shrinkValue(v: T): ShrinkTree<T> {
				return {
					value: v,
					children: function getChildren() {
						return []
					},
				}
			},
			parse: function parseValue(input: unknown) {
				if (input === value) {
					return ok(value)
				}
				return err({
					type: "TypeMismatch",
					expected: String(value),
					received: String(input),
				})
			},
		}
	}

	describe("next", function () {
		it("should select from single generator", function () {
			const gen = oneOf([constGen(42)])
			const seedResult = createSeed(12345)
			if (seedResult._tag === "Error") throw new Error("Failed to create seed")
			const seed = seedResult.value
			const result = gen.next(seed)
			assertEquals(result.value, 42)
		})

		it("should select from multiple generators", function () {
			const gens = [constGen(1), constGen(2), constGen(3)]
			const gen = oneOf(gens)
			const seedResult = createSeed(12345)
			if (seedResult._tag === "Error") throw new Error("Failed to create seed")
			const seed = seedResult.value
			const result = gen.next(seed)
			assertEquals([1, 2, 3].includes(result.value), true)
		})

		it("should be deterministic with same seed", function () {
			const gens = [constGen("a"), constGen("b"), constGen("c")]
			const gen = oneOf(gens)
			const seedResult = createSeed(9999)
			if (seedResult._tag === "Error") throw new Error("Failed to create seed")
			const seed = seedResult.value

			const result1 = gen.next(seed)
			const result2 = gen.next(seed)

			assertEquals(result1.value, result2.value)
		})

		it("should produce different values with different seeds", function () {
			const gens = Array.from({ length: 10 }, function (_, i) {
				return constGen(i)
			})
			const gen = oneOf(gens)

			const values = new Set<number>()
			const seedStart = 1000
			const numTrials = 100

			function collectValues(index: number): void {
				if (index >= numTrials) return
				const seedResult = createSeed(seedStart + index)
				if (seedResult._tag === "Error") return
				const seed = seedResult.value
				const result = gen.next(seed)
				values.add(result.value)
				collectValues(index + 1)
			}

			collectValues(0)

			assertEquals(values.size > 1, true, "Should produce variety of values")
		})

		it("should handle empty array gracefully", function () {
			const gen = oneOf([])
			const seedResult = createSeed(12345)
			if (seedResult._tag === "Error") throw new Error("Failed to create seed")
			const seed = seedResult.value
			const result = gen.next(seed)
			assertEquals(result.value, undefined)
		})
	})

	describe("shrink", function () {
		it("should collect shrinks from all capable generators", function () {
			// Create generators with actual shrinking behavior
			const shrinkingGen = function makeShrinking(
				val: number,
			): Generator<number> {
				return {
					next: function (seed: Seed) {
						return { value: val, nextSeed: seed, size: 1 }
					},
					shrink: function (v: number): ShrinkTree<number> {
						return {
							value: v,
							children: function () {
								if (v === val && v > 0) {
									// Shrink to half and zero
									return [
										{
											value: Math.floor(v / 2),
											children: function () {
												return []
											},
										},
										{
											value: 0,
											children: function () {
												return []
											},
										},
									]
								}
								return []
							},
						}
					},
				}
			}

			const gen = oneOf([shrinkingGen(100), shrinkingGen(50), shrinkingGen(10)])
			const tree = gen.shrink(100)

			assertEquals(tree.value, 100)
			const children = tree.children()
			// Should have shrinks from the first generator that can shrink 100
			assertEquals(children.length, 2)

			const childValues = children.map(function (child) {
				return child.value
			})
			assertEquals(childValues[0], 50) // Half of 100
			assertEquals(childValues[1], 0) // Zero
		})

		it("should handle single generator shrinking", function () {
			const gen = oneOf([constGen(42)])
			const tree = gen.shrink(42)

			assertEquals(tree.value, 42)
			const children = tree.children()
			assertEquals(children.length, 0)
		})

		it("should handle empty generators", function () {
			const gen = oneOf([])
			const tree = gen.shrink(99)

			assertEquals(tree.value, 99)
			const children = tree.children()
			assertEquals(children.length, 0)
		})
	})

	describe("parse", function () {
		it("should try parsing with all generators", function () {
			const gen = oneOf<string | number | boolean>([
				constGen("hello") as Generator<string | number | boolean>,
				constGen(42) as Generator<string | number | boolean>,
				constGen(true) as Generator<string | number | boolean>,
			])

			const result1 = gen.parse?.("hello")
			assertEquals(result1?._tag, "Ok")
			assertEquals(result1?._tag === "Ok" && result1.value, "hello")

			const result2 = gen.parse?.(42)
			assertEquals(result2?._tag, "Ok")
			assertEquals(result2?._tag === "Ok" && result2.value, 42)

			const result3 = gen.parse?.(true)
			assertEquals(result3?._tag, "Ok")
			assertEquals(result3?._tag === "Ok" && result3.value, true)
		})

		it("should fail when no parser matches", function () {
			const gen = oneOf([
				constGen("a"),
				constGen("b"),
			])

			const result = gen.parse?.("c")
			assertEquals(result?._tag, "Error")
		})

		it("should return first successful parse", function () {
			const multiGen: Generator<string> = {
				next: function generateNext(seed: Seed) {
					return { value: "test", nextSeed: seed, size: 1 }
				},
				shrink: function shrinkValue(v: string): ShrinkTree<string> {
					return {
						value: v,
						children: function getChildren() {
							return []
						},
					}
				},
				parse: function parseValue(input: unknown) {
					if (typeof input === "string") {
						return ok(input)
					}
					return err({
						type: "TypeMismatch",
						expected: "string",
						received: typeof input,
					})
				},
			}

			const gen = oneOf([
				multiGen,
				constGen("fixed"),
			])

			const result = gen.parse?.("anything")
			assertEquals(result?._tag, "Ok")
			assertEquals(result?._tag === "Ok" && result.value, "anything")
		})

		it("should handle empty generators for parse", function () {
			const gen = oneOf([])
			const result = gen.parse?.("anything")
			assertEquals(result?._tag, "Error")
		})

		it("should handle generators without parse method", function () {
			const noParse: Generator<number> = {
				next: function generateNext(seed: Seed) {
					return { value: 1, nextSeed: seed, size: 1 }
				},
				shrink: function shrinkValue(v: number): ShrinkTree<number> {
					return {
						value: v,
						children: function getChildren() {
							return []
						},
					}
				},
			}

			const gen = oneOf([noParse, constGen(2)])
			const result = gen.parse?.(2)
			assertEquals(result?._tag, "Ok")
			assertEquals(result?._tag === "Ok" && result.value, 2)
		})
	})

	describe("property-based tests", function () {
		it("should always select a valid generator index", function () {
			fc.assert(
				fc.property(
					fc.array(fc.constant(null), { minLength: 1, maxLength: 10 }),
					fc.integer({ min: 0, max: 100000 }),
					function (arr, seedValue) {
						const gens = arr.map(function (_, i) {
							return constGen(i)
						})
						const gen = oneOf(gens)
						const seedResult = createSeed(seedValue)
						if (seedResult._tag === "Error") return false
						const seed = seedResult.value
						const result = gen.next(seed)

						return result.value >= 0 && result.value < arr.length
					},
				),
			)
		})

		it("should be deterministic across multiple calls", function () {
			fc.assert(
				fc.property(
					fc.integer({ min: 0, max: 100000 }),
					function (seedValue) {
						const gens = [constGen("a"), constGen("b"), constGen("c")]
						const gen = oneOf(gens)
						const seedResult = createSeed(seedValue)
						if (seedResult._tag === "Error") return false
						const seed = seedResult.value

						const results = Array.from({ length: 10 }, function () {
							return gen.next(seed).value
						})

						return results.every(function (v) {
							return v === results[0]
						})
					},
				),
			)
		})
	})
})
