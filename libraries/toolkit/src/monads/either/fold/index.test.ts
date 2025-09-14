import { assertEquals } from "@std/assert"

import left from "../left/index.ts"
import right from "../right/index.ts"
import fold from "./index.ts"

Deno.test("fold", async function foldTests(t) {
	await t.step("eliminates Right branch", function eliminatesRight() {
		const either = right(42)
		const result = fold<string, number, string>(
			(err) => `Error: ${err}`
		)(
			(val) => `Success: ${val}`
		)(either)

		assertEquals(result, "Success: 42")
	})

	await t.step("eliminates Left branch", function eliminatesLeft() {
		const either = left("not found")
		const result = fold<string, number, string>(
			(err) => `Error: ${err}`
		)(
			(val) => `Success: ${val}`
		)(either)

		assertEquals(result, "Error: not found")
	})

	await t.step("converts to boolean", function convertsToBoolean() {
		const checkSuccess = fold<string, number, boolean>(
			() => false
		)(
			() => true
		)

		assertEquals(checkSuccess(right(100)), true)
		assertEquals(checkSuccess(left("error")), false)
	})

	await t.step("converts to number", function convertsToNumber() {
		const toCode = fold<string, number, number>(
			() => 400
		)(
			() => 200
		)

		assertEquals(toCode(right(42)), 200)
		assertEquals(toCode(left("bad request")), 400)
	})

	await t.step("handles complex transformations", function complexTransformations() {
		interface User {
			id: number
			name: string
		}

		interface HttpResponse {
			status: number
			body: unknown
		}

		const toHttpResponse = fold<string, User, HttpResponse>(
			(error) => ({ status: 404, body: { error } })
		)(
			(user) => ({ status: 200, body: user })
		)

		const successCase = right<User, string>({ id: 1, name: "Alice" })
		const errorCase = left<string, User>("User not found")

		assertEquals(toHttpResponse(successCase), {
			status: 200,
			body: { id: 1, name: "Alice" }
		})

		assertEquals(toHttpResponse(errorCase), {
			status: 404,
			body: { error: "User not found" }
		})
	})

	await t.step("preserves closure values", function preservesClosure() {
		const multiplier = 10
		const adder = 5

		const calculate = fold<string, number, number>(
			() => 0
		)(
			(val) => val * multiplier + adder
		)

		assertEquals(calculate(right(4)), 45) // 4 * 10 + 5
		assertEquals(calculate(left("error")), 0)
	})

	await t.step("works with partial application", function partialApplication() {
		const onLeft = (err: string) => err.toUpperCase()
		const onRight = (val: number) => val.toString()

		const foldWithLeft = fold<string, number, string>(onLeft)
		const foldComplete = foldWithLeft(onRight)

		assertEquals(foldComplete(left("error")), "ERROR")
		assertEquals(foldComplete(right(42)), "42")
	})

	await t.step("handles null and undefined", function handlesNullUndefined() {
		const handleNull = fold<null, undefined, string>(
			() => "was null"
		)(
			() => "was undefined"
		)

		assertEquals(handleNull(left(null)), "was null")
		assertEquals(handleNull(right(undefined)), "was undefined")
	})

	await t.step("can transform to different types", function transformTypes() {
		const toMessage = fold<string, number, string>(
			(err) => `Error occurred: ${err}`
		)(
			(val) => `Value is: ${val}`
		)

		assertEquals(toMessage(left("not found")), "Error occurred: not found")
		assertEquals(toMessage(right(42)), "Value is: 42")
	})
})
