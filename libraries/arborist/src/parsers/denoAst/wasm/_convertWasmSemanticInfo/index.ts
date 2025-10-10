//++ Convert WASM semantic info to our TypeScript types
import type {
	SemanticInfo,
	SymbolInfo,
} from "../../../../types/semantics/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

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
	const symbolTable = new Map<string, SymbolInfo>()
	for (const [key, value] of Object.entries(wasmInfo["symbol_table"] || {})) {
		if (value && isEqual(typeof value)("object")) {
			const symbol = value as {
				name?: string
				kind?: string
				symbol_type?: string
				is_exported?: boolean
				definition?: {
					file?: string
					line?: number
					column?: number
					start?: number
					end?: number
				}
				references?: Array<{
					file?: string
					line?: number
					column?: number
					start?: number
					end?: number
				}>
			}
			symbolTable.set(key, {
				name: symbol.name || key,
				kind: (symbol.kind || "variable") as SymbolInfo["kind"],
				type: symbol.symbol_type || "unknown",
				isExported: symbol.is_exported || false,
				definition: symbol.definition
					? {
						file: symbol.definition.file || "",
						line: symbol.definition.line || 0,
						column: symbol.definition.column || 0,
						start: symbol.definition.start || 0,
						end: symbol.definition.end || 0,
					}
					: undefined,
				references: (symbol.references || []).map((ref) => ({
					file: ref.file || "",
					line: ref.line || 0,
					column: ref.column || 0,
					start: ref.start || 0,
					end: ref.end || 0,
				})),
			})
		}
	}

	return {
		inferredTypes: new Map(Object.entries(wasmInfo["inferred_types"] || {})),
		purity: {
			isPure: wasmInfo.purity?.["is_pure"] || false,
			reasons: wasmInfo.purity?.reasons || [],
			sideEffects: wasmInfo.purity?.["side_effects"] || [],
		},
		complexity: {
			cyclomatic: wasmInfo.complexity?.cyclomatic || 1,
			cognitive: wasmInfo.complexity?.cognitive || 1,
			halstead: {
				volume: wasmInfo.complexity?.halstead?.volume || 0,
				difficulty: wasmInfo.complexity?.halstead?.difficulty || 0,
				effort: wasmInfo.complexity?.halstead?.effort || 0,
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
		diagnostics: (wasmInfo.diagnostics || []) as readonly unknown[],
		typeDependencies: new Map(
			Object.entries(wasmInfo["type_dependencies"] || {}).map((
				[k, v],
			) => [k, v as readonly string[]]),
		),
	}
}
