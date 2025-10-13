//++ Convert WASM semantic info to our TypeScript types
import type {
	Diagnostic,
	SemanticInfo,
} from "../../../../types/semantics/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import _convertReference from "./_convertReference/index.ts"
import _convertInferredType from "./_convertInferredType/index.ts"
import _convertDiagnostic from "./_convertDiagnostic/index.ts"
import _convertDependency from "./_convertDependency/index.ts"
import _buildSymbolTable from "./_buildSymbolTable/index.ts"

// Types for WASM interop
type WasmSemanticInfo = {
	"inferred_types": Record<string, string>
	purity: {
		"is_pure": boolean
		reasons: string[]
		"side_effects": string[]
	}
	complexity: {
		cyclomatic: number
		cognitive: number
		halstead: {
			volume: number
			difficulty: number
			effort: number
		}
	}
	"mathematical_properties": {
		commutative?: boolean
		associative?: boolean
		idempotent?: boolean
		distributive?: boolean
		invertible?: boolean
	}
	"symbol_table": Record<string, unknown>
	diagnostics: unknown[]
	"type_dependencies": Record<string, string[]>
}

export default function convertWasmSemanticInfo(wasmInfo: WasmSemanticInfo): SemanticInfo {
	// Convert symbol table entries to proper SymbolInfo types
	const symbolTable = _buildSymbolTable(or(wasmInfo["symbol_table"])({}) as Record<string, unknown>)

	return {
		inferredTypes: new Map(getOrElse([] as ReadonlyArray<[string, string]>)(map(_convertInferredType)(Object.entries(or(wasmInfo["inferred_types"])({}) as Record<string, unknown>)))),
		purity: {
			isPure: or(wasmInfo.purity?.["is_pure"])(false) as boolean,
			reasons: or(wasmInfo.purity?.reasons)([]) as string[],
			sideEffects: or(wasmInfo.purity?.["side_effects"])([]) as string[],
		},
		complexity: {
			cyclomatic: or(wasmInfo.complexity?.cyclomatic)(1) as number,
			cognitive: or(wasmInfo.complexity?.cognitive)(1) as number,
			halstead: {
				volume: or(wasmInfo.complexity?.halstead?.volume)(0) as number,
				difficulty: or(wasmInfo.complexity?.halstead?.difficulty)(0) as number,
				effort: or(wasmInfo.complexity?.halstead?.effort)(0) as number,
			},
		},
		mathematicalProperties: {
			commutative: wasmInfo["mathematical_properties"]?.commutative,
			associative: wasmInfo["mathematical_properties"]?.associative,
			idempotent: wasmInfo["mathematical_properties"]?.idempotent,
			distributive: wasmInfo["mathematical_properties"]?.distributive,
			invertible: wasmInfo["mathematical_properties"]?.invertible,
		},
		symbolTable,
		diagnostics: getOrElse([] as ReadonlyArray<Diagnostic>)(map(_convertDiagnostic)(or(wasmInfo.diagnostics)([]) as unknown[])),
		typeDependencies: new Map(
			getOrElse([] as ReadonlyArray<[string, readonly string[]]>)(map(_convertDependency)(Object.entries(or(wasmInfo["type_dependencies"])({}) as Record<string, unknown>))),
		),
	}
}
