import type {
	ParsedType,
	TypeDeclarationNode,
	ExportDeclaration,
	TsTypeDeclaration,
} from "../types/index.ts"
import _extractSpan from "../_extractSpan/index.ts"
import _extractPosition from "../_extractPosition/index.ts"
import _extractDefinition from "./_extractDefinition/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

//++ Extract details from a single type declaration node
//++ Returns ParsedType with name, position, span, definition, and export status
//++ NOTE: We use AST node serialization instead of span-based substring extraction
//++ to avoid the SWC WASM bug where span offsets accumulate across multiple parse() calls
export default function _extractTypeDetails(node: TypeDeclarationNode) {
	return function extractTypeDetailsWithNode(
		_sourceText: string,
	): ParsedType {
		// Check if this is an export declaration wrapping a type
		const isExported = isEqual(node.type)("ExportDeclaration")
		const actualTypeNode: TsTypeDeclaration = isExported
			? (node as ExportDeclaration).declaration
			: (node as TsTypeDeclaration)

		// Extract span information from the OUTER node (export wrapper or type itself)
		// This ensures we capture the full declaration including "export"
		const span = _extractSpan(node)

		// Extract position from span
		const position = _extractPosition(span)

		// Extract name from the inner type node
		const name = actualTypeNode.id.value

		// Extract definition by serializing the type AST node
		// This avoids span-based extraction issues
		const definition = _extractDefinition(actualTypeNode, isExported)

		return {
			name,
			position,
			span,
			definition,
			isExported,
		}
	}
}
