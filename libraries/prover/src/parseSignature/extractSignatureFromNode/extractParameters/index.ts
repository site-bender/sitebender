import * as ts from "npm:typescript@5.7.2"
import type { Parameter } from "../../../types/index.ts"
import extractTypeInfo from "./extractTypeInfo/index.ts"

/**
 * Extracts parameter information from a function node
 * @param node Function declaration, expression, or arrow function
 * @param checker TypeScript type checker
 * @returns Array of parameter information
 */
export default function extractParameters(
	node: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction,
	checker: ts.TypeChecker,
): Array<Parameter> {
	return node.parameters.map((param) => {
		const name = param.name.getText()
		const type = extractTypeInfo(param.type, checker)
		const optional = !!param.questionToken
		const defaultValue = param.initializer?.getText()

		return {
			name,
			type,
			optional,
			defaultValue,
		}
	})
}
