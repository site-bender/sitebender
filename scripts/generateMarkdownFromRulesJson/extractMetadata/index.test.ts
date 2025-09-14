import { assertEquals } from "@std/assert"

import extractMetadata from "./index.ts"

//++ Tests for extractMetadata
Deno.test("extractMetadata", async (t) => {
	await t.step("extracts only metadata fields", () => {
		const data = {
			version: "1.0.0",
			lastUpdated: "2025-01-13",
			author: "The Architect",
			primeDirective: { rule: "Don't assume" },
			commandments: ["Do", "Don't"],
		}

		const result = extractMetadata(data)

		assertEquals(result.length, 3)
		assertEquals(result[0], ["version", "1.0.0"])
		assertEquals(result[1], ["lastUpdated", "2025-01-13"])
		assertEquals(result[2], ["author", "The Architect"])
	})

	await t.step("returns empty array when no metadata fields", () => {
		const data = {
			primeDirective: { rule: "Don't assume" },
			commandments: ["Do", "Don't"],
		}

		const result = extractMetadata(data)

		assertEquals(result, [])
	})

	await t.step("handles empty object", () => {
		const result = extractMetadata({})

		assertEquals(result, [])
	})
})
