import type { ParsedImport } from "../types/index.ts"
import _extractSpan from "../_extractSpan/index.ts"
import _extractPosition from "../_extractPosition/index.ts"
import extractKindAndBindings from "../_extractKindAndBindings/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

//++ Extract details from a single import declaration node
//++ Returns ParsedImport with position, span, kind, specifier, and bindings
export default function extractImportDetails(node: unknown): ParsedImport {
	const importNode = node as Record<string, unknown>

	// Extract specifier (the module path being imported from)
	const specifierNode = importNode.source as Record<string, unknown>
	const specifier = specifierNode.value as string

	// Extract span information
	const span = _extractSpan(importNode)

	// Extract position from span using the source text
	const position = _extractPosition(span)

	// Extract import kind and bindings
	const specifiers = or(importNode.specifiers as ReadonlyArray<unknown>)([]) as ReadonlyArray<unknown>
	const isTypeOnly = or(importNode.typeOnly as boolean)(false) as boolean

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
