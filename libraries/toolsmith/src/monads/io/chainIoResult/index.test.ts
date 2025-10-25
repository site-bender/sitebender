import { assertEquals } from "@std/assert"

import error from "../../result/error/index.ts"
import ok from "../../result/ok/index.ts"
import ioResult from "../ioResult/index.ts"
import chainIoResult from "./index.ts"

Deno.test("chainIoResult", async (t) => {
	await t.step("flat maps a function that returns an IoResult", () => {
		const valueIo = ioResult(() => ok(21))
		const doubleIo = (x: number) => ioResult(() => ok(x * 2))
		const result = chainIoResult(doubleIo)(valueIo)
		const value = result()
		assertEquals(value._tag, "Ok")
		if (value._tag === "Ok") {
			assertEquals(value.value, 42)
		}
	})

	await t.step("short-circuits on Error", () => {
		const errorIo = ioResult<string, number>(() => error("initial error"))
		const doubleIo = (x: number) => ioResult<string, number>(() => ok(x * 2))
		const result = chainIoResult(doubleIo)(errorIo)
		const value = result()
		assertEquals(value._tag, "Error")
		if (value._tag === "Error") {
			assertEquals(value.error, "initial error")
		}
	})

	await t.step("propagates errors from chained function", () => {
		const valueIo = ioResult<string, number>(() => ok(10))
		const failingIo = (_x: number) =>
			ioResult<string, number>(() => error("chain error"))
		const result = chainIoResult(failingIo)(valueIo)
		const value = result()
		assertEquals(value._tag, "Error")
		if (value._tag === "Error") {
			assertEquals(value.error, "chain error")
		}
	})

	await t.step("enables sequential computations with error handling", () => {
		let order = ""
		const firstIo = ioResult(() => {
			order += "first"
			return ok(10)
		})
		const secondIo = (x: number) =>
			ioResult(() => {
				order += "second"
				return ok(x * 2)
			})

		const result = chainIoResult(secondIo)(firstIo)
		assertEquals(order, "")
		const value = result()
		assertEquals(order, "firstsecond")
		assertEquals(value._tag, "Ok")
		if (value._tag === "Ok") {
			assertEquals(value.value, 20)
		}
	})

	await t.step("can branch based on values", () => {
		const valueIo = ioResult(() => ok(0.7))
		const branchIo = (x: number) =>
			x > 0.5 ? ioResult(() => ok("High")) : ioResult(() => ok("Low"))

		const result = chainIoResult(branchIo)(valueIo)
		const value = result()
		assertEquals(value._tag, "Ok")
		if (value._tag === "Ok") {
			assertEquals(value.value, "High")
		}
	})

	await t.step("chains multiple operations", () => {
		const startIo = ioResult(() => ok(5))
		const addIo = (x: number) => ioResult(() => ok(x + 3))
		const multiplyIo = (x: number) => ioResult(() => ok(x * 2))

		const result = chainIoResult(multiplyIo)(chainIoResult(addIo)(startIo))
		const value = result()
		assertEquals(value._tag, "Ok")
		if (value._tag === "Ok") {
			assertEquals(value.value, 16)
		}
	})

	await t.step("satisfies left identity monad law", () => {
		const value = 42
		const f = (x: number) => ioResult(() => ok(x * 2))

		const leftResult = chainIoResult(f)(ioResult(() => ok(value)))()
		const rightResult = f(value)()

		assertEquals(leftResult._tag, rightResult._tag)
		if (leftResult._tag === "Ok" && rightResult._tag === "Ok") {
			assertEquals(leftResult.value, rightResult.value)
		}
	})

	await t.step("satisfies right identity monad law", () => {
		const m = ioResult(() => ok(42))
		const resultValue = chainIoResult((x: number) => ioResult(() => ok(x)))(m)()
		const mValue = m()
		assertEquals(resultValue._tag, mValue._tag)
		if (resultValue._tag === "Ok" && mValue._tag === "Ok") {
			assertEquals(resultValue.value, mValue.value)
		}
	})

	await t.step("satisfies associativity monad law", () => {
		const m = ioResult(() => ok(10))
		const f = (x: number) => ioResult(() => ok(x * 2))
		const g = (x: number) => ioResult(() => ok(x + 5))

		const leftResult = chainIoResult(g)(chainIoResult(f)(m))()
		const rightResult = chainIoResult((x: number) => chainIoResult(g)(f(x)))(m)()

		assertEquals(leftResult._tag, rightResult._tag)
		if (leftResult._tag === "Ok" && rightResult._tag === "Ok") {
			assertEquals(leftResult.value, rightResult.value)
		}
	})

	await t.step("works with complex error types", () => {
		type ValidationError = {
			readonly _tag: "ValidationError"
			readonly field: string
			readonly message: string
		}

		const valueIo = ioResult<ValidationError, number>(() => ok(10))
		const validateIo = (x: number) =>
			x > 0
				? ioResult<ValidationError, number>(() => ok(x * 2))
				: ioResult<ValidationError, number>(() =>
					error({
						_tag: "ValidationError",
						field: "value",
						message: "Must be positive",
					}),
				)

		const result = chainIoResult(validateIo)(valueIo)
		const value = result()
		assertEquals(value._tag, "Ok")
		if (value._tag === "Ok") {
			assertEquals(value.value, 20)
		}
	})

	await t.step("can perform dependent computations", () => {
		const getUserIdIo = ioResult(() => ok("user123"))
		const fetchUserIo = (id: string) =>
			ioResult(() => ok({ id, name: "Alice" }))

		const result = chainIoResult(fetchUserIo)(getUserIdIo)
		const value = result()
		assertEquals(value._tag, "Ok")
		if (value._tag === "Ok") {
			assertEquals(value.value, { id: "user123", name: "Alice" })
		}
	})
})
