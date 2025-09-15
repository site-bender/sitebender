import { assertEquals } from "https://deno.land/std/assert/mod.ts"
import { join } from "jsr:@std/path"

import walkFolder from "./index.ts"

//++ Tests for walkFolder generator that recursively walks directories
Deno.test("walkFolder", async function testWalkFolder(t) {
	// Create temporary test directory structure
	const testDir = await Deno.makeTempDir()

	// Create test file structure
	await Deno.mkdir(join(testDir, "src"), { recursive: true })
	await Deno.mkdir(join(testDir, "src/components"), { recursive: true })
	await Deno.mkdir(join(testDir, "src/utils"), { recursive: true })
	await Deno.mkdir(join(testDir, "node_modules"), { recursive: true })
	await Deno.mkdir(join(testDir, ".git"), { recursive: true })
	await Deno.mkdir(join(testDir, "tests"), { recursive: true })

	// Create test files
	await Deno.writeTextFile(join(testDir, "index.ts"), "")
	await Deno.writeTextFile(join(testDir, "readme.md"), "")
	await Deno.writeTextFile(join(testDir, "src/main.ts"), "")
	await Deno.writeTextFile(join(testDir, "src/app.tsx"), "")
	await Deno.writeTextFile(join(testDir, "src/style.css"), "")
	await Deno.writeTextFile(join(testDir, "src/components/Button.tsx"), "")
	await Deno.writeTextFile(join(testDir, "src/components/Header.tsx"), "")
	await Deno.writeTextFile(join(testDir, "src/utils/helpers.ts"), "")
	await Deno.writeTextFile(join(testDir, "src/utils/api.js"), "")
	await Deno.writeTextFile(join(testDir, "node_modules/lib.ts"), "")
	await Deno.writeTextFile(join(testDir, ".git/config"), "")
	await Deno.writeTextFile(join(testDir, "tests/app.test.ts"), "")

	await t.step("finds all TypeScript files", async function testFindTsFiles() {
		const files: string[] = []
		for await (const file of walkFolder({
			root: testDir,
			dir: "",
			exts: [".ts", ".tsx"],
			excludedDirNames: new Set(),
		})) {
			files.push(file.replace(testDir, ""))
		}

		files.sort()
		assertEquals(files.length, 7)
		assertEquals(files.includes("/index.ts"), true)
		assertEquals(files.includes("/src/main.ts"), true)
		assertEquals(files.includes("/src/app.tsx"), true)
		assertEquals(files.includes("/src/components/Button.tsx"), true)
		assertEquals(files.includes("/src/components/Header.tsx"), true)
		assertEquals(files.includes("/src/utils/helpers.ts"), true)
		assertEquals(files.includes("/tests/app.test.ts"), true)
	})

	await t.step("excludes specified directories", async function testExcludeDirs() {
		const files: string[] = []
		for await (const file of walkFolder({
			root: testDir,
			dir: "",
			exts: [".ts", ".tsx"],
			excludedDirNames: new Set(["node_modules", ".git", "tests"]),
		})) {
			files.push(file.replace(testDir, ""))
		}

		files.sort()
		assertEquals(files.length, 6)
		assertEquals(files.includes("/node_modules/lib.ts"), false)
		assertEquals(files.includes("/.git/config"), false)
		assertEquals(files.includes("/tests/app.test.ts"), false)
	})

	await t.step("filters by file extensions", async function testFilterExtensions() {
		const mdFiles: string[] = []
		for await (const file of walkFolder({
			root: testDir,
			dir: "",
			exts: [".md"],
			excludedDirNames: new Set(),
		})) {
			mdFiles.push(file.replace(testDir, ""))
		}

		assertEquals(mdFiles.length, 1)
		assertEquals(mdFiles[0], "/readme.md")

		const cssFiles: string[] = []
		for await (const file of walkFolder({
			root: testDir,
			dir: "",
			exts: [".css"],
			excludedDirNames: new Set(),
		})) {
			cssFiles.push(file.replace(testDir, ""))
		}

		assertEquals(cssFiles.length, 1)
		assertEquals(cssFiles[0], "/src/style.css")
	})

	await t.step("handles multiple extensions", async function testMultipleExtensions() {
		const files: string[] = []
		for await (const file of walkFolder({
			root: testDir,
			dir: "",
			exts: [".ts", ".tsx", ".js", ".jsx"],
			excludedDirNames: new Set(),
		})) {
			files.push(file.replace(testDir, ""))
		}

		files.sort()
		assertEquals(files.length, 8) // All TS/TSX files plus api.js
		assertEquals(files.includes("/src/utils/api.js"), true)
	})

	await t.step("works with subdirectory as starting point", async function testSubdirectory() {
		const files: string[] = []
		for await (const file of walkFolder({
			root: testDir,
			dir: "src/components",
			exts: [".tsx"],
			excludedDirNames: new Set(),
		})) {
			files.push(file.replace(testDir, ""))
		}

		files.sort()
		assertEquals(files.length, 2)
		assertEquals(files.includes("/src/components/Button.tsx"), true)
		assertEquals(files.includes("/src/components/Header.tsx"), true)
	})

	await t.step("handles non-existent directory gracefully", async function testNonExistent() {
		const files: string[] = []
		for await (const file of walkFolder({
			root: testDir,
			dir: "non-existent",
			exts: [".ts"],
			excludedDirNames: new Set(),
		})) {
			files.push(file)
		}

		assertEquals(files.length, 0)
	})

	await t.step("handles empty directory", async function testEmptyDir() {
		await Deno.mkdir(join(testDir, "empty"), { recursive: true })

		const files: string[] = []
		for await (const file of walkFolder({
			root: testDir,
			dir: "empty",
			exts: [".ts"],
			excludedDirNames: new Set(),
		})) {
			files.push(file)
		}

		assertEquals(files.length, 0)
	})

	await t.step("respects nested excluded directories", async function testNestedExclude() {
		// Create nested node_modules
		await Deno.mkdir(join(testDir, "src/components/node_modules"), { recursive: true })
		await Deno.writeTextFile(join(testDir, "src/components/node_modules/dep.ts"), "")

		const files: string[] = []
		for await (const file of walkFolder({
			root: testDir,
			dir: "src",
			exts: [".ts", ".tsx"],
			excludedDirNames: new Set(["node_modules"]),
		})) {
			files.push(file.replace(testDir, ""))
		}

		assertEquals(files.includes("/src/components/node_modules/dep.ts"), false)
	})

	// Cleanup
	await Deno.remove(testDir, { recursive: true })
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/walkFolder/index.test.ts