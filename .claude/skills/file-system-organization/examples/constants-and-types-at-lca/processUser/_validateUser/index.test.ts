import { assertThrows } from "jsr:@std/assert"
import _validateUser from "./index.ts"

Deno.test("_validateUser throws on invalid age", function () {
	const data = {
		name: "Bob",
		age: 200,
	}

	assertThrows(function () {
		_validateUser(data)
	})
})
