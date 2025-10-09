//++ Example: How Warden uses Arborist for constitutional rule checking
//++ Shows violation detection for architectural governance

import parseFileWithSwc from "../../../src/api/parseFileWithSwc/index.ts"

// Sample user type for demo
type User = {
	processed?: boolean
	[key: string]: unknown
}

//++ Sample function that might have constitutional violations
export default function processUserData(user: User) {
	// This function has potential violations:
	// - Uses 'any' type (not specific)
	// - Might have mutations if implemented poorly
	return function processUser() {
		//-- [VIOLATION] This would be flagged by Warden
		user.processed = true // Mutation!
		return user
	}
}

//++ Warden constitutional rule checking example
export async function checkConstitutionalRules(filePath: string) {
	const result = await parseFileWithSwc(filePath)

	if (result._tag === "Error") {
		return {
			error: `Failed to parse: ${result.error.message}`,
			violations: null,
		}
	}

	// In real Warden, this would check for:
	// - Arrow functions (not allowed)
	// - Classes (not allowed)
	// - Loops (forbidden, use map/filter/reduce)
	// - Exceptions (use Result monads)
	// - Mutations (immutable data only)
	// - File naming (must be index.ts)
	// - Function naming (must match folder)

	const violations = {
		arrowFunctions: "Would detect '=>' syntax",
		classes: "Would detect 'class' keyword",
		loops: "Would detect for/while loops",
		exceptions: "Would detect try/catch/throw",
		mutations: "Would detect array.push, obj.prop = value",
		fileNaming: "Would check filename is index.ts",
		functionNaming: "Would check function name matches folder",
		imports: "Would check for barrel imports",
	}

	const hasViolations = Object.values(violations).some((v) => v !== "none")

	return {
		error: null,
		violations: hasViolations
			? violations
			: "No constitutional violations detected",
	}
}
