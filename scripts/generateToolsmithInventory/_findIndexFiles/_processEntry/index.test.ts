import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"

import _processEntry from "./index.ts"

// Mock DirEntry for testing
function createMockDirEntry(name: string, isDirectory: boolean): Deno.DirEntry {
	return {
		name,
		isDirectory,
		isFile: !isDirectory,
		isSymlink: false,
	}
}

Deno.test("_processEntry - returns path for index.ts file", async () => {
	const mockEntry = createMockDirEntry("index.ts", false)
	const mockRecursiveFn = async (dir: string) => [`${dir}/nested`]

	const result = await _processEntry("src/utils")(mockRecursiveFn)(mockEntry)

	assertEquals(result, ["src/utils/index.ts"])
})

Deno.test("_processEntry - returns empty array for non-index.ts file", async () => {
	const mockEntry = createMockDirEntry("helper.ts", false)
	const mockRecursiveFn = async (dir: string) => [`${dir}/nested`]

	const result = await _processEntry("src/utils")(mockRecursiveFn)(mockEntry)

	assertEquals(result, [])
})

Deno.test("_processEntry - calls recursive function for directory", async () => {
	const mockEntry = createMockDirEntry("subdir", true)
	const mockRecursiveFn = async (dir: string) => [`${dir}/index.ts`]

	const result = await _processEntry("src/utils")(mockRecursiveFn)(mockEntry)

	assertEquals(result, ["src/utils/subdir/index.ts"])
})

Deno.test("_processEntry - handles root directory", async () => {
	const mockEntry = createMockDirEntry("index.ts", false)
	const mockRecursiveFn = async (dir: string) => [`${dir}/nested`]

	const result = await _processEntry("")(mockRecursiveFn)(mockEntry)

	assertEquals(result, ["/index.ts"])
})

Deno.test("_processEntry - handles directory with trailing slash", async () => {
	const mockEntry = createMockDirEntry("index.ts", false)
	const mockRecursiveFn = async (dir: string) => [`${dir}/nested`]

	const result = await _processEntry("src/utils/")(mockRecursiveFn)(mockEntry)

	assertEquals(result, ["src/utils/index.ts"])
})

Deno.test("_processEntry - returns empty array for other files", async () => {
	const testFiles = [
		"README.md",
		"test.js",
		"config.json",
		"Index.ts",
		"index.tsx",
	]
	const mockRecursiveFn = async (dir: string) => [`${dir}/nested`]

	for (const fileName of testFiles) {
		const mockEntry = createMockDirEntry(fileName, false)
		const result = await _processEntry("src")(mockRecursiveFn)(mockEntry)
		assertEquals(result, [], `Should return empty array for ${fileName}`)
	}
})

Deno.test("_processEntry - recursive function returns multiple paths", async () => {
	const mockEntry = createMockDirEntry("components", true)
	const mockRecursiveFn = async (dir: string) => [
		`${dir}/Button/index.ts`,
		`${dir}/Modal/index.ts`,
		`${dir}/Card/index.ts`,
	]

	const result = await _processEntry("src")(mockRecursiveFn)(mockEntry)

	assertEquals(result, [
		"src/codewright/Button/index.ts",
		"src/codewright/Modal/index.ts",
		"src/codewright/Card/index.ts",
	])
})

Deno.test("_processEntry - recursive function returns empty array", async () => {
	const mockEntry = createMockDirEntry("empty", true)
	const mockRecursiveFn = async (_dir: string) => []

	const result = await _processEntry("src")(mockRecursiveFn)(mockEntry)

	assertEquals(result, [])
})

Deno.test("_processEntry - handles deeply nested paths", async () => {
	const mockEntry = createMockDirEntry("index.ts", false)
	const mockRecursiveFn = async (dir: string) => [`${dir}/nested`]

	const result = await _processEntry("a/b/c/d/e/f")(mockRecursiveFn)(mockEntry)

	assertEquals(result, ["a/b/c/d/e/f/index.ts"])
})

Deno.test("_processEntry - curried function works correctly", async () => {
	const processInSrc = _processEntry("src")
	const mockRecursiveFn = async (dir: string) => [`${dir}/nested`]
	const processWithRecursive = processInSrc(mockRecursiveFn)

	const fileEntry = createMockDirEntry("index.ts", false)
	const dirEntry = createMockDirEntry("utils", true)

	assertEquals(await processWithRecursive(fileEntry), ["src/index.ts"])
	assertEquals(await processWithRecursive(dirEntry), ["src/utils/nested"])
})

Deno.test("_processEntry - handles symlink as file", async () => {
	// Symlinks are treated as files if isDirectory is false
	const mockEntry = {
		name: "index.ts",
		isDirectory: false,
		isFile: false,
		isSymlink: true,
	}
	const mockRecursiveFn = async (dir: string) => [`${dir}/nested`]

	const result = await _processEntry("src")(mockRecursiveFn)(mockEntry)

	assertEquals(result, ["src/index.ts"])
})
