import type { AstNode } from "../../detectMathPropertiesFromAST/types/index.ts"

import some from "../../../../../toolsmith/src/vanilla/array/some/index.ts"
import contains from "../../../../../toolsmith/src/vanilla/string/contains/index.ts"
import {
	GLOBAL_OBJECTS,
	NON_DETERMINISTIC_PATTERNS,
} from "../constants/index.ts"

//++ Checks if AST node depends on external state or I/O
export default function checkForExternalDependencies(node: AstNode): boolean {
	if (!node.getText) {
		return false
	}

	const nodeText = node.getText()

	// Check for global object access
	const hasGlobalObject = some(function checkGlobal(global: string) {
		return contains(global)(nodeText)
	})(GLOBAL_OBJECTS)

	if (hasGlobalObject) {
		return true
	}

	// Check for non-deterministic patterns
	const hasNonDeterministic = some(function checkPattern(pattern: string) {
		return contains(pattern)(nodeText)
	})(NON_DETERMINISTIC_PATTERNS)

	if (hasNonDeterministic) {
		return true
	}

	// Check for file system operations (Deno specific)
	const hasFileOps = contains("Deno.")(nodeText) && (
		contains("Deno.readFile")(nodeText) ||
		contains("Deno.writeFile")(nodeText) ||
		contains("Deno.open")(nodeText) ||
		contains("Deno.remove")(nodeText)
	)

	if (hasFileOps) {
		return true
	}

	// Recursively check children
	if (node.forEachChild) {
		const foundDependency = node.forEachChild(function checkChild(
			child: AstNode,
		): boolean | undefined {
			return checkForExternalDependencies(child) || undefined
		})

		return !!foundDependency
	}

	return false
}
