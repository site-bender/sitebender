import * as typescript from "npm:typescript@5.7.2"

import { TypeKind } from "../../../../../../types/index.ts"
import isPrimitiveTypeName from "../isPrimitiveTypeName/index.ts"

//++ Determines TypeKind for type reference nodes
export default function determineReferenceTypeKind(
	typeNode: typescript.TypeReferenceNode,
): TypeKind {
	const typeName = typeNode.typeName.getText()

	if (isPrimitiveTypeName(typeName)) {
		return TypeKind.Primitive
	}

	return TypeKind.Unknown
}
