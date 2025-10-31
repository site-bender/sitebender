//++ Example: Testing a unary predicate function
//++ Demonstrates testing a simple boolean-returning function

import { assertEquals } from "@std/assert"

//++ Function under test: checks if number is positive
function isPositive(n: number): boolean {
	return n > 0
}

//++ Tests for isPositive predicate
Deno.test("isPositive", async (t) => {
	await t.step("happy path", async (t) => {
		await t.step("returns true for positive numbers", () => {
			assertEquals(isPositive(1), true)
			assertEquals(isPositive(42), true)
			assertEquals(isPositive(0.001), true)
		})

		await t.step("returns false for non-positive numbers", () => {
			assertEquals(isPositive(0), false)
			assertEquals(isPositive(-1), false)
			assertEquals(isPositive(-42.5), false)
		})
	})

	await t.step("edge cases", async (t) => {
		await t.step("handles very small positive number", () => {
			assertEquals(isPositive(Number.MIN_VALUE), true)
		})

		await t.step("handles very large positive number", () => {
			assertEquals(isPositive(Number.MAX_VALUE), true)
		})

		await t.step("handles negative infinity", () => {
			assertEquals(isPositive(Number.NEGATIVE_INFINITY), false)
		})

		await t.step("handles positive infinity", () => {
			assertEquals(isPositive(Number.POSITIVE_INFINITY), true)
		})
	})
})
