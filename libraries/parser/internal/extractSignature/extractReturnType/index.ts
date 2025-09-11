//++ Extracts the return type from any function node type
import * as typescript from "npm:typescript@5.7.2"

import type { TypeInfo } from "../../types/index.ts"

import { TypeKind } from "../../types/index.ts"
import inferReturnType from "./inferReturnType/index.ts"

export default function extractReturnType(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration,
	sourceFile: typescript.SourceFile,
): TypeInfo {
	// Check for explicit return type annotation
	if (node.type) {
		const raw = node.type.getText(sourceFile)
		return {
			raw,
			kind: determineTypeKind(node.type),
		}
	}

	// For arrow functions with expression body, infer from expression
	if (typescript.isArrowFunction(node) && !typescript.isBlock(node.body)) {
		return inferReturnType(node.body, sourceFile)
	}

	// Default to void for functions with no explicit return type
	return {
		raw: "void",
		kind: TypeKind.Void,
	}
}

function determineTypeKind(node: typescript.TypeNode): TypeKind {
	switch (node.kind) {
		case typescript.SyntaxKind.StringKeyword:
		case typescript.SyntaxKind.NumberKeyword:
		case typescript.SyntaxKind.BooleanKeyword:
		case typescript.SyntaxKind.SymbolKeyword:
		case typescript.SyntaxKind.BigIntKeyword:
			return TypeKind.Primitive

		case typescript.SyntaxKind.ArrayType:
		case typescript.SyntaxKind.TupleType:
			return TypeKind.Array

		case typescript.SyntaxKind.TypeLiteral:
		case typescript.SyntaxKind.TypeReference:
			return TypeKind.Object

		case typescript.SyntaxKind.FunctionType:
			return TypeKind.Function

		case typescript.SyntaxKind.UnionType:
			return TypeKind.Union

		case typescript.SyntaxKind.IntersectionType:
			return TypeKind.Intersection

		case typescript.SyntaxKind.LiteralType:
			return TypeKind.Literal

		case typescript.SyntaxKind.VoidKeyword:
			return TypeKind.Void

		case typescript.SyntaxKind.AnyKeyword:
			return TypeKind.Any

		case typescript.SyntaxKind.UnknownKeyword:
			return TypeKind.Unknown

		case typescript.SyntaxKind.NeverKeyword:
			return TypeKind.Never

		case typescript.SyntaxKind.NullKeyword:
			return TypeKind.Null

		case typescript.SyntaxKind.UndefinedKeyword:
			return TypeKind.Undefined

		default:
			return TypeKind.Unknown
	}
}

//?? [EXAMPLE] const returnType = extractReturnType(functionNode, sourceFile)
//?? [EXAMPLE] returnType // "string"
//?? [EXAMPLE] returnType // "Promise<void>"
