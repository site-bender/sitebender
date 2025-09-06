#!/usr/bin/env -S deno run --allow-read

import analyzeBranches from "./scripts/testGenerator/analyzeBranches/index.ts"
import generateBenchmarks from "./scripts/testGenerator/generateBenchmarks/index.ts"
import { TypeKind } from "./scripts/testGenerator/types/index.ts"
import type { FunctionSignature } from "./scripts/testGenerator/types/index.ts"

// Test with the add function
const addSignature: FunctionSignature = {
	name: "add",
	path: "libraries/toolkit/src/simple/math/add/index.ts",
	parameters: [
		{
			name: "augend",
			type: { raw: "number", kind: TypeKind.Primitive },
			optional: false,
		},
		{
			name: "addend",
			type: { raw: "number", kind: TypeKind.Primitive },
			optional: false,
		},
	],
	returnType: { raw: "number", kind: TypeKind.Primitive },
	generics: [],
	isCurried: true,
	isAsync: false,
	isGenerator: false,
}

// Read the source code
const sourceCode = await Deno.readTextFile(addSignature.path)
console.log("Source code loaded:", sourceCode.length, "characters")

// Test branch analysis
console.log("\n=== Testing Branch Analysis ===")
try {
	const branches = analyzeBranches(addSignature, sourceCode)
	console.log(`Found ${branches.length} branches:`)
	branches.forEach((branch, i) => {
		console.log(
			`  ${
				i + 1
			}. ${branch.id}: ${branch.condition} (line ${branch.line})`,
		)
		if (branch.requiredInputs.length > 0) {
			branch.requiredInputs.forEach((input) => {
				console.log(`     - ${input.description}: ${input.value}`)
			})
		}
	})
} catch (error) {
	console.error("Branch analysis failed:", error)
}

// Test benchmark generation
console.log("\n=== Testing Benchmark Generation ===")
try {
	const benchmarks = generateBenchmarks(addSignature, sourceCode)
	console.log(`Generated ${benchmarks.benchmarks.length} benchmarks:`)
	benchmarks.benchmarks.forEach((bench, i) => {
		console.log(`  ${i + 1}. ${bench.name}: ${bench.description}`)
		console.log(
			`     Iterations: ${bench.iterations}, Input: ${
				JSON.stringify(bench.input)
			}`,
		)
	})
} catch (error) {
	console.error("Benchmark generation failed:", error)
}

console.log("\n✅ Test complete!")
