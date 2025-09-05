/**
 * Detect what types of benchmarks are appropriate for a function
 */

import type { FunctionSignature, BenchmarkPattern } from "../types/index.ts"

/**
 * Analyze function to determine appropriate benchmark patterns
 * @param signature Function signature
 * @param sourceCode Source code for analysis
 * @returns Array of detected benchmark patterns
 */
export default function detectBenchmarkPatterns(
	signature: FunctionSignature,
	sourceCode: string
): Array<string> {
	const patterns: Array<string> = []
	const name = signature.name.toLowerCase()
	
	// Array operation patterns
	if (hasArrayParameters(signature) || name.includes('map') || 
	    name.includes('filter') || name.includes('reduce')) {
		patterns.push('array-operation')
		
		// Specific array patterns
		if (name.includes('map')) patterns.push('array-map')
		if (name.includes('filter')) patterns.push('array-filter')
		if (name.includes('reduce')) patterns.push('array-reduce')
		if (name.includes('sort')) patterns.push('array-sort')
		if (name.includes('find')) patterns.push('array-find')
	}
	
	// Mathematical operation patterns
	if (signature.returnType.raw === 'number' || 
	    name.includes('add') || name.includes('multiply') || 
	    name.includes('calculate')) {
		patterns.push('math-operation')
		
		// Specific math patterns
		if (name.includes('add') || name.includes('sum')) patterns.push('math-addition')
		if (name.includes('multiply') || name.includes('product')) patterns.push('math-multiplication')
		if (name.includes('power') || name.includes('exp')) patterns.push('math-exponential')
	}
	
	// String operation patterns
	if (hasStringParameters(signature) || signature.returnType.raw === 'string') {
		patterns.push('string-operation')
		
		// Specific string patterns
		if (name.includes('split') || name.includes('join')) patterns.push('string-split-join')
		if (name.includes('replace') || name.includes('substitute')) patterns.push('string-replace')
		if (name.includes('search') || name.includes('match')) patterns.push('string-search')
	}
	
	// Curried function patterns
	if (signature.isCurried) {
		patterns.push('curried-function')
		patterns.push('partial-application') // Compare curried vs uncurried
	}
	
	// Composition patterns
	if (name === 'pipe' || name === 'compose' || name.includes('chain')) {
		patterns.push('composition')
		patterns.push('function-chain') // Different chain lengths
	}
	
	// Source code analysis for complexity
	if (sourceCode.includes('for') && sourceCode.includes('for')) {
		patterns.push('nested-operation') // Nested loops detected
	}
	
	if (sourceCode.includes('recursive') || containsRecursion(sourceCode, signature.name)) {
		patterns.push('recursive-operation')
	}
	
	// I/O or async patterns
	if (signature.returnType.raw.includes('Promise') || sourceCode.includes('await')) {
		patterns.push('async-operation')
	}
	
	// Memory allocation patterns
	if (patterns.includes('array-operation') && 
	    (name.includes('create') || name.includes('generate'))) {
		patterns.push('memory-allocation')
	}
	
	return patterns
}

/**
 * Check if function has array parameters
 */
function hasArrayParameters(signature: FunctionSignature): boolean {
	return signature.parameters.some(param => 
		param.type.raw.includes('Array') || 
		param.type.raw.includes('[]')
	)
}

/**
 * Check if function has string parameters
 */
function hasStringParameters(signature: FunctionSignature): boolean {
	return signature.parameters.some(param => param.type.raw === 'string')
}

/**
 * Detect if source code contains recursion
 */
function containsRecursion(sourceCode: string, functionName: string): boolean {
	// Simple detection: function calls itself
	const regex = new RegExp(`\\b${functionName}\\s*\\(`, 'g')
	const matches = sourceCode.match(regex)
	return matches ? matches.length > 1 : false // More than one occurrence
}