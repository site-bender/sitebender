//++ Collects metadata about code patterns during AST traversal
import * as typescript from "npm:typescript@5.7.2"

import type { TraversalMetadata } from "../../../index.ts"

import isGlobalIdentifier from "../isGlobalIdentifier/index.ts"

export default function collectMetadata(
	node: typescript.Node,
	metadata: TraversalMetadata,
): TraversalMetadata {
	const hasDecisionPoint = typescript.isIfStatement(node) ||
		typescript.isConditionalExpression(node) ||
		typescript.isSwitchStatement(node) ||
		typescript.isForStatement(node) ||
		typescript.isForInStatement(node) ||
		typescript.isForOfStatement(node) ||
		typescript.isWhileStatement(node) ||
		typescript.isDoStatement(node) ||
		typescript.isCatchClause(node)

	const hasLogicalOperator = typescript.isBinaryExpression(node) && (
		node.operatorToken.kind === typescript.SyntaxKind.AmpersandAmpersandToken ||
		node.operatorToken.kind === typescript.SyntaxKind.BarBarToken ||
		node.operatorToken.kind === typescript.SyntaxKind.QuestionQuestionToken
	)

	const identifierText = typescript.isIdentifier(node) ? node.getText() : null

	return {
		...metadata,
		hasThrowStatements: metadata.hasThrowStatements ||
			typescript.isThrowStatement(node),
		hasAwaitExpressions: metadata.hasAwaitExpressions ||
			typescript.isAwaitExpression(node),
		hasReturnStatements: metadata.hasReturnStatements ||
			typescript.isReturnStatement(node),
		hasGlobalAccess: metadata.hasGlobalAccess ||
			(identifierText !== null && isGlobalIdentifier(identifierText)),
		cyclomaticComplexity: metadata.cyclomaticComplexity +
			(hasDecisionPoint ? 1 : 0) +
			(hasLogicalOperator ? 1 : 0),
	}
}

//?? [EXAMPLE] collectMetadata(node, metadata)
//?? [EXAMPLE] metadata.hasThrowStatements // true if throw found
//?? [EXAMPLE] metadata.cyclomaticComplexity // increased for each branch
