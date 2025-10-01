//++ Infers return type from an expression (for arrow functions with expression bodies)
import * as typescript from "npm:typescript@5.7.2"

import type { TypeInfo } from "../../../types/index.ts"

import { TypeKind } from "../../../types/index.ts"

export default function inferReturnType(
	expression: typescript.Expression,
	_sourceFile: typescript.SourceFile,
): TypeInfo {
	// Handle common expression types
	switch (expression.kind) {
		case typescript.SyntaxKind.StringLiteral:
		case typescript.SyntaxKind.NoSubstitutionTemplateLiteral:
		case typescript.SyntaxKind.TemplateExpression:
			return {
				raw: "string",
				kind: TypeKind.Primitive,
			}

		case typescript.SyntaxKind.NumericLiteral:
			return {
				raw: "number",
				kind: TypeKind.Primitive,
			}

		case typescript.SyntaxKind.TrueKeyword:
		case typescript.SyntaxKind.FalseKeyword:
			return {
				raw: "boolean",
				kind: TypeKind.Primitive,
			}

		case typescript.SyntaxKind.NullKeyword:
			return {
				raw: "null",
				kind: TypeKind.Null,
			}

		case typescript.SyntaxKind.UndefinedKeyword:
			return {
				raw: "undefined",
				kind: TypeKind.Undefined,
			}

		case typescript.SyntaxKind.Identifier: {
			// Handle undefined as an identifier (since it's not parsed as UndefinedKeyword)
			const text = (expression as typescript.Identifier).text
			if (text === "undefined") {
				return {
					raw: "undefined",
					kind: TypeKind.Undefined,
				}
			}
			// Fall through to default for other identifiers
			return {
				raw: "unknown",
				kind: TypeKind.Unknown,
			}
		}

		case typescript.SyntaxKind.ArrayLiteralExpression:
			return {
				raw: "Array<unknown>",
				kind: TypeKind.Array,
			}

		case typescript.SyntaxKind.ObjectLiteralExpression:
			return {
				raw: "object",
				kind: TypeKind.Object,
			}

		case typescript.SyntaxKind.ArrowFunction:
		case typescript.SyntaxKind.FunctionExpression:
			return {
				raw: "Function",
				kind: TypeKind.Function,
			}

		case typescript.SyntaxKind.AwaitExpression:
			return {
				raw: "Promise<unknown>",
				kind: TypeKind.Object,
			}

		default:
			// For complex expressions, return unknown
			return {
				raw: "unknown",
				kind: TypeKind.Unknown,
			}
	}
}
