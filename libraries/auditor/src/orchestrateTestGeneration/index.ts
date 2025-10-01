#!/usr/bin/env -S deno run --allow-read --allow-write

import type { FunctionSignature } from "../types/index.ts"

import generateTests from "../generateTests/index.ts"
import { TypeKind } from "../types/index.ts"
import writeTestFile from "../writeTestFile/index.ts"

const TOOLSMITH_SIGNATURES: Record<string, FunctionSignature> = {
	"array/map": {
		name: "map",
		path: "libraries/toolsmith/src/vanilla/array/map/index.ts",
		parameters: [
			{
				name: "fn",
				type: {
					raw: "(value: T, index: number) => U",
					kind: TypeKind.Function,
				},
				optional: false,
			},
			{
				name: "array",
				type: {
					raw: "Array<T>",
					kind: TypeKind.Array,
					elementType: {
						raw: "T",
						kind: TypeKind.Generic,
					},
				},
				optional: false,
			},
		],
		returnType: {
			raw: "Array<U>",
			kind: TypeKind.Array,
			elementType: {
				raw: "U",
				kind: TypeKind.Generic,
			},
		},
		generics: [
			{ name: "T" },
			{ name: "U" },
		],
		isCurried: true,
		isAsync: false,
		isGenerator: false,
	},

	"array/filter": {
		name: "filter",
		path: "libraries/toolsmith/src/vanilla/array/filter/index.ts",
		parameters: [
			{
				name: "predicate",
				type: {
					raw: "(value: T, index: number) => boolean",
					kind: TypeKind.Function,
				},
				optional: false,
			},
			{
				name: "array",
				type: {
					raw: "Array<T>",
					kind: TypeKind.Array,
					elementType: {
						raw: "T",
						kind: TypeKind.Generic,
					},
				},
				optional: false,
			},
		],
		returnType: {
			raw: "Array<T>",
			kind: TypeKind.Array,
			elementType: {
				raw: "T",
				kind: TypeKind.Generic,
			},
		},
		generics: [
			{ name: "T" },
		],
		isCurried: true,
		isAsync: false,
		isGenerator: false,
	},

	"math/add": {
		name: "add",
		path: "libraries/toolsmith/src/vanilla/math/add/index.ts",
		parameters: [
			{
				name: "a",
				type: {
					raw: "number",
					kind: TypeKind.Primitive,
				},
				optional: false,
			},
			{
				name: "b",
				type: {
					raw: "number",
					kind: TypeKind.Primitive,
				},
				optional: false,
			},
		],
		returnType: {
			raw: "number",
			kind: TypeKind.Primitive,
		},
		generics: [],
		isCurried: true,
		isAsync: false,
		isGenerator: false,
	},

	"string/trim": {
		name: "trim",
		path: "libraries/toolsmith/src/vanilla/string/trim/index.ts",
		parameters: [
			{
				name: "str",
				type: {
					raw: "string",
					kind: TypeKind.Primitive,
				},
				optional: false,
			},
		],
		returnType: {
			raw: "string",
			kind: TypeKind.Primitive,
		},
		generics: [],
		isCurried: false,
		isAsync: false,
		isGenerator: false,
	},

	"validation/isEmail": {
		name: "isEmail",
		path: "libraries/toolsmith/src/vanilla/validation/isEmail/index.ts",
		parameters: [
			{
				name: "value",
				type: {
					raw: "unknown",
					kind: TypeKind.Unknown,
				},
				optional: false,
			},
		],
		returnType: {
			raw: "boolean",
			kind: TypeKind.Primitive,
		},
		generics: [],
		isCurried: false,
		isAsync: false,
		isGenerator: false,
	},
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default async function orchestrateTestGeneration(
	signatures: Record<string, FunctionSignature>,
): Promise<Map<string, string>> {
	console.log("🚀 @sitebender/toolsmith Test Generator")
	console.log("=".repeat(80))

	analyzeAndPrioritize(signatures)

	console.log("\n" + "=".repeat(80))
	console.log("GENERATING TESTS FOR FUNCTIONS")
	console.log("=".repeat(80))

	const priorityFunctions: Array<[string, FunctionSignature]> = Object
		.entries(signatures)
	const testFiles = await generateBatchTests(priorityFunctions)

	generateReport(testFiles)

	return writeTestFiles(testFiles)
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
async function generateTestsForFunction(
	signature: FunctionSignature,
): Promise<string> {
	console.log(`\n${"=".repeat(80)}`)
	console.log(`Generating tests for: ${signature.name}`)
	console.log("=".repeat(80))

	const testSuite = await generateTests(signature.path)
	console.log(`✓ Generated ${testSuite.testCases.length} test cases`)

	const testContent = await writeTestFile(
		testSuite.functionPath,
		testSuite.functionName,
		testSuite.testCases,
		signature,
	)
	console.log(`✓ Generated test file at: ${testContent}`)

	const fileContent = await Deno.readTextFile(testContent)
	return fileContent
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
async function generateBatchTests(
	signatures: Array<[string, FunctionSignature]>,
): Promise<Map<string, string>> {
	const testFiles = new Map<string, string>()

	const promises = signatures.map(async ([key, signature]) => {
		const tests = await generateTestsForFunction(signature)
		return { key, tests }
	})

	const results = await Promise.all(promises)
	results.forEach(({ key, tests }) => {
		testFiles.set(key, tests)
	})

	return testFiles
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function analyzeAndPrioritize(
	signatures: Record<string, FunctionSignature>,
): void {
	console.log("\n" + "=".repeat(80))
	console.log("ANALYZING @sitebender/toolsmith")
	console.log("=".repeat(80))

	console.log("\nCurrent priority functions:")
	Object.entries(signatures).forEach(([key, sig]) => {
		console.log(`  - ${key}: ${sig.name}`)
	})
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function generateReport(testFiles: Map<string, string>): void {
	console.log("\n" + "=".repeat(80))
	console.log("TEST GENERATION REPORT")
	console.log("=".repeat(80))

	const stats = Array.from(testFiles.entries()).reduce(
		(acc, [key, content]) => {
			const testCount = (content.match(/Deno\.test\(/g) ?? []).length
			const lineCount = content.split("\n").length

			console.log(`\n${key}:`)
			console.log(`  Tests generated: ${testCount}`)
			console.log(`  Lines of code: ${lineCount}`)

			return {
				totalTests: acc.totalTests + testCount,
				totalLines: acc.totalLines + lineCount,
			}
		},
		{ totalTests: 0, totalLines: 0 },
	)

	console.log("\n" + "-".repeat(80))
	console.log("SUMMARY:")
	console.log(`  Functions processed: ${testFiles.size}`)
	console.log(`  Total tests generated: ${stats.totalTests}`)
	console.log(`  Total lines generated: ${stats.totalLines}`)
	console.log(
		`  Average tests per function: ${
			(stats.totalTests / testFiles.size).toFixed(1)
		}`,
	)
	console.log(
		`  Average lines per function: ${
			(stats.totalLines / testFiles.size).toFixed(0)
		}`,
	)
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
async function writeTestFiles(
	testFiles: Map<string, string>,
): Promise<Map<string, string>> {
	const entries = Array.from(testFiles.entries())
	const promises = entries.map(
		async function writeIndividualFile([key, content]) {
			const testPath =
				`tests/libraries/toolsmith/generated/${key}/index.test.ts`
			console.log(`Writing test to: ${testPath}`)

			// Ensure directory exists
			const dir = testPath.substring(0, testPath.lastIndexOf("/"))
			await Deno.mkdir(dir, { recursive: true })

			// Write the content directly
			await Deno.writeTextFile(testPath, content)
		},
	)

	await Promise.all(promises)
	return testFiles
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
async function main(): Promise<void> {
	await orchestrateTestGeneration(TOOLSMITH_SIGNATURES)
	console.log("\n✅ Test generation complete!")
	console.log(
		"🎯 Goal: 100% coverage for 900 functions with ZERO manual test writing",
	)
}

if (import.meta.main) {
	main().catch(console.error)
}
