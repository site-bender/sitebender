import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import {
	assertType,
	IsExact,
} from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import replaceAllMatches from "../../../../src/simple/array/replaceAllMatches/index.ts"

Deno.test("replaceAllMatches: type checking", async (t) => {
	await t.step("should have correct type signature", () => {
		const replacer = replaceAllMatches(/test/)((s: string) => s.toUpperCase())
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
		const replacer = replaceAllMatches(/^\d+$/)((s) => `num-${s}`)
		const mixed = ["123", 456, "abc", null, "789"]
		const result = replacer(mixed)
		assertType<IsExact<typeof result, Array<string | number | null>>>(true)
		assertEquals(result, ["num-123", 456, "abc", null, "num-789"])
	})
})

Deno.test("replaceAllMatches: basic functionality", async (t) => {
	await t.step("should replace strings matching pattern", () => {
		const replacer = replaceAllMatches(/^h/)((s) => s.toUpperCase())
		assertEquals(
			replacer(["hello", "hi", "world", "hey"]),
			["HELLO", "HI", "world", "HEY"],
		)
	})

	await t.step("should replace with pattern anywhere in string", () => {
		const replacer = replaceAllMatches(/test/)((s) => "replaced")
		assertEquals(
			replacer(["test1", "other", "contest", "test"]),
			["replaced", "other", "replaced", "replaced"],
		)
	})

	await t.step("should handle case-insensitive patterns", () => {
		const replacer = replaceAllMatches(/error:/i)((s) => s.toLowerCase())
		assertEquals(
			replacer(["ERROR: failed", "info", "Error: bad", "error: ok"]),
			["error: failed", "info", "error: bad", "error: ok"],
		)
	})

	await t.step("should handle empty arrays", () => {
		const replacer = replaceAllMatches(/test/)((s) => s.toUpperCase())
		assertEquals(replacer([]), [])
	})

	await t.step("should handle arrays with no matches", () => {
		const replacer = replaceAllMatches(/xyz/)((s) => "replaced")
		assertEquals(replacer(["abc", "def", "ghi"]), ["abc", "def", "ghi"])
	})

	await t.step("should handle arrays with all matches", () => {
		const replacer = replaceAllMatches(/^/)((s) => `>${s}`)
		assertEquals(replacer(["a", "b", "c"]), [">a", ">b", ">c"])
	})

	await t.step("should pass matched string to replacer", () => {
		const captured: string[] = []
		const replacer = replaceAllMatches(/\d+/)((s) => {
			captured.push(s)
			return `[${s}]`
		})
		assertEquals(replacer(["test123", "456end", "no-match"]), [
			"[test123]",
			"[456end]",
			"no-match",
		])
		assertEquals(captured, ["test123", "456end"])
	})
})

Deno.test("replaceAllMatches: regex patterns", async (t) => {
	await t.step("should work with complex regex patterns", () => {
		// Email pattern (simplified)
		const replacer = replaceAllMatches(/^[^@]+@[^@]+$/)((s) => `<${s}>`)
		assertEquals(
			replacer(["user@example.com", "invalid", "test@domain.org"]),
			["<user@example.com>", "invalid", "<test@domain.org>"],
		)
	})

	await t.step("should handle anchored patterns", () => {
		const startReplacer = replaceAllMatches(/^prefix/)((s) =>
			s.replace("prefix", "PREFIX")
		)
		assertEquals(
			startReplacer(["prefix-test", "test-prefix", "prefix"]),
			["PREFIX-test", "test-prefix", "PREFIX"],
		)

		const endReplacer = replaceAllMatches(/suffix$/)((s) =>
			s.replace("suffix", "SUFFIX")
		)
		assertEquals(
			endReplacer(["test-suffix", "suffix-test", "suffix"]),
			["test-SUFFIX", "suffix-test", "SUFFIX"],
		)
	})

	await t.step("should handle character classes", () => {
		const replacer = replaceAllMatches(/^[A-Z]/)((s) => `Capital: ${s}`)
		assertEquals(
			replacer(["Hello", "world", "Test", "123"]),
			["Capital: Hello", "world", "Capital: Test", "123"],
		)
	})

	await t.step("should handle quantifiers", () => {
		const replacer = replaceAllMatches(/^\d{3,}$/)((s) => `Long number: ${s}`)
		assertEquals(
			replacer(["12", "123", "1234", "ab123"]),
			["12", "Long number: 123", "Long number: 1234", "ab123"],
		)
	})
})

Deno.test("replaceAllMatches: mixed types", async (t) => {
	await t.step("should pass through non-string values unchanged", () => {
		const replacer = replaceAllMatches(/test/)((s) => s.toUpperCase())
		const mixed = ["test", 123, null, undefined, true, { obj: true }, [
			"array",
		]]
		assertEquals(
			replacer(mixed),
			["TEST", 123, null, undefined, true, { obj: true }, ["array"]],
		)
	})

	await t.step("should handle arrays with only non-strings", () => {
		const replacer = replaceAllMatches(/test/)((s) => s.toUpperCase())
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
			const replacer = replaceAllMatches(/^\d+$/)((s) => `num-${s}`)
			assertEquals(
				replacer(["123", 123, "456", 456]),
				["num-123", 123, "num-456", 456],
			)
		},
	)
})

Deno.test("replaceAllMatches: edge cases", async (t) => {
	await t.step("should handle null input", () => {
		const replacer = replaceAllMatches(/test/)((s) => s.toUpperCase())
		assertEquals(replacer(null), [])
	})

	await t.step("should handle undefined input", () => {
		const replacer = replaceAllMatches(/test/)((s) => s.toUpperCase())
		assertEquals(replacer(undefined), [])
	})

	await t.step("should handle empty strings", () => {
		const replacer = replaceAllMatches(/^$/)((s) => "empty")
		assertEquals(replacer(["", "not empty", ""]), [
			"empty",
			"not empty",
			"empty",
		])
	})

	await t.step("should handle regex with global flag", () => {
		// Global flag doesn't affect test() behavior
		const replacer = replaceAllMatches(/test/g)((s) => "replaced")
		assertEquals(
			replacer(["test test", "no match", "test"]),
			["replaced", "no match", "replaced"],
		)
	})

	await t.step("should handle special regex characters in strings", () => {
		const replacer = replaceAllMatches(/\$\d+/)((s) => s.replace("$", "USD "))
		assertEquals(
			replacer(["Price: $100", "$50", "Free"]),
			["Price: USD 100", "USD 50", "Free"],
		)
	})
})

Deno.test("replaceAllMatches: currying", async (t) => {
	await t.step("should be curried", () => {
		const withPattern = replaceAllMatches(/^ERROR/)
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

		const result = withReplacer(["ERROR: test", "info", "ERROR: fail"])
		assertEquals(result, ["[ERROR: test]", "info", "[ERROR: fail]"])
	})

	await t.step("should allow partial application", () => {
		// Create reusable matchers
		const cleanErrors = replaceAllMatches(/^ERROR:/i)
		const wrapErrors = cleanErrors((s) => `[${s}]`)
		const lowerErrors = cleanErrors((s) => s.toLowerCase())

		const logs = ["ERROR: Failed", "info", "Error: Bad"]
		assertEquals(wrapErrors(logs), [
			"[ERROR: Failed]",
			"info",
			"[Error: Bad]",
		])
		assertEquals(lowerErrors(logs), ["error: failed", "info", "error: bad"])
	})
})

Deno.test("replaceAllMatches: immutability", async (t) => {
	await t.step("should not modify original array", () => {
		const original = ["test1", "other", "test2"]
		const replacer = replaceAllMatches(/test/)((s) => "replaced")
		const result = replacer(original)

		assertEquals(original, ["test1", "other", "test2"])
		assertEquals(result, ["replaced", "other", "replaced"])
	})

	await t.step("should create new array even when no replacements", () => {
		const original = ["abc", "def"]
		const replacer = replaceAllMatches(/xyz/)((s) => "replaced")
		const result = replacer(original)

		assertEquals(result, ["abc", "def"])
		assertEquals(result === original, false)
	})
})

Deno.test("replaceAllMatches: property-based tests", async (t) => {
	await t.step("should only replace strings that match pattern", () => {
		fc.assert(
			fc.property(
				fc.array(fc.oneof(
					fc.string(),
					fc.integer(),
					fc.constant(null),
					fc.constant(undefined),
				)),
				(arr) => {
					// Simple pattern that matches strings starting with 'a'
					const replacer = replaceAllMatches(/^a/)((s) => `A${s.slice(1)}`)
					const result = replacer(arr)

					// Length preserved
					assertEquals(result.length, arr.length)

					// Check each element
					arr.forEach((val, idx) => {
						if (typeof val === "string" && val.startsWith("a")) {
							assertEquals(result[idx], `A${val.slice(1)}`)
						} else {
							assertEquals(result[idx], val)
						}
					})

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
					const replacer = replaceAllMatches(/.*/)((s) => "REPLACED")
					const result = replacer(arr)

					// Length preserved
					assertEquals(result.length, arr.length)

					// All strings replaced, others unchanged
					arr.forEach((val, idx) => {
						if (typeof val === "string") {
							assertEquals(result[idx], "REPLACED")
						} else {
							assertEquals(result[idx], val)
						}
					})

					return true
				},
			),
			{ verbose: false },
		)
	})

	await t.step(
		"should be idempotent when pattern doesn't match replacement",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.string()),
					(arr) => {
						// Pattern that won't match the replacement
						const replacer = replaceAllMatches(/^test/)((s) => `replaced-${s}`)
						const result1 = replacer(arr)
						const result2 = replacer(result1)

						// Second application shouldn't change anything
						// (since "replaced-test..." doesn't start with "test")
						assertEquals(result1, result2)
						return true
					},
				),
				{ verbose: false },
			)
		},
	)

	await t.step("should handle null and undefined correctly", () => {
		fc.assert(
			fc.property(
				fc.oneof(fc.constant(null), fc.constant(undefined)),
				(input) => {
					const replacer = replaceAllMatches(/test/)((s) => s.toUpperCase())
					const result = replacer(input)
					assertEquals(result, [])
					return true
				},
			),
			{ verbose: false },
		)
	})
})

Deno.test("replaceAllMatches: replacer function behavior", async (t) => {
	await t.step("should call replacer only for matching strings", () => {
		let callCount = 0
		const replacer = replaceAllMatches(/test/)((s) => {
			callCount++
			return s.toUpperCase()
		})

		replacer(["test", "other", 123, "contest", null])
		assertEquals(callCount, 2) // "test" and "contest"
	})

	await t.step("should support complex transformations", () => {
		const logs = [
			"ERROR: Database connection failed",
			"INFO: Server started",
			"ERROR: File not found",
			123,
			null,
		]

		const replacer = replaceAllMatches(/^ERROR: (.+)$/)((s) => {
			const message = s.replace("ERROR: ", "")
			return `[CRITICAL] ${message} - Please investigate`
		})

		const result = replacer(logs)
		assertEquals(
			result[0],
			"[CRITICAL] Database connection failed - Please investigate",
		)
		assertEquals(result[1], "INFO: Server started")
		assertEquals(
			result[2],
			"[CRITICAL] File not found - Please investigate",
		)
		assertEquals(result[3], 123)
		assertEquals(result[4], null)
	})

	await t.step("should handle replacer that throws", () => {
		const replacer = replaceAllMatches(/test/)((s) => {
			throw new Error("test error")
		})

		try {
			replacer(["test", "other"])
			throw new Error("Should have thrown")
		} catch (e) {
			assertEquals((e as Error).message, "test error")
		}
	})

	await t.step(
		"should preserve original string when replacer returns same",
		() => {
			const replacer = replaceAllMatches(/test/)((s) => s)
			const input = ["test", "other", "contest"]
			const result = replacer(input)

			assertEquals(result, input)
			assertEquals(result === input, false) // New array created
		},
	)
})

Deno.test("replaceAllMatches: practical use cases", async (t) => {
	await t.step("should clean log messages", () => {
		const cleanTimestamps = replaceAllMatches(
			/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} /,
		)((s) => s.replace(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} /, ""))
		const logs = [
			"2024-01-01 12:00:00 Server started",
			"No timestamp here",
			"2024-01-01 12:00:01 Request received",
		]
		assertEquals(
			cleanTimestamps(logs),
			["Server started", "No timestamp here", "Request received"],
		)
	})

	await t.step("should format file paths", () => {
		const formatPaths = replaceAllMatches(/^\//)((s) => `file://${s}`)
		const paths = [
			"/home/user/file.txt",
			"relative/path.txt",
			"/etc/config",
		]
		assertEquals(
			formatPaths(paths),
			[
				"file:///home/user/file.txt",
				"relative/path.txt",
				"file:///etc/config",
			],
		)
	})

	await t.step("should mask sensitive data", () => {
		const maskEmails = replaceAllMatches(/^[^@]+@[^@]+$/)((s) => {
			const [user, domain] = s.split("@")
			return `${user[0]}***@${domain}`
		})
		const data = [
			"user@example.com",
			"not an email",
			"admin@company.org",
			12345,
		]
		assertEquals(
			maskEmails(data),
			["u***@example.com", "not an email", "a***@company.org", 12345],
		)
	})
})
