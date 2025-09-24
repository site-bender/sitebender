import { assertEquals } from "@std/assert"

import isLeft from "../isLeft/index.ts"
import isRight from "../isRight/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"
import map from "./index.ts"

Deno.test("map - transforms Right values", async (t) => {
	await t.step("should map over right number", () => {
		const double = (x: number) => x * 2
		const result = map(double)(right(21))
		assertEquals(isRight(result), true)
		if (isRight(result)) {
			assertEquals(result.right, 42)
		}
	})

	await t.step("should map over right string", () => {
		const toLength = (s: string) => s.length
		const result = map(toLength)(right("hello"))
		assertEquals(isRight(result), true)
		if (isRight(result)) {
			assertEquals(result.right, 5)
		}
	})

	await t.step("should preserve left state", () => {
		const l = left<string, number>("problem")
		const double = (x: number) => x * 2
		const result = map(double)(l)
		assertEquals(isLeft(result), true)
		if (isLeft(result)) {
			assertEquals(result.left, "problem")
		}
	})

	await t.step("should chain multiple maps", () => {
		const double = (x: number) => x * 2
		const toString = (x: number) => x.toString()
		const step1 = right(10)
		const step2 = map(double)(step1)
		const step3 = map(toString)(step2)
		assertEquals(isRight(step3), true)
		if (isRight(step3)) {
			assertEquals(step3.right, "20")
		}
	})

	await t.step("should transform complex types", () => {
		const user = { id: 1, name: "Alice", age: 30 }
		const getName = (u: typeof user) => u.name
		const result = map(getName)(right(user))
		assertEquals(isRight(result), true)
		if (isRight(result)) {
			assertEquals(result.right, "Alice")
		}
	})
})
