//++ Example: Testing a unary transformation function
//++ Demonstrates testing a simple value-transforming function

import { assertEquals } from "@std/assert"

//++ Function under test: doubles a number
function double(n: number): number {
	return n * 2
}

//++ Tests for double function
Deno.test("double", async (t) => {
	await t.step("happy path", async (t) => {
		await t.step("doubles positive numbers", () => {
			assertEquals(double(1), 2)
			assertEquals(double(5), 10)
			assertEquals(double(21), 42)
		})

		await t.step("doubles negative numbers", () => {
			assertEquals(double(-1), -2)
			assertEquals(double(-5), -10)
			assertEquals(double(-21), -42)
		})

		await t.step("doubles zero", () => {
			assertEquals(double(0), 0)
		})

		await t.step("doubles decimals", () => {
			assertEquals(double(0.5), 1)
			assertEquals(double(2.5), 5)
		})
	})

	await t.step("edge cases", async (t) => {
		await t.step("handles very small numbers", () => {
			const result = double(Number.MIN_VALUE)
			assertEquals(result, Number.MIN_VALUE * 2)
		})

		await t.step("handles very large numbers", () => {
			const result = double(Number.MAX_SAFE_INTEGER)
			assertEquals(result, Number.MAX_SAFE_INTEGER * 2)
		})

		await t.step("handles infinity", () => {
			assertEquals(double(Infinity), Infinity)
			assertEquals(double(-Infinity), -Infinity)
		})
	})
})
