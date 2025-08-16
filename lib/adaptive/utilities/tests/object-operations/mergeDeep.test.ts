import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import mergeDeep from "../../unsafe/object/mergeDeep/index.ts"

describe("mergeDeep", () => {
	describe("basic merging", () => {
		it("merges simple objects", () => {
			const result = mergeDeep({ a: 1, b: 2 })({ c: 3, d: 4 })
			expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 })
		})

		it("target overrides source", () => {
			const result = mergeDeep({ a: 1, b: 2 })({ b: 3, c: 4 })
			expect(result).toEqual({ a: 1, b: 3, c: 4 })
		})

		it("deeply merges nested objects", () => {
			const source = {
				user: { name: "default", role: "user" },
				settings: { theme: "light", notifications: true }
			}
			const target = {
				user: { name: "Alice" },
				settings: { theme: "dark" }
			}
			const result = mergeDeep(source)(target)
			expect(result).toEqual({
				user: { name: "Alice", role: "user" },
				settings: { theme: "dark", notifications: true }
			})
		})

		it("replaces arrays, doesn't merge them", () => {
			const result = mergeDeep({ arr: [1, 2] })({ arr: [3, 4, 5] })
			expect(result).toEqual({ arr: [3, 4, 5] })
		})
	})

	describe("multiple sources", () => {
		it("merges multiple sources left to right", () => {
			const result = mergeDeep(
				{ a: 1, b: 2 },
				{ b: 20, c: 3 },
				{ c: 30, d: 4 }
			)({ a: 100 })
			expect(result).toEqual({ a: 100, b: 20, c: 30, d: 4 })
		})

		it("deeply merges multiple sources", () => {
			const result = mergeDeep(
				{ deep: { a: 1 } },
				{ deep: { b: 2 } },
				{ deep: { c: 3 } }
			)({ deep: { d: 4 } })
			expect(result).toEqual({ deep: { a: 1, b: 2, c: 3, d: 4 } })
		})
	})

	describe("edge cases", () => {
		it("handles null source", () => {
			const result = mergeDeep(null)({ a: 1 })
			expect(result).toEqual({ a: 1 })
		})

		it("handles undefined source", () => {
			const result = mergeDeep(undefined)({ a: 1 })
			expect(result).toEqual({ a: 1 })
		})

		it("handles null target", () => {
			const result = mergeDeep({ a: 1 })(null)
			expect(result).toEqual({ a: 1 })
		})

		it("handles undefined target", () => {
			const result = mergeDeep({ a: 1 })(undefined)
			expect(result).toEqual({ a: 1 })
		})

		it("handles empty objects", () => {
			const result = mergeDeep({})({})
			expect(result).toEqual({})
		})
	})

	describe("circular references", () => {
		it("handles circular references in source", () => {
			const circular: any = { a: 1 }
			circular.self = circular
			const result = mergeDeep(circular)({ b: 2 })
			expect(result.a).toBe(1)
			expect(result.b).toBe(2)
			// Should not have circular reference
			expect(result.self).toBeUndefined()
		})

		it("handles circular references in target", () => {
			const circular: any = { a: 1 }
			circular.self = circular
			const result = mergeDeep({ b: 2 })(circular)
			expect(result.a).toBe(1)
			expect(result.b).toBe(2)
		})
	})

	describe("symbol keys", () => {
		it("preserves symbol keys", () => {
			const sym1 = Symbol("key1")
			const sym2 = Symbol("key2")
			const result = mergeDeep({ [sym1]: 1 })({ [sym2]: 2 })
			expect(result[sym1]).toBe(1)
			expect(result[sym2]).toBe(2)
		})

		it("merges symbol key values deeply", () => {
			const sym = Symbol("key")
			const result = mergeDeep({ [sym]: { a: 1 } })({ [sym]: { b: 2 } })
			expect(result[sym]).toEqual({ a: 1, b: 2 })
		})
	})

	describe("property-based tests", () => {
		it("is immutable - doesn't modify inputs", () => {
			fc.assert(
				fc.property(
					fc.object(),
					fc.object(),
					(source, target) => {
						const sourceCopy = JSON.parse(JSON.stringify(source))
						const targetCopy = JSON.parse(JSON.stringify(target))
						mergeDeep(source)(target)
						expect(source).toEqual(sourceCopy)
						expect(target).toEqual(targetCopy)
					}
				)
			)
		})

		it("target always overrides source at same path", () => {
			fc.assert(
				fc.property(
					fc.object(),
					fc.object(),
					(source, target) => {
						const result = mergeDeep(source)(target)
						for (const key in target) {
							if (Object.prototype.hasOwnProperty.call(target, key)) {
								// At top level, target values should be present
								if (typeof target[key] !== "object" || target[key] === null || Array.isArray(target[key])) {
									expect(result[key]).toEqual(target[key])
								}
							}
						}
					}
				)
			)
		})
	})
})