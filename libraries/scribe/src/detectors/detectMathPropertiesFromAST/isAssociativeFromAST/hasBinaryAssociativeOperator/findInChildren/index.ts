import type { AstNode } from "../../../types/index.ts"

import hasBinaryAssociativeOperator from "../index.ts"

//++ Recursively searches child nodes for associative operators
export default function findInChildren(node: AstNode): boolean {
	return Boolean(node.forEachChild(hasBinaryAssociativeOperator))
}

//?? [EXAMPLE] findInChildren(binaryExpressionNode) // true if children have +, *, etc.
//?? [PRO] Pure recursive traversal of AST structure
