import { assertEquals } from "https://deno.land/std/assert/mod.ts"
import { join } from "jsr:@std/path"

import collectFiles from "./index.ts"

//++ Tests for collectFiles function
Deno.test("collectFiles", async function testCollectFiles(t) {
	// Create temporary test directory structure
	const testDir = await Deno.makeTempDir()

	// Create test file structure
	await Deno.mkdir(join(testDir, "src"), { recursive: true })
	await Deno.mkdir(join(testDir, "src/architect"), { recursive: true })
	await Deno.mkdir(join(testDir, "src/utils"), { recursive: true })
	await Deno.mkdir(join(testDir, "node_modules"), { recursive: true })
	await Deno.mkdir(join(testDir, ".git"), { recursive: true })

	// Create test files
	await Deno.writeTextFile(join(testDir, "index.ts"), "")
	await Deno.writeTextFile(join(testDir, "readme.md"), "")
	await Deno.writeTextFile(join(testDir, "src/main.ts"), "")
	await Deno.writeTextFile(join(testDir, "src/app.tsx"), "")
	await Deno.writeTextFile(join(testDir, "src/style.css"), "")
	await Deno.writeTextFile(join(testDir, "src/architect/Button.tsx"), "")
	await Deno.writeTextFile(join(testDir, "src/architect/Header.tsx"), "")
	await Deno.writeTextFile(join(testDir, "src/utils/helpers.ts"), "")
	await Deno.writeTextFile(join(testDir, "src/utils/api.js"), "")
	await Deno.writeTextFile(join(testDir, "node_modules/lib.ts"), "")
	await Deno.writeTextFile(join(testDir, ".git/config"), "")

	await t.step("collects all matching files", async function testCollectsAll() {
		const files = await collectFiles({
			baseDir: testDir,
			extensions: [".ts", ".tsx"],
			excludedDirNames: new Set(),
		})

		assertEquals(files.length, 7)

		const relativePaths = files.map((f) => f.replace(testDir, "")).sort()
		assertEquals(relativePaths, [
			"/index.ts",
			"/node_modules/lib.ts",
			"/src/app.tsx",
			"/src/architect/Button.tsx",
			"/src/architect/Header.tsx",
			"/src/main.ts",
			"/src/utils/helpers.ts",
		])
	})

	await t.step("excludes specified directories", async function testExcludes() {
		const files = await collectFiles({
			baseDir: testDir,
			extensions: [".ts", ".tsx"],
			excludedDirNames: new Set(["node_modules", ".git"]),
		})

		assertEquals(files.length, 6)

		const relativePaths = files.map((f) => f.replace(testDir, ""))
		assertEquals(relativePaths.includes("/node_modules/lib.ts"), false)
	})

	await t.step("filters by extensions", async function testFilterExtensions() {
		const tsFiles = await collectFiles({
			baseDir: testDir,
			extensions: [".ts"],
			excludedDirNames: new Set(["node_modules", ".git"]),
		})

		assertEquals(tsFiles.length, 3)

		const tsxFiles = await collectFiles({
			baseDir: testDir,
			extensions: [".tsx"],
			excludedDirNames: new Set(["node_modules", ".git"]),
		})

		assertEquals(tsxFiles.length, 3)
	})

	await t.step("handles empty directory", async function testEmptyDir() {
		const emptyDir = join(testDir, "empty")
		await Deno.mkdir(emptyDir)

		const files = await collectFiles({
			baseDir: emptyDir,
			extensions: [".ts"],
			excludedDirNames: new Set(),
		})

		assertEquals(files.length, 0)
	})

	await t.step(
		"handles non-existent directory",
		async function testNonExistent() {
			const files = await collectFiles({
				baseDir: join(testDir, "non-existent"),
				extensions: [".ts"],
				excludedDirNames: new Set(),
			})

			assertEquals(files.length, 0)
		},
	)

	await t.step("returns absolute paths", async function testAbsolutePaths() {
		const files = await collectFiles({
			baseDir: testDir,
			extensions: [".ts"],
			excludedDirNames: new Set(["node_modules", ".git"]),
		})

		const allAbsolute = files.every((f) => f.startsWith("/"))
		assertEquals(allAbsolute, true)
	})

	// Cleanup
	await Deno.remove(testDir, { recursive: true })
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/walkFolder/collectFiles/index.test.ts
