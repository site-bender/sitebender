import { assertEquals } from "@std/assert"

import left from "../left/index.ts"
import right from "../right/index.ts"
import isLeft from "./index.ts"

Deno.test("isLeft", async function isLeftTests(t) {
	await t.step("returns true for Left values", function returnsTrueForLeft() {
		assertEquals(isLeft(left("error")), true)
		assertEquals(isLeft(left(42)), true)
		assertEquals(isLeft(left(null)), true)
		assertEquals(isLeft(left(undefined)), true)
		assertEquals(isLeft(left({ message: "failed" })), true)
		assertEquals(isLeft(left([])), true)
	})

	await t.step("returns false for Right values", function returnsFalseForRight() {
		assertEquals(isLeft(right("success")), false)
		assertEquals(isLeft(right(42)), false)
		assertEquals(isLeft(right(null)), false)
		assertEquals(isLeft(right(undefined)), false)
		assertEquals(isLeft(right({ data: "ok" })), false)
		assertEquals(isLeft(right([])), false)
	})

	await t.step("works as type guard", function typeGuard() {
		const leftValue = left<string, number>("error")
		const rightValue = right<number, string>(42)

		if (isLeft(leftValue)) {
			// TypeScript knows this is Left<string>
			assertEquals(leftValue.left, "error")
		}

		if (!isLeft(rightValue)) {
			// TypeScript knows this is Right<number>
			assertEquals(rightValue.right, 42)
		}
	})

	await t.step("works with array filter", function arrayFilter() {
		const values = [
			left("error1"),
			right(1),
			left("error2"),
			right(2),
			left("error3")
		]

		const lefts = values.filter(isLeft)
		assertEquals(lefts.length, 3)
		assertEquals(lefts[0].left, "error1")
		assertEquals(lefts[1].left, "error2")
		assertEquals(lefts[2].left, "error3")
	})

	await t.step("works with array some/every", function arraySomeEvery() {
		const allLefts = [left(1), left(2), left(3)]
		const allRights = [right(1), right(2), right(3)]
		const mixed = [left(1), right(2), left(3)]

		assertEquals(allLefts.every(isLeft), true)
		assertEquals(allRights.every(isLeft), false)
		assertEquals(mixed.every(isLeft), false)

		assertEquals(allRights.some(isLeft), false)
		assertEquals(allLefts.some(isLeft), true)
		assertEquals(mixed.some(isLeft), true)
	})
})
