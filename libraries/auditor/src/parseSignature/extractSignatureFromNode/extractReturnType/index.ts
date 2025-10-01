import * as ts from "npm:typescript@5.7.2"

import type { TypeInfo } from "../../../types/index.ts"

import { TypeKind } from "../../../types/index.ts"
import extractTypeInfo from "../extractParameters/extractTypeInfo/index.ts"
import typeToTypeInfo from "../extractParameters/extractTypeInfo/typeToTypeInfo/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function extractReturnType(
	node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction,
	checker: ts.TypeChecker,
): TypeInfo {
	if (node.type) {
		return extractTypeInfo(node.type, checker)
	}

	const signature = checker.getSignatureFromDeclaration(node)
	if (signature) {
		const returnType = checker.getReturnTypeOfSignature(signature)
		return typeToTypeInfo(returnType, checker)
	}

	return { raw: "unknown", kind: TypeKind.Unknown }
}
