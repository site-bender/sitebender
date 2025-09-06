import * as ts from "npm:typescript@5.7.2"
import type { TypeInfo } from "../../../../types/index.ts"
import { TypeKind } from "../../../../types/index.ts"

export default function extractTypeInfo(
	typeNode: ts.TypeNode | undefined,
	checker: ts.TypeChecker,
): TypeInfo {
	if (!typeNode) {
		return { raw: "unknown", kind: TypeKind.Unknown }
	}

	const raw = typeNode.getText()

	if (ts.isTypeReferenceNode(typeNode)) {
		const typeName = typeNode.typeName.getText()

		// Handle both Array and ReadonlyArray
		if ((typeName === "Array" || typeName === "ReadonlyArray") && typeNode.typeArguments?.[0]) {
			return {
				raw,
				kind: TypeKind.Array,
				elementType: extractTypeInfo(
					typeNode.typeArguments[0],
					checker,
				),
			}
		}

		// Handle array without type arguments
		if (typeName === "Array" || typeName === "ReadonlyArray") {
			return {
				raw,
				kind: TypeKind.Array,
			}
		}

		if (["string", "number", "boolean", "null", "undefined", "void"].includes(typeName)) {
			return { raw, kind: TypeKind.Primitive }
		}

		return { raw, kind: TypeKind.Unknown }
	}

	if (ts.isArrayTypeNode(typeNode)) {
		return {
			raw,
			kind: TypeKind.Array,
			elementType: extractTypeInfo(typeNode.elementType, checker),
		}
	}

	if (ts.isUnionTypeNode(typeNode)) {
		return {
			raw,
			kind: TypeKind.Union,
			unionTypes: typeNode.types.map((t) => extractTypeInfo(t, checker)),
		}
	}

	if (ts.isIntersectionTypeNode(typeNode)) {
		return {
			raw,
			kind: TypeKind.Intersection,
			unionTypes: typeNode.types.map((t) => extractTypeInfo(t, checker)),
		}
	}

	if (ts.isFunctionTypeNode(typeNode)) {
		return { raw, kind: TypeKind.Function }
	}

	if (ts.isTypeLiteralNode(typeNode)) {
		const properties: Record<string, TypeInfo> = {}

		typeNode.members.forEach((member) => {
			if (ts.isPropertySignature(member) && member.name) {
				const propName = member.name.getText()
				properties[propName] = extractTypeInfo(member.type, checker)
			}
		})

		return {
			raw,
			kind: TypeKind.Object,
			properties,
		}
	}

	if (ts.isLiteralTypeNode(typeNode)) {
		const literal = typeNode.literal
		const value: unknown = ts.isStringLiteral(literal)
			? literal.text
			: ts.isNumericLiteral(literal)
			? Number(literal.text)
			: literal.kind === ts.SyntaxKind.TrueKeyword
			? true
			: literal.kind === ts.SyntaxKind.FalseKeyword
			? false
			: undefined

		return {
			raw,
			kind: TypeKind.Literal,
			literalValue: value,
		}
	}

	const keywordKind = typeNode.kind
	if (
		keywordKind === ts.SyntaxKind.StringKeyword ||
		keywordKind === ts.SyntaxKind.NumberKeyword ||
		keywordKind === ts.SyntaxKind.BooleanKeyword ||
		keywordKind === ts.SyntaxKind.VoidKeyword ||
		keywordKind === ts.SyntaxKind.NullKeyword ||
		keywordKind === ts.SyntaxKind.UndefinedKeyword
	) {
		return { raw, kind: TypeKind.Primitive }
	}

	// Check if the raw type string looks like a function
	if (raw.includes("=>") || raw.includes("function")) {
		return { raw, kind: TypeKind.Function }
	}

	return { raw, kind: TypeKind.Unknown }
}
