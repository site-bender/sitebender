import {
	assertEquals,
	assertExists,
} from "https://deno.land/std/assert/mod.ts"

import analyzeFile from "./index.ts"

//++ Tests for analyzeFile function that analyzes TypeScript files for functions and exports
Deno.test("analyzeFile", async function testAnalyzeFile(t) {
	// Create a temporary test file
	const testDir = await Deno.makeTempDir()
	const testFile = `${testDir}/test.ts`

	await t.step("analyzes simple function declarations", async function testSimpleFunctions() {
		const content = `
export default function main() {
	return "hello"
}

function helper(x: number): number {
	return x * 2
}

export function publicFunc() {
	console.log("public")
}
`
		await Deno.writeTextFile(testFile, content)

		const result = await analyzeFile({
			absPath: testFile,
			root: testDir,
		})

		assertEquals(result.file, "test.ts")
		assertEquals(result.lines, 12)
		assertEquals(result.functions.length, 3)

		// Check function names
		const funcNames = result.functions.map(f => f.name)
		assertEquals(funcNames.includes("main"), true)
		assertEquals(funcNames.includes("helper"), true)
		assertEquals(funcNames.includes("publicFunc"), true)
	})

	await t.step("analyzes arrow functions", async function testArrowFunctions() {
		const content = `
const add = (a: number, b: number) => a + b

const multiply = (x: number, y: number) => {
	return x * y
}

export const divide = (a: number, b: number) => a / b
`
		await Deno.writeTextFile(testFile, content)

		const result = await analyzeFile({
			absPath: testFile,
			root: testDir,
		})

		assertEquals(result.functions.length, 3)
		const funcNames = result.functions.map(f => f.name)
		assertEquals(funcNames.includes("add"), true)
		assertEquals(funcNames.includes("multiply"), true)
		assertEquals(funcNames.includes("divide"), true)

		// Check function kinds
		const addFunc = result.functions.find(f => f.name === "add")
		assertEquals(addFunc?.kind, "concise")

		const multiplyFunc = result.functions.find(f => f.name === "multiply")
		assertEquals(multiplyFunc?.kind, "block")
	})

	await t.step("tracks export information", async function testExports() {
		const content = `
export default function defaultFunc() {}

export function namedExport1() {}
export const namedExport2 = () => {}

function internal() {}

export { internal as externalName }
`
		await Deno.writeTextFile(testFile, content)

		const result = await analyzeFile({
			absPath: testFile,
			root: testDir,
		})

		assertExists(result.defaultExportName)
		assertEquals(result.nonDefaultExports.has("namedExport1"), true)
		assertEquals(result.nonDefaultExports.has("namedExport2"), true)
		assertEquals(result.nonDefaultExports.has("externalName"), true)
	})

	await t.step("handles async functions", async function testAsyncFunctions() {
		const content = `
async function fetchData() {
	return await fetch("/api")
}

const processData = async (data: any) => {
	await delay(100)
	return data
}

export default async function main() {
	await fetchData()
}
`
		await Deno.writeTextFile(testFile, content)

		const result = await analyzeFile({
			absPath: testFile,
			root: testDir,
		})

		assertEquals(result.functions.length, 3)
		const funcNames = result.functions.map(f => f.name)
		assertEquals(funcNames.includes("fetchData"), true)
		assertEquals(funcNames.includes("processData"), true)
		assertEquals(funcNames.includes("main"), true)
	})

	await t.step("respects onlyDefault option", async function testOnlyDefault() {
		const content = `
export default function defaultFunc() {
	return "default"
}

function helper() {
	return "helper"
}

export function namedExport() {
	return "named"
}
`
		await Deno.writeTextFile(testFile, content)

		const result = await analyzeFile({
			absPath: testFile,
			root: testDir,
			onlyDefault: true,
		})

		// Should only include the default export
		assertEquals(result.functions.length, 1)
		assertEquals(result.functions[0].name, "defaultFunc")
	})

	await t.step("calculates lines of code correctly", async function testLinesOfCode() {
		const content = `
function shortFunc() {
	return 42
}

function mediumFunc() {
	const a = 1
	const b = 2
	const c = 3
	return a + b + c
}

function longFunc() {
	// Comment line
	const x = 1
	const y = 2

	if (x > y) {
		return x
	} else {
		return y
	}
}
`
		await Deno.writeTextFile(testFile, content)

		const result = await analyzeFile({
			absPath: testFile,
			root: testDir,
		})

		assertEquals(result.functions.length, 3)

		const short = result.functions.find(f => f.name === "shortFunc")
		assertEquals(short?.loc, 3)

		const medium = result.functions.find(f => f.name === "mediumFunc")
		assertEquals(medium?.loc, 6)

		const long = result.functions.find(f => f.name === "longFunc")
		assertExists(long)
		assertEquals(long.loc > 6, true)
	})

	// Cleanup
	await Deno.remove(testDir, { recursive: true })
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/analyzeFile/index.test.ts