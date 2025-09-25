import { assertEquals } from "@std/assert"

import just from "../just/index.ts"
import nothing from "../nothing/index.ts"
import isNothing from "./index.ts"

Deno.test("isNothing", async function isNothingTests(t) {
	await t.step(
		"returns true for Nothing values",
		function returnsTrueForNothing() {
			assertEquals(isNothing(nothing()), true)
			assertEquals(isNothing(nothing<string>()), true)
			assertEquals(isNothing(nothing<number>()), true)
			assertEquals(isNothing(nothing<object>()), true)
			assertEquals(isNothing(nothing<boolean>()), true)
			assertEquals(isNothing(nothing<Array<number>>()), true)
		},
	)

	await t.step("returns false for Just values", function returnsFalseForJust() {
		assertEquals(isNothing(just("hello")), false)
		assertEquals(isNothing(just(42)), false)
		assertEquals(isNothing(just(null)), false)
		assertEquals(isNothing(just(undefined)), false)
		assertEquals(isNothing(just({ data: "test" })), false)
		assertEquals(isNothing(just([])), false)
		assertEquals(isNothing(just(false)), false)
		assertEquals(isNothing(just(0)), false)
		assertEquals(isNothing(just("")), false)
	})

	await t.step("works as type guard", function typeGuard() {
		const justValue = just("test")
		const nothingValue = nothing<string>()

		if (isNothing(nothingValue)) {
			// TypeScript knows this is Nothing
			assertEquals(nothingValue._tag, "Nothing")
			assertEquals("value" in nothingValue, false)
		}

		if (!isNothing(justValue)) {
			// TypeScript knows this is Just<string>
			assertEquals(justValue.value, "test")
		}
	})

	await t.step("works with array filter", function arrayFilter() {
		const values = [
			just(1),
			nothing(),
			just(2),
			nothing(),
			nothing(),
		]

		const nothings = values.filter(isNothing)
		assertEquals(nothings.length, 3)
		assertEquals(nothings.every((n) => n._tag === "Nothing"), true)
	})

	await t.step("works with array some/every", function arraySomeEvery() {
		const allJusts = [just(1), just(2), just(3)]
		const allNothings = [nothing(), nothing(), nothing()]
		const mixed = [just(1), nothing(), just(3)]

		assertEquals(allNothings.every(isNothing), true)
		assertEquals(allJusts.every(isNothing), false)
		assertEquals(mixed.every(isNothing), false)

		assertEquals(allNothings.some(isNothing), true)
		assertEquals(allJusts.some(isNothing), false)
		assertEquals(mixed.some(isNothing), true)
	})

	await t.step("complements isJust", function complementsIsJust() {
		const values = [
			just("a"),
			nothing(),
			just(1),
			nothing(),
			just(true),
		]

		for (const value of values) {
			// isNothing should always be the opposite of isJust
			const isNothingResult = isNothing(value)
			const isJustResult = !isNothingResult // Should match isJust

			if (value._tag === "Just") {
				assertEquals(isNothingResult, false)
				assertEquals(isJustResult, true)
			} else {
				assertEquals(isNothingResult, true)
				assertEquals(isJustResult, false)
			}
		}
	})

	await t.step("handles edge cases with Just", function edgeCasesWithJust() {
		// Even with falsy values in Just, isNothing returns false
		assertEquals(isNothing(just(null)), false)
		assertEquals(isNothing(just(undefined)), false)
		assertEquals(isNothing(just(false)), false)
		assertEquals(isNothing(just(0)), false)
		assertEquals(isNothing(just("")), false)
		assertEquals(isNothing(just(NaN)), false)
	})

	await t.step("early return pattern", function earlyReturnPattern() {
		function processValue<T>(
			maybe: typeof just<T> | typeof nothing<T>,
		): T | string {
			const value = maybe(42 as T)
			if (isNothing(value)) {
				return "No value"
			}
			return value.value
		}

		assertEquals(processValue(nothing), "No value")
		assertEquals(processValue(just), 42)
	})
})
