import { assertEquals } from "jsr:@std/assert"
import _doubleValue from "./index.ts"

Deno.test("_doubleValue doubles a number", function () {
	const result = _doubleValue(5)

	assertEquals(result, 10)
})
