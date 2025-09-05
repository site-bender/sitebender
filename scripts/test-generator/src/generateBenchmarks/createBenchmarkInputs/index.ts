/**
 * Create benchmark inputs of different sizes and complexities
 */

import type { FunctionSignature, BenchmarkInputSet } from "../types/index.ts"
import generateScaledInputs from "./generateScaledInputs/index.ts"
import generateRealisticInputs from "./generateRealisticInputs/index.ts"

/**
 * Generate comprehensive input sets for benchmarking
 * @param signature Function signature
 * @param patterns Detected benchmark patterns
 * @returns Complete set of benchmark inputs
 */
export default function createBenchmarkInputs(
	signature: FunctionSignature,
	patterns: Array<string>
): BenchmarkInputSet {
	const inputs: BenchmarkInputSet = {
		small: [],
		medium: [],
		large: [],
		scaled: [],
		realistic: []
	}
	
	// Generate inputs based on first parameter type (most common case)
	const firstParam = signature.parameters[0]
	if (!firstParam) {
		// No parameters - use simple values
		inputs.small = [undefined]
		inputs.medium = [undefined]
		inputs.large = [undefined]
		inputs.scaled = [{ size: 1, input: undefined }]
		inputs.realistic = [undefined]
		return inputs
	}
	
	const paramType = firstParam.type.raw
	
	// Array inputs
	if (paramType.includes('Array') || paramType.includes('[]')) {
		inputs.small = generateArrayInputs(10)      // 10 items
		inputs.medium = generateArrayInputs(1000)   // 1K items
		inputs.large = generateArrayInputs(10000)   // 10K items
		inputs.scaled = generateScaledInputs('array', [1, 10, 100, 1000, 5000])
		inputs.realistic = generateRealisticInputs('array', patterns)
	}
	
	// String inputs
	else if (paramType === 'string') {
		inputs.small = generateStringInputs(10)     // 10 chars
		inputs.medium = generateStringInputs(1000)  // 1K chars
		inputs.large = generateStringInputs(10000)  // 10K chars
		inputs.scaled = generateScaledInputs('string', [1, 10, 100, 1000, 5000])
		inputs.realistic = generateRealisticInputs('string', patterns)
	}
	
	// Number inputs
	else if (paramType === 'number') {
		inputs.small = [1, 2, 5, 10]
		inputs.medium = [100, 500, 1000, 2500]
		inputs.large = [10000, 50000, 100000, 500000]
		inputs.scaled = generateScaledInputs('number', [1, 10, 100, 1000, 10000])
		inputs.realistic = generateRealisticInputs('number', patterns)
	}
	
	// Function inputs (for higher-order functions)
	else if (paramType.includes('=>')) {
		const functions = [
			(x: unknown) => x,              // Identity
			(x: number) => x * 2,           // Simple math
			(x: number) => Math.sqrt(x),    // Complex math
			(x: unknown) => JSON.stringify(x) // Type conversion
		]
		inputs.small = functions
		inputs.medium = functions
		inputs.large = functions
		inputs.scaled = functions.map((fn, i) => ({ size: i + 1, input: fn }))
		inputs.realistic = functions
	}
	
	// Object inputs
	else if (paramType === 'object') {
		inputs.small = generateObjectInputs(5)      // 5 properties
		inputs.medium = generateObjectInputs(50)    // 50 properties
		inputs.large = generateObjectInputs(500)    // 500 properties
		inputs.scaled = generateScaledInputs('object', [1, 5, 25, 100, 250])
		inputs.realistic = generateRealisticInputs('object', patterns)
	}
	
	// Default fallback
	else {
		inputs.small = [1, 'test', true, null]
		inputs.medium = inputs.small
		inputs.large = inputs.small
		inputs.scaled = inputs.small.map((val, i) => ({ size: i + 1, input: val }))
		inputs.realistic = inputs.small
	}
	
	return inputs
}

/**
 * Generate array inputs of specified size
 */
function generateArrayInputs(size: number): Array<Array<number>> {
	return [
		Array.from({ length: size }, (_, i) => i),              // Sequential
		Array.from({ length: size }, () => Math.random()),      // Random
		Array.from({ length: size }, () => 1),                  // Uniform
		Array.from({ length: size }, (_, i) => size - i - 1)    // Reverse sequential
	]
}

/**
 * Generate string inputs of specified size
 */
function generateStringInputs(size: number): Array<string> {
	return [
		'a'.repeat(size),                                       // Uniform
		Array.from({ length: size }, (_, i) => String.fromCharCode(65 + (i % 26))).join(''), // Alphabet
		Math.random().toString(36).repeat(Math.ceil(size / 10)).slice(0, size), // Random
		'Hello, world! '.repeat(Math.ceil(size / 14)).slice(0, size) // Realistic
	]
}

/**
 * Generate object inputs with specified number of properties
 */
function generateObjectInputs(propCount: number): Array<Record<string, unknown>> {
	const objects: Array<Record<string, unknown>> = []
	
	// Simple object
	const simple: Record<string, unknown> = {}
	for (let i = 0; i < propCount; i++) {
		simple[`prop${i}`] = i
	}
	objects.push(simple)
	
	// Mixed types object
	const mixed: Record<string, unknown> = {}
	for (let i = 0; i < propCount; i++) {
		mixed[`prop${i}`] = i % 4 === 0 ? i : 
		                   i % 4 === 1 ? `value${i}` :
		                   i % 4 === 2 ? i % 2 === 0 :
		                   null
	}
	objects.push(mixed)
	
	return objects
}