//++ Example: Testing a multi-parameter curried function
//++ Demonstrates testing curried functions with multiple parameters

import { assertEquals } from "@std/assert"

//++ Function under test: curried multiplication
function multiply(multiplicand: number) {
	return function multiplyByMultiplicand(multiplier: number): number {
		return multiplicand * multiplier
	}
}

//++ Tests for multiply (curried multiplication)
Deno.test("multiply", async (t) => {
	await t.step("partial application", async (t) => {
		await t.step("returns a function when partially applied", () => {
			const multiplyByThree = multiply(3)
			assertEquals(typeof multiplyByThree, "function")
		})

		await t.step("partial application is reusable", () => {
			const multiplyByFive = multiply(5)
			assertEquals(multiplyByFive(2), 10)
			assertEquals(multiplyByFive(3), 15)
			assertEquals(multiplyByFive(4), 20)
		})

		await t.step("different partial applications are independent", () => {
			const multiplyByTwo = multiply(2)
			const multiplyByTen = multiply(10)
			assertEquals(multiplyByTwo(5), 10)
			assertEquals(multiplyByTen(5), 50)
		})
	})

	await t.step("full application", async (t) => {
		await t.step("multiplies positive numbers", () => {
			assertEquals(multiply(3)(4), 12)
			assertEquals(multiply(10)(5), 50)
		})

		await t.step("multiplies with negatives", () => {
			assertEquals(multiply(-3)(4), -12)
			assertEquals(multiply(3)(-4), -12)
			assertEquals(multiply(-3)(-4), 12)
		})

		await t.step("multiplies with zero", () => {
			assertEquals(multiply(0)(5), 0)
			assertEquals(multiply(5)(0), 0)
			assertEquals(multiply(0)(0), 0)
		})

		await t.step("multiplies with one (identity)", () => {
			assertEquals(multiply(1)(5), 5)
			assertEquals(multiply(5)(1), 5)
		})
	})

	await t.step("edge cases", async (t) => {
		await t.step("handles decimal numbers", () => {
			assertEquals(multiply(0.5)(2), 1)
			assertEquals(multiply(0.1)(10), 1)
		})

		await t.step("handles infinity", () => {
			assertEquals(multiply(Infinity)(2), Infinity)
			assertEquals(multiply(-Infinity)(2), -Infinity)
			assertEquals(multiply(0)(Infinity), NaN)
		})
	})
})
