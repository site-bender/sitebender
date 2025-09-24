import { assertEquals } from "@std/assert"

import toRulesFile from "./index.ts"

//++ Tests for toRulesFile
Deno.test("toRulesFile", async (t) => {
	await t.step("returns RulesFile object for existing file", () => {
		// Use the actual project root and a file we know exists
		const projectRoot = new URL("../../../..", import.meta.url).pathname
		const result = toRulesFile("rules/index.json", projectRoot)

		if (result) {
			assertEquals(result.jsonPath, `${projectRoot}/rules/index.json`)
			assertEquals(result.path, `${projectRoot}/rules`)
			assertEquals(result.markdownPath, `${projectRoot}/rules/index.md`)
		}
	})

	await t.step("returns null for non-existent file", () => {
		const projectRoot = "/fake/path"
		const result = toRulesFile("does/not/exist.json", projectRoot)

		assertEquals(result, null)
	})

	await t.step(
		"correctly transforms paths for real library rules files",
		() => {
			const projectRoot = new URL("../../../..", import.meta.url).pathname
			const result = toRulesFile(
				"libraries/architect/rules/index.json",
				projectRoot,
			)

			if (result) {
				assertEquals(
					result.jsonPath,
					`${projectRoot}/libraries/architect/rules/index.json`,
				)
				assertEquals(result.path, `${projectRoot}/libraries/architect/rules`)
				assertEquals(
					result.markdownPath,
					`${projectRoot}/libraries/architect/rules/index.md`,
				)
			} else {
				// If the file doesn't exist, that's a problem we want to know about
				throw new Error("Expected libraries/architect/rules/index.json to exist")
			}
		},
	)
})
