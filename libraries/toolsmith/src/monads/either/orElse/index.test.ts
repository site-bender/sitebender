import { assertEquals } from "@std/assert"

import left from "../left/index.ts"
import right from "../right/index.ts"
import orElse from "./index.ts"

Deno.test("orElse", async (t) => {
	await t.step("returns original Right unchanged", () => {
		const original = right<number, string>(42)
		const alternative = right<number, number>(100)

		const result = orElse<string, number, number>(alternative)(original)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 42)
		}
	})

	await t.step("returns alternative Either when Left", () => {
		const original = left<string, number>("error")
		const alternative = right<number, number>(100)

		const result = orElse<string, number, number>(alternative)(original)

		assertEquals(result, alternative)
	})

	await t.step("alternative can be Left", () => {
		const original = left<string, number>("error1")
		const alternative = left<number, number>(404)

		const result = orElse<string, number, number>(alternative)(original)

		assertEquals(result, alternative)
	})

	await t.step("alternative can be function returning Either", () => {
		const original = left<string, number>("error")
		const alternativeFn = function getAlternative() {
			return right<number, number>(999)
		}

		const result = orElse<string, number, number>(alternativeFn)(original)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 999)
		}
	})

	await t.step("alternative function is lazy (not called for Right)", () => {
		const original = right<number, string>(42)
		let called = false

		const alternativeFn = function getAlternative() {
			called = true
			return right<number, number>(100)
		}

		orElse<string, number, number>(alternativeFn)(original)

		assertEquals(called, false)
	})

	await t.step("alternative function is called for Left", () => {
		const original = left<string, number>("error")
		let called = false

		const alternativeFn = function getAlternative() {
			called = true
			return right<number, number>(100)
		}

		orElse<string, number, number>(alternativeFn)(original)

		assertEquals(called, true)
	})

	await t.step("supports currying", () => {
		const alternative = right<number, number>(100)
		const orElseWithAlternative = orElse<string, number, number>(alternative)

		const leftResult = orElseWithAlternative(left("error"))
		const rightResult = orElseWithAlternative(right(42))

		assertEquals(leftResult, alternative)
		assertEquals(rightResult._tag, "Right")
		if (rightResult._tag === "Right") {
			assertEquals(rightResult.right, 42)
		}
	})

	await t.step("changes error type from E to F", () => {
		const original = left<string, number>("string error")
		const alternative = left<number, number>(404)

		const result = orElse<string, number, number>(alternative)(original)

		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(typeof result.left, "number")
			assertEquals(result.left, 404)
		}
	})

	await t.step("preserves Right value type A", () => {
		type User = {
			readonly name: string
			readonly age: number
		}

		const original = right<User, string>({ name: "Alice", age: 30 })
		const alternative = right<User, number>({ name: "Bob", age: 25 })

		const result = orElse<string, User, number>(alternative)(original)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right.name, "Alice")
			assertEquals(result.right.age, 30)
		}
	})

	await t.step("handles complex alternative function", () => {
		const original = left<string, number>("error")

		const alternativeFn = function computeAlternative() {
			const computed = 10 * 10
			return right<number, number>(computed)
		}

		const result = orElse<string, number, number>(alternativeFn)(original)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 100)
		}
	})
})
