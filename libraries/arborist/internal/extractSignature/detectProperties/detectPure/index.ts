//++ Detects if a function is pure (no side effects or external dependencies)
import * as typescript from "npm:typescript@5.7.2"

export default function detectPure(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration,
	sourceFile: typescript.SourceFile,
): boolean {
	// Async functions are not pure
	if (hasAsyncModifier(node)) {
		return false
	}

	// Generators are not pure
	if (isGenerator(node)) {
		return false
	}

	// Check function body for impure patterns
	if (node.body) {
		return !hasImpurePatterns(node.body, sourceFile)
	}

	// No body means we can't determine purity
	return false
}

function hasAsyncModifier(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration,
): boolean {
	if (node.modifiers) {
		return node.modifiers.some(
			(mod) => mod.kind === typescript.SyntaxKind.AsyncKeyword,
		)
	}
	return false
}

function isGenerator(
	node:
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.ArrowFunction
		| typescript.MethodDeclaration,
): boolean {
	if (typescript.isArrowFunction(node)) {
		return false
	}
	// Type assertion to access asteriskToken property
	const funcNode = node as
		| typescript.FunctionDeclaration
		| typescript.FunctionExpression
		| typescript.MethodDeclaration
	return funcNode.asteriskToken !== undefined
}

function hasImpurePatterns(
	node: typescript.Node,
	sourceFile: typescript.SourceFile,
): boolean {
	let hasImpure = false

	function visit(node: typescript.Node): void {
		// Check for throw statements
		if (typescript.isThrowStatement(node)) {
			hasImpure = true
			return
		}

		// Check for await expressions
		if (typescript.isAwaitExpression(node)) {
			hasImpure = true
			return
		}

		// Check for global access (console, window, document, etc.)
		if (typescript.isIdentifier(node)) {
			const text = node.getText(sourceFile)
			if (isGlobalIdentifier(text)) {
				hasImpure = true
				return
			}
		}

		// Check for property assignments (mutations)
		if (typescript.isBinaryExpression(node)) {
			if (node.operatorToken.kind === typescript.SyntaxKind.EqualsToken) {
				// Assignment to property or element
				if (
					typescript.isPropertyAccessExpression(node.left) ||
					typescript.isElementAccessExpression(node.left)
				) {
					hasImpure = true
					return
				}
			}
		}

		// Continue traversing
		typescript.forEachChild(node, visit)
	}

	visit(node)
	return hasImpure
}

function isGlobalIdentifier(text: string): boolean {
	const globals = [
		"console",
		"window",
		"document",
		"global",
		"process",
		"Buffer",
		"setTimeout",
		"setInterval",
		"clearTimeout",
		"clearInterval",
		"fetch",
		"XMLHttpRequest",
		"localStorage",
		"sessionStorage",
	]
	return globals.includes(text)
}
