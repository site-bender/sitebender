//++ Example: Testing a curried function
//++ Demonstrates testing partial application and reusability

import { assertEquals } from "@std/assert"

//++ Function under test: curried addition
function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}

//++ Tests for add (curried addition)
Deno.test("add", async (t) => {
	await t.step("partial application", async (t) => {
		await t.step("returns a function when partially applied", () => {
			const addTwo = add(2)
			assertEquals(typeof addTwo, "function")
		})

		await t.step("partial application is reusable", () => {
			const addFive = add(5)
			assertEquals(addFive(3), 8)
			assertEquals(addFive(10), 15)
			assertEquals(addFive(-2), 3)
		})

		await t.step("different partial applications are independent", () => {
			const addTwo = add(2)
			const addTen = add(10)
			assertEquals(addTwo(3), 5)
			assertEquals(addTen(3), 13)
		})
	})

	await t.step("full application", async (t) => {
		await t.step("adds two positive numbers", () => {
			assertEquals(add(2)(3), 5)
			assertEquals(add(100)(200), 300)
		})

		await t.step("adds negative numbers", () => {
			assertEquals(add(-5)(3), -2)
			assertEquals(add(5)(-3), 2)
			assertEquals(add(-5)(-3), -8)
		})

		await t.step("adds zero", () => {
			assertEquals(add(0)(5), 5)
			assertEquals(add(5)(0), 5)
			assertEquals(add(0)(0), 0)
		})
	})

	await t.step("edge cases", async (t) => {
		await t.step("handles decimal numbers", () => {
			assertEquals(add(0.1)(0.2), 0.30000000000000004) // JavaScript precision
		})

		await t.step("handles very large numbers", () => {
			const result = add(Number.MAX_VALUE)(1)
			assertEquals(result > Number.MAX_VALUE, false)
		})
	})
})
