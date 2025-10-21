import { assertEquals } from "jsr:@std/assert"
import processName from "./index.ts"

Deno.test("processName sanitizes and trims input", function () {
	const result = processName("  John<script>  ")

	assertEquals(result, "John")
})
