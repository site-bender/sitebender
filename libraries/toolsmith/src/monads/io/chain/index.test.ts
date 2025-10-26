import { assertEquals } from "@std/assert"

import io from "../io/index.ts"
import of from "../of/index.ts"
import runIo from "../runIo/index.ts"
import chain from "./index.ts"

Deno.test("chain", async (t) => {
	await t.step("flat maps a function that returns an IO", () => {
		const valueIO = of(21)
		const doubleIO = (x: number) => of(x * 2)
		const result = chain(doubleIO)(valueIO)
		assertEquals(runIo(result), 42)
	})

	await t.step("flattens nested IO structures", () => {
		const nestedIO = of(10)
		const makeNestedIO = (x: number) => of(x + 5)
		const result = chain(makeNestedIO)(nestedIO)

		assertEquals(typeof result, "function")
		assertEquals(runIo(result), 15)
	})

	await t.step("enables sequential computations", () => {
		let order = ""
		const firstIO = () => {
			order += "first"
			return 10
		}
		const secondIO = (x: number) => () => {
			order += "second"
			return x * 2
		}

		const result = chain(secondIO)(firstIO)
		assertEquals(order, "")
		assertEquals(runIo(result), 20)
		assertEquals(order, "firstsecond")
	})

	await t.step("can branch based on values", () => {
		const valueIO = io(0.7)
		const branchIO = (x: number) => x > 0.5 ? io("High") : io("Low")

		const result = chain(branchIO)(valueIO)
		const value = runIo(result)
		assertEquals(value, "High")
	})

	await t.step("chains multiple operations", () => {
		const startIO = of(5)
		const addIO = (x: number) => of(x + 3)
		const multiplyIO = (x: number) => of(x * 2)

		const result = chain(multiplyIO)(chain(addIO)(startIO))
		assertEquals(runIo(result), 16)
	})

	await t.step("satisfies left identity monad law", () => {
		const value = 42
		const f = (x: number) => of(x * 2)

		const left = chain(f)(of(value))
		const right = f(value)

		assertEquals(runIo(left), runIo(right))
	})

	await t.step("satisfies right identity monad law", () => {
		const m = of(42)
		const result = chain(of)(m)
		assertEquals(runIo(result), runIo(m))
	})

	await t.step("satisfies associativity monad law", () => {
		const m = of(10)
		const f = (x: number) => of(x * 2)
		const g = (x: number) => of(x + 5)

		const left = chain(g)(chain(f)(m))
		const right = chain((x: number) => chain(g)(f(x)))(m)

		assertEquals(runIo(left), runIo(right))
	})

	await t.step("works with effectful computations", () => {
		let counter = 0
		const countIO = () => ++counter
		const doubleCountIO = (x: number) => io(x * 2)

		const result = chain(doubleCountIO)(countIO)
		assertEquals(runIo(result), 2)
		assertEquals(runIo(result), 4)
		assertEquals(counter, 2)
	})

	await t.step("can perform dependent computations", () => {
		const getUserIdIO = of("user123")
		const fetchUserIO = (id: string) => of({ id, name: "Alice" })

		const result = chain(fetchUserIO)(getUserIdIO)
		assertEquals(runIo(result), { id: "user123", name: "Alice" })
	})
})
