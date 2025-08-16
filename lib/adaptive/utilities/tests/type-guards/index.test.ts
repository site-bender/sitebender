import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import isDefined from "../../isDefined/index.ts"
import isUndefined from "../../isUndefined/index.ts"

describe("Type Guards - isDefined and isUndefined", () => {
	describe("isDefined", () => {
		describe("should return false for nullish values", () => {
			it("returns false for null", () => {
				expect(isDefined(null)).toBe(false)
			})

			it("returns false for undefined", () => {
				expect(isDefined(undefined)).toBe(false)
			})

			it("returns false for void expressions", () => {
				expect(isDefined(void 0)).toBe(false)
			})
		})

		describe("should return true for defined values", () => {
			it("returns true for falsy but defined values", () => {
				expect(isDefined(0)).toBe(true)
				expect(isDefined(-0)).toBe(true)
				expect(isDefined("")).toBe(true)
				expect(isDefined(false)).toBe(true)
				expect(isDefined(NaN)).toBe(true)
			})

			it("returns true for truthy values", () => {
				expect(isDefined(1)).toBe(true)
				expect(isDefined("hello")).toBe(true)
				expect(isDefined(true)).toBe(true)
				expect(isDefined([])).toBe(true)
				expect(isDefined({})).toBe(true)
			})

			it("returns true for special values", () => {
				expect(isDefined(Infinity)).toBe(true)
				expect(isDefined(-Infinity)).toBe(true)
				expect(isDefined(Symbol())).toBe(true)
				expect(isDefined(BigInt(0))).toBe(true)
			})

			it("returns true for functions", () => {
				expect(isDefined(() => {})).toBe(true)
				expect(isDefined(function() {})).toBe(true)
				expect(isDefined(async () => {})).toBe(true)
				expect(isDefined(function* () {})).toBe(true)
			})
		})

		describe("type narrowing behavior", () => {
			it("should narrow types correctly in conditional blocks", () => {
				const test = (value: string | null | undefined): string => {
					if (isDefined(value)) {
						// TypeScript should know value is string here
						return value.toUpperCase()
					}
					return "default"
				}

				expect(test("hello")).toBe("HELLO")
				expect(test(null)).toBe("default")
				expect(test(undefined)).toBe("default")
			})

			it("should work with complex types", () => {
				interface User {
					name: string
					age: number
				}

				const processUser = (user: User | null | undefined): string => {
					if (isDefined(user)) {
						return `${user.name} is ${user.age} years old`
					}
					return "No user"
				}

				expect(processUser({ name: "Alice", age: 30 })).toBe("Alice is 30 years old")
				expect(processUser(null)).toBe("No user")
				expect(processUser(undefined)).toBe("No user")
			})
		})
	})

	describe("isUndefined", () => {
		describe("should return true for nullish values", () => {
			it("returns true for null", () => {
				expect(isUndefined(null)).toBe(true)
			})

			it("returns true for undefined", () => {
				expect(isUndefined(undefined)).toBe(true)
			})

			it("returns true for void expressions", () => {
				expect(isUndefined(void 0)).toBe(true)
			})
		})

		describe("should return false for defined values", () => {
			it("returns false for falsy but defined values", () => {
				expect(isUndefined(0)).toBe(false)
				expect(isUndefined(-0)).toBe(false)
				expect(isUndefined("")).toBe(false)
				expect(isUndefined(false)).toBe(false)
				expect(isUndefined(NaN)).toBe(false)
			})

			it("returns false for truthy values", () => {
				expect(isUndefined(1)).toBe(false)
				expect(isUndefined("hello")).toBe(false)
				expect(isUndefined(true)).toBe(false)
				expect(isUndefined([])).toBe(false)
				expect(isUndefined({})).toBe(false)
			})

			it("returns false for special values", () => {
				expect(isUndefined(Infinity)).toBe(false)
				expect(isUndefined(-Infinity)).toBe(false)
				expect(isUndefined(Symbol())).toBe(false)
				expect(isUndefined(BigInt(0))).toBe(false)
			})

			it("returns false for functions", () => {
				expect(isUndefined(() => {})).toBe(false)
				expect(isUndefined(function() {})).toBe(false)
				expect(isUndefined(async () => {})).toBe(false)
				expect(isUndefined(function* () {})).toBe(false)
			})
		})
	})

	describe("isDefined and isUndefined are complementary", () => {
		it("should be exact opposites for all values", () => {
			const testValues = [
				null,
				undefined,
				void 0,
				0,
				-0,
				1,
				-1,
				"",
				"hello",
				false,
				true,
				NaN,
				Infinity,
				-Infinity,
				[],
				{},
				() => {},
				Symbol(),
				BigInt(0),
				new Date(),
				/regex/,
				new Map(),
				new Set(),
				new WeakMap(),
				new WeakSet(),
				new Error(),
				Promise.resolve(),
			]

			for (const value of testValues) {
				expect(isDefined(value)).toBe(!isUndefined(value))
				expect(isUndefined(value)).toBe(!isDefined(value))
			}
		})
	})

	describe("property-based tests", () => {
		it("isDefined and isUndefined are always opposites", () => {
			fc.assert(
				fc.property(fc.anything(), (value) => {
					const defined = isDefined(value)
					const undefined = isUndefined(value)
					expect(defined).toBe(!undefined)
				}),
				{ numRuns: 1000 }
			)
		})

		it("isDefined returns false only for null and undefined", () => {
			fc.assert(
				fc.property(
					fc.anything().filter((v) => v !== null && v !== undefined),
					(value) => {
						expect(isDefined(value)).toBe(true)
						expect(isUndefined(value)).toBe(false)
					}
				),
				{ numRuns: 1000 }
			)
		})

		it("both functions are deterministic", () => {
			fc.assert(
				fc.property(fc.anything(), (value) => {
					const defined1 = isDefined(value)
					const defined2 = isDefined(value)
					const undefined1 = isUndefined(value)
					const undefined2 = isUndefined(value)
					
					expect(defined1).toBe(defined2)
					expect(undefined1).toBe(undefined2)
				}),
				{ numRuns: 1000 }
			)
		})

		it("handles all JavaScript types correctly", () => {
			fc.assert(
				fc.property(
					fc.oneof(
						fc.constant(null),
						fc.constant(undefined),
						fc.boolean(),
						fc.integer(),
						fc.float(),
						fc.string(),
						fc.array(fc.anything()),
						fc.object(),
						fc.date(),
						fc.func(fc.anything()),
					),
					(value) => {
						const shouldBeDefined = value !== null && value !== undefined
						expect(isDefined(value)).toBe(shouldBeDefined)
						expect(isUndefined(value)).toBe(!shouldBeDefined)
					}
				),
				{ numRuns: 1000 }
			)
		})
	})

	describe("real-world use cases", () => {
		describe("optional parameter handling", () => {
			it("should handle optional function parameters", () => {
				const greet = (name?: string): string => {
					if (isDefined(name)) {
						return `Hello, ${name}!`
					}
					return "Hello, stranger!"
				}

				expect(greet("Alice")).toBe("Hello, Alice!")
				expect(greet()).toBe("Hello, stranger!")
				expect(greet(undefined)).toBe("Hello, stranger!")
			})

			it("should handle nullable API responses", () => {
				interface ApiResponse {
					data?: {
						user?: {
							name: string
							email: string
						} | null
					} | null
				}

				const getUsername = (response: ApiResponse): string => {
					if (isDefined(response.data) && isDefined(response.data.user)) {
						return response.data.user.name
					}
					return "Anonymous"
				}

				expect(getUsername({ data: { user: { name: "Bob", email: "bob@test.com" } } })).toBe("Bob")
				expect(getUsername({ data: { user: null } })).toBe("Anonymous")
				expect(getUsername({ data: null })).toBe("Anonymous")
				expect(getUsername({})).toBe("Anonymous")
			})
		})

		describe("array and object filtering", () => {
			it("should filter out nullish values from arrays", () => {
				const values = [1, null, 2, undefined, 3, 0, false, ""]
				const defined = values.filter(isDefined)
				expect(defined).toEqual([1, 2, 3, 0, false, ""])
			})

			it("should identify nullish values in arrays", () => {
				const values = [1, null, 2, undefined, 3, 0, false, ""]
				const undefinedValues = values.filter(isUndefined)
				expect(undefinedValues).toEqual([null, undefined])
			})

			it("should work with object property checks", () => {
				const obj = {
					a: 1,
					b: null,
					c: undefined,
					d: 0,
					e: false,
					f: ""
				}

				const definedKeys = Object.keys(obj).filter(key => 
					isDefined(obj[key as keyof typeof obj])
				)
				expect(definedKeys).toEqual(["a", "d", "e", "f"])

				const undefinedKeys = Object.keys(obj).filter(key =>
					isUndefined(obj[key as keyof typeof obj])
				)
				expect(undefinedKeys).toEqual(["b", "c"])
			})
		})

		describe("form validation", () => {
			it("should validate required fields", () => {
				interface FormData {
					username?: string
					email?: string
					age?: number
				}

				const validateForm = (data: FormData): string[] => {
					const errors: string[] = []
					
					if (isUndefined(data.username)) {
						errors.push("Username is required")
					}
					if (isUndefined(data.email)) {
						errors.push("Email is required")
					}
					// Age is optional, so we don't check it
					
					return errors
				}

				expect(validateForm({ username: "alice", email: "alice@test.com" })).toEqual([])
				expect(validateForm({ username: "alice" })).toEqual(["Email is required"])
				expect(validateForm({})).toEqual(["Username is required", "Email is required"])
			})
		})

		describe("configuration defaults", () => {
			it("should apply defaults for undefined config values", () => {
				interface Config {
					host?: string
					port?: number
					timeout?: number
				}

				const applyDefaults = (config: Config): Required<Config> => {
					return {
						host: isDefined(config.host) ? config.host : "localhost",
						port: isDefined(config.port) ? config.port : 3000,
						timeout: isDefined(config.timeout) ? config.timeout : 5000
					}
				}

				expect(applyDefaults({})).toEqual({
					host: "localhost",
					port: 3000,
					timeout: 5000
				})

				expect(applyDefaults({ host: "example.com", port: 8080 })).toEqual({
					host: "example.com",
					port: 8080,
					timeout: 5000
				})

				// Explicit undefined should use defaults
				expect(applyDefaults({ host: undefined, port: 0 })).toEqual({
					host: "localhost",
					port: 0, // 0 is defined, so it's kept
					timeout: 5000
				})
			})
		})
	})

	describe("edge cases", () => {
		it("should handle document.all correctly", () => {
			// document.all is a special case in JavaScript that == null but is an object
			// We can't test it directly in Deno, but we can document the expected behavior
			// In a browser: document.all == null is true, but document.all === null is false
			// Our functions use == null, so they would treat document.all as undefined
			// This is generally the desired behavior for practical purposes
		})

		it("should handle sparse arrays", () => {
			const sparse = [1, , 3] // Middle element is undefined
			expect(isDefined(sparse[0])).toBe(true)
			expect(isDefined(sparse[1])).toBe(false)
			expect(isDefined(sparse[2])).toBe(true)
			
			expect(isUndefined(sparse[0])).toBe(false)
			expect(isUndefined(sparse[1])).toBe(true)
			expect(isUndefined(sparse[2])).toBe(false)
		})

		it("should handle prototype chain properties", () => {
			const obj = Object.create({ inherited: "value" })
			obj.own = "owned"
			obj.nullProp = null
			obj.undefinedProp = undefined

			expect(isDefined(obj.own)).toBe(true)
			expect(isDefined(obj.inherited)).toBe(true)
			expect(isDefined(obj.nullProp)).toBe(false)
			expect(isDefined(obj.undefinedProp)).toBe(false)
			expect(isDefined(obj.nonExistent)).toBe(false)
		})
	})
})