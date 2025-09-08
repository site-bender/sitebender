//++ Extracts function parameters with type information
import * as typescript from "npm:typescript@5.7.2"
import type { Parameter } from "../../types/index.ts"
import extractType from "./extractType/index.ts"

export default function extractParameters(sourceFile: typescript.SourceFile) {
	return function (checker: typescript.TypeChecker) {
		return function (
			node:
				| typescript.FunctionDeclaration
				| typescript.FunctionExpression
				| typescript.ArrowFunction,
		): Array<Parameter> {
			const parameters: Array<Parameter> = []

			for (const param of node.parameters) {
				const name = param.name.getText(sourceFile)
				const type = extractType(sourceFile)(checker)(param)
				const isOptional = !!param.questionToken
				const isRest = !!param.dotDotDotToken

				// Extract default value if present
				let defaultValue: string | undefined
				if (param.initializer) {
					defaultValue = param.initializer.getText(sourceFile)
				}

				parameters.push({
					name,
					type,
					isOptional,
					isRest,
					defaultValue,
				})
			}

			return parameters
		}
	}
}

//?? extractParameters(sourceFile)(checker)(functionNode) // Returns array of parameters
