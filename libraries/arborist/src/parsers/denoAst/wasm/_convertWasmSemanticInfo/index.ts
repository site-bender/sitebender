//++ Convert WASM semantic info to our TypeScript types
import type {
	SemanticInfo,
	SymbolInfo,
} from "../../../../types/semantics/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

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
	for (const [key, value] of Object.entries(or(wasmInfo["symbol_table"])({}) as Record<string, unknown>)) {
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
				name: or(symbol.name)(key) as string,
				kind: (or(symbol.kind)("variable") as string) as SymbolInfo["kind"],
				type: or(symbol.symbol_type)("unknown") as string,
				isExported: or(symbol.is_exported)(false) as boolean,
				definition: symbol.definition
					? {
						file: or(symbol.definition.file)("") as string,
						line: or(symbol.definition.line)(0) as number,
						column: or(symbol.definition.column)(0) as number,
						start: or(symbol.definition.start)(0) as number,
						end: or(symbol.definition.end)(0) as number,
					}
					: undefined,
				references: (or(symbol.references)([]) as unknown[]).map((ref) => ({
					file: or((ref as Record<string, unknown>).file)("") as string,
					line: or((ref as Record<string, unknown>).line)(0) as number,
					column: or((ref as Record<string, unknown>).column)(0) as number,
					start: or((ref as Record<string, unknown>).start)(0) as number,
					end: or((ref as Record<string, unknown>).end)(0) as number,
				})),
			})
		}
	}

	return {
		inferredTypes: new Map(Object.entries(or(wasmInfo["inferred_types"])({}) as Record<string, unknown>).map(([k, v]) => [k, String(v)])),
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
		diagnostics: (or(wasmInfo.diagnostics)([]) as unknown[]) as readonly unknown[],
		typeDependencies: new Map(
			Object.entries(or(wasmInfo["type_dependencies"])({}) as Record<string, unknown>).map((
				[k, v],
			) => [k, v as readonly string[]]),
		),
	}
}
