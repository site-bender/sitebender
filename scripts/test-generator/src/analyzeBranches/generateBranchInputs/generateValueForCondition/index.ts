/**
 * Generate a value that satisfies a condition analysis
 */

import type { ConditionAnalysis } from "../analyzeCondition/index.ts"

/**
 * Generate a test value based on condition analysis
 * @param analysis The condition analysis
 * @param branchType The type of branch being tested
 * @returns A value that will trigger the branch
 */
export default function generateValueForCondition(
	analysis: ConditionAnalysis,
	branchType: string
): unknown {
	switch (analysis.type) {
		case 'type-check':
			return generateTypeValue(analysis.value as string, analysis.operator === '!==')
		
		case 'null-check':
			return analysis.value
		
		case 'comparison':
			return generateComparisonValue(analysis.operator, analysis.value)
		
		case 'boolean':
			return analysis.operator === 'not' ? false : true
		
		case 'complex':
		default:
			// For complex conditions, return a generic truthy value
			return branchType === 'try' ? null : true
	}
}

/**
 * Generate a value of the specified type
 */
function generateTypeValue(type: string, negate: boolean): unknown {
	const typeValues: Record<string, unknown> = {
		'string': 'test',
		'number': 42,
		'boolean': true,
		'object': {},
		'function': () => {},
		'undefined': undefined,
		'symbol': Symbol('test')
	}
	
	if (negate) {
		// Return something that is NOT the specified type
		return type === 'number' ? 'not-a-number' : 123
	}
	
	return typeValues[type] ?? 'unknown'
}

/**
 * Generate a value that satisfies a comparison
 */
function generateComparisonValue(operator: string, value: unknown): unknown {
	if (typeof value === 'number') {
		switch (operator) {
			case '>':
				return value + 1
			case '>=':
				return value
			case '<':
				return value - 1
			case '<=':
				return value
			case '===':
			case '==':
				return value
			case '!==':
			case '!=':
				return value + 1
			default:
				return value
		}
	}
	
	// For non-numeric comparisons, return the value or something different
	if (operator === '===' || operator === '==') {
		return value
	} else if (operator === '!==' || operator === '!=') {
		return value === 'test' ? 'different' : 'test'
	}
	
	return value
}