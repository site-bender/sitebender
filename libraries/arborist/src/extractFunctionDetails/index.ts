// @sitebender/arborist/src/extractFunctionDetails
// Extracts detailed information from a function AST node

import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

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
		? or(nodeObj.declaration)(nodeObj.decl) as Record<string, unknown>
		: nodeObj

	// Extract function name
	const identifier = actualNode.identifier as
		| Record<string, unknown>
		| undefined
	const name = or(identifier?.value as string)("anonymous") as string

	// Extract position from actual function node
	const span = actualNode.span as Record<string, unknown> | undefined
	const position: Position = {
		line: or(span?.start as number)(0) as number,
		column: or(span?.ctxt as number)(0) as number,
	}

	// Extract span
	const spanInfo: Span = {
		start: or(span?.start as number)(0) as number,
		end: or(span?.end as number)(0) as number,
	}

	// Extract parameters using Toolsmith map
	const params = or(actualNode.params as Array<unknown>)([]) as Array<unknown>
	const parametersResult = map(
		function mapParameter(param: unknown): Parameter {
			const paramObj = param as Record<string, unknown>
			const pat = paramObj.pat as Record<string, unknown>

			// For SWC: parameter name and optional flag are in pat (Identifier node)
			const paramName = or(pat.value as string)("unknown") as string
			const isOptional = or(pat.optional as boolean)(false) as boolean

			// Type annotation is in pat.typeAnnotation.typeAnnotation
			const typeAnn = pat.typeAnnotation as Record<string, unknown> | undefined
			const typeAnnotation = typeAnn?.typeAnnotation as
				| Record<string, unknown>
				| undefined

			// For TsKeywordType, the actual type is in 'kind' field
			const typeKind = typeAnnotation?.kind as string | undefined
			const typeType = typeAnnotation?.type as string | undefined
			const paramType = or(or(typeKind)(typeType))("unknown") as string

			return {
				name: paramName,
				type: paramType,
				optional: isOptional,
				defaultValue: undefined,
			}
		},
	)(params)

	const parameters = getOrElse([] as ReadonlyArray<Parameter>)(parametersResult)

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
	const returnType = or(or(returnTypeKind)(returnTypeType))("unknown") as string

	// Extract type parameters using Toolsmith map
	// SWC uses 'typeParameters.parameters' not 'typeParams.params'
	const typeParams = actualNode.typeParameters as
		| Record<string, unknown>
		| undefined
	const typeParamsList = or(typeParams?.parameters as Array<unknown>)([]) as Array<unknown>
	const typeParametersResult = map(
		function mapTypeParameter(tp: unknown): TypeParameter {
			const tpObj = tp as Record<string, unknown>
			// Type parameter name is in name.value
			const nameObj = tpObj.name as Record<string, unknown> | undefined
			const tpName = or(nameObj?.value as string)("T") as string

			return {
				name: tpName,
				constraint: undefined,
				default: undefined,
			}
		},
	)(typeParamsList)

	const typeParameters = getOrElse([] as ReadonlyArray<TypeParameter>)(
		typeParametersResult,
	)

	// Detect modifiers
	const isAsync = or(actualNode.async as boolean)(false) as boolean
	const isGenerator = or(actualNode.generator as boolean)(false) as boolean
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
