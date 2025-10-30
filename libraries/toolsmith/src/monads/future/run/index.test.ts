import { assertEquals } from "@std/assert"

import of from "../of/index.ts"
import run from "./index.ts"

Deno.test("run", async (t) => {
	await t.step("executes task and returns value", async () => {
		const task = of(42)
		const value = await run(task)

		assertEquals(value, 42)
	})

	await t.step("executes task with string value", async () => {
		const task = of("hello world")
		const value = await run(task)

		assertEquals(value, "hello world")
	})

	await t.step("executes task with boolean value", async () => {
		const task = of(true)
		const value = await run(task)

		assertEquals(value, true)
	})

	await t.step("executes task with null value", async () => {
		const task = of(null)
		const value = await run(task)

		assertEquals(value, null)
	})

	await t.step("executes task with undefined value", async () => {
		const task = of(undefined)
		const value = await run(task)

		assertEquals(value, undefined)
	})

	await t.step("executes task with array value", async () => {
		const arr = [1, 2, 3, 4, 5]
		const task = of(arr)
		const value = await run(task)

		assertEquals(value, arr)
		assertEquals(value.length, 5)
	})

	await t.step("executes task with object value", async () => {
		type Config = {
			readonly host: string
			readonly port: number
		}

		const config: Config = { host: "localhost", port: 8080 }
		const task = of(config)
		const value = await run(task)

		assertEquals(value.host, "localhost")
		assertEquals(value.port, 8080)
	})

	await t.step("triggers deferred computation", async () => {
		let executed = false

		const task = function createTask() {
			return function executeTask() {
				executed = true
				return Promise.resolve(42)
			}
		}

		assertEquals(executed, false)

		await run(task())

		assertEquals(executed, true)
	})

	await t.step("can execute same task multiple times", async () => {
		let count = 0

		const task = function createTask() {
			return function executeTask() {
				count++
				return Promise.resolve(count)
			}
		}

		const value1 = await run(task())
		const value2 = await run(task())

		assertEquals(value1, 1)
		assertEquals(value2, 2)
	})

	await t.step("handles async task execution", async () => {
		const asyncTask = function createAsyncTask() {
			return new Promise(function resolve(res) {
				setTimeout(function timeout() {
					res(999)
				}, 10)
			})
		}

		const value = await run(asyncTask)

		assertEquals(value, 999)
	})

	await t.step("preserves promise resolution", async () => {
		const task = function createTask() {
			return Promise.resolve("resolved")
		}

		const value = await run(task)

		assertEquals(value, "resolved")
	})

	await t.step("executes task immediately when called", async () => {
		const startTime = Date.now()

		const task = function createTask(): Promise<number> {
			return new Promise(function resolve(res) {
				setTimeout(function timeout() {
					res(Date.now() - startTime)
				}, 50)
			})
		}

		const elapsed = await run(task)

		assertEquals(typeof elapsed, "number")
		assertEquals(elapsed >= 50, true)
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
})
