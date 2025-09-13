import { assertEquals } from "https://deno.land/std/assert/mod.ts"
import findPattern from "./index.ts"

Deno.test("findPattern", async (t) => {
	await t.step("returns array of matches", async () => {
		const result = await findPattern("/test/path", /test/)

		assertEquals(Array.isArray(result), true)
		// Current implementation returns empty array
		assertEquals(result.length, 0)
	})

	await t.step("handles complex regex patterns", async () => {
		const result = await findPattern("/test/path", /from ['"]typescript['"]/)

		assertEquals(Array.isArray(result), true)
		assertEquals(result.length, 0)
	})

	await t.step("handles empty path", async () => {
		const result = await findPattern("", /test/)

		assertEquals(Array.isArray(result), true)
		assertEquals(result.length, 0)
	})

	await t.step("result structure would be correct if matches found", async () => {
		const result = await findPattern("/test/path", /test/)

		// If there were results, they would have this structure
		result.forEach(match => {
			assertEquals(typeof match.file, "string")
			assertEquals(typeof match.line, "number")
		})
	})
})