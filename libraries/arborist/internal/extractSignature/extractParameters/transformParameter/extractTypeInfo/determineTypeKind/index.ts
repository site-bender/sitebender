import * as typescript from "npm:typescript@5.7.2"

import { TypeKind } from "../../../../../types/index.ts"
import determineKeywordTypeKind from "./determineKeywordTypeKind/index.ts"
import determineReferenceTypeKind from "./determineReferenceTypeKind/index.ts"
import isArrayType from "./isArrayType/index.ts"
import isFunctionType from "./isFunctionType/index.ts"
import isIntersectionType from "./isIntersectionType/index.ts"
import isLiteralType from "./isLiteralType/index.ts"
import isObjectType from "./isObjectType/index.ts"
import isUnionType from "./isUnionType/index.ts"

//++ Determines the TypeKind from a TypeScript type node
export default function determineTypeKind(
	typeNode: typescript.TypeNode,
): TypeKind {
	if (isArrayType(typeNode)) {
		return TypeKind.Array
	}

	if (isUnionType(typeNode)) {
		return TypeKind.Union
	}

	if (isIntersectionType(typeNode)) {
		return TypeKind.Intersection
	}

	if (isFunctionType(typeNode)) {
		return TypeKind.Function
	}

	if (isObjectType(typeNode)) {
		return TypeKind.Object
	}

	if (isLiteralType(typeNode)) {
		return TypeKind.Literal
	}

	if (typescript.isTypeReferenceNode(typeNode)) {
		return determineReferenceTypeKind(typeNode)
	}

	return determineKeywordTypeKind(typeNode.kind)
}

//?? [EXAMPLE] determineTypeKind(typeNode) // TypeKind.Primitive
//?? [EXAMPLE] determineTypeKind(arrayTypeNode) // TypeKind.Array
