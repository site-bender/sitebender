import type { AstNode } from "../detectMathPropertiesFromAST/types/index.ts"

import checkForSideEffects from "./checkForSideEffects/index.ts"
import checkForMutations from "./checkForMutations/index.ts"
import checkForExternalDependencies from "./checkForExternalDependencies/index.ts"

//++ Detects if a function is pure by analyzing its AST
//++ [PRO] Analyzes AST structure for side effects and mutations
//++ [CON] Cannot detect all forms of impurity, especially in complex code
export default function detectPurityFromAST(node: AstNode): boolean {
	// A function is pure if it has:
	// 1. No side effects
	// 2. No mutations
	// 3. No external dependencies (globals, I/O, etc.)

	const hasSideEffects = checkForSideEffects(node)
	const hasMutations = checkForMutations(node)
	const hasExternalDeps = checkForExternalDependencies(node)

	return !hasSideEffects && !hasMutations && !hasExternalDeps
}

//?? [EXAMPLE] detectPurityFromAST(addFunctionNode) // true for pure add
//?? [EXAMPLE] detectPurityFromAST(consoleFunctionNode) // false for console.log
//?? [GOTCHA] May have false negatives for complex indirection
