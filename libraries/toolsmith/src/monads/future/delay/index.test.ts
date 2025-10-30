import { assertEquals } from "@std/assert"

import of from "../of/index.ts"
import run from "../run/index.ts"
import delay from "./index.ts"

Deno.test("delay", async (t) => {
	await t.step("delays task execution by milliseconds", async () => {
		const task = of(42)
		const startTime = Date.now()

		const delayed = delay(50)(task)
		const value = await run(delayed)
		const elapsed = Date.now() - startTime

		assertEquals(value, 42)
		assertEquals(elapsed >= 50, true)
	})

	await t.step("preserves task value after delay", async () => {
		const task = of("hello")
		const delayed = delay(10)(task)
		const value = await run(delayed)

		assertEquals(value, "hello")
	})

	await t.step("supports zero delay", async () => {
		const task = of(100)
		const delayed = delay(0)(task)
		const value = await run(delayed)

		assertEquals(value, 100)
	})

	await t.step("supports currying", async () => {
		const delay50 = delay(50)
		const task1 = of(1)
		const task2 = of(2)

		const delayed1 = delay50(task1)
		const delayed2 = delay50(task2)

		const value1 = await run(delayed1)
		const value2 = await run(delayed2)

		assertEquals(value1, 1)
		assertEquals(value2, 2)
	})

	await t.step("maintains lazy evaluation", async () => {
		let executed = false

		const task = function createTask() {
			return function executeTask() {
				executed = true
				return Promise.resolve(42)
			}
		}

		const delayed = delay(10)(task())

		assertEquals(executed, false)

		await run(delayed)

		assertEquals(executed, true)
	})

	await t.step("handles complex types", async () => {
		type Result = {
			readonly success: boolean
			readonly data: number
		}

		const task = of<Result>({ success: true, data: 999 })
		const delayed = delay(5)(task)
		const value = await run(delayed)

		assertEquals(value.success, true)
		assertEquals(value.data, 999)
	})

	await t.step("can be chained with multiple delays", async () => {
		const task = of(10)
		const startTime = Date.now()

		const delayed = delay(20)(delay(20)(task))
		const value = await run(delayed)
		const elapsed = Date.now() - startTime

		assertEquals(value, 10)
		assertEquals(elapsed >= 40, true)
	})

	await t.step("preserves referential transparency", async () => {
		const task = of(5)
		const delayed = delay(10)(task)

		const value1 = await run(delayed)
		const value2 = await run(delayed)

		assertEquals(value1, value2)
		assertEquals(value1, 5)
	})

	await t.step("works with async task values", async () => {
		const asyncTask = function createAsyncTask() {
			return Promise.resolve(777)
		}

		const delayed = delay(15)(asyncTask)
		const value = await run(delayed)

		assertEquals(value, 777)
	})

	await t.step("respects timing accuracy within tolerance", async () => {
		const task = of("timing")
		const delayMs = 100
		const startTime = Date.now()

		const delayed = delay(delayMs)(task)
		await run(delayed)
		const elapsed = Date.now() - startTime

		const tolerance = 20
		assertEquals(elapsed >= delayMs, true)
		assertEquals(elapsed < delayMs + tolerance, true)
	})
})
