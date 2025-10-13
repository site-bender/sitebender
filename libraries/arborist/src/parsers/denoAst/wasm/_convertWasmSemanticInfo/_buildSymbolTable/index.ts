import type { SymbolInfo } from "../../../../../types/semantics/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import _convertReference from "../_convertReference/index.ts"

export default function _buildSymbolTable(
	symbolTableData: Record<string, unknown>
): Map<string, SymbolInfo> {
	const entries = Object.entries(symbolTableData)

	const result = reduce(
		function addSymbol(acc: Map<string, SymbolInfo>) {
			return function addSymbolWithAcc([key, value]: [string, unknown]): Map<string, SymbolInfo> {
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
						references: getOrElse([] as ReadonlyArray<{
							file: string
							line: number
							column: number
							start: number
							end: number
						}>)(map(_convertReference)(or(symbol.references)([]) as unknown[])),
					})
					return newMap
				}
				return acc
			}
		}
	)(new Map<string, SymbolInfo>())(entries)

	return getOrElse(new Map<string, SymbolInfo>())(result)
}
