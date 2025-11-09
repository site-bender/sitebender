import { assertEquals } from "jsr:@std/assert@1"
import { join } from "jsr:@std/path@1"
import parseImports from "./index.ts"

Deno.test("parseImports - parses simple imports from TypeScript file", async () => {
	const result = await parseImports(
		join(Deno.cwd(), "src/types/index.ts"),
	)

	// Should extract imports from the types file
	assertEquals(Array.isArray(result), true)
	// Types file has no imports currently, so should be empty
	assertEquals(result.length, 0)
})

Deno.test("parseImports - parses imports from file with multiple imports", async () => {
	const result = await parseImports(
		join(Deno.cwd(), "src/privacy/isValidImport/index.ts"),
	)

	// Should extract imports
	assertEquals(Array.isArray(result), true)
	// Should have at least the isPrivateFunction and getParentScope imports
	assertEquals(result.length >= 2, true)

	// Check structure of first import
	if (result.length > 0) {
		const firstImport = result[0]
		assertEquals(typeof firstImport.source, "string")
		assertEquals(typeof firstImport.specifier, "string")
		assertEquals(typeof firstImport.line, "number")
		assertEquals(typeof firstImport.column, "number")
		assertEquals(firstImport.line > 0, true)
	}
})

Deno.test("parseImports - returns empty array for non-existent file", async () => {
	const result = await parseImports("/nonexistent/file.ts")

	assertEquals(result, [])
})

Deno.test("parseImports - returns empty array for file with invalid syntax", async () => {
	// Create a temporary file with invalid syntax
	const tempFile = await Deno.makeTempFile({ suffix: ".ts" })
	await Deno.writeTextFile(tempFile, "import { from 'invalid syntax")

	const result = await parseImports(tempFile)

	assertEquals(result, [])

	// Cleanup
	await Deno.remove(tempFile)
})

Deno.test("parseImports - handles type imports", async () => {
	// Create a temporary file with type imports
	const tempFile = await Deno.makeTempFile({ suffix: ".ts" })
	await Deno.writeTextFile(
		tempFile,
		`import type { Foo } from "./types.ts"
import { bar } from "./utils.ts"`,
	)

	const result = await parseImports(tempFile)

	assertEquals(result.length, 2)

	// Cleanup
	await Deno.remove(tempFile)
})
