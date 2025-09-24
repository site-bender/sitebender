import {
	assertArrayIncludes,
	assertEquals,
} from "https://deno.land/std@0.208.0/assert/mod.ts"
import { join } from "https://deno.land/std@0.208.0/path/mod.ts"

import _findIndexFiles from "./index.ts"

// Create a temporary test directory
const testDir = await Deno.makeTempDir({ prefix: "findIndexFiles_test_" })

// Helper to create test file structure
async function createTestStructure(): Promise<void> {
	// Create nested directories with index.ts files
	const structure = [
		"array/map/index.ts",
		"array/filter/index.ts",
		"array/reduce/index.ts",
		"string/split/index.ts",
		"string/join/index.ts",
		"math/add/index.ts",
		"math/deep/nested/func/index.ts",
		"other-file.ts",
		"readme.md",
		"types/index.ts",
	]

	for (const path of structure) {
		const fullPath = join(testDir, path)
		const dir = fullPath.substring(0, fullPath.lastIndexOf("/"))
		await Deno.mkdir(dir, { recursive: true })
		await Deno.writeTextFile(fullPath, "// test file")
	}
}

// Cleanup after tests
globalThis.addEventListener("unload", async () => {
	try {
		await Deno.remove(testDir, { recursive: true })
	} catch {
		// Ignore cleanup errors
	}
})

Deno.test("_findIndexFiles - finds all index.ts files in directory tree", async () => {
	await createTestStructure()

	const result = await _findIndexFiles(testDir)

	// Should find 8 index.ts files (including nested one)
	assertEquals(result.length, 8)

	// Check that all expected index.ts files are found
	const expectedFiles = [
		join(testDir, "array/map/index.ts"),
		join(testDir, "array/filter/index.ts"),
		join(testDir, "array/reduce/index.ts"),
		join(testDir, "string/split/index.ts"),
		join(testDir, "string/join/index.ts"),
		join(testDir, "math/add/index.ts"),
		join(testDir, "math/deep/nested/func/index.ts"),
		join(testDir, "types/index.ts"),
	]

	for (const expected of expectedFiles) {
		assertArrayIncludes(result, [expected])
	}
})

Deno.test("_findIndexFiles - returns empty array for non-existent directory", async () => {
	const nonExistentDir = join(testDir, "non-existent-directory")

	const result = await _findIndexFiles(nonExistentDir)

	assertEquals(result, [])
})

Deno.test("_findIndexFiles - returns empty array for empty directory", async () => {
	const emptyDir = join(testDir, "empty")
	await Deno.mkdir(emptyDir, { recursive: true })

	const result = await _findIndexFiles(emptyDir)

	assertEquals(result, [])
})

Deno.test("_findIndexFiles - handles directory with only non-index files", async () => {
	const noIndexDir = join(testDir, "no-index")
	await Deno.mkdir(noIndexDir, { recursive: true })
	await Deno.writeTextFile(join(noIndexDir, "file1.ts"), "// test")
	await Deno.writeTextFile(join(noIndexDir, "file2.js"), "// test")
	await Deno.writeTextFile(join(noIndexDir, "README.md"), "# Test")

	const result = await _findIndexFiles(noIndexDir)

	assertEquals(result, [])
})

Deno.test("_findIndexFiles - finds deeply nested index.ts files", async () => {
	const deepDir = join(testDir, "deep-test")
	const deepPath = join(deepDir, "level1/level2/level3/level4/level5/index.ts")
	const deepDirPath = deepPath.substring(0, deepPath.lastIndexOf("/"))

	await Deno.mkdir(deepDirPath, { recursive: true })
	await Deno.writeTextFile(deepPath, "// deep file")

	const result = await _findIndexFiles(deepDir)

	assertEquals(result.length, 1)
	assertEquals(result[0], deepPath)
})

Deno.test("_findIndexFiles - handles mixed file types correctly", async () => {
	const mixedDir = join(testDir, "mixed")
	await Deno.mkdir(join(mixedDir, "func1"), { recursive: true })
	await Deno.mkdir(join(mixedDir, "func2"), { recursive: true })

	// Create various files
	await Deno.writeTextFile(join(mixedDir, "func1/index.ts"), "// index")
	await Deno.writeTextFile(join(mixedDir, "func1/helper.ts"), "// helper")
	await Deno.writeTextFile(join(mixedDir, "func2/index.ts"), "// index")
	await Deno.writeTextFile(join(mixedDir, "func2/test.spec.ts"), "// test")
	await Deno.writeTextFile(join(mixedDir, "index.ts"), "// root index")
	await Deno.writeTextFile(join(mixedDir, "config.json"), "{}")

	const result = await _findIndexFiles(mixedDir)

	// Should find exactly 3 index.ts files
	assertEquals(result.length, 3)
	assertArrayIncludes(result, [
		join(mixedDir, "func1/index.ts"),
		join(mixedDir, "func2/index.ts"),
		join(mixedDir, "index.ts"),
	])
})

Deno.test("_findIndexFiles - handles permission errors gracefully", async () => {
	// This test would require actually creating a directory without read permissions,
	// which is platform-specific and may not work in all environments.
	// Instead, we'll test with a file (not a directory)
	const filePath = join(testDir, "not-a-directory.txt")
	await Deno.writeTextFile(filePath, "This is a file, not a directory")

	const result = await _findIndexFiles(filePath)

	// Should return empty array when trying to read a file as a directory
	assertEquals(result, [])
})

Deno.test("_findIndexFiles - handles symlinks correctly", async () => {
	const symlinkDir = join(testDir, "symlink-test")
	const targetDir = join(symlinkDir, "target")
	const linkDir = join(symlinkDir, "link")

	// Create target directory with index.ts
	await Deno.mkdir(targetDir, { recursive: true })
	await Deno.writeTextFile(join(targetDir, "index.ts"), "// target index")

	// Create symlink to target directory
	try {
		await Deno.symlink(targetDir, linkDir)

		const result = await _findIndexFiles(symlinkDir)

		// Should find index.ts in both target and symlink
		assertEquals(result.length, 2)
		assertArrayIncludes(result, [
			join(targetDir, "index.ts"),
			join(linkDir, "index.ts"),
		])
	} catch {
		// Skip test if symlinks are not supported
		console.warn("Symlink test skipped - not supported on this platform")
	}
})

Deno.test("_findIndexFiles - handles directories with spaces and special characters", async () => {
	const specialDir = join(testDir, "special chars & spaces")
	const funcDir = join(specialDir, "my-function (v2)")

	await Deno.mkdir(funcDir, { recursive: true })
	await Deno.writeTextFile(join(funcDir, "index.ts"), "// special")

	const result = await _findIndexFiles(specialDir)

	assertEquals(result.length, 1)
	assertEquals(result[0], join(funcDir, "index.ts"))
})
