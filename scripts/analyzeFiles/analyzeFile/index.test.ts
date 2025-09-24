import { assertEquals } from "https://deno.land/std/assert/mod.ts"
import { join } from "jsr:@std/path"

import analyzeFile from "./index.ts"

Deno.test("analyzeFile", async function testAnalyzeFile(t) {
	const tempDir = await Deno.makeTempDir()

	await t.step("analyzes simple function file", async function testSimpleFunction() {
		const content = `export default function greet(name: string): string {
	return \`Hello, \${name}!\`
}`
		const filePath = join(tempDir, "greet.ts")
		await Deno.writeTextFile(filePath, content)

		const result = await analyzeFile({
			absPath: filePath,
			root: tempDir,
		})

		assertEquals(result.pathAbs, filePath)
		assertEquals(result.pathRel, "greet.ts")
		assertEquals(result.lines, 3)
		assertEquals(result.functions.length, 1)
		assertEquals(result.functions[0].name, "greet")
		assertEquals(result.defaultNames, ["greet"])
	})

	await Deno.remove(tempDir, { recursive: true })
})