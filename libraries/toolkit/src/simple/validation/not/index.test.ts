import { expect } from "@std/expect"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

import isNotNullish from "../isNotNullish/index.ts"
import isNullish from "../isNullish/index.ts"
import not from "./index.ts"

describe("Predicates - not and isNotNullish", () => {
	describe("not function", () => {
		describe("boolean values", () => {
			it("should negate boolean values", () => {
				expect(not(true)).toBe(false)
				expect(not(false)).toBe(true)
			})
		})

		describe("truthy values", () => {
			it("should return false for truthy values", () => {
				expect(not(1)).toBe(false)
				expect(not(-1)).toBe(false)
				expect(not("hello")).toBe(false)
				expect(not("0")).toBe(false)
				expect(not([])).toBe(false)
				expect(not({})).toBe(false)
				expect(not(() => {})).toBe(false)
				expect(not(new Date())).toBe(false)
				expect(not(Symbol())).toBe(false)
				expect(not(Infinity)).toBe(false)
				expect(not(-Infinity)).toBe(false)
			})
		})

		describe("falsy values", () => {
			it("should return true for falsy values", () => {
				expect(not(0)).toBe(true)
				expect(not(-0)).toBe(true)
				expect(not("")).toBe(true)
				expect(not(null)).toBe(true)
				expect(not(undefined)).toBe(true)
				expect(not(NaN)).toBe(true)
				expect(not(false)).toBe(true)
			})
		})

		describe("double negation", () => {
			it("should return original truthiness with double application", () => {
				const values = [true, false, 0, 1, "", "hello", null, undefined, [], {}]

				for (const value of values) {
					expect(not(not(value))).toBe(!!value)
				}
			})
		})

		describe("with logical operations", () => {
			it("should work in conditional expressions", () => {
				const isEven = (n: number) => n % 2 === 0
				const isOdd = (n: number) => not(isEven(n))

				expect(isOdd(3)).toBe(true)
				expect(isOdd(4)).toBe(false)
			})

			it("should work with array methods", () => {
				const numbers = [0, 1, 2, 3, 4, 5]
				const nonZero = numbers.filter((n) => not(!n))
				expect(nonZero).toEqual([1, 2, 3, 4, 5])

				const falsy = [0, 1, "", "hello", null, undefined, false, true]
				const truthy = falsy.filter((v) => not(not(v)))
				expect(truthy).toEqual([1, "hello", true])
			})
		})
	})

	describe("isNotNullish function", () => {
		describe("nullish values", () => {
			it("should return false for null and undefined", () => {
				expect(isNotNullish(null)).toBe(false)
				expect(isNotNullish(undefined)).toBe(false)
				expect(isNotNullish(void 0)).toBe(false)
			})
		})

		describe("non-nullish values", () => {
			it("should return true for falsy but defined values", () => {
				expect(isNotNullish(0)).toBe(true)
				expect(isNotNullish(-0)).toBe(true)
				expect(isNotNullish("")).toBe(true)
				expect(isNotNullish(false)).toBe(true)
				expect(isNotNullish(NaN)).toBe(true)
			})

			it("should return true for truthy values", () => {
				expect(isNotNullish(1)).toBe(true)
				expect(isNotNullish("hello")).toBe(true)
				expect(isNotNullish(true)).toBe(true)
				expect(isNotNullish([])).toBe(true)
				expect(isNotNullish({})).toBe(true)
				expect(isNotNullish(() => {})).toBe(true)
			})

			it("should return true for special values", () => {
				expect(isNotNullish(Infinity)).toBe(true)
				expect(isNotNullish(-Infinity)).toBe(true)
				expect(isNotNullish(Symbol())).toBe(true)
				expect(isNotNullish(BigInt(0))).toBe(true)
			})
		})

		describe("type narrowing", () => {
			it("should narrow types in conditional blocks", () => {
				const processValue = (value: string | null | undefined): string => {
					if (isNotNullish(value)) {
						// TypeScript knows value is string here
						return value.toUpperCase()
					}
					return "default"
				}

				expect(processValue("hello")).toBe("HELLO")
				expect(processValue(null)).toBe("default")
				expect(processValue(undefined)).toBe("default")
			})

			it("should work with optional chaining scenarios", () => {
				interface Data {
					value?: number | null
				}

				const getValue = (data: Data): number => {
					if (isNotNullish(data.value)) {
						return data.value * 2
					}
					return 0
				}

				expect(getValue({ value: 5 })).toBe(10)
				expect(getValue({ value: null })).toBe(0)
				expect(getValue({ value: undefined })).toBe(0)
				expect(getValue({})).toBe(0)
			})
		})
	})

	describe("relationship between isNullish and isNotNullish", () => {
		it("should be exact opposites", () => {
			const testValues = [
				null,
				undefined,
				0,
				-0,
				1,
				"",
				"hello",
				false,
				true,
				NaN,
				Infinity,
				[],
				{},
				() => {},
				Symbol(),
				new Date(),
			]

			for (const value of testValues) {
				expect(isNotNullish(value)).toBe(!isNullish(value))
				expect(isNullish(value)).toBe(!isNotNullish(value))
			}
		})

		it("can be implemented using not", () => {
			const testValues = [null, undefined, 0, "", false, "hello", 1, true]

			for (const value of testValues) {
				const usingNot = not(isNullish(value))
				const direct = isNotNullish(value)
				expect(usingNot).toBe(direct)
			}
		})
	})

	describe("property-based tests", () => {
		describe("not function properties", () => {
			it("should be involutive (self-inverse)", () => {
				fc.assert(
					fc.property(fc.anything(), (value) => {
						const once = not(value)
						const twice = not(once)
						expect(twice).toBe(!!value)
					}),
					{ numRuns: 1000 },
				)
			})

			it("should follow De Morgan's laws", () => {
				fc.assert(
					fc.property(fc.boolean(), fc.boolean(), (a, b) => {
						// not(a && b) === (!a || !b)
						expect(not(a && b)).toBe(not(a) || not(b))
						// not(a || b) === (!a && !b)
						expect(not(a || b)).toBe(not(a) && not(b))
					}),
					{ numRuns: 1000 },
				)
			})

			it("should be consistent with JavaScript's ! operator", () => {
				fc.assert(
					fc.property(fc.anything(), (value) => {
						expect(not(value)).toBe(!value)
					}),
					{ numRuns: 1000 },
				)
			})
		})

		describe("isNotNullish properties", () => {
			it("should return true for all non-nullish values", () => {
				fc.assert(
					fc.property(
						fc.anything().filter((v) => v !== null && v !== undefined),
						(value) => {
							expect(isNotNullish(value)).toBe(true)
						},
					),
					{ numRuns: 1000 },
				)
			})

			it("should be deterministic", () => {
				fc.assert(
					fc.property(fc.anything(), (value) => {
						const result1 = isNotNullish(value)
						const result2 = isNotNullish(value)
						expect(result1).toBe(result2)
					}),
					{ numRuns: 1000 },
				)
			})

			it("should be the opposite of isNullish", () => {
				fc.assert(
					fc.property(fc.anything(), (value) => {
						expect(isNotNullish(value)).toBe(!isNullish(value))
					}),
					{ numRuns: 1000 },
				)
			})
		})

		describe("combined properties", () => {
			it("not preserves nullish checking", () => {
				fc.assert(
					fc.property(fc.anything(), (value) => {
						// If value is nullish, not(value) is true
						if (isNullish(value)) {
							expect(not(value)).toBe(true)
						}
						// If value is not nullish but falsy, not still works correctly
						if (isNotNullish(value) && !value) {
							expect(not(value)).toBe(true)
						}
					}),
					{ numRuns: 1000 },
				)
			})
		})
	})

	describe("real-world use cases", () => {
		describe("form validation", () => {
			it("should validate required fields using isNotNullish", () => {
				interface FormField {
					value: string | null | undefined
					required: boolean
				}

				const validateField = (field: FormField): boolean => {
					if (field.required) {
						return isNotNullish(field.value) && field.value.length > 0
					}
					return true
				}

				expect(validateField({ value: "test", required: true })).toBe(true)
				expect(validateField({ value: "", required: true })).toBe(false)
				expect(validateField({ value: null, required: true })).toBe(false)
				expect(validateField({ value: undefined, required: true })).toBe(false)
				expect(validateField({ value: null, required: false })).toBe(true)
			})

			it("should check empty fields using not", () => {
				const isFieldEmpty = (value: string) => not(value.trim())

				expect(isFieldEmpty("")).toBe(true)
				expect(isFieldEmpty("  ")).toBe(true)
				expect(isFieldEmpty("hello")).toBe(false)
			})
		})

		describe("filtering operations", () => {
			it("should filter arrays using isNotNullish", () => {
				const data = [1, null, 2, undefined, 3, 0, false, ""]
				const filtered = data.filter(isNotNullish)
				expect(filtered).toEqual([1, 2, 3, 0, false, ""])
			})

			it("should use not for inverse filtering", () => {
				const users = [
					{ name: "Alice", active: true },
					{ name: "Bob", active: false },
					{ name: "Charlie", active: true },
				]

				const inactiveUsers = users.filter((u) => not(u.active))
				expect(inactiveUsers).toEqual([{ name: "Bob", active: false }])
			})
		})

		describe("conditional logic", () => {
			it("should use not for toggle operations", () => {
				class Toggle {
					private state: boolean = false

					toggle() {
						this.state = not(this.state)
					}

					get value() {
						return this.state
					}
				}

				const toggle = new Toggle()
				expect(toggle.value).toBe(false)
				toggle.toggle()
				expect(toggle.value).toBe(true)
				toggle.toggle()
				expect(toggle.value).toBe(false)
			})

			it("should use isNotNullish for optional parameters", () => {
				const greet = (name?: string | null, title?: string | null): string => {
					const parts: string[] = []

					if (isNotNullish(title)) {
						parts.push(title)
					}

					if (isNotNullish(name)) {
						parts.push(name)
					} else {
						parts.push("Guest")
					}

					return `Hello, ${parts.join(" ")}!`
				}

				expect(greet("Alice", "Dr.")).toBe("Hello, Dr. Alice!")
				expect(greet("Bob")).toBe("Hello, Bob!")
				expect(greet(null, "Mr.")).toBe("Hello, Mr. Guest!")
				expect(greet()).toBe("Hello, Guest!")
			})
		})

		describe("API response handling", () => {
			it("should handle optional API fields", () => {
				interface ApiResponse {
					id: number
					name: string
					email?: string | null
					phone?: string | null
				}

				const formatContact = (response: ApiResponse): string => {
					const contacts: string[] = []

					if (isNotNullish(response.email)) {
						contacts.push(`Email: ${response.email}`)
					}

					if (isNotNullish(response.phone)) {
						contacts.push(`Phone: ${response.phone}`)
					}

					if (not(contacts.length)) {
						contacts.push("No contact information")
					}

					return contacts.join(", ")
				}

				expect(formatContact({
					id: 1,
					name: "Alice",
					email: "alice@test.com",
					phone: "123-456-7890",
				})).toBe("Email: alice@test.com, Phone: 123-456-7890")

				expect(formatContact({
					id: 2,
					name: "Bob",
					email: null,
					phone: undefined,
				})).toBe("No contact information")
			})
		})

		describe("configuration with defaults", () => {
			it("should apply defaults for nullish values", () => {
				interface Config {
					debug?: boolean | null
					timeout?: number | null
					retries?: number | null
				}

				const applyDefaults = (config: Config): Required<Config> => {
					return {
						debug: isNotNullish(config.debug) ? config.debug : false,
						timeout: isNotNullish(config.timeout) ? config.timeout : 5000,
						retries: isNotNullish(config.retries) ? config.retries : 3,
					}
				}

				expect(applyDefaults({})).toEqual({
					debug: false,
					timeout: 5000,
					retries: 3,
				})

				expect(applyDefaults({
					debug: true,
					timeout: null,
					retries: 0,
				})).toEqual({
					debug: true,
					timeout: 5000,
					retries: 0, // 0 is not nullish
				})
			})
		})
	})

	describe("edge cases", () => {
		it("should handle sparse arrays", () => {
			const sparse = [1, , 3]
			const filtered = sparse.filter(isNotNullish)
			expect(filtered).toEqual([1, 3])

			const hasMissing = sparse.some((_, i) => not(i in sparse))
			expect(hasMissing).toBe(false) // some skips holes
		})

		it("should handle object with nullish prototype", () => {
			const obj = Object.create(null)
			obj.prop = "value"

			expect(isNotNullish(obj)).toBe(true)
			expect(isNotNullish(obj.prop)).toBe(true)
			expect(isNotNullish(obj.missing)).toBe(false)
		})

		it("should handle boxed primitives", () => {
			expect(not(new Boolean(false))).toBe(false) // Objects are truthy
			expect(not(new Number(0))).toBe(false) // Objects are truthy
			expect(not(new String(""))).toBe(false) // Objects are truthy

			expect(isNotNullish(new Boolean(false))).toBe(true)
			expect(isNotNullish(new Number(0))).toBe(true)
			expect(isNotNullish(new String(""))).toBe(true)
		})
	})
})
