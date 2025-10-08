// @sitebender/arborist/src/extractImports
// Extracts all import statements from a ParsedAst using Validation monad for error accumulation

import type { Validation } from "~libraries/toolsmith/src/types/validation/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"

import type {
	ImportBinding,
	ParsedAst,
	ParsedImport,
	Position,
	Span,
} from "../types/index.ts"
import type { ImportExtractionError } from "../types/errors/index.ts"

//++ Extracts all import statements from a ParsedAst
//++ Returns Validation to accumulate extraction errors per import
//++ Continues extraction on individual failures to gather all valid imports
//++ Handles default, named, namespace, and type-only imports
export default function extractImports(
	ast: ParsedAst,
): Validation<ImportExtractionError, ReadonlyArray<ParsedImport>> {
	// Get the module body (top-level statements)
	const moduleBody = ast.module.body as unknown as Array<unknown>

	// Filter for import declarations
	const importNodes = filter(
		function isImportDeclaration(node: unknown): boolean {
			const nodeObj = node as Record<string, unknown>
			const nodeType = nodeObj.type as string
			return nodeType === "ImportDeclaration"
		},
	)(moduleBody)

	// Extract details from each import node
	// TODO(Phase5): Add error handling with Validation accumulation when errors occur
	// For now, extractImportDetails never fails (returns ParsedImport directly)
	// Future: wrap extractImportDetails to return Validation and use validateAll
	const imports = map(
		function extractDetails(node: unknown): ParsedImport {
			return extractImportDetails(node)
		},
	)(importNodes)

	// Return success with extracted imports
	// When error handling is added, this will accumulate errors from failed extractions
	// and still return partial success with valid imports
	return success(imports)
}

//++ Extract details from a single import declaration node
//++ Returns ParsedImport with position, span, kind, specifier, and bindings
function extractImportDetails(node: unknown): ParsedImport {
	const importNode = node as Record<string, unknown>

	// Extract specifier (the module path being imported from)
	const specifierNode = importNode.source as Record<string, unknown>
	const specifier = specifierNode.value as string

	// Extract span information
	const span = extractSpan(importNode)

	// Extract position from span using the source text
	const position = extractPosition(span)

	// Extract import kind and bindings
	const specifiers = (importNode.specifiers as ReadonlyArray<unknown>) || []
	const isTypeOnly = (importNode.typeOnly as boolean) || false

	// Determine kind and extract bindings
	const { kind, imports } = extractKindAndBindings(specifiers)(isTypeOnly)

	return {
		specifier,
		position,
		span,
		kind,
		imports,
	}
}

//++ Extract span from import node
function extractSpan(node: Record<string, unknown>): Span {
	const spanObj = node.span as Record<string, number> | undefined
	return {
		start: spanObj?.start ?? 0,
		end: spanObj?.end ?? 0,
	}
}

//++ Extract position from span (simplified - uses byte offset as approximation)
//++ In a real implementation, we'd convert byte offset to line/column
function extractPosition(span: Span): Position {
	// For now, we use a simplified approach
	// In future, we could parse the source text to get accurate line/column
	return {
		line: 1,
		column: span.start,
	}
}

//++ Extract import kind and bindings from specifiers
function extractKindAndBindings(
	specifiers: ReadonlyArray<unknown>,
) {
	return function extractWithTypeOnly(
		isTypeOnly: boolean,
	): Readonly<{
		kind: "default" | "named" | "namespace" | "type"
		imports: ReadonlyArray<ImportBinding>
	}> {
		// Side-effect import: import "./foo.ts"
		if (specifiers.length === 0) {
			return {
				kind: isTypeOnly ? "type" : "named",
				imports: [],
			}
		}

		// Check first specifier to determine kind
		const firstSpec = specifiers[0] as Record<string, unknown>
		const firstType = firstSpec.type as string

		// Type-only imports: import type { Foo } from "./foo.ts"
		if (isTypeOnly) {
			return {
				kind: "type",
				imports: extractNamedBindings(specifiers)(true),
			}
		}

		// Namespace import: import * as foo from "./foo.ts"
		if (
			firstType === "ImportStarAsSpecifier" ||
			firstType === "ImportNamespaceSpecifier"
		) {
			const local = extractLocalName(firstSpec)
			return {
				kind: "namespace",
				imports: [{
					imported: "*",
					local,
					isType: false,
				}],
			}
		}

		// Default import only: import foo from "./foo.ts"
		if (firstType === "ImportDefaultSpecifier" && specifiers.length === 1) {
			const local = extractLocalName(firstSpec)
			return {
				kind: "default",
				imports: [{
					imported: "default",
					local,
					isType: false,
				}],
			}
		}

		// Named imports (possibly with default): import foo, { bar } from "./foo.ts"
		return {
			kind: "named",
			imports: extractNamedBindings(specifiers)(false),
		}
	}
}

//++ Extract bindings from named import specifiers
function extractNamedBindings(
	specifiers: ReadonlyArray<unknown>,
) {
	return function extractWithTypeFlag(
		isTypeOnly: boolean,
	): ReadonlyArray<ImportBinding> {
		return map(function extractBinding(spec: unknown): ImportBinding {
			const specObj = spec as Record<string, unknown>
			const specType = specObj.type as string

			// Default specifier in mixed import: import foo, { bar } from "./baz.ts"
			if (specType === "ImportDefaultSpecifier") {
				const local = extractLocalName(specObj)
				return {
					imported: "default",
					local,
					isType: isTypeOnly,
				}
			}

			// Named specifier: import { foo } from "./bar.ts"
			// Named specifier with alias: import { foo as bar } from "./baz.ts"
			if (specType === "ImportSpecifier") {
				const imported = extractImportedName(specObj)
				const local = extractLocalName(specObj)
				const isSpecTypeOnly = (specObj.isTypeOnly as boolean) || isTypeOnly

				return {
					imported,
					local,
					isType: isSpecTypeOnly,
				}
			}

			// Fallback for unknown specifier types
			return {
				imported: "unknown",
				local: "unknown",
				isType: isTypeOnly,
			}
		})(specifiers)
	}
}

//++ Extract the imported name from a specifier
function extractImportedName(spec: Record<string, unknown>): string {
	// For named imports: import { foo } or import { foo as bar }
	// The "imported" field contains the original name from the module
	const imported = spec.imported as Record<string, unknown> | undefined

	if (imported) {
		const importedType = imported.type as string
		if (importedType === "Identifier") {
			return imported.value as string
		}
	}

	// Fallback: use local if imported is missing
	return extractLocalName(spec)
}

//++ Extract the local name from a specifier
function extractLocalName(spec: Record<string, unknown>): string {
	const local = spec.local as Record<string, unknown> | undefined

	if (local) {
		const localType = local.type as string
		if (localType === "Identifier") {
			return local.value as string
		}
	}

	// Fallback for edge cases
	return "unknown"
}
