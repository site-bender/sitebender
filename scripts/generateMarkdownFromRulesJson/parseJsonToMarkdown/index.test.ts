//++ Tests for parseJsonToMarkdown

import { assertEquals } from "@std/assert"

import includes from "../../../libraries/toolsmith/src/string/contains/index.ts"
import parseJsonToMarkdown from "./index.ts"

Deno.test("parseJsonToMarkdown", async (t) => {
	await t.step("extracts metadata to top of document", () => {
		const json = {
			version: "1.0.0",
			lastUpdated: "2025-01-13",
			author: "The Architect",
			someSection: { key: "value" },
		}

		const result = parseJsonToMarkdown(json)

		assertEquals(includes("**Version**: 1.0.0")(result), true)
		assertEquals(includes("**Last updated**: 2025-01-13")(result), true)
		assertEquals(includes("**Author**: The Architect")(result), true)
	})

	await t.step("converts object keys to sentence case headings", () => {
		const json = {
			primeDirective: { rule: "Don't assume" },
			sevenDeadlySins: ["Pride", "Greed"],
		}

		const result = parseJsonToMarkdown(json)

		assertEquals(includes("## Prime directive")(result), true)
		assertEquals(includes("## Seven deadly sins")(result), true)
	})

	await t.step("handles nested structures recursively", () => {
		const json = {
			codeOrganization: {
				laws: [
					{ id: 1, name: "One function per file" },
				],
			},
		}

		const result = parseJsonToMarkdown(json)

		assertEquals(includes("## Code organization")(result), true)
		assertEquals(includes("Laws")(result), true)
		assertEquals(includes("One function per file")(result), true)
	})
})
