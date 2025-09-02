import { expect } from "@std/expect"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

import generateShortId from "./index.ts"

describe("generateShortId", () => {
	describe("basic functionality", () => {
		it("should generate a string", () => {
			const id = generateShortId()
			expect(typeof id).toBe("string")
		})

		it("should generate non-empty strings", () => {
			const id = generateShortId()
			expect(id.length).toBeGreaterThan(0)
		})

		it("should start with underscore", () => {
			const id = generateShortId()
			expect(id.startsWith("_")).toBe(true)
		})

		it("should generate different IDs each time", () => {
			const id1 = generateShortId()
			const id2 = generateShortId()
			const id3 = generateShortId()

			expect(id1).not.toBe(id2)
			expect(id1).not.toBe(id3)
			expect(id2).not.toBe(id3)
		})
	})

	describe("format validation", () => {
		it("should contain only valid Base58 characters after underscore", () => {
			const id = generateShortId()
			const withoutUnderscore = id.slice(1)

			// Base58 uses: 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
			// (excludes 0, O, I, l to avoid confusion)
			const base58Regex =
				/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/
			expect(base58Regex.test(withoutUnderscore)).toBe(true)
		})

		it("should not contain confusing characters", () => {
			const id = generateShortId()

			// Should not contain 0, O, I, l which are excluded from Base58
			expect(id.includes("0")).toBe(false)
			expect(id.includes("O")).toBe(false)
			expect(id.includes("I")).toBe(false)
			expect(id.includes("l")).toBe(false)
		})

		it("should have consistent length range", () => {
			const ids = Array.from({ length: 100 }, () => generateShortId())
			const lengths = ids.map((id) => id.length)

			// Since we're encoding UUIDs (128 bits) to Base58, length should be consistent
			// Base58 encoding of 128 bits should be around 22 characters + 1 underscore
			const minLength = Math.min(...lengths)
			const maxLength = Math.max(...lengths)

			expect(minLength).toBeGreaterThan(20)
			expect(maxLength).toBeLessThan(30)
			expect(maxLength - minLength).toBeLessThanOrEqual(2) // Should be very consistent
		})
	})

	describe("uniqueness properties", () => {
		it("should generate unique IDs in a reasonable sample", () => {
			const sampleSize = 1000
			const ids = Array.from({ length: sampleSize }, () => generateShortId())
			const uniqueIds = new Set(ids)

			expect(uniqueIds.size).toBe(sampleSize) // All should be unique
		})

		it("should have high entropy", () => {
			const sampleSize = 100
			const ids = Array.from({ length: sampleSize }, () => generateShortId())

			// Check that we're using a good variety of characters
			const allChars = ids.join("").split("")
			const uniqueChars = new Set(allChars)

			// Should use a good portion of the Base58 alphabet (58 chars + underscore)
			expect(uniqueChars.size).toBeGreaterThan(30)
		})

		it("should not generate predictable patterns", () => {
			const ids = Array.from({ length: 10 }, () => generateShortId())

			// Check that consecutive IDs don't have obvious patterns
			for (let i = 1; i < ids.length; i++) {
				// Should not be incrementing or following obvious patterns
				expect(ids[i]).not.toBe(ids[i - 1])

				// Should not have identical prefixes (beyond the underscore)
				const prefix1 = ids[i - 1].slice(0, 5)
				const prefix2 = ids[i].slice(0, 5)
				expect(prefix1).not.toBe(prefix2)
			}
		})
	})

	describe("UUID v4 properties", () => {
		it("should be based on UUIDs", () => {
			// We can't directly verify the UUID since it's encoded, but we can check properties
			const ids = Array.from({ length: 100 }, () => generateShortId())

			// All should have consistent format
			ids.forEach((id) => {
				expect(id.startsWith("_")).toBe(true)
				expect(id.length).toBeGreaterThan(20)
			})
		})

		it("should have cryptographic randomness", () => {
			const sampleSize = 1000
			const ids = Array.from({ length: sampleSize }, () => generateShortId())

			// Statistical test: character distribution should be reasonably uniform
			const charCounts = new Map<string, number>()

			ids.forEach((id) => {
				// Skip the underscore prefix
				const chars = id.slice(1).split("")
				chars.forEach((char) => {
					charCounts.set(char, (charCounts.get(char) || 0) + 1)
				})
			})

			// Each character should appear with some frequency (not perfect uniformity due to Base58 encoding)
			const frequencies = Array.from(charCounts.values())
			const avgFrequency = frequencies.reduce((a, b) => a + b, 0) /
				frequencies.length

			// No character should be extremely over or under-represented
			frequencies.forEach((freq) => {
				expect(freq).toBeGreaterThan(avgFrequency * 0.1) // Not too rare
				expect(freq).toBeLessThan(avgFrequency * 10) // Not too common
			})
		})
	})

	describe("edge cases", () => {
		it("should work in rapid succession", () => {
			const rapidIds = []
			for (let i = 0; i < 100; i++) {
				rapidIds.push(generateShortId())
			}

			const uniqueRapidIds = new Set(rapidIds)
			expect(uniqueRapidIds.size).toBe(100) // All should still be unique
		})

		it("should be stable across multiple calls", () => {
			// Test that the function itself doesn't change behavior
			const before = generateShortId
			const after = generateShortId

			expect(before).toBe(after) // Same function reference
			expect(typeof before()).toBe("string")
			expect(typeof after()).toBe("string")
		})
	})

	describe("property-based tests", () => {
		it("should always generate valid IDs", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 100 }),
					(count) => {
						const ids = Array.from({ length: count }, () => generateShortId())

						ids.forEach((id) => {
							expect(typeof id).toBe("string")
							expect(id.length).toBeGreaterThan(0)
							expect(id.startsWith("_")).toBe(true)

							// Should only contain valid characters
							const withoutUnderscore = id.slice(1)
							const validChars =
								/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/
							expect(validChars.test(withoutUnderscore)).toBe(true)
						})
					},
				),
			)
		})

		it("should maintain uniqueness across different batch sizes", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 10, max: 100 }),
					(batchSize) => {
						const ids = Array.from(
							{ length: batchSize },
							() => generateShortId(),
						)
						const uniqueIds = new Set(ids)
						expect(uniqueIds.size).toBe(batchSize)
					},
				),
			)
		})
	})

	describe("performance characteristics", () => {
		it("should be reasonably fast", () => {
			const start = Date.now()
			for (let i = 0; i < 1000; i++) {
				generateShortId()
			}
			const end = Date.now()

			// Should generate 1000 IDs in reasonable time
			expect(end - start).toBeLessThan(1000) // Less than 1 second
		})

		it("should not have memory leaks in repeated calls", () => {
			// Generate many IDs and ensure we're not accumulating state
			const initialMemory = performance.memory?.usedJSHeapSize || 0

			for (let i = 0; i < 10000; i++) {
				generateShortId()
			}

			// Force garbage collection if available
			if (globalThis.gc) {
				globalThis.gc()
			}

			const finalMemory = performance.memory?.usedJSHeapSize || 0

			// Memory usage shouldn't grow significantly (this is a rough check)
			if (initialMemory > 0 && finalMemory > 0) {
				const memoryGrowth = finalMemory - initialMemory
				expect(memoryGrowth).toBeLessThan(1024 * 1024) // Less than 1MB growth
			}
		})
	})

	describe("collision resistance", () => {
		it("should have extremely low collision probability", () => {
			// Test with a larger sample to verify collision resistance
			const largeSample = 10000
			const ids = Array.from({ length: largeSample }, () => generateShortId())
			const uniqueIds = new Set(ids)

			// With crypto.randomUUID(), collisions should be virtually impossible
			expect(uniqueIds.size).toBe(largeSample)
		})

		it("should not repeat patterns in concurrent generation", async () => {
			// Test concurrent generation to ensure no race conditions
			const concurrentPromises = Array.from(
				{ length: 100 },
				() => Promise.resolve(generateShortId()),
			)

			const concurrentIds = await Promise.all(concurrentPromises)
			const uniqueConcurrentIds = new Set(concurrentIds)

			expect(uniqueConcurrentIds.size).toBe(100)
		})
	})

	describe("Base58 encoding verification", () => {
		it("should produce valid Base58 encoded output", () => {
			const id = generateShortId()
			const base58Part = id.slice(1) // Remove underscore

			// Base58 should not be empty
			expect(base58Part.length).toBeGreaterThan(0)

			// Should be decodable back (this tests the encoding is valid)
			// We can't test decoding without the decode function, but we can test format
			const base58Chars =
				"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
			base58Part.split("").forEach((char) => {
				expect(base58Chars.includes(char)).toBe(true)
			})
		})

		it("should be shorter than hex representation", () => {
			// Base58 should be more compact than hex for the same data
			const id = generateShortId()
			const base58Length = id.length - 1 // Exclude underscore

			// UUID hex without dashes is 32 characters
			// Base58 should be shorter
			expect(base58Length).toBeLessThan(32)
		})
	})
})
