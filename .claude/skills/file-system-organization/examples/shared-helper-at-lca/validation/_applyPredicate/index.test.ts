import { assertEquals } from "jsr:@std/assert"
import _applyPredicate from "./index.ts"

Deno.test("_applyPredicate applies predicate to value", function () {
	const isEven = function (n: number): boolean {
		return n % 2 === 0
	}
	const applyToFour = _applyPredicate(4)

	const result = applyToFour(isEven)

	assertEquals(result, true)
})
