import type { AstNode } from "../../types/index.ts"

import some from "../../../../../../toolsmith/src/vanilla/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/vanilla/string/contains/index.ts"
import { IDEMPOTENT_PATTERNS } from "../constants/index.ts"

//++ Checks if AST node contains patterns suggesting idempotent operation
export default function hasIdempotentPattern(node: AstNode): boolean {
	if (!node.getText) {
		return false
	}

	const nodeText = node.getText()

	// Check for text patterns that suggest idempotency
	const hasPattern = some(function checkPattern(pattern: string) {
		return contains(pattern)(nodeText)
	})(IDEMPOTENT_PATTERNS)

	// Check for structural patterns like returning the input unchanged
	const hasIdentityReturn = checkIdentityReturn(node)

	return hasPattern || hasIdentityReturn
}

function checkIdentityReturn(node: AstNode): boolean {
	if (!node.getText) {
		return false
	}

	const nodeText = node.getText()

	// Check for patterns like "return x" or "=> x" where x is the parameter
	const hasDirectReturn = contains("return ")(nodeText) && (
		contains("return value")(nodeText) ||
		contains("return input")(nodeText) ||
		contains("return x")(nodeText) ||
		contains("return arg")(nodeText) ||
		contains("return param")(nodeText)
	)

	// Check for arrow functions that directly return the parameter
	const hasArrowReturn = contains("=>")(nodeText) && (
		contains("=> value")(nodeText) ||
		contains("=> input")(nodeText) ||
		contains("=> x")(nodeText) ||
		contains("=> arg")(nodeText) ||
		contains("=> param")(nodeText)
	)

	return hasDirectReturn || hasArrowReturn
}

//?? [EXAMPLE] hasIdempotentPattern(mathAbsNode) // true
//?? [PRO] Detects common idempotent patterns
//?? [CON] May have false positives with text-based matching
