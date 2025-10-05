/**
 * Intent Detector
 *
 * Detects user intent from messages to determine which encoding types
 * to retrieve from the RAG system.
 */

export type IntentAction =
	| 'create'
	| 'modify'
	| 'fix'
	| 'explain'
	| 'example'

export type Intent = {
	action: IntentAction
	subject: string
	context: ReadonlyArray<string>
}

/**
 * Detects the user's intent from their message.
 * Returns the action they want to perform, the subject, and context keywords.
 */
export default function detectIntent(message: string): Intent {
	const lower = message.toLowerCase()

	// Detect action (order matters - more specific first)
	let action: IntentAction = 'create'
	if (lower.match(/example|show|demonstrate|sample/)) {
		action = 'example'
	} else if (lower.match(/fix|repair|correct|debug/)) {
		action = 'fix'
	} else if (lower.match(/modify|change|update|refactor|improve/)) {
		action = 'modify'
	} else if (lower.match(/explain|why|how|what|understand|clarify/)) {
		action = 'explain'
	}

	// Extract subject
	const subject = extractSubject(message)

	// Extract context keywords
	const context = extractContextKeywords(message)

	return { action, subject, context }
}

/**
 * Extracts the main subject from the message.
 */
function extractSubject(message: string): string {
	const lower = message.toLowerCase()

	// Common subjects in order of specificity
	const subjects = [
		'component',
		'function',
		'type',
		'interface',
		'test',
		'error',
		'validation',
		'async',
		'file',
		'api',
		'data',
		'state',
		'form',
		'button',
		'input'
	]

	for (const subject of subjects) {
		if (lower.includes(subject)) {
			return subject
		}
	}

	return 'general'
}

/**
 * Extracts context keywords from the message.
 */
function extractContextKeywords(message: string): ReadonlyArray<string> {
	const lower = message.toLowerCase()
	const keywords: Array<string> = []

	// Technical keywords
	const technicalTerms = [
		'async', 'await', 'promise',
		'error', 'exception', 'result',
		'type', 'interface', 'branded',
		'test', 'spec', 'mock',
		'validate', 'check', 'verify',
		'component', 'props', 'render',
		'file', 'read', 'write',
		'api', 'fetch', 'request'
	]

	for (const term of technicalTerms) {
		if (lower.includes(term)) {
			keywords.push(term)
		}
	}

	return keywords
}

/**
 * Determines which encoding types to retrieve based on intent.
 */
export function getEncodingTypesForIntent(intent: Intent): ReadonlyArray<string> {
	switch (intent.action) {
		case 'create':
			// Get patterns and examples for creating new code
			return ['pattern', 'example']

		case 'modify':
			// Get patterns and principles for modifying existing code
			return ['pattern', 'principle']

		case 'fix':
			// Get anti-patterns and correct patterns for fixing issues
			return ['antipattern', 'pattern', 'counterexample']

		case 'explain':
			// Get principles and examples for explaining concepts
			return ['principle', 'example']

		case 'example':
			// Get examples and counter-examples for showing how to do things
			return ['example', 'counterexample']

		default:
			return ['pattern', 'example']
	}
}
