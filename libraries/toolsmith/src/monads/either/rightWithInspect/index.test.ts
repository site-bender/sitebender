import { assertEquals } from "@std/assert"

import rightWithInspect from "./index.ts"

Deno.test("rightWithInspect", async (t) => {
	await t.step("creates Right with _tag", () => {
		const result = rightWithInspect<number, string>(42)

		assertEquals(result._tag, "Right")
	})

	await t.step("stores value in right property", () => {
		const result = rightWithInspect<number, string>(42)

		if (result._tag === "Right") {
			assertEquals(result.right, 42)
		}
	})

	await t.step("handles string values", () => {
		const result = rightWithInspect<string, number>("hello")

		if (result._tag === "Right") {
			assertEquals(result.right, "hello")
		}
	})

	await t.step("handles numeric values", () => {
		const result = rightWithInspect<number, string>(123)

		if (result._tag === "Right") {
			assertEquals(result.right, 123)
		}
	})

	await t.step("handles boolean values", () => {
		const result = rightWithInspect<boolean, string>(true)

		if (result._tag === "Right") {
			assertEquals(result.right, true)
		}
	})

	await t.step("handles null values", () => {
		const result = rightWithInspect<null, string>(null)

		if (result._tag === "Right") {
			assertEquals(result.right, null)
		}
	})

	await t.step("handles undefined values", () => {
		const result = rightWithInspect<undefined, string>(undefined)

		if (result._tag === "Right") {
			assertEquals(result.right, undefined)
		}
	})

	await t.step("handles Date values", () => {
		const date = new Date("2024-01-01")
		const result = rightWithInspect<Date, string>(date)

		if (result._tag === "Right") {
			assertEquals(result.right.getTime(), date.getTime())
		}
	})

	await t.step("handles function values", () => {
		function namedFunction() {
			return 42
		}

		const result = rightWithInspect<() => number, string>(namedFunction)

		if (result._tag === "Right") {
			assertEquals(result.right(), 42)
		}
	})

	await t.step("handles symbol values", () => {
		const sym = Symbol("test")
		const result = rightWithInspect<symbol, string>(sym)

		if (result._tag === "Right") {
			assertEquals(result.right, sym)
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

		const result = rightWithInspect<User, string>(user)

		if (result._tag === "Right") {
			assertEquals(result.right.name, "Alice")
			assertEquals(result.right.age, 30)
		}
	})

	await t.step("handles array values", () => {
		const arr = [1, 2, 3]
		const result = rightWithInspect<Array<number>, string>(arr)

		if (result._tag === "Right") {
			assertEquals(result.right.length, 3)
			assertEquals(result.right[0], 1)
		}
	})

	await t.step("E type parameter defaults to never", () => {
		const result = rightWithInspect(42)

		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 42)
		}
	})
})
