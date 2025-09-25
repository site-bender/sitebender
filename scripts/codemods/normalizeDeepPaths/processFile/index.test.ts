import * as path from "https://deno.land/std@0.224.0/path/mod.ts"
import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import processFile from "./index.ts"

//++ Tests for processFile function that normalizes import paths
Deno.test("processFile", async function testProcessFile(t) {
	// Create temporary test directory
	const testDir = await Deno.makeTempDir()

	await t.step(
		"leaves relative imports unchanged",
		async function testRelativeImports() {
			const filePath = path.join(testDir, "test.ts")
			const content = `
import { something } from "./local"
import { another } from "../parent"
import { deep } from "../../deep/module"
export { test } from "./sibling"
`
			await Deno.writeTextFile(filePath, content)

			const changed = await processFile(filePath)
			const result = await Deno.readTextFile(filePath)

			assertEquals(changed, false)
			assertEquals(result, content)
		},
	)

	await t.step("rewrites deep library paths", async function testDeepPaths() {
		const filePath = path.join(testDir, "component.ts")
		const content = `
import { map } from "libraries/toolsmith/src/vanilla/array/map"
import type { Component } from "libraries/pagewright/types"
`
		await Deno.writeTextFile(filePath, content)

		const changed = await processFile(filePath)

		assertEquals(changed, true)

		const result = await Deno.readTextFile(filePath)
		// Should convert to relative paths
		assertEquals(result.includes("../"), true)
		assertEquals(result.includes("libraries/toolsmith/src"), false)
	})

	await t.step(
		"handles mixed import styles",
		async function testMixedImports() {
			const filePath = path.join(testDir, "mixed.ts")
			const content = `
import { local } from "./local"
import { deep } from "libraries/toolsmith/src/utils"
export { something } from "../relative"
export { another } from "libraries/pagewright/src/base"
`
			await Deno.writeTextFile(filePath, content)

			const changed = await processFile(filePath)

			assertEquals(changed, true)

			const result = await Deno.readTextFile(filePath)
			// Local imports should remain unchanged
			assertEquals(result.includes("./local"), true)
			assertEquals(result.includes("../relative"), true)
			// Deep imports should be converted
			assertEquals(result.includes('"libraries/toolsmith'), false)
			assertEquals(result.includes('"libraries/pagewright/src'), false)
		},
	)

	await t.step(
		"preserves single and double quotes",
		async function testQuotes() {
			const filePathSingle = path.join(testDir, "single.ts")
			const contentSingle = `
import { test } from 'libraries/toolsmith/src/test'
`
			await Deno.writeTextFile(filePathSingle, contentSingle)

			await processFile(filePathSingle)
			const resultSingle = await Deno.readTextFile(filePathSingle)

			// Should preserve single quotes
			assertEquals(resultSingle.includes("'"), true)
			assertEquals(resultSingle.includes('"'), false)

			const filePathDouble = path.join(testDir, "double.ts")
			const contentDouble = `
import { test } from "libraries/toolsmith/src/test"
`
			await Deno.writeTextFile(filePathDouble, contentDouble)

			await processFile(filePathDouble)
			const resultDouble = await Deno.readTextFile(filePathDouble)

			// Should preserve double quotes
			assertEquals(resultDouble.includes('"'), true)
			assertEquals(
				resultDouble.includes("'../") || resultDouble.includes('"/'),
				false,
			)
		},
	)

	await t.step("handles export statements", async function testExports() {
		const filePath = path.join(testDir, "exports.ts")
		const content = `
export { default } from "libraries/toolsmith/src/pipe"
export * from "libraries/pagewright/types"
export { foo, bar } from "libraries/architect/src/utils"
`
		await Deno.writeTextFile(filePath, content)

		const changed = await processFile(filePath)

		assertEquals(changed, true)

		const result = await Deno.readTextFile(filePath)
		// All deep paths should be converted
		assertEquals(result.includes('"libraries/'), false)
		assertEquals(result.includes("../"), true)
	})

	await t.step(
		"returns false when no changes needed",
		async function testNoChanges() {
			const filePath = path.join(testDir, "nochange.ts")
			const content = `
// This file has no imports
const x = 5
export default x
`
			await Deno.writeTextFile(filePath, content)

			const changed = await processFile(filePath)

			assertEquals(changed, false)

			const result = await Deno.readTextFile(filePath)
			assertEquals(result, content)
		},
	)

	await t.step("handles multiline imports", async function testMultiline() {
		const filePath = path.join(testDir, "multiline.ts")
		const content = `
import {
	map,
	filter,
	reduce
} from "libraries/toolsmith/src/vanilla/array"
`
		await Deno.writeTextFile(filePath, content)

		const changed = await processFile(filePath)

		assertEquals(changed, true)

		const result = await Deno.readTextFile(filePath)
		assertEquals(result.includes('"libraries/toolsmith'), false)
	})

	// Cleanup
	await Deno.remove(testDir, { recursive: true })
})

//?? [EXAMPLE] Run with: deno test scripts/codemods/normalizeDeepPaths/processFile/index.test.ts
