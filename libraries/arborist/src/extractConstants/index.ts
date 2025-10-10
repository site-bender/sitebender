// @sitebender/arborist/src/extractConstants
// Extracts all const declarations from a ParsedAst using Validation monad for error accumulation
//
// IMPORTANT: SWC WASM Span Offset Bug
// ====================================
// SWC WASM has a critical bug where span offsets accumulate across multiple parse() calls.
// This makes span-based substring extraction (sourceText.substring(span.start - 1, span.end - 1))
// unreliable when parsing multiple files in sequence.
//
// Solution: We use AST node serialization instead of span-based extraction.
// The serializeExpression() and serializeTypeAnnotation() utilities convert AST nodes
// directly to their string representation, avoiding any dependency on span offsets.
//
// This allows us to:
// 1. Parse multiple files without reinitializing SWC between each parse
// 2. Extract accurate values and type annotations regardless of parse order
// 3. Maintain better performance by avoiding repeated SWC initialization
//
// @sitebender/arborist/src/extractConstants
// Extracts all const declarations from a ParsedAst using Validation monad for error accumulation

import type { Validation } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

import type {
	ParsedAst,
	ParsedConstant,
	Position,
	Span,
} from "../types/index.ts"
import type { ConstantExtractionError } from "../types/errors/index.ts"
import _serializeExpression from "./_serializeExpression/index.ts"
import _serializeTypeAnnotation from "../_serializeTypeAnnotation/index.ts"

//++ Extracts all const declarations from a ParsedAst
//++ Returns Validation to accumulate extraction errors per constant
//++ Continues extraction on individual failures to gather all valid constants
//++ Captures type annotations and values as text for documentation
export default function extractConstants(
	ast: ParsedAst,
): Validation<ConstantExtractionError, ReadonlyArray<ParsedConstant>> {
	// Get the module body (top-level statements)
	const moduleBody = ast.module.body as unknown as Array<unknown>

	// Filter for const declarations (both standalone and exported)
	const constNodes = filter(
		function isConstDeclaration(node: unknown): boolean {
			const nodeObj = node as Record<string, unknown>
			const nodeType = nodeObj.type as string

			// Direct const declarations
			if (isEqual(nodeType)("VariableDeclaration")) {
				const kind = nodeObj.kind as string
				return isEqual(kind)("const")
			}

			// Export declarations that wrap const
			if (isEqual(nodeType)("ExportDeclaration")) {
				const decl = nodeObj.declaration as Record<string, unknown> | undefined
				if (decl && isEqual(decl.type)("VariableDeclaration")) {
					const kind = decl.kind as string
					return isEqual(kind)("const")
				}
			}

			return false
		},
	)(moduleBody as ReadonlyArray<Serializable>)

	const constNodesArray = getOrElse([] as ReadonlyArray<unknown>)(constNodes)

	// Extract details from each const node
	// TODO(Phase5): Add error handling with Validation accumulation when errors occur
	// For now, extractConstantDetails never fails (returns ParsedConstant directly)
	const constantsResult = map(
		function extractDetails(node: unknown): ParsedConstant {
			return extractConstantDetails(node)(ast.sourceText)
		},
	)(constNodesArray as ReadonlyArray<Serializable>)

	const constants = getOrElse([] as ReadonlyArray<ParsedConstant>)(
		constantsResult,
	)

	// Return success with extracted constants
	// When error handling is added, this will accumulate errors from failed extractions
	// and still return partial success with valid constants
	return success(constants)
}

//++ Extract details from a single const declaration node
//++ Returns ParsedConstant with name, position, span, type, value, and export status
//++ NOTE: We use AST node serialization instead of span-based substring extraction
//++ to avoid the SWC WASM bug where span offsets accumulate across multiple parse() calls
function extractConstantDetails(
	node: unknown,
) {
	return function withSourceText(_sourceText: string): ParsedConstant {
		const constNode = node as Record<string, unknown>
		const nodeType = constNode.type as string

		// Check if this is an export declaration wrapping a const
		const isExported = isEqual(nodeType)("ExportDeclaration")
		const actualConstNode = isExported
			? (constNode.declaration as Record<string, unknown>)
			: constNode

		// Extract span information from the OUTER node (export wrapper or const itself)
		// This ensures we capture the full declaration including "export"
		const span = extractSpan(constNode)

		// Extract position from span
		const position = extractPosition(span)

		// Get the variable declarators array
		const declarations = actualConstNode.declarations as Array<
			Record<string, unknown>
		>

		// For simplicity, we only extract the first declarator
		// In practice, const declarations typically have one declarator
		const declarator = declarations[0]

		// Extract name from identifier (SWC uses Identifier node with value field)
		const id = declarator.id as Record<string, unknown>
		const name = (id.value as string) ?? "unknown"

		// Extract type annotation if present
		const typeAnnotation = extractTypeAnnotation(declarator)

		// Extract value if present (init field)
		// Use AST serialization instead of span-based extraction
		const value = extractValue(declarator)

		return {
			name,
			position,
			span,
			type: typeAnnotation,
			value,
			isExported,
		}
	}
}

//++ Extract span from const node
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

//++ Extract type annotation from declarator
//++ Uses AST serialization to avoid span-based extraction issues
function extractTypeAnnotation(
	declarator: Record<string, unknown>,
): string {
	const id = declarator.id as Record<string, unknown>
	const typeAnn = id.typeAnnotation as Record<string, unknown> | undefined

	if (!typeAnn) {
		return "unknown"
	}

	// Use the type annotation serializer to convert AST to string
	const typeAnnotationNode = typeAnn.typeAnnotation
	return _serializeTypeAnnotation(typeAnnotationNode)
}

//++ Extract value from declarator by serializing the AST node
//++ This avoids the SWC WASM span offset accumulation bug
function extractValue(
	declarator: Record<string, unknown>,
): string | undefined {
	const init = declarator.init as Record<string, unknown> | undefined

	if (!init) {
		return undefined
	}

	// Serialize the expression AST node directly instead of using span-based extraction
	return _serializeExpression(init)
}
