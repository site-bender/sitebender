// @sitebender/arborist/src/extractFunctionDetails
// Extracts detailed information from a function AST node

import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

import type {
	Parameter,
	ParsedFunction,
	Position,
	Span,
	TypeParameter,
} from "../types/index.ts"

import analyzeFunctionBody from "../analyzeFunctionBody/index.ts"

//++ Extracts detailed information from a function AST node
//++ Returns a ParsedFunction with all metadata
//++ Handles ExportDeclaration/ExportDefaultDeclaration wrappers
//++ Understands SWC AST structure for FunctionDeclaration and FunctionExpression
export default function extractFunctionDetails(node: unknown): ParsedFunction {
	const nodeObj = node as Record<string, unknown>

	// Check if this is an export wrapper
	const isExportWrapper = isEqual(nodeObj.type)("ExportDeclaration")
	const isDefaultExportWrapper = isEqual(nodeObj.type)("ExportDefaultDeclaration")

	// If wrapped, extract the actual function node
	const actualNode = or(isExportWrapper)(isDefaultExportWrapper)
		? (nodeObj.declaration ?? nodeObj.decl) as Record<string, unknown>
		: nodeObj

	// Extract function name
	const identifier = actualNode.identifier as
		| Record<string, unknown>
		| undefined
	const name = (identifier?.value as string | undefined) ?? "anonymous"

	// Extract position from actual function node
	const span = actualNode.span as Record<string, unknown> | undefined
	const position: Position = {
		line: (span?.start as number | undefined) ?? 0,
		column: (span?.ctxt as number | undefined) ?? 0,
	}

	// Extract span
	const spanInfo: Span = {
		start: (span?.start as number | undefined) ?? 0,
		end: (span?.end as number | undefined) ?? 0,
	}

	// Extract parameters using Toolsmith map
	const params = (actualNode.params as Array<unknown> | undefined) ?? []
	const parameters = map(
		function mapParameter(param: unknown): Parameter {
			const paramObj = param as Record<string, unknown>
			const pat = paramObj.pat as Record<string, unknown>

			// For SWC: parameter name and optional flag are in pat (Identifier node)
			const paramName = (pat.value as string | undefined) ?? "unknown"
			const isOptional = (pat.optional as boolean | undefined) ?? false

			// Type annotation is in pat.typeAnnotation.typeAnnotation
			const typeAnn = pat.typeAnnotation as Record<string, unknown> | undefined
			const typeAnnotation = typeAnn?.typeAnnotation as
				| Record<string, unknown>
				| undefined

			// For TsKeywordType, the actual type is in 'kind' field
			const typeKind = typeAnnotation?.kind as string | undefined
			const typeType = typeAnnotation?.type as string | undefined
			const paramType = (typeKind ?? typeType) ?? "unknown"

			return {
				name: paramName,
				type: paramType,
				optional: isOptional,
				defaultValue: undefined,
			}
		},
	)(params as ReadonlyArray<Serializable>) as ReadonlyArray<Parameter>

	// Extract return type
	const returnTypeAnn = actualNode.returnType as
		| Record<string, unknown>
		| undefined
	const returnTypeAnnotation = returnTypeAnn?.typeAnnotation as
		| Record<string, unknown>
		| undefined

	// For TsKeywordType, use 'kind' field
	const returnTypeKind = returnTypeAnnotation?.kind as string | undefined
	const returnTypeType = returnTypeAnnotation?.type as string | undefined
	const returnType = (returnTypeKind ?? returnTypeType) ?? "unknown"

	// Extract type parameters using Toolsmith map
	// SWC uses 'typeParameters.parameters' not 'typeParams.params'
	const typeParams = actualNode.typeParameters as
		| Record<string, unknown>
		| undefined
	const typeParamsList = (typeParams?.parameters as Array<unknown> | undefined) ?? []
	const typeParameters = map(
		function mapTypeParameter(tp: unknown): TypeParameter {
			const tpObj = tp as Record<string, unknown>
			// Type parameter name is in name.value
			const nameObj = tpObj.name as Record<string, unknown> | undefined
			const tpName = (nameObj?.value as string | undefined) ?? "T"

			return {
				name: tpName,
				constraint: undefined,
				default: undefined,
			}
		},
	)(typeParamsList as ReadonlyArray<Serializable>) as ReadonlyArray<TypeParameter>

	// Detect modifiers
	const isAsync = (actualNode.async as boolean | undefined) ?? false
	const isGenerator = (actualNode.generator as boolean | undefined) ?? false
	const isArrow = isEqual(actualNode.type)("ArrowFunctionExpression")

	// Export detection based on wrapper type
	const isExported = or(isExportWrapper)(isDefaultExportWrapper) as boolean
	const isDefault = isDefaultExportWrapper

	// Analyze function body
	const body = actualNode.body
	const bodyAnalysis = analyzeFunctionBody(body)

	return {
		name,
		position,
		span: spanInfo,
		parameters,
		returnType,
		typeParameters,
		modifiers: {
			isExported,
			isDefault,
			isAsync,
			isGenerator,
			isArrow,
		},
		body: bodyAnalysis,
	}
}
