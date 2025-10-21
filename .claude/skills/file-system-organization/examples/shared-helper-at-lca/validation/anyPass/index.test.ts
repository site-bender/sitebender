import { assertEquals } from "jsr:@std/assert"
import anyPass from "./index.ts"

Deno.test("anyPass returns true when any predicate passes", function () {
	const isNegative = function (n: number): boolean {
		return n < 0
	}
	const isEven = function (n: number): boolean {
		return n % 2 === 0
	}
	const checkFour = anyPass([isNegative, isEven])

	const result = checkFour(4)

	assertEquals(result, true)
})
