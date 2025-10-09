/**
 * Task Type Detector
 *
 * Analyzes user messages to determine what type of task they're requesting.
 * This enables automatic retrieval of relevant rules before code generation.
 */

export type TaskType =
	| "error-handling"
	| "type-definition"
	| "testing"
	| "async-operation"
	| "validation"
	| "file-operation"
	| "component"
	| "general"

/**
 * Detects task types from a user message using keyword matching.
 * Returns array of detected task types, or ['general'] if none detected.
 */
export default function detectTaskType(
	userMessage: string,
): ReadonlyArray<TaskType> {
	const types: Array<TaskType> = []
	const lower = userMessage.toLowerCase()

	// Error handling
	if (lower.match(/error|fail|exception|result|validation/)) {
		types.push("error-handling")
	}

	// Type definitions
	if (lower.match(/type|interface|branded|discriminated|union/)) {
		types.push("type-definition")
	}

	// Testing
	if (lower.match(/test|spec|assert|expect|mock/)) {
		types.push("testing")
	}

	// Async operations
	if (lower.match(/async|await|promise|fetch|api/)) {
		types.push("async-operation")
	}

	// Validation
	if (lower.match(/validate|check|verify|sanitize/)) {
		types.push("validation")
	}

	// File operations
	if (lower.match(/file|read|write|fs|path/)) {
		types.push("file-operation")
	}

	// Components
	if (lower.match(/component|jsx|tsx|render|props/)) {
		types.push("component")
	}

	return types.length > 0 ? types : ["general"]
}
