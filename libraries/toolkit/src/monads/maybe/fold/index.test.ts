import { assertEquals } from "@std/assert"

import just from "../just/index.ts"
import nothing from "../nothing/index.ts"
import fold from "./index.ts"

Deno.test("fold", async function foldTests(t) {
	await t.step("eliminates Just branch", function eliminatesJust() {
		const maybe = just(42)
		const result = fold<number, string>(
			() => "Nothing value"
		)(
			(val) => `Just value: ${val}`
		)(maybe)

		assertEquals(result, "Just value: 42")
	})

	await t.step("eliminates Nothing branch", function eliminatesNothing() {
		const maybe = nothing<number>()
		const result = fold<number, string>(
			() => "Nothing value"
		)(
			(val) => `Just value: ${val}`
		)(maybe)

		assertEquals(result, "Nothing value")
	})

	await t.step("converts to boolean", function convertsToBoolean() {
		const hasValue = fold<number, boolean>(
			() => false
		)(
			() => true
		)

		assertEquals(hasValue(just(100)), true)
		assertEquals(hasValue(nothing()), false)
	})

	await t.step("converts to number", function convertsToNumber() {
		const getOrZero = fold<number, number>(
			() => 0
		)(
			(val) => val
		)

		assertEquals(getOrZero(just(42)), 42)
		assertEquals(getOrZero(nothing()), 0)
	})

	await t.step("handles complex transformations", function complexTransformations() {
		interface User {
			id: number
			name: string
		}

		const userToString = fold<User, string>(
			() => "Guest User"
		)(
			(user) => `${user.name} (ID: ${user.id})`
		)

		const justUser = just({ id: 1, name: "Alice" })
		const nothingUser = nothing<User>()

		assertEquals(userToString(justUser), "Alice (ID: 1)")
		assertEquals(userToString(nothingUser), "Guest User")
	})

	await t.step("onNothing is lazy", function onNothingIsLazy() {
		let callCount = 0
		const onNothing = () => {
			callCount++
			return "default"
		}

		const foldWithCount = fold<number, string>(onNothing)((val) => val.toString())

		// Should not call onNothing for Just values
		assertEquals(foldWithCount(just(42)), "42")
		assertEquals(callCount, 0)

		// Should call onNothing for Nothing values
		assertEquals(foldWithCount(nothing()), "default")
		assertEquals(callCount, 1)
	})

	await t.step("works with partial application", function partialApplication() {
		const onNothing = () => "empty"
		const onJust = (val: string) => val.toUpperCase()

		const foldWithNothing = fold<string, string>(onNothing)
		const foldComplete = foldWithNothing(onJust)

		assertEquals(foldComplete(nothing()), "empty")
		assertEquals(foldComplete(just("hello")), "HELLO")
	})

	await t.step("handles null and undefined in Just", function handlesNullUndefined() {
		const handleNull = fold<null | undefined, string>(
			() => "was nothing"
		)(
			(val) => val === null ? "was null" : "was undefined"
		)

		assertEquals(handleNull(nothing()), "was nothing")
		assertEquals(handleNull(just(null)), "was null")
		assertEquals(handleNull(just(undefined)), "was undefined")
	})

	await t.step("can return Maybe values", function returnsMaybe() {
		const doubleOrNothing = fold<number, typeof just<number> | typeof nothing<number>>(
			() => nothing<number>()
		)(
			(val) => just(val * 2)
		)

		const result1 = doubleOrNothing(just(21))
		assertEquals(result1._tag, "Just")
		if (result1._tag === "Just") {
			assertEquals(result1.value, 42)
		}

		const result2 = doubleOrNothing(nothing())
		assertEquals(result2._tag, "Nothing")
	})

	await t.step("preserves closure values", function preservesClosure() {
		const multiplier = 10
		const defaultValue = 5

		const calculate = fold<number, number>(
			() => defaultValue
		)(
			(val) => val * multiplier
		)

		assertEquals(calculate(just(4)), 40) // 4 * 10
		assertEquals(calculate(nothing()), 5)
	})

	await t.step("works with arrays", function worksWithArrays() {
		const getLength = fold<Array<number>, number>(
			() => -1
		)(
			(arr) => arr.length
		)

		assertEquals(getLength(just([1, 2, 3])), 3)
		assertEquals(getLength(just([])), 0)
		assertEquals(getLength(nothing()), -1)
	})

	await t.step("pattern matching style", function patternMatching() {
		type Result = { type: "empty" } | { type: "value"; data: number }

		const toResult = fold<number, Result>(
			() => ({ type: "empty" as const })
		)(
			(val) => ({ type: "value" as const, data: val })
		)

		const result1 = toResult(just(42))
		assertEquals(result1.type, "value")
		if (result1.type === "value") {
			assertEquals(result1.data, 42)
		}

		const result2 = toResult(nothing())
		assertEquals(result2.type, "empty")
	})
})
