import { assertEquals } from "jsr:@std/assert"
import processUser from "./index.ts"

Deno.test("processUser trims name to max length", function () {
	const longName = "A".repeat(150)
	const data = {
		name: longName,
		age: 25,
	}

	const result = processUser(data)

	assertEquals(result.name.length, 100)
})
