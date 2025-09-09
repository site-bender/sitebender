import type { AstNode } from "../../detectMathPropertiesFromAST/types/index.ts"

import contains from "../../../../../toolkit/src/simple/string/contains/index.ts"
import some from "../../../../../toolkit/src/simple/array/some/index.ts"
import {
	CASE_CLAUSE_KIND,
	CATCH_CLAUSE_KIND,
	CONDITIONAL_EXPRESSION_KIND,
	CONDITIONAL_PATTERNS,
	DO_STATEMENT_KIND,
	FOR_IN_STATEMENT_KIND,
	FOR_OF_STATEMENT_KIND,
	FOR_STATEMENT_KIND,
	IF_STATEMENT_KIND,
	LOGICAL_AND_KIND,
	LOGICAL_OR_KIND,
	LOOP_PATTERNS,
	NULLISH_COALESCING_KIND,
	SWITCH_STATEMENT_KIND,
	WHILE_STATEMENT_KIND,
	WITH_STATEMENT_KIND,
} from "../constants/index.ts"

//++ Calculates cyclomatic complexity of a function
export default function calculateCyclomaticComplexity(node: AstNode): number {
	// Start with base complexity of 1
	const baseComplexity = 1

	// Count decision points
	const decisionPoints = countDecisionPoints(node)

	return baseComplexity + decisionPoints
}

function countDecisionPoints(node: AstNode): number {
	const complexity = { value: 0 }

	// Check node kind for control flow statements
	const controlFlowKinds = [
		IF_STATEMENT_KIND,
		WHILE_STATEMENT_KIND,
		DO_STATEMENT_KIND,
		FOR_STATEMENT_KIND,
		FOR_IN_STATEMENT_KIND,
		FOR_OF_STATEMENT_KIND,
		SWITCH_STATEMENT_KIND,
		CASE_CLAUSE_KIND,
		CONDITIONAL_EXPRESSION_KIND,
		CATCH_CLAUSE_KIND,
		WITH_STATEMENT_KIND,
	]

	const isControlFlow = some(function checkKind(kind: number) {
		return node.kind === kind
	})(controlFlowKinds)

	if (isControlFlow) {
		complexity.value += 1
	}

	// Check for logical operators
	const logicalKinds = [
		LOGICAL_AND_KIND,
		LOGICAL_OR_KIND,
		NULLISH_COALESCING_KIND,
	]

	const isLogicalOperator = some(function checkKind(kind: number) {
		return node.kind === kind
	})(logicalKinds)

	if (isLogicalOperator) {
		complexity.value += 1
	}

	// Text-based fallback for patterns
	if (node.getText) {
		const nodeText = node.getText()

		// Count loop patterns
		const loopCount = countPatterns(nodeText, LOOP_PATTERNS)
		complexity.value += loopCount

		// Count conditional patterns (but avoid double-counting)
		const conditionalCount = countPatterns(nodeText, CONDITIONAL_PATTERNS)
		// Only add if we haven't already counted via AST
		if (!isControlFlow && !isLogicalOperator) {
			complexity.value += Math.min(conditionalCount, 1) // Avoid over-counting
		}
	}

	// Recursively count in children
	if (node.forEachChild) {
		node.forEachChild(function countChild(child: AstNode): void {
			complexity.value += countDecisionPoints(child)
		})
	}

	return complexity.value
}

function countPatterns(text: string, patterns: Array<string>): number {
	const count = { value: 0 }

	some(function checkPattern(pattern: string) {
		if (contains(pattern)(text)) {
			count.value += 1
			return false // Continue checking other patterns
		}
		return false
	})(patterns)

	return count.value
}

//?? [EXAMPLE] calculateCyclomaticComplexity(simpleFunctionNode) // 1
//?? [EXAMPLE] calculateCyclomaticComplexity(complexFunctionNode) // 10+
//?? [GOTCHA] May double-count some patterns when using text fallback
