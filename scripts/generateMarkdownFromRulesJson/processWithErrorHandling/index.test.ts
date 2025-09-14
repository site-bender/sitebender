import { assertEquals } from "@std/assert"

import type { RulesFile } from "../types/index.ts"

import processWithErrorHandling from "./index.ts"

//++ Tests for processWithErrorHandling
Deno.test("processWithErrorHandling", async (t) => {
	await t.step("processes valid file without error", () => {
		// Create a temporary test file
		const tempDir = Deno.makeTempDirSync()
		const jsonPath = `${tempDir}/test-rules.json`
		const markdownPath = `${tempDir}/test-rules.md`

		const testData = {
			version: "1.0.0",
			testRule: "Test content",
		}

		Deno.writeTextFileSync(jsonPath, JSON.stringify(testData))

		const rulesFile: RulesFile = {
			path: tempDir,
			jsonPath,
			markdownPath,
		}

		// Should not throw
		processWithErrorHandling(rulesFile)

		// Check that markdown file was created
		const markdownExists = (() => {
			try {
				Deno.statSync(markdownPath)

				return true
			} catch {
				return false
			}
		})()

		assertEquals(markdownExists, true)

		// Clean up
		Deno.removeSync(tempDir, { recursive: true })
	})

	await t.step("handles and logs errors gracefully", () => {
		const rulesFile: RulesFile = {
			path: "/non/existent",
			jsonPath: "/non/existent/file.json",
			markdownPath: "/non/existent/file.md",
		}

		// Capture console output
		const originalError = console.error
		const errorMessages: Array<string> = []

		function captureError(msg: string): void {
			errorMessages.push(msg)
		}

		console.error = captureError

		// Should not throw, but should log error
		processWithErrorHandling(rulesFile)

		console.error = originalError

		// Check that error was logged
		const errorLogged = errorMessages.some((msg) =>
			msg.includes("Failed to process") &&
			msg.includes("/non/existent/file.json")
		)

		assertEquals(errorLogged, true)
	})

	await t.step("handles invalid JSON with error logging", () => {
		const tempDir = Deno.makeTempDirSync()
		const jsonPath = `${tempDir}/invalid.json`
		const markdownPath = `${tempDir}/invalid.md`

		Deno.writeTextFileSync(jsonPath, "{ invalid json")

		const rulesFile: RulesFile = {
			path: tempDir,
			jsonPath,
			markdownPath,
		}

		// Capture console output
		const originalError = console.error
		const errorMessages: Array<string> = []

		function captureError(msg: string): void {
			errorMessages.push(msg)
		}

		console.error = captureError

		// Should not throw, but should log error
		processWithErrorHandling(rulesFile)

		console.error = originalError

		// Check that error was logged
		const errorLogged = errorMessages.some((msg) =>
			msg.includes("Failed to process") &&
			msg.includes(jsonPath)
		)

		assertEquals(errorLogged, true)

		// Clean up
		Deno.removeSync(tempDir, { recursive: true })
	})

	await t.step("uses 'unknown' as fallback path", () => {
		const rulesFile: RulesFile = {
			path: "/test",
			jsonPath: "", // Empty path to test fallback
			markdownPath: "/test/file.md",
		}

		// Capture console output
		const originalError = console.error
		const errorMessages: Array<string> = []

		function captureError(msg: string): void {
			errorMessages.push(msg)
		}

		console.error = captureError

		processWithErrorHandling(rulesFile)

		console.error = originalError

		// Check that "unknown" was used as fallback
		const usedUnknown = errorMessages.some((msg) =>
			msg.includes("Failed to process") &&
			msg.includes("unknown")
		)

		assertEquals(usedUnknown, true)
	})
})
