import { assertEquals } from "@std/assert"

import of from "../of/index.ts"
import runIo from "../runIo/index.ts"
import ap from "./index.ts"

Deno.test("ap", async (t) => {
	await t.step("applies an IO function to an IO value", () => {
		const functionIO = of((x: number) => x * 2)
		const valueIO = of(21)
		const result = ap(functionIO)(valueIO)
		assertEquals(runIo(result), 42)
	})

	await t.step("works with effectful function", () => {
		let functionExecuted = false
		const functionIO = () => {
			functionExecuted = true
			return (x: number) => x * 2
		}
		const valueIO = of(10)

		const result = ap(functionIO)(valueIO)
		assertEquals(functionExecuted, false)

		assertEquals(runIo(result), 20)
		assertEquals(functionExecuted, true)
	})

	await t.step("works with effectful value", () => {
		let valueExecuted = false
		const functionIO = of((x: number) => x + 10)
		const valueIO = () => {
			valueExecuted = true
			return 32
		}

		const result = ap(functionIO)(valueIO)
		assertEquals(valueExecuted, false)

		assertEquals(runIo(result), 42)
		assertEquals(valueExecuted, true)
	})

	await t.step("works with curried functions", () => {
		const addIO = of((x: number) => (y: number) => x + y)
		const xIO = of(10)
		const yIO = of(20)

		const partiallyApplied = ap(addIO)(xIO)
		const result = ap(partiallyApplied)(yIO)

		assertEquals(runIo(result), 30)
	})

	await t.step("executes effects in correct order", () => {
		let order = ""
		const functionIO = () => {
			order += "function"
			return (x: string) => x.toUpperCase()
		}
		const valueIO = () => {
			order += "value"
			return "hello"
		}

		const result = ap(functionIO)(valueIO)
		assertEquals(order, "")

		assertEquals(runIo(result), "HELLO")
		assertEquals(order, "functionvalue")
	})

	await t.step("can be chained", () => {
		const multiplyIO = of((x: number) => x * 2)
		const addIO = of((x: number) => x + 10)
		const value1IO = of(5)

		const doubled = ap(multiplyIO)(value1IO)
		const added = ap(addIO)(doubled)

		assertEquals(runIo(doubled), 10)
		assertEquals(runIo(added), 20)
	})

	await t.step("works with multiple parameters", () => {
		const add3 = of((x: number) => (y: number) => (z: number) => x + y + z)
		const xIO = of(10)
		const yIO = of(20)
		const zIO = of(30)

		const step1 = ap(add3)(xIO)
		const step2 = ap(step1)(yIO)
		const result = ap(step2)(zIO)

		assertEquals(runIo(result), 60)
	})

	await t.step("maintains referential transparency", () => {
		const functionIO = of((x: number) => x * 2)
		const valueIO = of(21)
		const resultIO = ap(functionIO)(valueIO)

		assertEquals(runIo(resultIO), 42)
		assertEquals(runIo(resultIO), 42)
	})
})
