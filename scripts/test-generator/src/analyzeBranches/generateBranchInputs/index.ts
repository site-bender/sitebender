/**
 * Generate test inputs to trigger specific branches
 */

import type { BranchInfo, TestInput } from "../types/index.ts"
import analyzeCondition from "./analyzeCondition/index.ts"
import generateValueForCondition from "./generateValueForCondition/index.ts"

/**
 * Generate test inputs that will trigger a specific branch
 * @param branch The branch to generate inputs for
 * @returns Array of test inputs that will trigger this branch
 */
export default function generateBranchInputs(
	branch: BranchInfo
): Array<TestInput> {
	const inputs: Array<TestInput> = []
	
	// Analyze the condition to understand what values are needed
	const conditionAnalysis = analyzeCondition(branch.condition)
	
	// Generate appropriate test values based on condition type
	for (const analysis of conditionAnalysis) {
		const value = generateValueForCondition(analysis, branch.type)
		
		inputs.push({
			description: `${analysis.variable} ${analysis.operator} triggers ${branch.id}`,
			value
		})
	}
	
	// Fallback for complex or unparseable conditions
	if (inputs.length === 0) {
		switch (branch.type) {
			case 'if':
			case 'ternary':
				inputs.push({
					description: branch.condition.startsWith('!') 
						? 'falsy value for negated condition'
						: 'truthy value for condition',
					value: branch.condition.startsWith('!') ? false : true
				})
				break
				
			case 'switch':
				if (branch.condition.includes('===')) {
					const value = branch.condition.split('===')[1].trim()
					inputs.push({
						description: `value equals ${value}`,
						value: tryParseValue(value)
					})
				} else {
					inputs.push({
						description: 'unmatched value for default case',
						value: 'unmatched-value'
					})
				}
				break
				
			case 'logical':
				inputs.push({
					description: branch.condition.includes('short-circuit')
						? 'value that short-circuits'
						: 'value that evaluates right side',
					value: branch.condition.includes('!') ? false : true
				})
				break
				
			case 'try':
				if (branch.condition === 'exception thrown') {
					inputs.push({
						description: 'input that causes error',
						value: null // Common error trigger
					})
				} else {
					inputs.push({
						description: 'valid input',
						value: 'valid'
					})
				}
				break
		}
	}
	
	return inputs
}

/**
 * Try to parse a string value into appropriate type
 */
function tryParseValue(str: string): unknown {
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