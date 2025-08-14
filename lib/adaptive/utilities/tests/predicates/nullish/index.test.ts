import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import isNullish from "../../../predicates/isNullish/index.ts"
import isNotNullish from "../../../predicates/isNotNullish/index.ts"

describe("Nullish Predicate Behaviors", () => {
	describe("when checking if value is nullish", () => {
		it("returns true for null", () => {
			expect(isNullish(null)).toBe(true)
		})

		it("returns true for undefined", () => {
			expect(isNullish(undefined)).toBe(true)
		})

		it("returns false for falsy non-nullish values", () => {
			expect(isNullish(0)).toBe(false)
			expect(isNullish(false)).toBe(false)
			expect(isNullish("")).toBe(false)
			expect(isNullish(NaN)).toBe(false)
		})

		it("returns false for truthy values", () => {
			expect(isNullish(1)).toBe(false)
			expect(isNullish(true)).toBe(false)
			expect(isNullish("hello")).toBe(false)
			expect(isNullish({})).toBe(false)
			expect(isNullish([])).toBe(false)
		})

		it("returns false for objects", () => {
			expect(isNullish({ a: 1 })).toBe(false)
			expect(isNullish({ })).toBe(false)
			expect(isNullish(Object.create(null))).toBe(false)
		})

		it("returns false for arrays", () => {
			expect(isNullish([1, 2, 3])).toBe(false)
			expect(isNullish([])).toBe(false)
			expect(isNullish([null])).toBe(false)
			expect(isNullish([undefined])).toBe(false)
		})

		it("returns false for functions", () => {
			expect(isNullish(() => {})).toBe(false)
			expect(isNullish(function() {})).toBe(false)
			expect(isNullish(async () => {})).toBe(false)
		})

		it("returns false for symbols", () => {
			expect(isNullish(Symbol())).toBe(false)
			expect(isNullish(Symbol("test"))).toBe(false)
		})

		it("returns false for dates", () => {
			expect(isNullish(new Date())).toBe(false)
			expect(isNullish(new Date("invalid"))).toBe(false)
		})

		it("handles void 0", () => {
			expect(isNullish(void 0)).toBe(true)
		})
	})

	describe("when checking if value is not nullish", () => {
		it("returns false for null", () => {
			expect(isNotNullish(null)).toBe(false)
		})

		it("returns false for undefined", () => {
			expect(isNotNullish(undefined)).toBe(false)
		})

		it("returns true for falsy non-nullish values", () => {
			expect(isNotNullish(0)).toBe(true)
			expect(isNotNullish(false)).toBe(true)
			expect(isNotNullish("")).toBe(true)
			expect(isNotNullish(NaN)).toBe(true)
		})

		it("returns true for truthy values", () => {
			expect(isNotNullish(1)).toBe(true)
			expect(isNotNullish(true)).toBe(true)
			expect(isNotNullish("hello")).toBe(true)
			expect(isNotNullish({})).toBe(true)
			expect(isNotNullish([])).toBe(true)
		})

		it("returns true for objects", () => {
			expect(isNotNullish({ a: 1 })).toBe(true)
			expect(isNotNullish({ })).toBe(true)
			expect(isNotNullish(Object.create(null))).toBe(true)
		})

		it("returns true for arrays", () => {
			expect(isNotNullish([1, 2, 3])).toBe(true)
			expect(isNotNullish([])).toBe(true)
			expect(isNotNullish([null])).toBe(true)
			expect(isNotNullish([undefined])).toBe(true)
		})

		it("returns true for functions", () => {
			expect(isNotNullish(() => {})).toBe(true)
			expect(isNotNullish(function() {})).toBe(true)
			expect(isNotNullish(async () => {})).toBe(true)
		})

		it("returns true for symbols", () => {
			expect(isNotNullish(Symbol())).toBe(true)
			expect(isNotNullish(Symbol("test"))).toBe(true)
		})

		it("returns true for dates", () => {
			expect(isNotNullish(new Date())).toBe(true)
			expect(isNotNullish(new Date("invalid"))).toBe(true)
		})

		it("handles void 0", () => {
			expect(isNotNullish(void 0)).toBe(false)
		})
	})

	describe("nullish predicates are complementary", () => {
		const testValues = [
			null,
			undefined,
			0,
			false,
			"",
			NaN,
			1,
			true,
			"hello",
			{},
			[],
			() => {},
			Symbol(),
			new Date(),
		]

		testValues.forEach(value => {
			it(`isNullish and isNotNullish are opposites for ${String(value)}`, () => {
				const nullishResult = isNullish(value)
				const notNullishResult = isNotNullish(value)
				expect(nullishResult).toBe(!notNullishResult)
			})
		})
	})

	describe("practical use cases", () => {
		it("filters nullish values from arrays", () => {
			const arr = [1, null, 2, undefined, 3, 0, false, ""]
			const filtered = arr.filter(isNotNullish)
			expect(filtered).toEqual([1, 2, 3, 0, false, ""])
		})

		it("validates required fields", () => {
			const validateRequired = (value: unknown) => {
				if (isNullish(value)) {
					return "Field is required"
				}
				return null
			}

			expect(validateRequired(null)).toBe("Field is required")
			expect(validateRequired(undefined)).toBe("Field is required")
			expect(validateRequired("")).toBeNull()
			expect(validateRequired(0)).toBeNull()
			expect(validateRequired(false)).toBeNull()
		})

		it("provides default values", () => {
			const getValueOrDefault = <T>(value: T | null | undefined, defaultValue: T): T => {
				return isNullish(value) ? defaultValue : value
			}

			expect(getValueOrDefault(null, "default")).toBe("default")
			expect(getValueOrDefault(undefined, "default")).toBe("default")
			expect(getValueOrDefault("", "default")).toBe("")
			expect(getValueOrDefault(0, 10)).toBe(0)
			expect(getValueOrDefault(false, true)).toBe(false)
		})

		it("chains with other predicates", () => {
			const isValidString = (value: unknown): boolean => {
				return isNotNullish(value) && typeof value === "string" && value.length > 0
			}

			expect(isValidString(null)).toBe(false)
			expect(isValidString(undefined)).toBe(false)
			expect(isValidString("")).toBe(false)
			expect(isValidString("hello")).toBe(true)
			expect(isValidString(123)).toBe(false)
		})

		it("works with optional chaining", () => {
			interface User {
				name?: string
				age?: number
			}

			const users: Array<User | null | undefined> = [
				{ name: "Alice", age: 30 },
				{ name: "Bob" },
				null,
				undefined,
				{ age: 25 },
			]

			const validUsers = users.filter(isNotNullish)
			expect(validUsers.length).toBe(3)
			expect(validUsers).toEqual([
				{ name: "Alice", age: 30 },
				{ name: "Bob" },
				{ age: 25 },
			])
		})
	})

	describe("type narrowing", () => {
		it("narrows types correctly", () => {
			const processValue = (value: string | null | undefined) => {
				if (isNotNullish(value)) {
					// TypeScript should know value is string here
					return value.toUpperCase()
				}
				return "DEFAULT"
			}

			expect(processValue("hello")).toBe("HELLO")
			expect(processValue(null)).toBe("DEFAULT")
			expect(processValue(undefined)).toBe("DEFAULT")
		})

		it("works as type guard in filter", () => {
			const mixedArray: Array<number | null | undefined> = [1, null, 2, undefined, 3]
			const numbers = mixedArray.filter(isNotNullish)
			// TypeScript should know numbers is Array<number>
			const sum = numbers.reduce((a, b) => a + b, 0)
			expect(sum).toBe(6)
		})
	})
})