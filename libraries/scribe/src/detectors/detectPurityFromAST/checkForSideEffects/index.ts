import type { AstNode } from "../../detectMathPropertiesFromAST/types/index.ts"

import contains from "../../../../../toolkit/src/simple/string/contains/index.ts"
import some from "../../../../../toolkit/src/simple/array/some/index.ts"
import {
	AWAIT_EXPRESSION_KIND,
	SIDE_EFFECT_METHODS,
	THROW_STATEMENT_KIND,
	TRY_STATEMENT_KIND,
} from "../constants/index.ts"

//++ Checks if AST node contains side effects
export default function checkForSideEffects(node: AstNode): boolean {
	// Check for throw statements
	if (node.kind === THROW_STATEMENT_KIND) {
		return true
	}

	// Check for try/catch
	if (node.kind === TRY_STATEMENT_KIND) {
		return true
	}

	// Check for await (async operations are side effects)
	if (node.kind === AWAIT_EXPRESSION_KIND) {
		return true
	}

	// Check for side effect method calls
	if (node.getText) {
		const nodeText = node.getText()
		const hasSideEffectMethod = some(function checkMethod(method: string) {
			return contains(`.${method}(`)(nodeText)
		})(SIDE_EFFECT_METHODS)

		if (hasSideEffectMethod) {
			return true
		}
	}

	// Recursively check children
	if (node.forEachChild) {
		const foundSideEffect = node.forEachChild(function checkChild(
			child: AstNode,
		): boolean | undefined {
			return checkForSideEffects(child) || undefined
		})

		return !!foundSideEffect
	}

	return false
}

//?? [EXAMPLE] checkForSideEffects(consoleLogNode) // true
//?? [EXAMPLE] checkForSideEffects(pureFunctionNode) // false
