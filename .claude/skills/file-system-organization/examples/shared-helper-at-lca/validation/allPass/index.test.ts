import { assertEquals } from "jsr:@std/assert"
import allPass from "./index.ts"

Deno.test("allPass returns true when all predicates pass", function () {
	const isPositive = function (n: number): boolean {
		return n > 0
	}
	const isEven = function (n: number): boolean {
		return n % 2 === 0
	}
	const checkFour = allPass([isPositive, isEven])

	const result = checkFour(4)

	assertEquals(result, true)
})
