import { assertEquals } from "jsr:@std/assert"
import _processItems from "./index.ts"

Deno.test("_processItems doubles all values", function () {
	const items = [1, 2, 3]

	const result = _processItems(items)

	assertEquals(result, [2, 4, 6])
})
