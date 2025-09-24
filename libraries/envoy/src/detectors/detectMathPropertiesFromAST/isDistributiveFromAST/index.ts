import type { AstNode } from "../types/index.ts"

import hasDistributiveFunctionName from "./hasDistributiveFunctionName/index.ts"
import hasDistributivePattern from "./hasDistributivePattern/index.ts"

//++ Detects if a function exhibits distributive property (a*(b+c) = a*b + a*c) from AST
//++ [PRO] Uses proper AST analysis instead of fragile string patterns
//++ [CON] Cannot detect semantic distributivity that isn't structurally obvious
export default function isDistributiveFromAST(node: AstNode): boolean {
	return hasDistributivePattern(node) || hasDistributiveFunctionName(node)
}

//?? [EXAMPLE] isDistributiveFromAST(distributeFunctionNode) // true
//?? [EXAMPLE] isDistributiveFromAST(simpleFunctionNode) // false
//?? [GOTCHA] Only detects obvious distributive patterns in the AST structure
