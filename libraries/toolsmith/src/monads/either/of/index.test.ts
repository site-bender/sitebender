import { assertEquals } from "@std/assert"

import right from "../right/index.ts"
import of from "./index.ts"

Deno.test("of", async (t) => {
	await t.step("creates Right with value", () => {
		const result = of<number, string>(42)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 42)
		}
	})

	await t.step("is alias of right", () => {
		const ofResult = of<number, string>(42)
		const rightResult = right<number, string>(42)

		assertEquals(ofResult, rightResult)
	})

	await t.step("handles string values", () => {
		const result = of<string, number>("hello")

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, "hello")
		}
	})

	await t.step("handles boolean values", () => {
		const result = of<boolean, string>(true)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, true)
		}
	})

	await t.step("handles null values", () => {
		const result = of<null, string>(null)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, null)
		}
	})

	await t.step("handles undefined values", () => {
		const result = of<undefined, string>(undefined)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, undefined)
		}
	})

	await t.step("handles complex object values", () => {
		type User = {
			readonly name: string
			readonly age: number
		}

		const user: User = {
			name: "Alice",
			age: 30,
		}

		const result = of<User, string>(user)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right.name, "Alice")
			assertEquals(result.right.age, 30)
		}
	})

	await t.step("handles array values", () => {
		const arr = [1, 2, 3]
		const result = of<Array<number>, string>(arr)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right.length, 3)
			assertEquals(result.right[0], 1)
		}
	})

	await t.step("E type parameter defaults to never", () => {
		const result = of(42)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 42)
		}
	})

	await t.step("serves as monad of operation", () => {
		const value = 100
		const lifted = of<number, string>(value)

		assertEquals(lifted._tag, "Right")
		if (lifted._tag === "Right") {
			assertEquals(lifted.right, value)
		}
	})
})
