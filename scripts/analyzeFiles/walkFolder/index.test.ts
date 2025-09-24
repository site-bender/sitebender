import { assertEquals } from "https://deno.land/std/assert/mod.ts"
import { join } from "jsr:@std/path"

import walkFolder from "./index.ts"

//++ Tests for walkFolder async generator function
Deno.test("walkFolder", async function testWalkFolder(t) {
	// Create temporary test directory structure
	const testDir = await Deno.makeTempDir()
	const testRoot = testDir

	// Create test file structure
	await Deno.mkdir(join(testDir, "src"), { recursive: true })
	await Deno.mkdir(join(testDir, "src/codewright"), { recursive: true })
	await Deno.mkdir(join(testDir, "src/utils"), { recursive: true })
	await Deno.mkdir(join(testDir, "node_modules"), { recursive: true })
	await Deno.mkdir(join(testDir, ".git"), { recursive: true })

	// Create test files
	await Deno.writeTextFile(join(testDir, "src/index.ts"), "")
	await Deno.writeTextFile(join(testDir, "src/app.tsx"), "")
	await Deno.writeTextFile(join(testDir, "src/style.css"), "")
	await Deno.writeTextFile(join(testDir, "src/codewright/Button.tsx"), "")
	await Deno.writeTextFile(join(testDir, "src/codewright/Header.tsx"), "")
	await Deno.writeTextFile(join(testDir, "src/utils/helpers.ts"), "")
	await Deno.writeTextFile(join(testDir, "src/utils/api.js"), "")
	await Deno.writeTextFile(join(testDir, "node_modules/lib.ts"), "")

	await t.step("generates files from directory", async function testGeneratesFiles() {
		const files: Array<string> = []

		for await (const file of walkFolder({
			root: testRoot,
			dir: "src",
			extensions: [".ts", ".tsx"],
			excludedDirNames: new Set(),
		})) {
			files.push(file)
		}

		assertEquals(files.length, 5)

		const relativePaths = files.map(f => f.replace(testRoot + "/", "")).sort()
		assertEquals(relativePaths, [
			"src/app.tsx",
			"src/codewright/Button.tsx",
			"src/codewright/Header.tsx",
			"src/index.ts",
			"src/utils/helpers.ts",
		])
	})

	await t.step("excludes specified directories", async function testExcludes() {
		const files: Array<string> = []

		for await (const file of walkFolder({
			root: testRoot,
			dir: "",
			extensions: [".ts", ".tsx"],
			excludedDirNames: new Set(["node_modules", ".git"]),
		})) {
			files.push(file)
		}

		const relativePaths = files.map(f => f.replace(testRoot + "/", ""))
		assertEquals(relativePaths.includes("node_modules/lib.ts"), false)
	})

	await t.step("filters by extensions", async function testFilterExtensions() {
		const tsFiles: Array<string> = []

		for await (const file of walkFolder({
			root: testRoot,
			dir: "src",
			extensions: [".ts"],
			excludedDirNames: new Set(),
		})) {
			tsFiles.push(file)
		}

		assertEquals(tsFiles.length, 2)

		const tsxFiles: Array<string> = []

		for await (const file of walkFolder({
			root: testRoot,
			dir: "src",
			extensions: [".tsx"],
			excludedDirNames: new Set(),
		})) {
			tsxFiles.push(file)
		}

		assertEquals(tsxFiles.length, 3)
	})

	await t.step("handles non-existent directory gracefully", async function testNonExistent() {
		const files: Array<string> = []

		for await (const file of walkFolder({
			root: testRoot,
			dir: "non-existent",
			extensions: [".ts"],
			excludedDirNames: new Set(),
		})) {
			files.push(file)
		}

		assertEquals(files.length, 0)
	})

	await t.step("handles empty directory", async function testEmptyDir() {
		await Deno.mkdir(join(testDir, "empty"), { recursive: true })

		const files: Array<string> = []

		for await (const file of walkFolder({
			root: testRoot,
			dir: "empty",
			extensions: [".ts"],
			excludedDirNames: new Set(),
		})) {
			files.push(file)
		}

		assertEquals(files.length, 0)
	})

	await t.step("returns absolute paths", async function testAbsolutePaths() {
		const files: Array<string> = []

		for await (const file of walkFolder({
			root: testRoot,
			dir: "src",
			extensions: [".ts"],
			excludedDirNames: new Set(),
		})) {
			files.push(file)
		}

		const allAbsolute = files.every(f => f.startsWith("/"))
		assertEquals(allAbsolute, true)
	})

	// Cleanup
	await Deno.remove(testDir, { recursive: true })
})

//?? [EXAMPLE] Run with: deno test --allow-all scripts/analyzeFiles/walkFolder/index.test.ts
