//++ Serialize a pattern node (used in function parameters, destructuring)
//++ Returns Result with serialized pattern or error for unsupported pattern types
//++
//++ @param node - Pattern AST node
//++ @returns Result<FunctionExtractionError, string>
//++
//++ Error kinds:
//++ - UnsupportedPatternType: unknown or unsupported pattern node type
import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { FunctionExtractionError } from "../types/errors/index.ts"

import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import _serializeProperty from "./_serializeProperty/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

export default function _serializePattern(
	node: unknown,
): Result<FunctionExtractionError, string> {
	if (!node) {
		return ok("")
	}

	const nodeObj = node as Record<string, unknown>
	const nodeType = nodeObj.type as string

	// Pattern matching via serializer map
	const serializers: Record<
		string,
		(n: Record<string, unknown>) => Result<FunctionExtractionError, string>
	> = {
		Identifier: function serializeIdentifier(
			n: Record<string, unknown>,
		): Result<FunctionExtractionError, string> {
			const value = n.value as string | undefined
			if (!value) {
				return error({
					operation: "extractFunctions",
					kind: "UnsupportedPatternType",
					nodeType: "Identifier",
					message: "Identifier node has no value",
					code: "INVALID_ARGUMENT",
					args: [],
					timestamp: Date.now(),
				} as FunctionExtractionError)
			}
			return ok(value)
		},
		RestElement: function serializeRestElement(
			n: Record<string, unknown>,
		): Result<FunctionExtractionError, string> {
			const argumentResult = _serializePattern(n.argument)
			if (argumentResult._tag === "Error") {
				return argumentResult
			}
			return ok(`...${argumentResult.value}`)
		},
		ArrayPattern: function serializeArrayPattern(
			n: Record<string, unknown>,
		): Result<FunctionExtractionError, string> {
			const elements = (n.elements as ReadonlyArray<unknown>) ?? []
			// Use reduce to accumulate Results
			const elementsResult = reduce<
				unknown,
				Result<FunctionExtractionError, ReadonlyArray<string>>
			>(
				function accumulateElements(
					accResult: Result<FunctionExtractionError, ReadonlyArray<string>>,
					element: unknown,
				): Result<FunctionExtractionError, ReadonlyArray<string>> {
					if (accResult._tag === "Error") {
						return accResult
					}
					const elementResult = _serializePattern(element)
					if (elementResult._tag === "Error") {
						return elementResult
					}
					return ok([...accResult.value, elementResult.value])
				},
			)(ok([] as ReadonlyArray<string>))(elements)

			if (elementsResult._tag === "Error") {
				return elementsResult
			}
			const serialized = elementsResult.value.join(", ")
			return ok(`[${serialized}]`)
		},
		ObjectPattern: function serializeObjectPattern(
			n: Record<string, unknown>,
		): Result<FunctionExtractionError, string> {
			const properties =
				(n.properties as ReadonlyArray<Record<string, unknown>>) ?? []
			// Use reduce to accumulate Results from _serializeProperty
			const propsResult = reduce<
				Record<string, unknown>,
				Result<FunctionExtractionError, ReadonlyArray<string>>
			>(
				function accumulateProperties(
					accResult: Result<FunctionExtractionError, ReadonlyArray<string>>,
					prop: Record<string, unknown>,
				): Result<FunctionExtractionError, ReadonlyArray<string>> {
					if (accResult._tag === "Error") {
						return accResult
					}
					const propResult = _serializeProperty(prop)
					if (propResult._tag === "Error") {
						return propResult
					}
					return ok([...accResult.value, propResult.value])
				},
			)(ok([] as ReadonlyArray<string>))(properties)

			if (propsResult._tag === "Error") {
				return propsResult
			}
			const serialized = propsResult.value.join(", ")
			return ok(`{ ${serialized} }`)
		},
	}

	const serializer = serializers[nodeType]

	if (!serializer) {
		return error({
			operation: "extractFunctions",
			kind: "UnsupportedPatternType",
			nodeType,
			message: `Unsupported pattern type: ${nodeType}`,
			code: "INVALID_ARGUMENT",
			args: [],
			timestamp: Date.now(),
		} as FunctionExtractionError)
	}

	return serializer(nodeObj)
}
