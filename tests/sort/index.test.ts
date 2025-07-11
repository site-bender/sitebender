import { assert, assertEquals } from "https://deno.land/std@0.220.1/assert/mod.ts"
import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

const TEST_SRC_DIR = "./test-src"
const TEST_FILE1 = join(TEST_SRC_DIR, "test1.ts")
const TEST_FILE2 = join(TEST_SRC_DIR, "nested", "test2.tsx")
const TEST_FILE3 = join(TEST_SRC_DIR, "no-imports.ts")

async function createTestFiles(): Promise<void> {
	await Deno.mkdir(TEST_SRC_DIR, { recursive: true })
	await Deno.mkdir(join(TEST_SRC_DIR, "nested"), { recursive: true })

	// Test file with unsorted imports
	const unsortedImports = `import { useState } from "react"
import type { Component } from "~types/component"
import Button from "~components/Button/index.tsx"
import { join } from "https://deno.land/std@0.220.1/path/mod.ts"
import { API_URL } from "~constants/api"
import type { Logger } from "./types"

export default function TestComponent() {
	return <div>Test</div>
}`

	await Deno.writeTextFile(TEST_FILE1, unsortedImports)

	// Test file with mixed imports (should be sorted)
	const mixedImports = `import Button from "~components/forms/Button/index.tsx"
import type { FormData } from "~types/forms"
import { assert } from "https://deno.land/std@0.220.1/assert/mod.ts"
import "./styles.css"

const testData = "hello"
export default testData`

	await Deno.writeTextFile(TEST_FILE2, mixedImports)

	// Test file with no imports
	await Deno.writeTextFile(TEST_FILE3, `
export default function NoImports() {
	return "No imports here"
}`)
}

async function cleanupTestFiles(): Promise<void> {
	try {
		await Deno.remove(TEST_SRC_DIR, { recursive: true })
	} catch {
		// Directory doesn't exist, which is fine
	}
}

Deno.test("sortImports organizes import statements", async (t) => {
	await cleanupTestFiles()
	await createTestFiles()

	await t.step("should sort imports in correct order", async () => {
		// Read original content
		const originalContent = await Deno.readTextFile(TEST_FILE1)
		assert(originalContent.includes('import { useState } from "react"'), "Original should contain React import")

		// Import and run sort on single file
		const sortFileImports = (await import("~scripts/sortImports/sortFileImports/index.ts")).default
		await sortFileImports(TEST_FILE1)

		// Read sorted content
		const sortedContent = await Deno.readTextFile(TEST_FILE1)
		const lines = sortedContent.split('\n')

		// Find import section (before the first non-import/non-empty line)
		const importLines = []
		for (const line of lines) {
			if (line.trim() === '' || line.startsWith('import ') || line.startsWith('export ')) {
				if (line.startsWith('import ')) {
					importLines.push(line)
				}
			} else {
				break
			}
		}

		// Verify imports are present and organized
		assert(importLines.length > 0, "Should have import statements")
		assert(sortedContent.includes("export default function TestComponent"), "Should preserve the component code")

		// Check that external imports come before internal imports
		const externalImportIndex = importLines.findIndex(line => line.includes("https://deno.land"))
		const internalImportIndex = importLines.findIndex(line => line.includes("~components"))

		if (externalImportIndex !== -1 && internalImportIndex !== -1) {
			assert(externalImportIndex < internalImportIndex, "External imports should come before internal imports")
		}
	})

	await t.step("should handle files with mixed import types", async () => {
		const originalContent = await Deno.readTextFile(TEST_FILE2)

		const sortFileImports = (await import("~scripts/sortImports/sortFileImports/index.ts")).default
		await sortFileImports(TEST_FILE2)

		const sortedContent = await Deno.readTextFile(TEST_FILE2)

		// Verify the file still contains all expected content
		assert(sortedContent.includes("~components/forms/Button"), "Should contain Button import")
		assert(sortedContent.includes("~types/forms"), "Should contain type import")
		assert(sortedContent.includes("testData"), "Should preserve the code")
	})

	await t.step("should handle files with no imports gracefully", async () => {
		const originalContent = await Deno.readTextFile(TEST_FILE3)

		const sortFileImports = (await import("~scripts/sortImports/sortFileImports/index.ts")).default
		await sortFileImports(TEST_FILE3)

		const sortedContent = await Deno.readTextFile(TEST_FILE3)

		// Content should be essentially unchanged (no imports to sort)
		assert(sortedContent.includes("NoImports"), "Should preserve function content")

		// Check if the content contains "import" - it might be in comments or strings
		const hasActualImports = sortedContent.split('\n').some(line =>
			line.trim().startsWith('import ')
		)
		assert(!hasActualImports, "Should not have any actual import statements")
	})

	await t.step("should preserve proper spacing between imports and code", async () => {
		const sortFileImports = (await import("~scripts/sortImports/sortFileImports/index.ts")).default
		await sortFileImports(TEST_FILE1)

		const content = await Deno.readTextFile(TEST_FILE1)
		const lines = content.split('\n')

		// Find the last import line and the first code line
		let lastImportLine = -1
		let firstCodeLine = -1

		for (let i = 0; i < lines.length; i++) {
			if (lines[i].startsWith('import ')) {
				lastImportLine = i
			} else if (lines[i].trim() !== '' && !lines[i].startsWith('import ') && firstCodeLine === -1) {
				firstCodeLine = i
				break
			}
		}

		if (lastImportLine !== -1 && firstCodeLine !== -1) {
			// There should be at least one empty line between imports and code
			const linesBetween = firstCodeLine - lastImportLine - 1
			assert(linesBetween >= 1, "Should have proper spacing between imports and code")
		}
	})

	await t.step("should handle file read/write errors gracefully", async () => {
		// Test with non-existent file
		const sortFileImports = (await import("~scripts/sortImports/sortFileImports/index.ts")).default

		// This should not throw, but handle the error internally
		await sortFileImports("./non-existent-file.ts")

		// If we get here, the function handled the error gracefully
		assert(true, "Should handle missing files gracefully")
	})

	// Cleanup
	await cleanupTestFiles()
})
