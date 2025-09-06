#!/usr/bin/env -S deno run --allow-all
/**
 * Prover CLI
 * 
 * Command-line interface for the @sitebender/prover test generation library
 * 
 * Usage:
 *   deno run --allow-all libraries/prover/src/cli.ts [options]
 * 
 * Or with task:
 *   deno task prover:generate
 */

import { orchestrateTestGeneration } from "./orchestrateTestGeneration/index.ts"
import type { FunctionSignature } from "./types/index.ts"
import { TypeKind } from "./types/index.ts"

// Example toolkit signatures for testing
const TOOLKIT_SIGNATURES: Record<string, FunctionSignature> = {
	"array/map": {
		name: "map",
		path: "libraries/toolkit/src/simple/array/map/index.ts",
		parameters: [
			{ 
				name: "fn", 
				type: {
					raw: "(value: T, index: number) => U",
					kind: TypeKind.Function
				}, 
				optional: false 
			},
			{ 
				name: "array", 
				type: {
					raw: "Array<T>",
					kind: TypeKind.Array,
					elementType: {
						raw: "T",
						kind: TypeKind.Generic
					}
				}, 
				optional: false 
			}
		],
		returnType: {
			raw: "Array<U>",
			kind: TypeKind.Array,
			elementType: {
				raw: "U",
				kind: TypeKind.Generic
			}
		},
		generics: [
			{ name: "T" },
			{ name: "U" }
		],
		isCurried: true,
		isAsync: false,
		isGenerator: false
	},
	
	"array/filter": {
		name: "filter",
		path: "libraries/toolkit/src/simple/array/filter/index.ts",
		parameters: [
			{ 
				name: "predicate", 
				type: {
					raw: "(value: T, index: number) => boolean",
					kind: TypeKind.Function
				}, 
				optional: false 
			},
			{ 
				name: "array", 
				type: {
					raw: "Array<T>",
					kind: TypeKind.Array,
					elementType: {
						raw: "T",
						kind: TypeKind.Generic
					}
				}, 
				optional: false 
			}
		],
		returnType: {
			raw: "Array<T>",
			kind: TypeKind.Array,
			elementType: {
				raw: "T",
				kind: TypeKind.Generic
			}
		},
		generics: [
			{ name: "T" }
		],
		isCurried: true,
		isAsync: false,
		isGenerator: false
	},
	
	"math/add": {
		name: "add",
		path: "libraries/toolkit/src/simple/math/add/index.ts",
		parameters: [
			{ 
				name: "a", 
				type: {
					raw: "number",
					kind: TypeKind.Primitive
				}, 
				optional: false 
			},
			{ 
				name: "b", 
				type: {
					raw: "number",
					kind: TypeKind.Primitive
				}, 
				optional: false 
			}
		],
		returnType: {
			raw: "number",
			kind: TypeKind.Primitive
		},
		generics: [],
		isCurried: true,
		isAsync: false,
		isGenerator: false
	}
}

async function main(): Promise<void> {
	console.log("🚀 @sitebender/prover - Test Generator CLI")
	console.log("=" .repeat(80))
	console.log("\nGenerating tests for @sitebender/toolkit functions...")
	console.log("Target: 100% coverage for 900+ functions")
	console.log("Method: Automatic test generation with zero manual writing\n")
	
	try {
		await orchestrateTestGeneration(TOOLKIT_SIGNATURES)
		console.log("\n✅ Test generation complete!")
		console.log("🎯 Next: Run the generated tests with 'deno task test:toolkit'")
	} catch (error) {
		console.error("\n❌ Test generation failed:")
		console.error(error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	main()
}