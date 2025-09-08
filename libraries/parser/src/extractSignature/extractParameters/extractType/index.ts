//++ Extracts type information from a parameter node
import * as typescript from "npm:typescript@5.7.2"
import type { TypeInfo } from "../../../types/index.ts"
import { TypeKind } from "../../../types/index.ts"

export default function extractType(sourceFile: typescript.SourceFile) {
	return function (checker: typescript.TypeChecker) {
		return function (param: typescript.ParameterDeclaration): TypeInfo {
			// Get the type of the parameter
			const type = checker.getTypeAtLocation(param)
			const typeNode = param.type

			// Get string representation
			const raw = typeNode
				? typeNode.getText(sourceFile)
				: checker.typeToString(type)

			// Determine type kind
			const kind = getTypeKind(type, checker)

			// Extract type arguments if generic
			const typeArguments = extractTypeArguments(type, checker, sourceFile)

			return {
				raw,
				kind,
				typeArguments: typeArguments.length > 0 ? typeArguments : undefined,
			}
		}
	}
}

function getTypeKind(
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

	// Check for null
	if (type.flags & typescript.TypeFlags.Null) {
		return TypeKind.Null
	}

	// Check for undefined
	if (type.flags & typescript.TypeFlags.Undefined) {
		return TypeKind.Undefined
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

	// Check for function
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

function extractTypeArguments(
	type: typescript.Type,
	checker: typescript.TypeChecker,
	_sourceFile: typescript.SourceFile,
): Array<TypeInfo> {
	const typeArguments: Array<TypeInfo> = []

	// Get type arguments if it's a generic type
	const typeReference = type as typescript.TypeReference
	if (typeReference.typeArguments) {
		for (const arg of typeReference.typeArguments) {
			const raw = checker.typeToString(arg)
			const kind = getTypeKind(arg, checker)

			typeArguments.push({
				raw,
				kind,
			})
		}
	}

	return typeArguments
}

//?? extractType(sourceFile)(checker)(paramNode) // Returns TypeInfo for parameter
