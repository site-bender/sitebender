import type { AstNode } from "../../types/index.ts"

import some from "../../../../../../toolsmith/src/vanilla/array/some/index.ts"
import { ASSOCIATIVE_OPERATOR_KINDS } from "../constants/index.ts"
import findInChildren from "./findInChildren/index.ts"

//++ Checks if AST node contains binary operators known to be associative
export default function hasBinaryAssociativeOperator(node: AstNode): boolean {
	const isAssociativeOperator = node.kind &&
		some(function checkKind(kind: number) {
			return node.kind === kind
		})(ASSOCIATIVE_OPERATOR_KINDS)

	return isAssociativeOperator || findInChildren(node)
}

//?? [EXAMPLE] hasBinaryAssociativeOperator(plusOperatorNode) // true
//?? [EXAMPLE] hasBinaryAssociativeOperator(minusOperatorNode) // false
//?? [PRO] Properly traverses AST structure instead of string matching
//?? [CON] Relies on hardcoded SyntaxKind numbers
