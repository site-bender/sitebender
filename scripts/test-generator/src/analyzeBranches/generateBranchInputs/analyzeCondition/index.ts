/**
 * Analyze a condition to understand what values are needed
 */

export interface ConditionAnalysis {
	variable: string
	operator: string
	value?: unknown
	type: 'comparison' | 'boolean' | 'null-check' | 'type-check' | 'complex'
}

/**
 * Analyze a branch condition to extract testable components
 * @param condition The condition string to analyze
 * @returns Array of condition analysis results
 */
export default function analyzeCondition(condition: string): Array<ConditionAnalysis> {
	const analyses: Array<ConditionAnalysis> = []
	
	// Type checks
	const typeofMatch = condition.match(/typeof\s+(\w+)\s*===?\s*["'](\w+)["']/)
	if (typeofMatch) {
		analyses.push({
			variable: typeofMatch[1],
			operator: 'typeof',
			value: typeofMatch[2],
			type: 'type-check'
		})
		return analyses
	}
	
	// Null/undefined checks
	const nullMatch = condition.match(/(\w+)\s*(===?|!==?)\s*(null|undefined)/)
	if (nullMatch) {
		analyses.push({
			variable: nullMatch[1],
			operator: nullMatch[2],
			value: nullMatch[3] === 'null' ? null : undefined,
			type: 'null-check'
		})
		return analyses
	}
	
	// Comparison operators
	const comparisonMatch = condition.match(/(\w+)\s*([><=!]+)\s*(.+)/)
	if (comparisonMatch) {
		analyses.push({
			variable: comparisonMatch[1],
			operator: comparisonMatch[2],
			value: tryParseValue(comparisonMatch[3]),
			type: 'comparison'
		})
		return analyses
	}
	
	// Boolean/truthy checks
	const boolMatch = condition.match(/^!?(\w+)$/)
	if (boolMatch) {
		analyses.push({
			variable: boolMatch[1],
			operator: condition.startsWith('!') ? 'not' : 'truthy',
			type: 'boolean'
		})
		return analyses
	}
	
	// Complex condition - can't analyze easily
	analyses.push({
		variable: 'input',
		operator: 'complex',
		type: 'complex'
	})
	
	return analyses
}

/**
 * Try to parse a string value into appropriate type
 */
function tryParseValue(str: string): unknown {
	str = str.trim()
	
	// Remove quotes if present
	if ((str.startsWith('"') && str.endsWith('"')) ||
	    (str.startsWith("'") && str.endsWith("'"))) {
		return str.slice(1, -1)
	}
	
	// Check for boolean
	if (str === 'true') return true
	if (str === 'false') return false
	
	// Check for null/undefined
	if (str === 'null') return null
	if (str === 'undefined') return undefined
	
	// Try to parse as number
	const num = Number(str)
	if (!isNaN(num)) return num
	
	// Default to string
	return str
}