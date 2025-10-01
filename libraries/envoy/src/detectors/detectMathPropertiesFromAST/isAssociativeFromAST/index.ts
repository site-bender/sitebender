import type { AstNode } from "../types/index.ts"

import hasAssociativeFunctionName from "./hasAssociativeFunctionName/index.ts"
import hasAssociativeMethodCall from "./hasAssociativeMethodCall/index.ts"
import hasBinaryAssociativeOperator from "./hasBinaryAssociativeOperator/index.ts"

//++ Detects if a function is associative (f(f(a,b),c) = f(a,f(b,c))) from AST
//++ [PRO] Uses proper AST analysis instead of fragile string patterns
//++ [CON] Cannot detect semantic associativity that isn't structurally obvious
export default function isAssociativeFromAST(node: AstNode): boolean {
	return (
		hasBinaryAssociativeOperator(node) ||
		hasAssociativeMethodCall(node) ||
		hasAssociativeFunctionName(node)
	)
}
