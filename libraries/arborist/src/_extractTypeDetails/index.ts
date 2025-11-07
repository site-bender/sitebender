import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { TypeExtractionError } from "../types/errors/index.ts"
import type {
	ExportDeclaration,
	ParsedType,
	TsTypeDeclaration,
	TypeDeclarationNode,
} from "../types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import _extractSpan from "../_extractSpan/index.ts"
import _extractPosition from "../_extractPosition/index.ts"
import _extractDefinition from "./_extractDefinition/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"

//++ Extract details from a single type declaration node
//++ Returns Result with ParsedType containing name, position, span, definition, and export status
//++ Composes Results from _extractSpan, _extractPosition, and _extractDefinition
//++ NOTE: We use AST node serialization instead of span-based substring extraction
//++ to avoid the SWC WASM bug where span offsets accumulate across multiple parse() calls
//++
//++ @param node - Type declaration node or export declaration wrapping a type
//++ @returns Curried function that takes source text and returns Result<TypeExtractionError, ParsedType>
export default function _extractTypeDetails(node: TypeDeclarationNode) {
	return function extractTypeDetailsWithNode(
		_sourceText: string,
	): Result<TypeExtractionError, ParsedType> {
		// Check if this is an export declaration wrapping a type
		const isExported = isEqual(node.type)("ExportDeclaration")
		const actualTypeNode: TsTypeDeclaration = isExported
			? (node as ExportDeclaration).declaration
			: (node as TsTypeDeclaration)

		// Extract span information from the OUTER node (export wrapper or type itself)
		// This ensures we capture the full declaration including "export"
		const spanResult = _extractSpan(node)

		if (spanResult._tag === "Error") {
			return spanResult
		}

		const span = spanResult.value

		// Extract position from span
		const positionResult = _extractPosition(span)

		if (positionResult._tag === "Error") {
			return positionResult
		}

		const position = positionResult.value

		// Extract name from the inner type node
		const name = actualTypeNode.id.value

		// Extract definition by serializing the type AST node
		// This avoids span-based extraction issues
		const definitionResult = _extractDefinition(actualTypeNode, isExported)

		if (definitionResult._tag === "Error") {
			return definitionResult
		}

		const definition = definitionResult.value

		return ok({
			name,
			position,
			span,
			definition,
			isExported,
		})
	}
}
