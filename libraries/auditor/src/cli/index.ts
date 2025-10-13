import type { FunctionSignature } from "../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import orchestrateTestGeneration from "../orchestrateTestGeneration/index.ts"
import { TypeKind } from "../types/index.ts"

// Example toolsmith signatures for testing
const TOOLSMITH_SIGNATURES: Record<string, FunctionSignature> = {
	"array/map": {
		name: "map",
		path: "libraries/toolsmith/src/array/map/index.ts",
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
		path: "libraries/toolsmith/src/array/filter/index.ts",
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
		path: "libraries/toolsmith/src/math/add/index.ts",
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
}

export default async function runCli(): Promise<void> {
	console.log("🚀 @sitebender/auditor - Test Generator CLI")
	console.log("=".repeat(80))
	console.log("\nGenerating tests for @sitebender/toolsmith functions...")
	console.log("Target: 100% coverage for 900+ functions")
	console.log("Method: Automatic test generation with zero manual writing\n")

	try {
		await orchestrateTestGeneration(TOOLSMITH_SIGNATURES)
		console.log("\n✅ Test generation complete!")
		console.log(
			"🎯 Next: Run the generated tests with 'deno task test:toolsmith'",
		)
	} catch (error) {
		console.error("\n❌ Test generation failed:")
		console.error(error)
		Deno.exit(1)
	}
}

if (import.meta.main) {
	runCli()
}
