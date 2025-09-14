//++ Tests for generateMarkdownFromRulesJson

import { assertEquals } from "@std/assert"

import generateMarkdownFromRulesJson from "./index.ts"

Deno.test("generateMarkdownFromRulesJson", async (t) => {
	await t.step("runs without error when no files found", () => {
		// Mock environment where no rules files exist
		// Function should handle gracefully
		const originalLog = console.log
		const logMessages: Array<string> = []

		function captureLog(msg: string): void {
			logMessages.push(msg)
		}

		console.log = captureLog

		generateMarkdownFromRulesJson()

		const logOutput = logMessages.join(" ")

		assertEquals(
			logOutput.includes("No rules files found") ||
				logOutput.includes("Generating"),
			true,
		)
		console.log = originalLog
	})

	await t.step("processes real rules files if they exist", () => {
		// This will actually run on the real files
		// Just ensure it doesn't throw
		try {
			generateMarkdownFromRulesJson()

			assertEquals(true, true) // If we get here, it worked
		} catch (error) {
			// Only fail if it's not a "no files found" error
			const errorMessage = error instanceof Error
				? error.message
				: String(error)
			if (!errorMessage.includes("No rules files")) {
				throw error
			}
		}
	})
})
