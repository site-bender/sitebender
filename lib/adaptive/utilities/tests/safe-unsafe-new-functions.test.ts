import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"

// Unsafe versions
import mergeDeepUnsafe from "../unsafe/object/mergeDeep/index.ts"
import setUnsafe from "../unsafe/object/set/index.ts"
import mapValuesUnsafe from "../unsafe/object/mapValues/index.ts"
import groupByUnsafe from "../unsafe/array/groupBy/index.ts"
import partitionUnsafe from "../unsafe/array/partition/index.ts"
import wordsUnsafe from "../unsafe/string/words/index.ts"

// Safe versions
import mergeDeepSafe from "../safe/object/mergeDeep/index.ts"
import setSafe from "../safe/object/set/index.ts"
import mapValuesSafe from "../safe/object/mapValues/index.ts"
import groupBySafe from "../safe/array/groupBy/index.ts"
import partitionSafe from "../safe/array/partition/index.ts"
import wordsSafe from "../safe/string/words/index.ts"

// Either utilities
import { isLeft, isRight } from "../types/either/index.ts"
import { pipeEither } from "../types/either/pipeline/index.ts"

describe("Safe vs Unsafe - New Functions", () => {
	describe("mergeDeep", () => {
		const source = { a: { b: 1 }, c: 2 }
		const target = { a: { d: 3 }, e: 4 }
		
		it("unsafe version returns merged object directly", () => {
			const result = mergeDeepUnsafe(source)(target)
			expect(result).toEqual({ a: { b: 1, d: 3 }, c: 2, e: 4 })
		})
		
		it("safe version returns Right with merged object", () => {
			const result = mergeDeepSafe(source)(target)
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual({ a: { b: 1, d: 3 }, c: 2, e: 4 })
			}
		})
		
		it("unsafe handles null gracefully", () => {
			const result = mergeDeepUnsafe(source)(null)
			expect(result).toEqual(source)
		})
		
		it("safe handles null gracefully", () => {
			const result = mergeDeepSafe(source)(null)
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual(source)
			}
		})
	})
	
	describe("set", () => {
		const obj = { user: { name: "Alice" } }
		
		it("unsafe version sets value directly", () => {
			const result = setUnsafe("user.email")("alice@example.com")(obj)
			expect(result).toEqual({
				user: { name: "Alice", email: "alice@example.com" }
			})
		})
		
		it("safe version returns Right with updated object", () => {
			const result = setSafe("user.email")("alice@example.com")(obj)
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual({
					user: { name: "Alice", email: "alice@example.com" }
				})
			}
		})
		
		it("unsafe creates intermediate objects", () => {
			const result = setUnsafe("a.b.c")(42)({})
			expect(result).toEqual({ a: { b: { c: 42 } } })
		})
		
		it("safe creates intermediate objects", () => {
			const result = setSafe("a.b.c")(42)({})
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual({ a: { b: { c: 42 } } })
			}
		})
	})
	
	describe("mapValues", () => {
		const obj = { a: 1, b: 2, c: 3 }
		const doubler = (x: number) => x * 2
		
		it("unsafe version maps directly", () => {
			const result = mapValuesUnsafe(doubler)(obj)
			expect(result).toEqual({ a: 2, b: 4, c: 6 })
		})
		
		it("safe version returns Right with mapped object", () => {
			const result = mapValuesSafe(doubler)(obj)
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual({ a: 2, b: 4, c: 6 })
			}
		})
		
		it("unsafe handles null as empty object", () => {
			const result = mapValuesUnsafe(doubler)(null)
			expect(result).toEqual({})
		})
		
		it("safe handles null gracefully", () => {
			const result = mapValuesSafe(doubler)(null)
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual({})
			}
		})
	})
	
	describe("groupBy", () => {
		const items = [
			{ type: "A", value: 1 },
			{ type: "B", value: 2 },
			{ type: "A", value: 3 }
		]
		
		it("unsafe version groups directly", () => {
			const result = groupByUnsafe((item: typeof items[0]) => item.type)(items)
			expect(result).toEqual({
				A: [{ type: "A", value: 1 }, { type: "A", value: 3 }],
				B: [{ type: "B", value: 2 }]
			})
		})
		
		it("safe version returns Right with grouped object", () => {
			const result = groupBySafe((item: typeof items[0]) => item.type)(items)
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual({
					A: [{ type: "A", value: 1 }, { type: "A", value: 3 }],
					B: [{ type: "B", value: 2 }]
				})
			}
		})
	})
	
	describe("partition", () => {
		const numbers = [1, 2, 3, 4, 5, 6]
		const isEven = (x: number) => x % 2 === 0
		
		it("unsafe version partitions directly", () => {
			const result = partitionUnsafe(isEven)(numbers)
			expect(result).toEqual([[2, 4, 6], [1, 3, 5]])
		})
		
		it("safe version returns Right with partitioned arrays", () => {
			const result = partitionSafe(isEven)(numbers)
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual([[2, 4, 6], [1, 3, 5]])
			}
		})
	})
	
	describe("words", () => {
		it("unsafe version splits directly", () => {
			const result = wordsUnsafe("camelCase")
			expect(result).toEqual(["camel", "Case"])
		})
		
		it("safe version returns Right with words array", () => {
			const result = wordsSafe("camelCase")
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual(["camel", "Case"])
			}
		})
		
		it("unsafe handles complex cases", () => {
			const result = wordsUnsafe("XMLHttpRequest")
			expect(result).toEqual(["XML", "Http", "Request"])
		})
		
		it("safe handles complex cases", () => {
			const result = wordsSafe("XMLHttpRequest")
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual(["XML", "Http", "Request"])
			}
		})
		
		it("safe validates input type", () => {
			const result = wordsSafe(123)
			expect(isLeft(result)).toBe(true)
			if (isLeft(result)) {
				expect(result.value.name).toBe("WordsError")
				expect(result.value.message).toContain("must be a string")
			}
		})
	})
	
	describe("pipeline composition", () => {
		it("safe functions compose in pipeline", () => {
			const process = pipeEither(
				setSafe("status")("processing"),
				mapValuesSafe((v: string | number | boolean) => typeof v === "string" ? v.toUpperCase() : v),
				setSafe("processed")(true)
			)
			
			const result = process({ id: 1, name: "test" })
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual({
					id: 1,
					name: "TEST",
					status: "PROCESSING",
					processed: true
				})
			}
		})
		
		it("pipeline short-circuits on error", () => {
			const failingFn = (obj: unknown) => {
				throw new Error("Intentional error")
			}
			
			const process = pipeEither(
				setSafe("step1")("done"),
				mapValuesSafe(failingFn),  // This will fail
				setSafe("step2")("done")   // This won't run
			)
			
			const result = process({ initial: true })
			expect(isLeft(result)).toBe(true)
			if (isLeft(result)) {
				expect(result.value.message).toContain("Intentional error")
			}
		})
	})
})