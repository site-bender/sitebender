import { assertEquals } from "@std/assert"

import run from "../run/index.ts"
import of from "./index.ts"

Deno.test("of", async (t) => {
	await t.step("wraps value in task", async () => {
		const task = of(42)
		const value = await run(task)

		assertEquals(value, 42)
	})

	await t.step("wraps string values", async () => {
		const task = of("hello")
		const value = await run(task)

		assertEquals(value, "hello")
	})

	await t.step("wraps boolean values", async () => {
		const task = of(true)
		const value = await run(task)

		assertEquals(value, true)
	})

	await t.step("wraps null values", async () => {
		const task = of(null)
		const value = await run(task)

		assertEquals(value, null)
	})

	await t.step("wraps undefined values", async () => {
		const task = of(undefined)
		const value = await run(task)

		assertEquals(value, undefined)
	})

	await t.step("wraps array values", async () => {
		const arr = [1, 2, 3]
		const task = of(arr)
		const value = await run(task)

		assertEquals(value, arr)
		assertEquals(value.length, 3)
	})

	await t.step("wraps object values", async () => {
		type User = {
			readonly name: string
			readonly age: number
		}

		const user: User = { name: "Alice", age: 30 }
		const task = of(user)
		const value = await run(task)

		assertEquals(value.name, "Alice")
		assertEquals(value.age, 30)
	})

	await t.step("creates lazy task", async () => {
		const task = of(42)
		const value = await run(task)

		assertEquals(value, 42)
	})

	await t.step("returns same value on multiple runs", async () => {
		const task = of(100)

		const value1 = await run(task)
		const value2 = await run(task)

		assertEquals(value1, value2)
		assertEquals(value1, 100)
	})

	await t.step("satisfies left identity monad law", async () => {
		const a = 42

		const taskA = of(a)
		const leftSide = await run(taskA)
		const rightSide = a

		assertEquals(leftSide, rightSide)
	})

	await t.step("handles zero value", async () => {
		const task = of(0)
		const value = await run(task)

		assertEquals(value, 0)
	})

	await t.step("handles empty string", async () => {
		const task = of("")
		const value = await run(task)

		assertEquals(value, "")
	})

	await t.step("handles false value", async () => {
		const task = of(false)
		const value = await run(task)

		assertEquals(value, false)
	})

	await t.step("wraps function values", async () => {
		function testFn(): number {
			return 42
		}

		const task = of(testFn)
		const value = await run(task)

		assertEquals(value(), 42)
	})
})
