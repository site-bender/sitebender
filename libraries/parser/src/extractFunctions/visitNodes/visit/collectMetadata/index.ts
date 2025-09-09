//++ Collects metadata about code patterns during AST traversal
import * as typescript from "npm:typescript@5.7.2"

import type { TraversalMetadata } from "../../../index.ts"

import isGlobalIdentifier from "../isGlobalIdentifier/index.ts"

export default function collectMetadata(
	node: typescript.Node,
	metadata: TraversalMetadata,
): void {
	// Check for throw statements
	if (typescript.isThrowStatement(node)) {
		(metadata as any).hasThrowStatements = true
	}

	// Check for await expressions
	if (typescript.isAwaitExpression(node)) {
		(metadata as any).hasAwaitExpressions = true
	}

	// Check for return statements
	if (typescript.isReturnStatement(node)) {
		(metadata as any).hasReturnStatements = true
	}

	// Check for global access
	if (typescript.isIdentifier(node)) {
		const text = node.getText()
		if (isGlobalIdentifier(text)) {
			(metadata as any).hasGlobalAccess = true
		}
	}

	// Increment complexity for decision points
	if (
		typescript.isIfStatement(node) ||
		typescript.isConditionalExpression(node) ||
		typescript.isSwitchStatement(node) ||
		typescript.isForStatement(node) ||
		typescript.isForInStatement(node) ||
		typescript.isForOfStatement(node) ||
		typescript.isWhileStatement(node) ||
		typescript.isDoStatement(node) ||
		typescript.isCatchClause(node)
	) {
		(metadata as any).cyclomaticComplexity++
	}

	// Increment for logical operators
	if (typescript.isBinaryExpression(node)) {
		const operator = node.operatorToken.kind
		if (
			operator === typescript.SyntaxKind.AmpersandAmpersandToken ||
			operator === typescript.SyntaxKind.BarBarToken ||
			operator === typescript.SyntaxKind.QuestionQuestionToken
		) {
			(metadata as any).cyclomaticComplexity++
		}
	}
}

//?? [EXAMPLE] collectMetadata(node, metadata)
//?? [EXAMPLE] metadata.hasThrowStatements // true if throw found
//?? [EXAMPLE] metadata.cyclomaticComplexity // increased for each branch