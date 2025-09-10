import type { AstNode } from "../types/index.ts"

import hasCommutativeFunctionName from "./hasCommutativeFunctionName/index.ts"
import hasCommutativeMethodCall from "./hasCommutativeMethodCall/index.ts"
import hasBinaryCommutativeOperator from "./hasBinaryCommutativeOperator/index.ts"

//++ Detects if a function is commutative (f(a,b) = f(b,a)) from AST
//++ [PRO] Uses proper AST analysis instead of fragile string patterns
//++ [CON] Cannot detect semantic commutativity that isn't structurally obvious
export default function isCommutativeFromAST(node: AstNode): boolean {
	return (
		hasBinaryCommutativeOperator(node) ||
		hasCommutativeMethodCall(node) ||
		hasCommutativeFunctionName(node)
	)
}

//?? [EXAMPLE] isCommutativeFromAST(addFunctionNode) // true
//?? [EXAMPLE] isCommutativeFromAST(subtractFunctionNode) // false
//?? [GOTCHA] Only detects structurally obvious patterns, not semantic commutativity
