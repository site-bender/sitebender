import { assertEquals } from "@std/assert"

import just from "../just/index.ts"
import nothing from "../nothing/index.ts"
import isJust from "./index.ts"

Deno.test("isJust", async function isJustTests(t) {
	await t.step("returns true for Just values", function returnsTrueForJust() {
		assertEquals(isJust(just("hello")), true)
		assertEquals(isJust(just(42)), true)
		assertEquals(isJust(just(null)), true)
		assertEquals(isJust(just(undefined)), true)
		assertEquals(isJust(just({ data: "test" })), true)
		assertEquals(isJust(just([])), true)
		assertEquals(isJust(just(false)), true)
		assertEquals(isJust(just(0)), true)
		assertEquals(isJust(just("")), true)
	})

	await t.step("returns false for Nothing values", function returnsFalseForNothing() {
		assertEquals(isJust(nothing()), false)
		assertEquals(isJust(nothing<string>()), false)
		assertEquals(isJust(nothing<number>()), false)
		assertEquals(isJust(nothing<object>()), false)
	})

	await t.step("works as type guard", function typeGuard() {
		const justValue = just("test")
		const nothingValue = nothing<string>()

		if (isJust(justValue)) {
			// TypeScript knows this is Just<string>
			assertEquals(justValue.value, "test")
		}

		if (!isJust(nothingValue)) {
			// TypeScript knows this is Nothing
			assertEquals(nothingValue._tag, "Nothing")
		}
	})

	await t.step("works with array filter", function arrayFilter() {
		const values = [
			just(1),
			nothing(),
			just(2),
			nothing(),
			just(3)
		]

		const justs = values.filter(isJust)
		assertEquals(justs.length, 3)
		assertEquals(justs[0].value, 1)
		assertEquals(justs[1].value, 2)
		assertEquals(justs[2].value, 3)
	})

	await t.step("works with array some/every", function arraySomeEvery() {
		const allJusts = [just(1), just(2), just(3)]
		const allNothings = [nothing(), nothing(), nothing()]
		const mixed = [just(1), nothing(), just(3)]

		assertEquals(allJusts.every(isJust), true)
		assertEquals(allNothings.every(isJust), false)
		assertEquals(mixed.every(isJust), false)

		assertEquals(allJusts.some(isJust), true)
		assertEquals(allNothings.some(isJust), false)
		assertEquals(mixed.some(isJust), true)
	})

	await t.step("handles edge cases", function edgeCases() {
		// Just with falsy values
		assertEquals(isJust(just(null)), true)
		assertEquals(isJust(just(undefined)), true)
		assertEquals(isJust(just(false)), true)
		assertEquals(isJust(just(0)), true)
		assertEquals(isJust(just("")), true)
		assertEquals(isJust(just(NaN)), true)

		// Nothing is always false
		assertEquals(isJust(nothing()), false)
	})

	await t.step("works with complex types", function complexTypes() {
		interface User {
			id: number
			name: string
			optional?: string
		}

		const justUser = just<User>({ id: 1, name: "Alice" })
		const nothingUser = nothing<User>()

		assertEquals(isJust(justUser), true)
		assertEquals(isJust(nothingUser), false)

		if (isJust(justUser)) {
			assertEquals(justUser.value.id, 1)
			assertEquals(justUser.value.name, "Alice")
		}
	})
})
