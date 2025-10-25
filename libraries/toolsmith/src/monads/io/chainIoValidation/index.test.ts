import { assertEquals } from "@std/assert"

import failure from "../../validation/failure/index.ts"
import success from "../../validation/success/index.ts"
import ioValidation from "../ioValidation/index.ts"
import chainIoValidation from "./index.ts"

Deno.test("chainIoValidation", async (t) => {
	await t.step("flat maps a function that returns an IoValidation", () => {
		const valueIo = ioValidation(() => success(21))
		const doubleIo = (x: number) => ioValidation(() => success(x * 2))
		const result = chainIoValidation(doubleIo)(valueIo)
		const value = result()
		assertEquals(value._tag, "Success")
		if (value._tag === "Success") {
			assertEquals(value.value, 42)
		}
	})

	await t.step("short-circuits on Failure", () => {
		const failureIo = ioValidation<string, number>(() => failure(["initial error"]))
		const doubleIo = (x: number) => ioValidation<string, number>(() => success(x * 2))
		const result = chainIoValidation(doubleIo)(failureIo)
		const value = result()
		assertEquals(value._tag, "Failure")
		if (value._tag === "Failure") {
			assertEquals(value.errors, ["initial error"])
		}
	})

	await t.step("propagates errors from chained function", () => {
		const valueIo = ioValidation(() => success(10))
		const failingIo = (_x: number) => ioValidation(() => failure(["chain error"]))
		const result = chainIoValidation(failingIo)(valueIo)
		const value = result()
		assertEquals(value._tag, "Failure")
		if (value._tag === "Failure") {
			assertEquals(value.errors, ["chain error"])
		}
	})

	await t.step("enables sequential computations with error accumulation", () => {
		let order = ""
		const firstIo = ioValidation(() => {
			order += "first"
			return success(10)
		})
		const secondIo = (x: number) =>
			ioValidation(() => {
				order += "second"
				return success(x * 2)
			})

		const result = chainIoValidation(secondIo)(firstIo)
		assertEquals(order, "")
		const value = result()
		assertEquals(order, "firstsecond")
		assertEquals(value._tag, "Success")
		if (value._tag === "Success") {
			assertEquals(value.value, 20)
		}
	})

	await t.step("can branch based on values", () => {
		const valueIo = ioValidation(() => success(0.7))
		const branchIo = (x: number) =>
			x > 0.5
				? ioValidation(() => success("High"))
				: ioValidation(() => success("Low"))

		const result = chainIoValidation(branchIo)(valueIo)
		const value = result()
		assertEquals(value._tag, "Success")
		if (value._tag === "Success") {
			assertEquals(value.value, "High")
		}
	})

	await t.step("chains multiple operations", () => {
		const startIo = ioValidation(() => success(5))
		const addIo = (x: number) => ioValidation(() => success(x + 3))
		const multiplyIo = (x: number) => ioValidation(() => success(x * 2))

		const result = chainIoValidation(multiplyIo)(chainIoValidation(addIo)(startIo))
		const value = result()
		assertEquals(value._tag, "Success")
		if (value._tag === "Success") {
			assertEquals(value.value, 16)
		}
	})

	await t.step("satisfies left identity monad law", () => {
		const value = 42
		const f = (x: number) => ioValidation(() => success(x * 2))

		const leftResult = chainIoValidation(f)(ioValidation(() => success(value)))()
		const rightResult = f(value)()

		assertEquals(leftResult._tag, rightResult._tag)
		if (leftResult._tag === "Success" && rightResult._tag === "Success") {
			assertEquals(leftResult.value, rightResult.value)
		}
	})

	await t.step("satisfies right identity monad law", () => {
		const m = ioValidation(() => success(42))
		const resultValue = chainIoValidation((x: number) =>
			ioValidation(() => success(x)),
		)(m)()
		const mValue = m()
		assertEquals(resultValue._tag, mValue._tag)
		if (resultValue._tag === "Success" && mValue._tag === "Success") {
			assertEquals(resultValue.value, mValue.value)
		}
	})

	await t.step("satisfies associativity monad law", () => {
		const m = ioValidation(() => success(10))
		const f = (x: number) => ioValidation(() => success(x * 2))
		const g = (x: number) => ioValidation(() => success(x + 5))

		const leftResult = chainIoValidation(g)(chainIoValidation(f)(m))()
		const rightResult = chainIoValidation((x: number) =>
			chainIoValidation(g)(f(x)),
		)(m)()

		assertEquals(leftResult._tag, rightResult._tag)
		if (leftResult._tag === "Success" && rightResult._tag === "Success") {
			assertEquals(leftResult.value, rightResult.value)
		}
	})

	await t.step("works with complex error types", () => {
		type ValidationError = {
			readonly _tag: "ValidationError"
			readonly field: string
			readonly message: string
		}

		const valueIo = ioValidation<ValidationError, number>(() => success(10))
		const validateIo = (x: number) =>
			x > 0
				? ioValidation<ValidationError, number>(() => success(x * 2))
				: ioValidation<ValidationError, number>(() =>
					failure([
						{
							_tag: "ValidationError",
							field: "value",
							message: "Must be positive",
						},
					]),
				)

		const result = chainIoValidation(validateIo)(valueIo)
		const value = result()
		assertEquals(value._tag, "Success")
		if (value._tag === "Success") {
			assertEquals(value.value, 20)
		}
	})

	await t.step("accumulates multiple validation errors", () => {
		type ValidationError = {
			readonly _tag: "ValidationError"
			readonly field: string
			readonly message: string
		}

		const failureIo = ioValidation<ValidationError, number>(() =>
			failure([
				{ _tag: "ValidationError", field: "email", message: "Invalid email" },
				{ _tag: "ValidationError", field: "age", message: "Must be positive" },
			]),
		)
		const validateIo = (_x: number) =>
			ioValidation<ValidationError, number>(() => success(42))

		const result = chainIoValidation(validateIo)(failureIo)
		const value = result()
		assertEquals(value._tag, "Failure")
		if (value._tag === "Failure") {
			assertEquals(value.errors.length, 2)
			assertEquals(value.errors[0].field, "email")
			assertEquals(value.errors[1].field, "age")
		}
	})

	await t.step("can perform dependent computations", () => {
		const getUserIdIo = ioValidation(() => success("user123"))
		const fetchUserIo = (id: string) =>
			ioValidation(() => success({ id, name: "Alice" }))

		const result = chainIoValidation(fetchUserIo)(getUserIdIo)
		const value = result()
		assertEquals(value._tag, "Success")
		if (value._tag === "Success") {
			assertEquals(value.value, { id: "user123", name: "Alice" })
		}
	})
})
