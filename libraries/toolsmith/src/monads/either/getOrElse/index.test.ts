import { assertEquals } from "@std/assert"

import left from "../left/index.ts"
import right from "../right/index.ts"
import getOrElse from "./index.ts"

Deno.test("getOrElse", async function getOrElseTests(t) {
	await t.step("returns Right value when Right", function returnsRightValue() {
		const either = right(42)
		const result = getOrElse(0)(either)

		assertEquals(result, 42)
	})

	await t.step(
		"returns default value when Left",
		function returnsDefaultWhenLeft() {
			const either = left("error")
			const result = getOrElse(99)(either)

			assertEquals(result, 99)
		},
	)

	await t.step("works with function default", function functionDefault() {
		const withLength = getOrElse<number>((err: string) => err.length)

		assertEquals(withLength(right(100)), 100)
		assertEquals(withLength(left("error")), 5)
		assertEquals(withLength(left("longer error")), 12)
	})

	await t.step("preserves types", function preservesTypes() {
		interface User {
			id: number
			name: string
		}

		const defaultUser: User = { id: 0, name: "Guest" }
		const getUser = getOrElse(defaultUser)

		const actualUser = right<User, string>({ id: 1, name: "Alice" })
		const missingUser = left<string, User>("Not found")

		assertEquals(getUser(actualUser), { id: 1, name: "Alice" })
		assertEquals(getUser(missingUser), { id: 0, name: "Guest" })
	})

	await t.step(
		"handles null and undefined values",
		function handlesNullUndefined() {
			const getWithDefault = getOrElse("default")

			assertEquals(getWithDefault(right(null)), null)
			assertEquals(getWithDefault(right(undefined)), undefined)
			assertEquals(getWithDefault(left("error")), "default")
		},
	)

	await t.step("works with partial application", function partialApplication() {
		const getWithZero = getOrElse(0)

		const values = [
			right(10),
			left("error"),
			right(-5),
			left("another error"),
		]

		const results = values.map(getWithZero)
		assertEquals(results, [10, 0, -5, 0])
	})

	await t.step(
		"lazy evaluation of function default",
		function lazyEvaluation() {
			let callCount = 0
			const expensiveDefault = () => {
				callCount++
				return 999
			}

			const getWithLazy = getOrElse(expensiveDefault)

			// Should not call the function for Right values
			assertEquals(getWithLazy(right(42)), 42)
			assertEquals(callCount, 0)

			// Should call the function for Left values
			assertEquals(getWithLazy(left("error")), 999)
			assertEquals(callCount, 1)
		},
	)

	await t.step(
		"function default receives Left value",
		function functionReceivesLeft() {
			interface ErrorInfo {
				code: number
				message: string
			}

			const handleError = getOrElse<string>((err: ErrorInfo) =>
				`Error ${err.code}: ${err.message}`
			)

			const success = right<string, ErrorInfo>("Success!")
			const failure = left<ErrorInfo, string>({
				code: 404,
				message: "Not Found",
			})

			assertEquals(handleError(success), "Success!")
			assertEquals(handleError(failure), "Error 404: Not Found")
		},
	)

	await t.step("works with arrays", function worksWithArrays() {
		const getNumbers = getOrElse<Array<number>>([])

		assertEquals(getNumbers(right([1, 2, 3])), [1, 2, 3])
		assertEquals(getNumbers(left("error")), [])
	})

	await t.step("constant vs function default", function constantVsFunction() {
		const constantDefault = getOrElse(100)
		const functionDefault = getOrElse(() => 100)

		const leftValue = left("error")
		const rightValue = right(42)

		// Both should behave the same for the values
		assertEquals(constantDefault(leftValue), 100)
		assertEquals(functionDefault(leftValue), 100)
		assertEquals(constantDefault(rightValue), 42)
		assertEquals(functionDefault(rightValue), 42)
	})
})
