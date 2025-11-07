import type { SymbolInfo } from "../../../../../types/semantics/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import _convertReference from "../_convertReference/index.ts"

export default function _buildSymbolTable(
	symbolTableData: Record<string, unknown>,
): Map<string, SymbolInfo> {
	const entries = Object.entries(symbolTableData)

	const result = reduce(
		function addSymbol(acc: Map<string, SymbolInfo>) {
			return function addSymbolWithAcc(
				[key, value]: [string, unknown],
			): Map<string, SymbolInfo> {
				if (and(value)(isEqual(typeof value)("object"))) {
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
					const newMap = new Map(acc)
					newMap.set(key, {
						name: symbol.name ?? key,
						kind: (symbol.kind ?? "variable") as SymbolInfo["kind"],
						type: symbol.symbol_type ?? "unknown",
						isExported: symbol.is_exported ?? false,
						definition: symbol.definition
							? {
								file: symbol.definition.file ?? "",
								line: symbol.definition.line ?? 0,
								column: symbol.definition.column ?? 0,
								start: symbol.definition.start ?? 0,
								end: symbol.definition.end ?? 0,
							}
							: undefined,
						references: getOrElse([] as ReadonlyArray<{
							file: string
							line: number
							column: number
							start: number
							end: number
						}>)(map(_convertReference)(symbol.references ?? [])),
					})
					return newMap
				}
				return acc
			}
		},
	)(new Map<string, SymbolInfo>())(entries)

	return getOrElse(new Map<string, SymbolInfo>())(result)
}
