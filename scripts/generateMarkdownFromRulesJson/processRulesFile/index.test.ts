import { assertEquals, assertThrows } from "https://deno.land/std/assert/mod.ts"

import type { RulesFile } from "../types/index.ts"

import processRulesFile from "./index.ts"

//++ Tests for processRulesFile
Deno.test("processRulesFile", async (t) => {
	await t.step("processes valid rules file", () => {
		// Create a temporary test file
		const tempDir = Deno.makeTempDirSync()
		const jsonPath = `${tempDir}/test-rules.json`
		const markdownPath = `${tempDir}/test-rules.md`

		const testData = {
			version: "1.0.0",
			author: "Test Author",
			testRule: "Test rule content",
		}

		Deno.writeTextFileSync(jsonPath, JSON.stringify(testData, null, 2))

		const rulesFile: RulesFile = {
			path: tempDir,
			jsonPath,
			markdownPath,
		}

		// Process the file
		processRulesFile(rulesFile)

		// Check that markdown file was created
		const markdownContent = Deno.readTextFileSync(markdownPath)

		assertEquals(markdownContent.includes("# Rules documentation"), true)
		assertEquals(markdownContent.includes("**Version**: 1.0.0"), true)
		assertEquals(markdownContent.includes("**Author**: Test Author"), true)
		assertEquals(markdownContent.includes("## Test rule"), true)

		// Clean up
		Deno.removeSync(tempDir, { recursive: true })
	})

	await t.step("handles file with version field", () => {
		const tempDir = Deno.makeTempDirSync()
		const jsonPath = `${tempDir}/test-rules.json`
		const markdownPath = `${tempDir}/test-rules.md`

		const testData = {
			version: "2.0.0",
		}

		Deno.writeTextFileSync(jsonPath, JSON.stringify(testData))

		const rulesFile: RulesFile = {
			path: tempDir,
			jsonPath,
			markdownPath,
		}

		// Capture console output
		const originalLog = console.log
		const logMessages: Array<string> = []

		function captureLog(msg: string): void {
			logMessages.push(msg)
		}

		console.log = captureLog

		processRulesFile(rulesFile)

		console.log = originalLog

		// Check that version was logged
		const versionLogged = logMessages.some((msg) =>
			msg.includes("Version: 2.0.0")
		)

		assertEquals(versionLogged, true)

		// Clean up
		Deno.removeSync(tempDir, { recursive: true })
	})

	await t.step("throws on invalid JSON", () => {
		const tempDir = Deno.makeTempDirSync()
		const jsonPath = `${tempDir}/invalid.json`
		const markdownPath = `${tempDir}/invalid.md`

		Deno.writeTextFileSync(jsonPath, "{ invalid json")

		const rulesFile: RulesFile = {
			path: tempDir,
			jsonPath,
			markdownPath,
		}

		assertThrows(
			() => processRulesFile(rulesFile),
			Error,
		)

		// Clean up
		Deno.removeSync(tempDir, { recursive: true })
	})

	await t.step("throws on non-existent file", () => {
		const rulesFile: RulesFile = {
			path: "/non/existent",
			jsonPath: "/non/existent/file.json",
			markdownPath: "/non/existent/file.md",
		}

		assertThrows(
			() => processRulesFile(rulesFile),
			Error,
		)
	})
})
