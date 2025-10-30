import { assertEquals } from "@std/assert"

import of from "../of/index.ts"
import run from "../run/index.ts"
import chain from "./index.ts"

Deno.test("chain", async (t) => {
	await t.step("chains asynchronous computations", async () => {
		const task = of(2)
		const double = function doubleValue(n: number) {
			return of(n * 2)
		}

		const result = chain(double)(task)
		const value = await run(result)

		assertEquals(value, 4)
	})

	await t.step("chains multiple operations", async () => {
		const task = of(10)
		const addFive = function add(n: number) {
			return of(n + 5)
		}
		const double = function mult(n: number) {
			return of(n * 2)
		}

		const result = chain(double)(chain(addFive)(task))
		const value = await run(result)

		assertEquals(value, 30)
	})

	await t.step("preserves lazy evaluation", async () => {
		let executed = false

		const task = function createTask() {
			return of(42)
		}

		const transform = function transformValue(n: number) {
			executed = true
			return of(n * 2)
		}

		const chained = chain(transform)(task())

		assertEquals(executed, false)

		await run(chained)

		assertEquals(executed, true)
	})

	await t.step("handles async transformations", async () => {
		const task = of(5)
		const asyncTransform = function transform(n: number) {
			return function delayedTask() {
				return new Promise(function resolve(res) {
					setTimeout(function timeout() {
						res(n * 3)
					}, 10)
				})
			}
		}

		const result = chain(asyncTransform)(task)
		const value = await run(result)

		assertEquals(value, 15)
	})

	await t.step("supports currying", async () => {
		const double = function doubleValue(n: number) {
			return of(n * 2)
		}

		const chainDouble = chain(double)
		const task1 = of(10)
		const task2 = of(20)

		const result1 = await run(chainDouble(task1))
		const result2 = await run(chainDouble(task2))

		assertEquals(result1, 20)
		assertEquals(result2, 40)
	})

	await t.step("chains with type transformation", async () => {
		const task = of(42)
		const toString = function convertToString(n: number) {
			return of(`value: ${n}`)
		}

		const result = chain(toString)(task)
		const value = await run(result)

		assertEquals(value, "value: 42")
	})

	await t.step("handles complex return types", async () => {
		type User = {
			readonly id: number
			readonly name: string
		}

		const task = of(1)
		const fetchUser = function getUser(id: number) {
			return of<User>({ id, name: "Alice" })
		}

		const result = chain(fetchUser)(task)
		const value = await run(result)

		assertEquals(value.id, 1)
		assertEquals(value.name, "Alice")
	})

	await t.step("maintains referential transparency", async () => {
		const task = of(100)
		const transform = function transformValue(n: number) {
			return of(n / 10)
		}

		const result1 = await run(chain(transform)(task))
		const result2 = await run(chain(transform)(task))

		assertEquals(result1, result2)
		assertEquals(result1, 10)
	})
})
