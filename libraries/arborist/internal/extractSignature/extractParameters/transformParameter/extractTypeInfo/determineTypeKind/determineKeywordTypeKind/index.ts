import * as typescript from "npm:typescript@5.7.2"

import { TypeKind } from "../../../../../../types/index.ts"
import isPrimitiveKeyword from "../isPrimitiveKeyword/index.ts"

//++ Determines TypeKind for TypeScript keyword types
export default function determineKeywordTypeKind(
	kind: typescript.SyntaxKind,
): TypeKind {
	if (isPrimitiveKeyword(kind)) {
		return TypeKind.Primitive
	}

	if (kind === typescript.SyntaxKind.VoidKeyword) {
		return TypeKind.Void
	}

	if (kind === typescript.SyntaxKind.AnyKeyword) {
		return TypeKind.Any
	}

	if (kind === typescript.SyntaxKind.UnknownKeyword) {
		return TypeKind.Unknown
	}

	if (kind === typescript.SyntaxKind.NeverKeyword) {
		return TypeKind.Never
	}

	if (kind === typescript.SyntaxKind.NullKeyword) {
		return TypeKind.Null
	}

	if (kind === typescript.SyntaxKind.UndefinedKeyword) {
		return TypeKind.Undefined
	}

	return TypeKind.Unknown
}
