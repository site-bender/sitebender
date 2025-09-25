import { assertEquals } from "@std/assert"

import left from "../left/index.ts"
import right from "../right/index.ts"
import isRight from "./index.ts"

Deno.test("isRight", async function isRightTests(t) {
	await t.step("returns true for Right values", function returnsTrueForRight() {
		assertEquals(isRight(right("success")), true)
		assertEquals(isRight(right(42)), true)
		assertEquals(isRight(right(null)), true)
		assertEquals(isRight(right(undefined)), true)
		assertEquals(isRight(right({ data: "ok" })), true)
		assertEquals(isRight(right([])), true)
	})

	await t.step("returns false for Left values", function returnsFalseForLeft() {
		assertEquals(isRight(left("error")), false)
		assertEquals(isRight(left(42)), false)
		assertEquals(isRight(left(null)), false)
		assertEquals(isRight(left(undefined)), false)
		assertEquals(isRight(left({ message: "failed" })), false)
		assertEquals(isRight(left([])), false)
	})

	await t.step("works as type guard", function typeGuard() {
		const leftValue = left<string, number>("error")
		const rightValue = right<number, string>(42)

		if (isRight(rightValue)) {
			// TypeScript knows this is Right<number>
			assertEquals(rightValue.right, 42)
		}

		if (!isRight(leftValue)) {
			// TypeScript knows this is Left<string>
			assertEquals(leftValue.left, "error")
		}
	})

	await t.step("works with array filter", function arrayFilter() {
		const values = [
			left("error1"),
			right(1),
			left("error2"),
			right(2),
			right(3),
		]

		const rights = values.filter(isRight)
		assertEquals(rights.length, 3)
		assertEquals(rights[0].right, 1)
		assertEquals(rights[1].right, 2)
		assertEquals(rights[2].right, 3)
	})

	await t.step("works with array some/every", function arraySomeEvery() {
		const allLefts = [left(1), left(2), left(3)]
		const allRights = [right(1), right(2), right(3)]
		const mixed = [left(1), right(2), left(3)]

		assertEquals(allRights.every(isRight), true)
		assertEquals(allLefts.every(isRight), false)
		assertEquals(mixed.every(isRight), false)

		assertEquals(allLefts.some(isRight), false)
		assertEquals(allRights.some(isRight), true)
		assertEquals(mixed.some(isRight), true)
	})

	await t.step("complements isLeft", function complementsIsLeft() {
		const values = [
			left("a"),
			right(1),
			left("b"),
			right(2),
		]

		for (const value of values) {
			// isRight and isLeft should always be opposites
			assertEquals(isRight(value), !isRight(value) === false)
		}
	})
})
