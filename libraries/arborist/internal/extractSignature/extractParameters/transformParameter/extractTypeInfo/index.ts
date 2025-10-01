import * as typescript from "npm:typescript@5.7.2"

import type { TypeInfo } from "../../../../types/index.ts"

import { TypeKind } from "../../../../types/index.ts"
import determineTypeKind from "./determineTypeKind/index.ts"

//++ Extracts TypeInfo from a TypeScript type node
export default function extractTypeInfo(
	typeNode: typescript.TypeNode | undefined,
	sourceFile: typescript.SourceFile,
): TypeInfo {
	if (!typeNode) {
		return {
			raw: "any",
			kind: TypeKind.Any,
		}
	}

	const raw = typeNode.getText(sourceFile)
	const kind = determineTypeKind(typeNode)

	return {
		raw,
		kind,
	}
}
