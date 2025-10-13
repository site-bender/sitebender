import type { AstNode } from "../../types/index.ts"

import some from "../../../../../../toolsmith/src/array/some/index.ts"
import { COMMUTATIVE_OPERATOR_KINDS } from "../constants/index.ts"
import findInChildren from "./findInChildren/index.ts"

//++ Checks if AST node contains binary operators known to be commutative
export default function hasBinaryCommutativeOperator(node: AstNode): boolean {
	const isCommutativeOperator = node.kind &&
		some(function checkKind(kind: number) {
			return node.kind === kind
		})(COMMUTATIVE_OPERATOR_KINDS)

	return isCommutativeOperator || findInChildren(node)
}
