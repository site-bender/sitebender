//++ Extracts generic type parameters from a function node
import * as typescript from "npm:typescript@5.7.2"
import type { Generic } from "../../types/index.ts"

export default function extractGenerics(sourceFile: typescript.SourceFile) {
	return function (
		node:
			| typescript.FunctionDeclaration
			| typescript.FunctionExpression
			| typescript.ArrowFunction,
	): Array<Generic> {
		const generics: Array<Generic> = []

		if (node.typeParameters) {
			for (const typeParam of node.typeParameters) {
				const name = typeParam.name.getText(sourceFile)

				// Extract constraint if present
				let constraint: string | undefined
				if (typeParam.constraint) {
					constraint = typeParam.constraint.getText(sourceFile)
				}

				// Extract default if present
				let defaultType: string | undefined
				if (typeParam.default) {
					defaultType = typeParam.default.getText(sourceFile)
				}

				generics.push({
					name,
					constraint,
					default: defaultType,
				})
			}
		}

		return generics
	}
}

//?? extractGenerics(sourceFile)(functionNode) // Returns array of generic parameters
