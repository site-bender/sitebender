//++ Detects special properties of a function (async, generator, curried, pure)
import * as typescript from "npm:typescript@5.7.2"

export type FunctionProperties = {
	readonly isAsync: boolean
	readonly isGenerator: boolean
	readonly isCurried: boolean
	readonly isPure: boolean
}

export default function detectProperties(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction,
): FunctionProperties {
	const isAsync = detectAsync(node)
	const isGenerator = detectGenerator(node)
	const isCurried = detectCurrying(node)
	const isPure = detectPurity(node)

	return {
		isAsync,
		isGenerator,
		isCurried,
		isPure,
	}
}

function detectAsync(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction,
): boolean {
	// Check for async modifier
	if (node.modifiers) {
		return node.modifiers.some(
			(modifier) => modifier.kind === typescript.SyntaxKind.AsyncKeyword,
		)
	}
	return false
}

function detectGenerator(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction,
): boolean {
	// Check for asterisk token (function*)
	if (
		typescript.isFunctionDeclaration(node) ||
		typescript.isFunctionExpression(node)
	) {
		return !!node.asteriskToken
	}
	return false
}

function detectCurrying(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction,
): boolean {
	// A function is curried if it returns another function
	// We need to check the body to see if it returns a function

	if (!node.body) return false

	// For arrow functions with expression body
	if (typescript.isArrowFunction(node) && !typescript.isBlock(node.body)) {
		// Check if the expression is a function
		return typescript.isFunctionExpression(node.body) ||
			typescript.isArrowFunction(node.body)
	}

	// For block bodies, check for return statements
	if (typescript.isBlock(node.body)) {
		let returnsFunction = false

		// deno-lint-ignore no-inner-declarations
		function visit(child: typescript.Node): void {
			if (typescript.isReturnStatement(child) && child.expression) {
				// Check if return value is a function
				if (
					typescript.isFunctionExpression(child.expression) ||
					typescript.isArrowFunction(child.expression)
				) {
					returnsFunction = true
				}
			}
			// Don't traverse into nested functions
			if (!typescript.isFunctionLike(child)) {
				typescript.forEachChild(child, visit)
			}
		}

		typescript.forEachChild(node.body, visit)
		return returnsFunction
	}

	return false
}

function detectPurity(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction,
): boolean {
	// Basic purity detection - looks for obvious side effects
	// This is simplified - a complete implementation would be more thorough

	if (!node.body) return true // No body = pure

	let hasSideEffects = false

	function visit(child: typescript.Node): void {
		// Check for assignments to external variables
		if (
			typescript.isBinaryExpression(child) &&
			child.operatorToken.kind === typescript.SyntaxKind.EqualsToken
		) {
			// Check if left side is an identifier that's not a parameter
			if (typescript.isIdentifier(child.left)) {
				// This is a simplification - would need scope analysis
				hasSideEffects = true
			}
		}

		// Check for method calls that might have side effects
		if (typescript.isCallExpression(child)) {
			const expression = child.expression
			if (typescript.isPropertyAccessExpression(expression)) {
				const methodName = expression.name.getText()
				// Known impure methods
				const impureMethods = [
					"push",
					"pop",
					"shift",
					"unshift",
					"splice",
					"sort",
					"reverse",
				]
				if (impureMethods.includes(methodName)) {
					hasSideEffects = true
				}
			}
			// Console calls are side effects
			if (
				typescript.isIdentifier(expression) &&
				expression.getText() === "console"
			) {
				hasSideEffects = true
			}
		}

		// Check for throw statements
		if (typescript.isThrowStatement(child)) {
			hasSideEffects = true
		}

		// Continue traversal if not in nested function
		if (!typescript.isFunctionLike(child) && !hasSideEffects) {
			typescript.forEachChild(child, visit)
		}
	}

	if (typescript.isBlock(node.body)) {
		typescript.forEachChild(node.body, visit)
	}

	return !hasSideEffects
}

//?? detectProperties(functionNode) // Returns properties object
