import some from "@sitebender/toolsmith/vanilla/array/some/index.ts"
//++ Detects if a function is async
import * as typescript from "npm:typescript@5.7.2"

export default function detectAsync(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration,
): boolean {
	// Check if the node has modifiers and if any is async
	if (node.modifiers) {
		return some(isAsyncKeyword)(Array.from(node.modifiers))
	}

	return false
}

function isAsyncKeyword(modifier: typescript.ModifierLike): boolean {
	return modifier.kind === typescript.SyntaxKind.AsyncKeyword
}

//?? [EXAMPLE] const isAsync = detectAsync(functionNode)
//?? [EXAMPLE] isAsync // true for async functions
//?? [EXAMPLE] isAsync // false for regular functions
