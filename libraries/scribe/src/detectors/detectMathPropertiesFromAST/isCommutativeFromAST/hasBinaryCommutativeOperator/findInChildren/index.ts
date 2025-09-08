import type { AstNode } from "../../../types/index.ts"

import some from "../../../../../../../toolkit/src/simple/array/some/index.ts"
import { COMMUTATIVE_OPERATOR_KINDS } from "../../constants/index.ts"

//++ Recursively searches child nodes for commutative operators
export default function findInChildren(node: AstNode): boolean {
	if (!node.forEachChild) {
		return false
	}

	const foundCommutativeOperator = node.forEachChild(function checkChild(
		child: AstNode,
	): boolean | undefined {
		const hasCommutativeKind = some(function checkKind(kind: number) {
			return child.kind === kind
		})(COMMUTATIVE_OPERATOR_KINDS)

		if (hasCommutativeKind) {
			return true
		}

		// Recursively check this child's children
		return findInChildren(child) || undefined
	})

	return !!foundCommutativeOperator
}

//?? [EXAMPLE] findInChildren(functionBodyNode) // searches entire tree
//?? [GOTCHA] Can be expensive for deeply nested ASTs
