import type { AstNode } from "../types/index.ts"

import hasIdempotentFunctionName from "./hasIdempotentFunctionName/index.ts"
import hasIdempotentMethodCall from "./hasIdempotentMethodCall/index.ts"
import hasIdempotentPattern from "./hasIdempotentPattern/index.ts"

//++ Detects if a function is idempotent (f(f(x)) = f(x)) from AST
//++ [PRO] Uses proper AST analysis instead of fragile string patterns
//++ [CON] Cannot detect semantic idempotency that isn't structurally obvious
export default function isIdempotentFromAST(node: AstNode): boolean {
	return (
		hasIdempotentPattern(node) ||
		hasIdempotentMethodCall(node) ||
		hasIdempotentFunctionName(node)
	)
}

//?? [EXAMPLE] isIdempotentFromAST(absoluteValueNode) // true
//?? [EXAMPLE] isIdempotentFromAST(incrementNode) // false
//?? [GOTCHA] Only detects structurally obvious idempotent patterns
