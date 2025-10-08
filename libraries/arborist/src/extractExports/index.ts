// @sitebender/arborist/src/extractExports
// Extracts all export statements from a ParsedAst using Validation monad for error accumulation

import type { Validation } from "~libraries/toolsmith/src/types/validation/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import filter from "@sitebender/toolsmith/vanilla/array/filter/index.ts"
import flatMap from "@sitebender/toolsmith/vanilla/array/flatMap/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"

import type { ParsedAst, ParsedExport, Position, Span } from "../types/index.ts"
import type { ExportExtractionError } from "../types/errors/index.ts"

//++ Extracts all export statements from a ParsedAst
//++ Returns Validation to accumulate extraction errors per export
//++ Continues extraction on individual failures to gather all valid exports
//++ Handles default, named, and re-export patterns
export default function extractExports(
	ast: ParsedAst,
): Validation<ExportExtractionError, ReadonlyArray<ParsedExport>> {
	// Get the module body (top-level statements)
	const moduleBody = ast.module.body as unknown as Array<unknown>

	// Filter for export declarations
	const exportNodes = filter(
		function isExportDeclaration(node: unknown): boolean {
			const nodeObj = node as Record<string, unknown>
			const nodeType = nodeObj.type as string
			return nodeType === "ExportDeclaration" ||
				nodeType === "ExportDefaultDeclaration" ||
				nodeType === "ExportDefaultExpression" ||
				nodeType === "ExportNamedDeclaration" ||
				nodeType === "ExportAllDeclaration"
		},
	)(moduleBody)

	// Extract details from each export node
	// flatMap because some nodes (like export lists) produce multiple exports
	// TODO(Phase5): Add error handling with Validation accumulation when errors occur
	// For now, extractExportDetails never fails (returns ParsedExport array directly)
	const exports = flatMap(
		function extractDetails(node: unknown): ReadonlyArray<ParsedExport> {
			return extractExportDetails(node)
		},
	)(exportNodes)

	// Return success with extracted exports
	// When error handling is added, this will accumulate errors from failed extractions
	// and still return partial success with valid exports
	return success(exports)
}

//++ Extract details from a single export declaration node
//++ Returns array of ParsedExport (multiple for export lists)
function extractExportDetails(node: unknown): ReadonlyArray<ParsedExport> {
	const exportNode = node as Record<string, unknown>
	const nodeType = exportNode.type as string

	// Extract span information
	const span = extractSpan(exportNode)

	// Extract position from span
	const position = extractPosition(span)

	// Handle different export node types
	if (nodeType === "ExportDefaultDeclaration") {
		return extractDefaultExport(exportNode)(position)(span)
	}

	if (nodeType === "ExportDefaultExpression") {
		return extractDefaultExport(exportNode)(position)(span)
	}

	if (nodeType === "ExportDeclaration") {
		return extractNamedExport(exportNode)(position)(span)
	}

	if (nodeType === "ExportNamedDeclaration") {
		return extractNamedOrReExport(exportNode)(position)(span)
	}

	if (nodeType === "ExportAllDeclaration") {
		return extractReExportAll(exportNode)(position)(span)
	}

	// Fallback for unknown export types
	return []
}

//++ Extract span from export node
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

//++ Extract default export
function extractDefaultExport(
	node: Record<string, unknown>,
) {
	return function withPosition(position: Position) {
		return function withSpan(span: Span): ReadonlyArray<ParsedExport> {
			// Get the declaration or expression being exported
			const decl = (node.decl ?? node.declaration) as
				| Record<string, unknown>
				| undefined

			if (!decl) {
				return [{
					name: "default",
					position,
					span,
					kind: "default",
					isType: false,
				}]
			}

			const declType = decl.type as string
			const isType = declType === "TsTypeAliasDeclaration" ||
				declType === "TsInterfaceDeclaration"

			// Extract name from declaration if available
			let name = "default"
			if (
				declType === "FunctionDeclaration" || declType === "FunctionExpression"
			) {
				const ident = decl.identifier as Record<string, unknown> | undefined
				if (ident) {
					name = ident.value as string
				}
			}

			return [{
				name,
				position,
				span,
				kind: "default",
				isType,
			}]
		}
	}
}

//++ Extract named export (export function/const/type/interface)
function extractNamedExport(
	node: Record<string, unknown>,
) {
	return function withPosition(position: Position) {
		return function withSpan(span: Span): ReadonlyArray<ParsedExport> {
			const decl = node.declaration as Record<string, unknown> | undefined

			if (!decl) {
				return []
			}

			const declType = decl.type as string

			// Function declaration
			if (declType === "FunctionDeclaration") {
				const ident = decl.identifier as Record<string, unknown>
				const name = ident.value as string
				return [{
					name,
					position,
					span,
					kind: "named",
					isType: false,
				}]
			}

			// Variable declaration (const, let, var)
			if (declType === "VariableDeclaration") {
				return extractVariableExports(decl)(position)(span)
			}

			// Type alias
			if (declType === "TsTypeAliasDeclaration") {
				const ident = decl.id as Record<string, unknown>
				const name = ident.value as string
				return [{
					name,
					position,
					span,
					kind: "named",
					isType: true,
				}]
			}

			// Interface
			if (declType === "TsInterfaceDeclaration") {
				const ident = decl.id as Record<string, unknown>
				const name = ident.value as string
				return [{
					name,
					position,
					span,
					kind: "named",
					isType: true,
				}]
			}

			// Enum
			if (declType === "TsEnumDeclaration") {
				const ident = decl.id as Record<string, unknown>
				const name = ident.value as string
				return [{
					name,
					position,
					span,
					kind: "named",
					isType: true,
				}]
			}

			return []
		}
	}
}

//++ Extract variable exports from variable declaration
function extractVariableExports(
	decl: Record<string, unknown>,
) {
	return function withPosition(position: Position) {
		return function withSpan(span: Span): ReadonlyArray<ParsedExport> {
			const declarations = decl.declarations as ReadonlyArray<unknown>

			return map(function extractVar(varDecl: unknown): ParsedExport {
				const varDeclObj = varDecl as Record<string, unknown>
				const id = varDeclObj.id as Record<string, unknown>
				const name = id.value as string

				return {
					name,
					position,
					span,
					kind: "named",
					isType: false,
				}
			})(declarations)
		}
	}
}

//++ Extract named export or re-export (export { foo } or export { foo } from "./bar")
function extractNamedOrReExport(
	node: Record<string, unknown>,
) {
	return function withPosition(position: Position) {
		return function withSpan(span: Span): ReadonlyArray<ParsedExport> {
			const specifiers = (node.specifiers as ReadonlyArray<unknown>) || []
			const source = node.source as Record<string, unknown> | undefined
			const sourceValue = source ? source.value as string : undefined
			const isTypeOnly = (node.typeOnly as boolean) || false

			// If there's a source, this is a re-export
			const kind = sourceValue ? "reexport" : "named"

			return map(function extractSpecifier(spec: unknown): ParsedExport {
				const specObj = spec as Record<string, unknown>

				// Extract the exported name (what consumers will import)
				const exported = specObj.exported as Record<string, unknown> | undefined
				const name = exported
					? exported.value as string
					: (specObj.orig as Record<string, unknown>)?.value as string

				// Check if this specific specifier is type-only
				const isSpecTypeOnly = (specObj.isTypeOnly as boolean) || isTypeOnly

				return {
					name,
					position,
					span,
					kind,
					isType: isSpecTypeOnly,
					source: sourceValue,
				}
			})(specifiers)
		}
	}
}

//++ Extract re-export all (export * from "./foo")
function extractReExportAll(
	node: Record<string, unknown>,
) {
	return function withPosition(position: Position) {
		return function withSpan(span: Span): ReadonlyArray<ParsedExport> {
			const source = node.source as Record<string, unknown>
			const sourceValue = source.value as string

			return [{
				name: "*",
				position,
				span,
				kind: "reexport",
				isType: false,
				source: sourceValue,
			}]
		}
	}
}
