//++ Tests for parseJsonToMarkdown

import { assertEquals } from "https://deno.land/std/assert/mod.ts"
import parseJsonToMarkdown from "./index.ts"

Deno.test("parseJsonToMarkdown", async (t) => {
	await t.step("extracts metadata to top of document", () => {
		const json = {
			version: "1.0.0",
			lastUpdated: "2025-01-13",
			author: "The Architect",
			someSection: { key: "value" }
		}
		
		const result = parseJsonToMarkdown(json)
		assertEquals(result.includes("**Version**: 1.0.0"), true)
		assertEquals(result.includes("**Last updated**: 2025-01-13"), true)
		assertEquals(result.includes("**Author**: The Architect"), true)
	})
	
	await t.step("converts object keys to sentence case headings", () => {
		const json = {
			primeDirective: { rule: "Don't assume" },
			sevenDeadlySins: ["Pride", "Greed"]
		}
		
		const result = parseJsonToMarkdown(json)
		assertEquals(result.includes("## Prime directive"), true)
		assertEquals(result.includes("## Seven deadly sins"), true)
	})
	
	await t.step("handles nested structures recursively", () => {
		const json = {
			codeOrganization: {
				laws: [
					{ id: 1, name: "One function per file" }
				]
			}
		}
		
		const result = parseJsonToMarkdown(json)
		assertEquals(result.includes("## Code organization"), true)
		assertEquals(result.includes("Laws"), true)
		assertEquals(result.includes("One function per file"), true)
	})
})