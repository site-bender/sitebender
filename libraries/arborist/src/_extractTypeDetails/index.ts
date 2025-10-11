import type { ParsedType } from "../types/index.ts"
import extractSpan from "../_extractSpan/index.ts"
import extractPosition from "../_extractPosition/index.ts"
import extractDefinition from "../_extractDefinition/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

//++ Extract details from a single type declaration node
//++ Returns ParsedType with name, position, span, definition, and export status
//++ NOTE: We use AST node serialization instead of span-based substring extraction
//++ to avoid the SWC WASM bug where span offsets accumulate across multiple parse() calls
export default function extractTypeDetails(
	node: unknown,
) {
	return function withSourceText(_sourceText: string): ParsedType {
		const typeNode = node as Record<string, unknown>
		const nodeType = typeNode.type as string

		// Check if this is an export declaration wrapping a type
		const isExported = isEqual(nodeType)("ExportDeclaration")
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
