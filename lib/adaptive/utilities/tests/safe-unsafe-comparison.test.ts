import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"

// Unsafe versions
import pathUnsafe from "../unsafe/object/path/index.ts"
import pickUnsafe from "../unsafe/object/pick/index.ts"

// Safe versions
import pathSafe from "../safe/object/path/index.ts"
import pickSafe from "../safe/object/pick/index.ts"

// Either utilities
import { isLeft, isRight, map, right } from "../types/either/index.ts"
import { pipeEither, pipeMixed } from "../types/either/pipeline/index.ts"

describe("Safe vs Unsafe Comparison", () => {
	const testObj = {
		user: {
			id: 123,
			name: "Alice",
			profile: {
				email: "alice@example.com",
				settings: {
					theme: "dark"
				}
			}
		},
		data: [1, 2, 3]
	}

	describe("path functions", () => {
		it("unsafe path returns value or undefined", () => {
			// Success case
			const result1 = pathUnsafe("user.name")(testObj)
			expect(result1).toBe("Alice")
			
			// Failure case - returns undefined
			const result2 = pathUnsafe("user.missing")(testObj)
			expect(result2).toBeUndefined()
			
			// Null input - returns undefined
			const result3 = pathUnsafe("any.path")(null)
			expect(result3).toBeUndefined()
		})

		it("safe path returns Either", () => {
			// Success case
			const result1 = pathSafe("user.name")(testObj)
			expect(isRight(result1)).toBe(true)
			if (isRight(result1)) {
				expect(result1.value).toBe("Alice")
			}
			
			// Failure case - returns Left with error
			const result2 = pathSafe("user.missing")(testObj)
			expect(isLeft(result2)).toBe(true)
			if (isLeft(result2)) {
				expect(result2.value.name).toBe("PathError")
				expect(result2.value.message).toContain("not found")
			}
			
			// Null input - returns Left with descriptive error
			const result3 = pathSafe("any.path")(null)
			expect(isLeft(result3)).toBe(true)
			if (isLeft(result3)) {
				expect(result3.value.message).toContain("null or undefined")
			}
		})
	})

	describe("pick functions", () => {
		it("unsafe pick returns picked object or empty", () => {
			// Success case
			const result1 = pickUnsafe(["user", "data"])(testObj)
			expect(result1).toEqual({ user: testObj.user, data: testObj.data })
			
			// Missing keys - silently ignored
			const result2 = pickUnsafe(["user", "missing"])(testObj)
			expect(result2).toEqual({ user: testObj.user })
			
			// Null input - returns empty object
			const result3 = pickUnsafe(["any"])(null as any)
			expect(result3).toEqual({})
		})

		it("safe pick returns Either", () => {
			// Success case
			const result1 = pickSafe(["user", "data"])(testObj)
			expect(isRight(result1)).toBe(true)
			if (isRight(result1)) {
				expect(result1.value).toEqual({ user: testObj.user, data: testObj.data })
			}
			
			// Missing keys - still succeeds, just omits them
			const result2 = pickSafe(["user", "missing"])(testObj)
			expect(isRight(result2)).toBe(true)
			if (isRight(result2)) {
				expect(result2.value).toEqual({ user: testObj.user })
			}
			
			// Null input - returns Left with error
			const result3 = pickSafe(["any"])(null)
			expect(isLeft(result3)).toBe(true)
			if (isLeft(result3)) {
				expect(result3.value.name).toBe("PickError")
				expect(result3.value.message).toContain("Cannot pick from null")
			}
		})
	})

	describe("composability", () => {
		it("unsafe functions require manual null checking", () => {
			// Have to manually check each step
			const userId = pathUnsafe("user.id")(testObj)
			if (userId != null) {
				const doubled = userId * 2
				const picked = pickUnsafe(["user"])(testObj)
				if (picked.user) {
					// Can continue...
				}
			}
		})

		it("safe functions compose naturally with pipeEither", () => {
			// Automatic error propagation
			const process = pipeEither(
				pathSafe("user.id"),
				(id: number) => right(id * 2),
				(doubled: number) => right({ doubled })
			)
			
			const result = process(testObj)
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual({ doubled: 246 })
			}
		})

		it("pipeMixed allows mixing safe and unsafe", () => {
			// Mix unsafe and safe functions
			const process = pipeMixed(
				pathUnsafe("user.id"),      // unsafe
				(id: number) => id * 2,     // regular function
				(doubled) => ({ result: doubled }) // regular function
			)
			
			const result = process(testObj)
			expect(isRight(result)).toBe(true)
			if (isRight(result)) {
				expect(result.value).toEqual({ result: 246 })
			}
			
			// Handles failure gracefully
			const failProcess = pipeMixed(
				pathUnsafe("missing.path"), // returns undefined
				(id: number) => id * 2      // won't be called
			)
			
			const failResult = failProcess(testObj)
			expect(isLeft(failResult)).toBe(true)
		})
	})

	describe("error information", () => {
		it("unsafe functions provide no error context", () => {
			const result = pathUnsafe("a.b.c.d.e")(testObj)
			expect(result).toBeUndefined()
			// No idea where it failed or why
		})

		it("safe functions provide detailed error information", () => {
			const result = pathSafe("user.profile.missing.deep")(testObj)
			expect(isLeft(result)).toBe(true)
			if (isLeft(result)) {
				// Know exactly where and why it failed
				expect(result.value.path).toEqual("user.profile.missing.deep")
				expect(result.value.message).toContain("Property 'missing' not found")
			}
		})
	})
})