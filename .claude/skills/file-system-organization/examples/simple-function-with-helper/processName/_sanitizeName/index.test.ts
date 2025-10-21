import { assertEquals } from "jsr:@std/assert"
import _sanitizeName from "./index.ts"

Deno.test("_sanitizeName removes angle brackets", function () {
	const result = _sanitizeName("John<script>alert()</script>")

	assertEquals(result, "Johnscriptalert()/script")
})
