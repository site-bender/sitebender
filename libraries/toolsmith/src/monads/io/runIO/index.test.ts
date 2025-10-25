import { assertEquals, assertThrows } from "https://deno.land/std/assert/mod.ts"

import io from "../io/index.ts"
import of from "../of/index.ts"
import runIO from "./index.ts"

Deno.test("runIO", async (t) => {
	await t.step("executes an IO computation", () => {
		const computation = () => 42
		const result = runIO(computation)
		assertEquals(result, 42)
	})

	await t.step("executes side effects", () => {
		let sideEffect = ""
		const effectfulIO = () => {
			sideEffect = "executed"
			return "done"
		}

		assertEquals(sideEffect, "")
		const result = runIO(effectfulIO)
		assertEquals(sideEffect, "executed")
		assertEquals(result, "done")
	})

	await t.step("executes fresh computation each time", () => {
		let counter = 0
		const countingIO = () => ++counter

		assertEquals(runIO(countingIO), 1)
		assertEquals(runIO(countingIO), 2)
		assertEquals(runIO(countingIO), 3)
		assertEquals(counter, 3)
	})

	await t.step("works with of-created IOs", () => {
		const pureIO = of(42)
		assertEquals(runIO(pureIO), 42)
	})

	await t.step("can handle thrown errors", () => {
		const errorIO = () => {
			throw new Error("Something went wrong")
		}

		assertThrows(
			() => runIO(errorIO),
			Error,
			"Something went wrong",
		)
	})

	await t.step("executes complex computations", () => {
		const complexIO = () => {
			const a = 10
			const b = 20
			const c = a + b
			return c * 2
		}

		assertEquals(runIO(complexIO), 60)
	})

	await t.step("can return undefined", () => {
		const voidIO = () => {
			const _x = 1 + 1
		}
		assertEquals(runIO(voidIO), undefined)
	})

	await t.step("can return functions", () => {
		const higherOrderIO = () => (x: number) => x * 2
		const doubler = runIO(higherOrderIO)
		assertEquals(typeof doubler, "function")
		assertEquals(doubler(21), 42)
	})

	await t.step("executes nested IO manually", () => {
		const nestedIO = () => io(42)
		const innerIO = runIO(nestedIO)
		assertEquals(typeof innerIO, "function")
		assertEquals(runIO(innerIO), 42)
	})
})
