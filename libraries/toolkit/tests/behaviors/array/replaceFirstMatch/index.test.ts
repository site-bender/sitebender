import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import {
	assertType,
	IsExact,
} from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import replaceFirstMatch from "../../../../src/simple/array/replaceFirstMatch/index.ts"

Deno.test("replaceFirstMatch: type checking", async (t) => {
	await t.step("should have correct type signature", () => {
		const replacer = replaceFirstMatch(/test/)((s: string) =>
			s.toUpperCase()
		)
		assertType<
			IsExact<
				typeof replacer,
				<T>(array: ReadonlyArray<T> | null | undefined) => Array<T>
			>
		>(true)

		const result = replacer(["test", "hello"])
		assertType<IsExact<typeof result, Array<string>>>(true)
	})

	await t.step("should work with mixed type arrays", () => {
		const replacer = replaceFirstMatch(/^\d+$/)((s) => `num-${s}`)
		const mixed = ["123", 456, "abc", null, "789"]
		const result = replacer(mixed)
		assertType<IsExact<typeof result, Array<string | number | null>>>(true)
		assertEquals(result, ["num-123", 456, "abc", null, "789"])
	})
})

Deno.test("replaceFirstMatch: basic functionality", async (t) => {
	await t.step("should replace only first matching string", () => {
		const replacer = replaceFirstMatch(/^h/)((s) => s.toUpperCase())
		assertEquals(
			replacer(["hello", "hi", "world", "hey"]),
			["HELLO", "hi", "world", "hey"],
		)
	})

	await t.step("should replace first match anywhere in string", () => {
		const replacer = replaceFirstMatch(/test/)((s) => "replaced")
		assertEquals(
			replacer(["other", "test1", "contest", "test2"]),
			["other", "replaced", "contest", "test2"],
		)
	})

	await t.step("should handle case-insensitive patterns", () => {
		const replacer = replaceFirstMatch(/error:/i)((s) => s.toLowerCase())
		assertEquals(
			replacer(["info", "ERROR: failed", "Error: bad", "error: ok"]),
			["info", "error: failed", "Error: bad", "error: ok"],
		)
	})

	await t.step("should return new array when no match", () => {
		const replacer = replaceFirstMatch(/xyz/)(() => "found")
		const original = ["abc", "def"]
		const result = replacer(original)
		assertEquals(result, ["abc", "def"])
		assertEquals(result === original, false) // New array created
	})

	await t.step("should handle empty arrays", () => {
		const replacer = replaceFirstMatch(/test/)((s) => s.toUpperCase())
		assertEquals(replacer([]), [])
	})

	await t.step("should pass matched string to replacer", () => {
		let capturedString: string | null = null
		const replacer = replaceFirstMatch(/\d+/)((s) => {
			capturedString = s
			return `[${s}]`
		})
		assertEquals(replacer(["no-match", "test123", "456end"]), [
			"no-match",
			"[test123]",
			"456end",
		])
		assertEquals(capturedString, "test123")
	})
})

Deno.test("replaceFirstMatch: regex patterns", async (t) => {
	await t.step("should work with complex regex patterns", () => {
		// Email pattern (simplified)
		const replacer = replaceFirstMatch(/^[^@]+@[^@]+$/)((s) => `<${s}>`)
		assertEquals(
			replacer(["invalid", "user@example.com", "test@domain.org"]),
			["invalid", "<user@example.com>", "test@domain.org"],
		)
	})

	await t.step("should handle anchored patterns", () => {
		const startReplacer = replaceFirstMatch(/^prefix/)((s) =>
			s.replace("prefix", "PREFIX")
		)
		assertEquals(
			startReplacer(["other", "prefix-test", "prefix"]),
			["other", "PREFIX-test", "prefix"],
		)

		const endReplacer = replaceFirstMatch(/suffix$/)((s) =>
			s.replace("suffix", "SUFFIX")
		)
		assertEquals(
			endReplacer(["test", "test-suffix", "suffix"]),
			["test", "test-SUFFIX", "suffix"],
		)
	})

	await t.step("should handle character classes", () => {
		const replacer = replaceFirstMatch(/^[A-Z]/)((s) => `Capital: ${s}`)
		assertEquals(
			replacer(["hello", "Test", "World", "ABC"]),
			["hello", "Capital: Test", "World", "ABC"],
		)
	})

	await t.step("should handle quantifiers", () => {
		const replacer = replaceFirstMatch(/^\d{3,}$/)((s) => `Long: ${s}`)
		assertEquals(
			replacer(["12", "123", "1234", "12345"]),
			["12", "Long: 123", "1234", "12345"],
		)
	})
})

Deno.test("replaceFirstMatch: mixed types", async (t) => {
	await t.step("should skip non-string values", () => {
		const replacer = replaceFirstMatch(/test/)((s) => s.toUpperCase())
		const mixed = [123, "test", null, "test2", undefined, { obj: true }]
		assertEquals(
			replacer(mixed),
			[123, "TEST", null, "test2", undefined, { obj: true }],
		)
	})

	await t.step("should handle arrays with no strings", () => {
		const replacer = replaceFirstMatch(/test/)((s) => s.toUpperCase())
		assertEquals(replacer([1, 2, 3, null, undefined]), [
			1,
			2,
			3,
			null,
			undefined,
		])
	})

	await t.step(
		"should handle number strings differently from numbers",
		() => {
			const replacer = replaceFirstMatch(/^\d+$/)((s) => `num-${s}`)
			assertEquals(
				replacer([123, "456", 789, "012"]),
				[123, "num-456", 789, "012"],
			)
		},
	)
})

Deno.test("replaceFirstMatch: edge cases", async (t) => {
	await t.step("should handle null input", () => {
		const replacer = replaceFirstMatch(/test/)((s) => s.toUpperCase())
		assertEquals(replacer(null), [])
	})

	await t.step("should handle undefined input", () => {
		const replacer = replaceFirstMatch(/test/)((s) => s.toUpperCase())
		assertEquals(replacer(undefined), [])
	})

	await t.step("should handle empty strings", () => {
		const replacer = replaceFirstMatch(/^$/)(() => "empty")
		assertEquals(replacer(["", "not empty", ""]), [
			"empty",
			"not empty",
			"",
		])
	})

	await t.step("should handle regex with global flag", () => {
		// Global flag doesn't affect test() for first match
		const replacer = replaceFirstMatch(/test/g)(() => "replaced")
		assertEquals(
			replacer(["test test", "no match", "test"]),
			["replaced", "no match", "test"],
		)
	})

	await t.step("should handle special regex characters", () => {
		const replacer = replaceFirstMatch(/\$\d+/)((s) =>
			s.replace("$", "USD ")
		)
		assertEquals(
			replacer(["Free", "Price: $100", "$50"]),
			["Free", "Price: USD 100", "$50"],
		)
	})
})

Deno.test("replaceFirstMatch: currying", async (t) => {
	await t.step("should be curried", () => {
		const withPattern = replaceFirstMatch(/^ERROR/)
		assertType<
			IsExact<
				typeof withPattern,
				(
					replacer: (item: string) => string,
				) => <T>(array: ReadonlyArray<T> | null | undefined) => Array<T>
			>
		>(true)

		const withReplacer = withPattern((s) => `[${s}]`)
		assertType<
			IsExact<
				typeof withReplacer,
				<T>(array: ReadonlyArray<T> | null | undefined) => Array<T>
			>
		>(true)

		const result = withReplacer(["info", "ERROR: test", "ERROR: fail"])
		assertEquals(result, ["info", "[ERROR: test]", "ERROR: fail"])
	})

	await t.step("should allow partial application", () => {
		const cleanFirstError = replaceFirstMatch(/^ERROR:/i)
		const wrapError = cleanFirstError((s) => `[${s}]`)
		const lowerError = cleanFirstError((s) => s.toLowerCase())

		const logs = ["INFO", "ERROR: Failed", "Error: Bad", "ERROR: More"]
		assertEquals(wrapError(logs), [
			"INFO",
			"[ERROR: Failed]",
			"Error: Bad",
			"ERROR: More",
		])
		assertEquals(lowerError(logs), [
			"INFO",
			"error: failed",
			"Error: Bad",
			"ERROR: More",
		])
	})
})

Deno.test("replaceFirstMatch: immutability", async (t) => {
	await t.step("should not modify original array", () => {
		const original = ["test1", "other", "test2"]
		const replacer = replaceFirstMatch(/test/)((s) => "replaced")
		const result = replacer(original)

		assertEquals(original, ["test1", "other", "test2"])
		assertEquals(result, ["replaced", "other", "test2"])
	})

	await t.step("should create new array even when no match", () => {
		const original = ["abc", "def"]
		const replacer = replaceFirstMatch(/xyz/)((s) => "replaced")
		const result = replacer(original)

		assertEquals(result, ["abc", "def"])
		assertEquals(result === original, false)
	})
})

Deno.test("replaceFirstMatch: property-based tests", async (t) => {
	await t.step("should replace at most one matching string", () => {
		fc.assert(
			fc.property(
				fc.array(fc.oneof(
					fc.string(),
					fc.integer(),
					fc.constant(null),
				)),
				(arr) => {
					// Simple pattern that matches strings starting with 'a'
					const replacer = replaceFirstMatch(/^a/)((s) =>
						`A${s.slice(1)}`
					)
					const result = replacer(arr)

					// Length preserved
					assertEquals(result.length, arr.length)

					// Count how many strings match the pattern
					let originalMatches = 0
					arr.forEach((val) => {
						if (typeof val === "string" && val.startsWith("a")) {
							originalMatches++
						}
					})

					if (originalMatches > 0) {
						// Find the first matching string
						const firstMatchIndex = arr.findIndex((val) =>
							typeof val === "string" && val.startsWith("a")
						)

						// Check that only first match was replaced
						arr.forEach((val, idx) => {
							if (idx === firstMatchIndex) {
								// This should be replaced
								const orig = arr[idx] as string
								assertEquals(result[idx], `A${orig.slice(1)}`)
							} else {
								// Everything else should be unchanged
								assertEquals(result[idx], val)
							}
						})
					} else {
						// No matches, array should be unchanged (but new array)
						assertEquals(result, arr)
						assertEquals(result === arr, false)
					}

					return true
				},
			),
			{ verbose: false },
		)
	})

	await t.step("should maintain array structure", () => {
		fc.assert(
			fc.property(
				fc.array(fc.oneof(
					fc.string(),
					fc.integer(),
					fc.boolean(),
				)),
				(arr) => {
					const replacer = replaceFirstMatch(/.*/)((s) => "FIRST")
					const result = replacer(arr)

					// Length preserved
					assertEquals(result.length, arr.length)

					// Find first string
					const firstStringIndex = arr.findIndex((x) =>
						typeof x === "string"
					)

					if (firstStringIndex !== -1) {
						// First string replaced
						assertEquals(result[firstStringIndex], "FIRST")

						// Everything else unchanged
						arr.forEach((val, idx) => {
							if (idx !== firstStringIndex) {
								assertEquals(result[idx], val)
							}
						})
					} else {
						// No strings, array unchanged
						assertEquals(result, arr)
					}

					return true
				},
			),
			{ verbose: false },
		)
	})

	await t.step("should handle null and undefined correctly", () => {
		fc.assert(
			fc.property(
				fc.oneof(fc.constant(null), fc.constant(undefined)),
				(input) => {
					const replacer = replaceFirstMatch(/test/)((s) =>
						s.toUpperCase()
					)
					const result = replacer(input)
					assertEquals(result, [])
					return true
				},
			),
			{ verbose: false },
		)
	})
})

Deno.test("replaceFirstMatch: replacer function behavior", async (t) => {
	await t.step("should call replacer at most once", () => {
		let callCount = 0
		const replacer = replaceFirstMatch(/test/)((s) => {
			callCount++
			return s.toUpperCase()
		})

		replacer(["test", "test2", "testing"])
		assertEquals(callCount, 1)

		callCount = 0
		replacer(["no", "match", "here"])
		assertEquals(callCount, 0)
	})

	await t.step("should support complex transformations", () => {
		const logs = [
			"INFO: Server started",
			"ERROR: Database connection failed",
			"ERROR: File not found",
			123,
			null,
		]

		const replacer = replaceFirstMatch(/^ERROR: (.+)$/)((s) => {
			const message = s.replace("ERROR: ", "")
			return `[CRITICAL] ${message} - Investigate immediately`
		})

		const result = replacer(logs)
		assertEquals(result[0], "INFO: Server started")
		assertEquals(
			result[1],
			"[CRITICAL] Database connection failed - Investigate immediately",
		)
		assertEquals(result[2], "ERROR: File not found") // Not replaced (only first)
		assertEquals(result[3], 123)
		assertEquals(result[4], null)
	})

	await t.step("should handle replacer that throws", () => {
		const replacer = replaceFirstMatch(/test/)((s) => {
			throw new Error("test error")
		})

		try {
			replacer(["test", "other"])
			throw new Error("Should have thrown")
		} catch (e) {
			assertEquals((e as Error).message, "test error")
		}
	})
})
