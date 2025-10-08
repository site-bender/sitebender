// @sitebender/arborist/src/extractTypes
// Extracts all type aliases and interfaces from a ParsedAst using Validation monad for error accumulation
//
// IMPORTANT: SWC WASM Span Offset Bug
// ====================================
// SWC WASM has a critical bug where span offsets accumulate across multiple parse() calls.
// This makes span-based substring extraction (sourceText.substring(span.start - 1, span.end - 1))
// unreliable when parsing multiple files in sequence.
//
// Solution: We use AST node serialization instead of span-based extraction.
// The serializeTypeAnnotation() utility converts type annotation AST nodes directly to their
// string representation, avoiding any dependency on span offsets.
//
// This allows us to:
// 1. Parse multiple files without reinitializing SWC between each parse
// 2. Extract accurate type definitions regardless of parse order
// 3. Maintain better performance by avoiding repeated SWC initialization
//
// @sitebender/arborist/src/extractTypes
// Extracts all type aliases and interfaces from a ParsedAst using Validation monad for error accumulation

import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"

import type { ParsedAst, ParsedType, Position, Span } from "../types/index.ts"
import type { TypeExtractionError } from "../types/errors/index.ts"
import { serializeTypeAnnotation } from "../utils/serializeAstNode.ts"

//++ Extracts all type aliases and interfaces from a ParsedAst
//++ Returns Validation to accumulate extraction errors per type
//++ Continues extraction on individual failures to gather all valid types
//++ Captures the full type definition as text for documentation
export default function extractTypes(
	ast: ParsedAst,
): Validation<TypeExtractionError, ReadonlyArray<ParsedType>> {
	// Get the module body (top-level statements)
	const moduleBody = ast.module.body as unknown as Array<unknown>

	// Filter for type declarations (both standalone and exported)
	const typeNodes = filter(
		function isTypeDeclaration(node: unknown): boolean {
			const nodeObj = node as Record<string, unknown>
			const nodeType = nodeObj.type as string

			// Direct type declarations
			if (
				nodeType === "TsTypeAliasDeclaration" ||
				nodeType === "TsInterfaceDeclaration"
			) {
				return true
			}

			// Export declarations that wrap types
			if (nodeType === "ExportDeclaration") {
				const decl = nodeObj.declaration as Record<string, unknown> | undefined
				return decl?.type === "TsTypeAliasDeclaration" ||
					decl?.type === "TsInterfaceDeclaration"
			}

			return false
		},
	)(moduleBody)

	// Extract details from each type node
	// TODO(Phase5): Add error handling with Validation accumulation when errors occur
	// For now, extractTypeDetails never fails (returns ParsedType directly)
	const types = map(
		function extractDetails(node: unknown): ParsedType {
			return extractTypeDetails(node)(ast.sourceText)
		},
	)(typeNodes)

	// Return success with extracted types
	// When error handling is added, this will accumulate errors from failed extractions
	// and still return partial success with valid types
	return success(types)
}

//++ Extract details from a single type declaration node
//++ Returns ParsedType with name, position, span, definition, and export status
//++ NOTE: We use AST node serialization instead of span-based substring extraction
//++ to avoid the SWC WASM bug where span offsets accumulate across multiple parse() calls
function extractTypeDetails(
	node: unknown,
) {
	return function withSourceText(_sourceText: string): ParsedType {
		const typeNode = node as Record<string, unknown>
		const nodeType = typeNode.type as string

		// Check if this is an export declaration wrapping a type
		const isExported = nodeType === "ExportDeclaration"
		const actualTypeNode = isExported
			? (typeNode.declaration as Record<string, unknown>)
			: typeNode

		// Extract span information from the OUTER node (export wrapper or type itself)
		// This ensures we capture the full declaration including "export"
		const span = extractSpan(typeNode)

		// Extract position from span
		const position = extractPosition(span)

		// Extract name from the inner type node
		const id = actualTypeNode.id as Record<string, unknown>
		const name = id.value as string

		// Extract definition by serializing the type AST node
		// This avoids span-based extraction issues
		const definition = extractDefinition(actualTypeNode, isExported)

		return {
			name,
			position,
			span,
			definition,
			isExported,
		}
	}
}

//++ Extract span from type node
function extractSpan(node: Record<string, unknown>): Span {
	const spanObj = node.span as Record<string, number> | undefined
	return {
		start: spanObj?.start ?? 0,
		end: spanObj?.end ?? 0,
	}
}

//++ Extract position from span (simplified - uses byte offset as approximation)
function extractPosition(span: Span): Position {
	// For now, we use a simplified approach
	// In future, we could parse the source text to get accurate line/column
	return {
		line: 1,
		column: span.start,
	}
}

//++ Extract type definition by serializing the AST node
//++ This avoids the SWC WASM span offset accumulation bug
function extractDefinition(
	node: Record<string, unknown>,
	isExported: boolean,
): string {
	const nodeType = node.type as string
	const name = (node.id as Record<string, unknown>).value as string

	// Build the definition string based on node type
	if (nodeType === "TsTypeAliasDeclaration") {
		// Type alias: type Name = Definition
		const typeAnnotation = node.typeAnnotation
		const serializedType = serializeTypeAnnotation(typeAnnotation)
		const typeParams = serializeTypeParameters(node.typeParams)
		const exportPrefix = isExported ? "export " : ""
		return `${exportPrefix}type ${name}${typeParams} = ${serializedType}`
	}

	if (nodeType === "TsInterfaceDeclaration") {
		// Interface: interface Name { ... }
		const body = node.body as Record<string, unknown>
		const members = body.body as Array<Record<string, unknown>>
		const serializedMembers = members.map((member) => {
			const memberType = member.type as string
			if (memberType === "TsPropertySignature") {
				const key = member.key as Record<string, unknown>
				const keyName = key.value as string
				const typeAnn = member.typeAnnotation as
					| Record<string, unknown>
					| undefined
				if (typeAnn) {
					const type = serializeTypeAnnotation(typeAnn.typeAnnotation)
					const optional = member.optional as boolean
					const readonly = member.readonly as boolean
					const readonlyPrefix = readonly ? "readonly " : ""
					return `${readonlyPrefix}${keyName}${optional ? "?" : ""}: ${type}`
				}
				return keyName
			}
			if (memberType === "TsMethodSignature") {
				const key = member.key as Record<string, unknown>
				const keyName = key.value as string
				const params = member.params as Array<Record<string, unknown>>
				const serializedParams = params.map((param) => {
					const pat = param.pat as Record<string, unknown>
					const paramName = pat.value as string
					const typeAnn = param.typeAnnotation as
						| Record<string, unknown>
						| undefined
					if (typeAnn) {
						const type = serializeTypeAnnotation(typeAnn.typeAnnotation)
						return `${paramName}: ${type}`
					}
					return paramName
				}).join(", ")
				const returnType = member.typeAnnotation
					? serializeTypeAnnotation(
						(member.typeAnnotation as Record<string, unknown>)
							.typeAnnotation,
					)
					: "void"
				return `${keyName}(${serializedParams}): ${returnType}`
			}
			return ""
		}).filter(Boolean).join("; ")

		const typeParams = serializeTypeParameters(node.typeParams)
		const extendsClause = serializeExtendsClause(node.extends)
		const exportPrefix = isExported ? "export " : ""
		return `${exportPrefix}interface ${name}${typeParams}${extendsClause} { ${serializedMembers} }`
	}

	return "unknown"
}

//++ Serialize type parameters (generics) if present
function serializeTypeParameters(
	typeParams: unknown,
): string {
	if (!typeParams) {
		return ""
	}

	const typeParamsObj = typeParams as Record<string, unknown>
	const params = typeParamsObj.params as Array<Record<string, unknown>>
	if (!params || params.length === 0) {
		return ""
	}

	const serialized = params.map((param) => {
		const name = (param.name as Record<string, unknown>).value as string
		const constraint = param.constraint
			? ` extends ${serializeTypeAnnotation(param.constraint)}`
			: ""
		const defaultType = param.default
			? ` = ${serializeTypeAnnotation(param.default)}`
			: ""
		return `${name}${constraint}${defaultType}`
	}).join(", ")

	return `<${serialized}>`
}

//++ Serialize extends clause for interfaces
function serializeExtendsClause(
	extendsClause: unknown,
): string {
	if (!extendsClause) {
		return ""
	}

	const extendsArray = extendsClause as Array<Record<string, unknown>>
	if (extendsArray.length === 0) {
		return ""
	}

	const serialized = extendsArray.map((ext) => {
		const expr = ext.expression as Record<string, unknown>
		const name = expr.value as string
		const typeArgs = ext.typeArguments as Record<string, unknown> | undefined
		if (typeArgs) {
			const params = typeArgs.params as Array<unknown>
			const serializedParams = params.map(serializeTypeAnnotation).join(", ")
			return `${name}<${serializedParams}>`
		}
		return name
	}).join(", ")

	return ` extends ${serialized}`
}
