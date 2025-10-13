import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"
import { join } from "https://deno.land/std@0.208.0/path/mod.ts"

import _processFiles from "./index.ts"

// Create a temporary test directory
const testDir = await Deno.makeTempDir({ prefix: "processFiles_test_" })

// Helper to create test files
async function createTestFile(
	relativePath: string,
	content: string,
): Promise<string> {
	const fullPath = join(testDir, relativePath)
	const dir = fullPath.substring(0, fullPath.lastIndexOf("/"))
	await Deno.mkdir(dir, { recursive: true })
	await Deno.writeTextFile(fullPath, content)
	return fullPath
}

// Cleanup after tests
globalThis.addEventListener("unload", async () => {
	try {
		await Deno.remove(testDir, { recursive: true })
	} catch {
		// Ignore cleanup errors
	}
})

Deno.test("_processFiles - processes empty file list", async () => {
	const result = await _processFiles([])
	assertEquals(result, {
		inventory: {},
		processedCount: 0,
		failedFiles: [],
		aliasedFiles: [],
		typeOrConstantFiles: [],
	})
})

Deno.test("_processFiles - processes a valid function file", async () => {
	const filePath = await createTestFile(
		"libraries/toolsmith/src/array/map/index.ts",
		`export default function map<T, U>(mapper: (item: T) => U) {
			return function withArray(array: T[]): U[] {
				return array.map(mapper)
			}
		}`,
	)

	const result = await _processFiles([filePath])

	assertEquals(result.processedCount, 1)
	assertEquals(result.failedFiles.length, 0)
	assertEquals(result.aliasedFiles.length, 0)
	assertEquals(result.typeOrConstantFiles.length, 0)
	assertExists(result.inventory.array)
	assertExists(result.inventory.array.map)
	assertEquals(result.inventory.array.map.curried, true)
})

Deno.test("_processFiles - processes multiple function files", async () => {
	const mapPath = await createTestFile(
		"libraries/toolsmith/src/array/map/index.ts",
		`export default function map<T, U>(mapper: (item: T) => U) {
			return function withArray(array: T[]): U[] {
				return array.map(mapper)
			}
		}`,
	)

	const filterPath = await createTestFile(
		"libraries/toolsmith/src/array/filter/index.ts",
		`export default function filter<T>(predicate: (item: T) => boolean) {
			return function withArray(array: T[]): T[] {
				return array.filter(predicate)
			}
		}`,
	)

	const splitPath = await createTestFile(
		"libraries/toolsmith/src/string/split/index.ts",
		`export default function split(separator: string) {
			return function withString(str: string): string[] {
				return str.split(separator)
			}
		}`,
	)

	const result = await _processFiles([mapPath, filterPath, splitPath])

	assertEquals(result.processedCount, 3)
	assertEquals(result.failedFiles.length, 0)
	assertExists(result.inventory.array)
	assertExists(result.inventory.array.map)
	assertExists(result.inventory.array.filter)
	assertExists(result.inventory.string)
	assertExists(result.inventory.string.split)
})

Deno.test("_processFiles - identifies aliased functions", async () => {
	const aliasPath = await createTestFile(
		"libraries/toolsmith/src/math/std/index.ts",
		`export { default } from "../standardDeviation/index.ts"`,
	)

	const result = await _processFiles([aliasPath])

	assertEquals(result.processedCount, 0)
	assertEquals(result.aliasedFiles.length, 1)
	assertEquals(result.aliasedFiles[0], aliasPath)
	assertEquals(result.failedFiles.length, 0)
	assertEquals(result.typeOrConstantFiles.length, 0)
})

Deno.test("_processFiles - identifies type/constant files", async () => {
	const typePath = await createTestFile(
		"libraries/toolsmith/src/types/index.ts",
		`export type Value = string | number | boolean | null | undefined
		export type Serializable = Value | Value[] | { [key: string]: Serializable }`,
	)

	const constantPath = await createTestFile(
		"libraries/toolsmith/src/constants/index.ts",
		`export const PI = 3.14159
		export const E = 2.71828`,
	)

	const result = await _processFiles([typePath, constantPath])

	assertEquals(result.processedCount, 0)
	assertEquals(result.typeOrConstantFiles.length, 2)
	assertEquals(result.failedFiles.length, 0)
	assertEquals(result.aliasedFiles.length, 0)
})

Deno.test("_processFiles - handles non-existent files", async () => {
	const nonExistentPath = join(testDir, "non-existent-file.ts")

	const result = await _processFiles([nonExistentPath])

	assertEquals(result.processedCount, 0)
	assertEquals(result.failedFiles.length, 1)
	assertEquals(result.failedFiles[0], nonExistentPath)
})

Deno.test("_processFiles - processes files with no export default", async () => {
	const namedExportPath = await createTestFile(
		"libraries/toolsmith/src/utility/helpers/index.ts",
		`export function helper1() { return 1 }
		export function helper2() { return 2 }`,
	)

	const result = await _processFiles([namedExportPath])

	assertEquals(result.processedCount, 0)
	assertEquals(result.failedFiles.length, 1)
	assertEquals(result.failedFiles[0], namedExportPath)
})

Deno.test("_processFiles - processes non-curried functions", async () => {
	const identityPath = await createTestFile(
		"libraries/toolsmith/src/utility/identity/index.ts",
		`export default function identity<T>(value: T): T {
			return value
		}`,
	)

	const result = await _processFiles([identityPath])

	assertEquals(result.processedCount, 1)
	assertExists(result.inventory.utility)
	assertExists(result.inventory.utility.identity)
	assertEquals(result.inventory.utility.identity.curried, false)
})

Deno.test("_processFiles - handles mixed file types", async () => {
	const functionPath = await createTestFile(
		"libraries/toolsmith/src/array/head/index.ts",
		`export default function head<T>(array: T[]): T | undefined {
			return array[0]
		}`,
	)

	const aliasPath = await createTestFile(
		"libraries/toolsmith/src/array/first/index.ts",
		`export { default } from "../head/index.ts"`,
	)

	const typePath = await createTestFile(
		"libraries/toolsmith/src/types/index.ts",
		`export type Predicate<T> = (value: T) => boolean`,
	)

	const invalidPath = await createTestFile(
		"libraries/toolsmith/src/broken/invalid/index.ts",
		`const broken = syntax error here`,
	)

	const result = await _processFiles([
		functionPath,
		aliasPath,
		typePath,
		invalidPath,
	])

	assertEquals(result.processedCount, 1)
	assertEquals(result.aliasedFiles.length, 1)
	assertEquals(result.typeOrConstantFiles.length, 1)
	assertEquals(result.failedFiles.length, 1)
	assertExists(result.inventory.array)
	assertExists(result.inventory.array.head)
})

Deno.test("_processFiles - processes large batches correctly", async () => {
	// Create 25 files (more than BATCH_SIZE of 20) to test batching
	const filePaths: string[] = []

	for (let i = 0; i < 25; i++) {
		const path = await createTestFile(
			`libraries/toolsmith/src/test/func${i}/index.ts`,
			`export default function func${i}(x: number): number {
				return x + ${i}
			}`,
		)
		filePaths.push(path)
	}

	const result = await _processFiles(filePaths)

	assertEquals(result.processedCount, 25)
	assertEquals(result.failedFiles.length, 0)
	assertExists(result.inventory.test)

	// Check that all functions were processed
	for (let i = 0; i < 25; i++) {
		assertExists(result.inventory.test[`func${i}`])
		assertEquals(result.inventory.test[`func${i}`].curried, false)
	}
})

Deno.test("_processFiles - handles paths without vanilla correctly", async () => {
	const nonVanillaPath = await createTestFile(
		"scripts/utilities/helper/index.ts",
		`export default function helper() {
			return "help"
		}`,
	)

	const result = await _processFiles([nonVanillaPath])

	assertEquals(result.processedCount, 1)
	assertExists(result.inventory.other)
	assertExists(result.inventory.other.helper)
})
