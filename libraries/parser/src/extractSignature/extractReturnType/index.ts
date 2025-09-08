//++ Extracts return type information from a function node
import * as typescript from "npm:typescript@5.7.2"
import type { TypeInfo } from "../../types/index.ts"
import { TypeKind } from "../../types/index.ts"

export default function extractReturnType(sourceFile: typescript.SourceFile) {
	return function (checker: typescript.TypeChecker) {
		return function (
			node:
				| typescript.FunctionDeclaration
				| typescript.FunctionExpression
				| typescript.ArrowFunction,
		): TypeInfo {
			// Get the signature of the function
			const signature = checker.getSignatureFromDeclaration(node)

			if (!signature) {
				return {
					raw: "unknown",
					kind: TypeKind.Unknown,
				}
			}

			// Get the return type
			const returnType = checker.getReturnTypeOfSignature(signature)

			// Get string representation
			const raw = node.type
				? node.type.getText(sourceFile)
				: checker.typeToString(returnType)

			// Determine type kind
			const kind = getReturnTypeKind(returnType, checker)

			return {
				raw,
				kind,
			}
		}
	}
}

function getReturnTypeKind(
	type: typescript.Type,
	checker: typescript.TypeChecker,
): TypeKind {
	const typeString = checker.typeToString(type)

	// Check for primitives
	if (
		typeString === "string" || typeString === "number" ||
		typeString === "boolean"
	) {
		return TypeKind.Primitive
	}

	// Check for void
	if (type.flags & typescript.TypeFlags.Void) {
		return TypeKind.Void
	}

	// Check for any
	if (type.flags & typescript.TypeFlags.Any) {
		return TypeKind.Any
	}

	// Check for unknown
	if (type.flags & typescript.TypeFlags.Unknown) {
		return TypeKind.Unknown
	}

	// Check for never
	if (type.flags & typescript.TypeFlags.Never) {
		return TypeKind.Never
	}

	// Check for union
	if (type.isUnion()) {
		return TypeKind.Union
	}

	// Check for intersection
	if (type.isIntersection()) {
		return TypeKind.Intersection
	}

	// Check for literal
	if (type.isLiteral()) {
		return TypeKind.Literal
	}

	// Check for array
	if (checker.isArrayType(type)) {
		return TypeKind.Array
	}

	// Check for function (curried functions return functions)
	if (type.getCallSignatures().length > 0) {
		return TypeKind.Function
	}

	// Check for object
	if (type.flags & typescript.TypeFlags.Object) {
		return TypeKind.Object
	}

	// Default to unknown
	return TypeKind.Unknown
}

//?? extractReturnType(sourceFile)(checker)(functionNode) // Returns TypeInfo for return type
