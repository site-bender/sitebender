import * as ts from "npm:typescript@5.7.2"

export type ComplexityClass =
	| "O(1)"
	| "O(log n)"
	| "O(n)"
	| "O(n log n)"
	| "O(n²)"
	| "O(n³)"
	| "O(2^n)"
	| "O(n!)"
	| "Unknown"

interface ComplexityState {
	maxLoopDepth: number
	currentLoopDepth: number
	hasRecursion: boolean
	hasSorting: boolean
	hasBinaryOperation: boolean
}

export default function detectComplexityFromAST(
	node: ts.Node,
	sourceFile: ts.SourceFile,
): ComplexityClass {
	// Extract function name for recursion detection
	const functionName = extractFunctionName(node, sourceFile)

	// Analyze the AST
	const state = analyzeNode(node, sourceFile, functionName, {
		maxLoopDepth: 0,
		currentLoopDepth: 0,
		hasRecursion: false,
		hasSorting: false,
		hasBinaryOperation: false,
	})

	// Determine complexity class based on analysis
	return determineComplexity(state)
}

function extractFunctionName(node: ts.Node, sourceFile: ts.SourceFile): string {
	if (ts.isFunctionDeclaration(node) && node.name) {
		return node.name.getText(sourceFile)
	} else if (
		ts.isVariableDeclaration(node.parent) &&
		ts.isIdentifier(node.parent.name)
	) {
		return node.parent.name.getText(sourceFile)
	}
	return ""
}

function analyzeNode(
	currentNode: ts.Node,
	sourceFile: ts.SourceFile,
	functionName: string,
	state: ComplexityState,
): ComplexityState {
	// Track loop nesting depth
	if (isLoopStatement(currentNode)) {
		const newState = {
			...state,
			currentLoopDepth: state.currentLoopDepth + 1,
			maxLoopDepth: Math.max(state.maxLoopDepth, state.currentLoopDepth + 1),
		}

		// Analyze children with increased depth
		const childrenState = analyzeChildren(
			currentNode,
			sourceFile,
			functionName,
			newState,
		)

		// Return with restored depth
		return {
			...childrenState,
			currentLoopDepth: state.currentLoopDepth,
		}
	}

	// Check for array iteration methods (count as loops)
	if (
		ts.isCallExpression(currentNode) &&
		ts.isPropertyAccessExpression(currentNode.expression)
	) {
		const methodName = currentNode.expression.name.getText(sourceFile)
		const loopMethods = [
			"map",
			"filter",
			"reduce",
			"forEach",
			"some",
			"every",
			"find",
			"findIndex",
		]

		if (loopMethods.includes(methodName)) {
			const newState = {
				...state,
				currentLoopDepth: state.currentLoopDepth + 1,
				maxLoopDepth: Math.max(state.maxLoopDepth, state.currentLoopDepth + 1),
			}

			const childrenState = analyzeChildren(
				currentNode,
				sourceFile,
				functionName,
				newState,
			)

			return {
				...childrenState,
				currentLoopDepth: state.currentLoopDepth,
			}
		}

		// Check for sorting (O(n log n))
		if (methodName === "sort") {
			return analyzeChildren(currentNode, sourceFile, functionName, {
				...state,
				hasSorting: true,
			})
		}
	}

	// Check for recursion
	if (
		functionName &&
		ts.isCallExpression(currentNode) &&
		ts.isIdentifier(currentNode.expression) &&
		currentNode.expression.getText(sourceFile) === functionName
	) {
		return analyzeChildren(currentNode, sourceFile, functionName, {
			...state,
			hasRecursion: true,
		})
	}

	// Check for binary operations (possible O(log n))
	if (ts.isBinaryExpression(currentNode)) {
		const operator = currentNode.operatorToken.kind
		if (
			operator === ts.SyntaxKind.GreaterThanGreaterThanToken || // >>
			operator === ts.SyntaxKind.LessThanLessThanToken || // <<
			operator === ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken // >>>
		) {
			return analyzeChildren(currentNode, sourceFile, functionName, {
				...state,
				hasBinaryOperation: true,
			})
		}

		// Check for division/multiplication by 2 (binary search pattern)
		const left = currentNode.left.getText(sourceFile)
		const right = currentNode.right.getText(sourceFile)
		const op = currentNode.operatorToken.getText(sourceFile)

		if (
			(op === "/" && right === "2") ||
			(op === "*" && right === "0.5") ||
			(op === ">>" && right === "1")
		) {
			return analyzeChildren(currentNode, sourceFile, functionName, {
				...state,
				hasBinaryOperation: true,
			})
		}
	}

	// Continue analyzing children
	return analyzeChildren(currentNode, sourceFile, functionName, state)
}

function analyzeChildren(
	node: ts.Node,
	sourceFile: ts.SourceFile,
	functionName: string,
	state: ComplexityState,
): ComplexityState {
	const children: Array<ts.Node> = []
	ts.forEachChild(node, (child) => {
		children.push(child)
	})

	return children.reduce(
		(currentState, child) =>
			analyzeNode(child, sourceFile, functionName, currentState),
		state,
	)
}

function isLoopStatement(node: ts.Node): boolean {
	return (
		ts.isForStatement(node) ||
		ts.isForInStatement(node) ||
		ts.isForOfStatement(node) ||
		ts.isWhileStatement(node) ||
		ts.isDoStatement(node)
	)
}

function determineComplexity(state: ComplexityState): ComplexityClass {
	// Exponential complexity (recursion without clear reduction)
	if (
		state.hasRecursion && state.maxLoopDepth === 0 && !state.hasBinaryOperation
	) {
		// Could be O(2^n) for naive recursive algorithms
		// This is a heuristic - actual complexity depends on recursion pattern
		return "O(2^n)"
	}

	// Sorting detected
	if (state.hasSorting) {
		return "O(n log n)"
	}

	// Binary operations suggest possible O(log n)
	if (state.hasBinaryOperation && state.maxLoopDepth === 0) {
		return "O(log n)"
	}

	// Nested loops
	if (state.maxLoopDepth === 3) {
		return "O(n³)"
	}
	if (state.maxLoopDepth === 2) {
		return "O(n²)"
	}
	if (state.maxLoopDepth === 1) {
		// Single loop with binary operations might be O(n log n)
		if (state.hasBinaryOperation) {
			return "O(n log n)"
		}
		return "O(n)"
	}

	// No loops
	if (state.maxLoopDepth === 0) {
		return "O(1)"
	}

	return "Unknown"
}
