import * as ts from "npm:typescript@5.7.2"
import type { Generic } from "../../../types/index.ts"

/**
 * Extracts generic type parameters from a function node
 * @param node Function declaration, expression, or arrow function
 * @returns Array of generic type information
 */
export default function extractGenerics(
	node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction,
): Array<Generic> {
	if (!node.typeParameters) {
		return []
	}

	return node.typeParameters.map((param) => {
		const name = param.name.text
		const constraint = param.constraint?.getText()

		return {
			name,
			constraint,
		}
	})
}
