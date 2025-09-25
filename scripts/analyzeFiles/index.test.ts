import { assertEquals } from "https://deno.land/std/assert/mod.ts"
import { join } from "jsr:@std/path"

import analyzeFiles from "./index.ts"

Deno.test("analyzeFiles", async function testAnalyzeFiles(t) {
	await t.step("analyzes a simple project", async function testSimpleProject() {
		const tempDir = await Deno.makeTempDir()

		// Create test files
		const file1 = `export default function greet() {
  return "hello"
}`
		await Deno.writeTextFile(join(tempDir, "greet.ts"), file1)

		const file2 = `function helper() {
  return 42
}

export default function main() {
  return helper()
}`
		await Deno.writeTextFile(join(tempDir, "main.ts"), file2)

		const result = await analyzeFiles({
			root: tempDir,
			scanDirs: ["."],
			excludeDirNames: [],
		})

		assertEquals(result.scannedFiles, 2)
		assertEquals(result.root, tempDir)
		assertEquals(result.functionStats.total, 3)

		await Deno.remove(tempDir, { recursive: true })
	})

	await t.step("handles empty directory", async function testEmpty() {
		const tempDir = await Deno.makeTempDir()

		const result = await analyzeFiles({
			root: tempDir,
			scanDirs: ["."],
		})

		assertEquals(result.scannedFiles, 0)
		assertEquals(result.functionStats.total, 0)

		await Deno.remove(tempDir, { recursive: true })
	})
})
