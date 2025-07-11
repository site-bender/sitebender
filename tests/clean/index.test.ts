import { assert } from "https://deno.land/std@0.220.1/assert/mod.ts"
import { join } from "https://deno.land/std@0.220.1/path/mod.ts"

const TEST_OUTPUT_DIR = "./dist"
const TEST_FILE = join(TEST_OUTPUT_DIR, "test-file.txt")

async function fileExists(path: string): Promise<boolean> {
	try {
		await Deno.stat(path)
		return true
	} catch {
		return false
	}
}

async function createTestDistDirectory(): Promise<void> {
	// Create dist directory with some test files
	await Deno.mkdir(TEST_OUTPUT_DIR, { recursive: true })
	await Deno.writeTextFile(TEST_FILE, "test content")

	// Create subdirectories and files
	await Deno.mkdir(join(TEST_OUTPUT_DIR, "styles"), { recursive: true })
	await Deno.mkdir(join(TEST_OUTPUT_DIR, "scripts"), { recursive: true })
	await Deno.writeTextFile(join(TEST_OUTPUT_DIR, "styles", "main.css"), "body { margin: 0; }")
	await Deno.writeTextFile(join(TEST_OUTPUT_DIR, "scripts", "main.js"), "console.log('test')")
}

Deno.test("clean removes dist directory", async (t) => {
	await t.step("should remove existing dist directory and contents", async () => {
		// Setup: Create dist directory with files
		await createTestDistDirectory()

		// Verify files exist before cleaning
		assert(await fileExists(TEST_OUTPUT_DIR), "Dist directory should exist before cleaning")
		assert(await fileExists(TEST_FILE), "Test file should exist before cleaning")

		// Import and run clean function
		const clean = (await import("~scripts/clean/index.ts")).default
		await clean()

		// Verify dist directory and contents are removed
		assert(!await fileExists(TEST_OUTPUT_DIR), "Dist directory should be removed after cleaning")
		assert(!await fileExists(TEST_FILE), "Test file should be removed after cleaning")
	})

	await t.step("should handle missing dist directory gracefully", async () => {
		// Ensure dist directory doesn't exist
		try {
			await Deno.remove(TEST_OUTPUT_DIR, { recursive: true })
		} catch {
			// Directory already doesn't exist, which is fine
		}

		assert(!await fileExists(TEST_OUTPUT_DIR), "Dist directory should not exist")

		// Import and run clean function - should not throw error
		const clean = (await import("~scripts/clean/index.ts")).default
		await clean() // Should complete without error

		// Verify directory still doesn't exist (no side effects)
		assert(!await fileExists(TEST_OUTPUT_DIR), "Dist directory should still not exist")
	})

	await t.step("should handle multiple consecutive cleans", async () => {
		// Create, clean, and clean again
		await createTestDistDirectory()
		assert(await fileExists(TEST_OUTPUT_DIR), "Dist directory should exist initially")

		const clean = (await import("~scripts/clean/index.ts")).default

		// First clean
		await clean()
		assert(!await fileExists(TEST_OUTPUT_DIR), "Dist directory should be removed after first clean")

		// Second clean (should handle missing directory gracefully)
		await clean() // Should not throw error
		assert(!await fileExists(TEST_OUTPUT_DIR), "Dist directory should still not exist after second clean")
	})
})
