import * as ts from "npm:typescript@5.7.2"

import type { Generic } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
