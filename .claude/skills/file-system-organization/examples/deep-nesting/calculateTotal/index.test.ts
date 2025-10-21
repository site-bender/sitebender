import { assertEquals } from "jsr:@std/assert"
import calculateTotal from "./index.ts"

Deno.test("calculateTotal sums processed items", function () {
	const items = [1, 2, 3, 4, 5]

	const result = calculateTotal(items)

	assertEquals(result, 30)
})
