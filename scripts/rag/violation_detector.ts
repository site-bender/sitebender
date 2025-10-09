/**
 * Violation Detector
 *
 * Detects violations of constitutional rules in generated code.
 * Uses regex patterns to identify critical violations before code reaches the user.
 */

export type ViolationType =
	| "no-classes"
	| "no-arrow-functions"
	| "no-loops"
	| "no-exceptions"
	| "no-mutations"

export type Violation = {
	type: "CRITICAL" | "WARNING"
	rule: ViolationType
	line: number
	message: string
	suggestion: string
}

type PatternDefinition = {
	pattern: RegExp
	rule: ViolationType
	message: string
	suggestion: string
}

/**
 * Critical patterns that must be blocked.
 * Each pattern includes the violation type, message, and suggestion for fixing.
 */
const CRITICAL_PATTERNS: ReadonlyArray<PatternDefinition> = [
	{
		pattern: /class\s+\w+/g,
		rule: "no-classes",
		message: "Classes are forbidden. Use pure functions.",
		suggestion: "Convert to module with exported functions",
	},
	{
		pattern: /=>/g,
		rule: "no-arrow-functions",
		message: "Arrow functions are forbidden. Use function keyword.",
		suggestion: "Replace with: function name(...) { ... }",
	},
	{
		pattern: /\bfor\s*\(/g,
		rule: "no-loops",
		message: "For loops are forbidden. Use map/filter/reduce.",
		suggestion: "Use Toolsmith functions: map(fn)(array)",
	},
	{
		pattern: /\bwhile\s*\(/g,
		rule: "no-loops",
		message: "While loops are forbidden. Use recursion or reduce.",
		suggestion: "Use recursive function or reduce",
	},
	{
		pattern: /\btry\s*\{/g,
		rule: "no-exceptions",
		message: "Try-catch is forbidden. Use Result monad.",
		suggestion: "Return Result<T, E> type instead",
	},
	{
		pattern: /\bthrow\s+/g,
		rule: "no-exceptions",
		message: "Throw is forbidden. Return error value.",
		suggestion: 'Return error({ _tag: "ErrorType", ... })',
	},
	{
		pattern: /\.push\(/g,
		rule: "no-mutations",
		message: "Array.push() is forbidden. Use spread operator.",
		suggestion: "Use: [...array, item]",
	},
	{
		pattern: /\.pop\(/g,
		rule: "no-mutations",
		message: "Array.pop() is forbidden. Use slice.",
		suggestion: "Use: array.slice(0, -1)",
	},
	{
		pattern: /\blet\s+/g,
		rule: "no-mutations",
		message: "Let is forbidden (except in generators). Use const.",
		suggestion: "Use: const name = ...",
	},
]

/**
 * Detects violations in code by checking against critical patterns.
 * Returns array of violations found, with line numbers and suggestions.
 */
export default function detectViolations(
	code: string,
): ReadonlyArray<Violation> {
	const violations: Array<Violation> = []
	const lines = code.split("\n")

	for (const patternDef of CRITICAL_PATTERNS) {
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i]

			// Skip comments
			if (line.trim().startsWith("//")) {
				continue
			}

			// Skip generator exception comments
			if (line.includes("[GENERATOR_EXCEPTION]")) {
				continue
			}

			// Check for pattern
			if (patternDef.pattern.test(line)) {
				violations.push({
					type: "CRITICAL",
					rule: patternDef.rule,
					line: i + 1,
					message: patternDef.message,
					suggestion: patternDef.suggestion,
				})
			}

			// Reset regex lastIndex for global patterns
			patternDef.pattern.lastIndex = 0
		}
	}

	return violations
}

/**
 * Formats violations into a readable report for display.
 */
export function formatViolationReport(
	violations: ReadonlyArray<Violation>,
): string {
	return violations.map(
		function formatViolation(v: Violation): string {
			return `
❌ VIOLATION at line ${v.line}: ${v.rule}
   ${v.message}
   💡 Suggestion: ${v.suggestion}`
		},
	).join("\n")
}
