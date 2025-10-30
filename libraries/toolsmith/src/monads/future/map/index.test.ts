import { assertEquals } from "@std/assert"

import of from "../of/index.ts"
import run from "../run/index.ts"
import map from "./index.ts"

Deno.test("map", async (t) => {
	await t.step("transforms task value", async () => {
		const task = of(10)
		const double = function doubleValue(n: number): number {
			return n * 2
		}

		const result = map(double)(task)
		const value = await run(result)

		assertEquals(value, 20)
	})

	await t.step("transforms to different type", async () => {
		const task = of(42)
		const toString = function convertToString(n: number): string {
			return `number: ${n}`
		}

		const result = map(toString)(task)
		const value = await run(result)

		assertEquals(value, "number: 42")
	})

	await t.step("supports currying", async () => {
		const addTen = function add(n: number): number {
			return n + 10
		}

		const mapAddTen = map(addTen)
		const task1 = of(5)
		const task2 = of(15)

		const value1 = await run(mapAddTen(task1))
		const value2 = await run(mapAddTen(task2))

		assertEquals(value1, 15)
		assertEquals(value2, 25)
	})

	await t.step("preserves lazy evaluation", async () => {
		let executed = false

		const task = function createTask() {
			return of(42)
		}

		const transform = function transformValue(n: number): number {
			executed = true
			return n * 2
		}

		const mapped = map(transform)(task())

		assertEquals(executed, false)

		await run(mapped)

		assertEquals(executed, true)
	})

	await t.step("chains multiple map operations", async () => {
		const task = of(2)
		const double = function doubleValue(n: number): number {
			return n * 2
		}
		const addFive = function add(n: number): number {
			return n + 5
		}

		const result = map(addFive)(map(double)(task))
		const value = await run(result)

		assertEquals(value, 9)
	})

	await t.step("handles identity transformation", async () => {
		const task = of(100)
		const identity = function id<A>(a: A): A {
			return a
		}

		const result = map(identity)(task)
		const value = await run(result)

		assertEquals(value, 100)
	})

	await t.step("transforms complex types", async () => {
		type User = {
			readonly name: string
			readonly age: number
		}

		const task = of<User>({ name: "Alice", age: 30 })
		const getName = function extractName(user: User): string {
			return user.name
		}

		const result = map(getName)(task)
		const value = await run(result)

		assertEquals(value, "Alice")
	})

	await t.step("maintains referential transparency", async () => {
		const task = of(50)
		const halve = function divide(n: number): number {
			return n / 2
		}

		const mapped = map(halve)(task)
		const value1 = await run(mapped)
		const value2 = await run(mapped)

		assertEquals(value1, value2)
		assertEquals(value1, 25)
	})

	await t.step("satisfies functor identity law", async () => {
		const task = of(42)
		const identity = function id<A>(a: A): A {
			return a
		}

		const mapped = map(identity)(task)
		const original = await run(task)
		const transformed = await run(mapped)

		assertEquals(transformed, original)
	})

	await t.step("satisfies functor composition law", async () => {
		const task = of(10)
		const f = function double(n: number): number {
			return n * 2
		}
		const g = function addOne(n: number): number {
			return n + 1
		}

		const composed = function compose(n: number): number {
			return g(f(n))
		}

		const mapComposed = await run(map(composed)(task))
		const mapSeparate = await run(map(g)(map(f)(task)))

		assertEquals(mapComposed, mapSeparate)
		assertEquals(mapComposed, 21)
	})
})
