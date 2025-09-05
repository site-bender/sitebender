/**
 * Generate performance benchmark tests
 */

import type { FunctionSignature, BenchmarkTest, BenchmarkInputSet } from "../types/index.ts"
import generateMicroBenchmarks from "./generateMicroBenchmarks/index.ts"
import generateComparisonBenchmarks from "./generateComparisonBenchmarks/index.ts"
import generateComplexityBenchmarks from "./generateComplexityBenchmarks/index.ts"

/**
 * Generate comprehensive performance tests
 * @param signature Function signature
 * @param patterns Detected benchmark patterns
 * @param inputs Generated input sets
 * @returns Array of benchmark tests
 */
export default function generatePerformanceTests(
	signature: FunctionSignature,
	patterns: Array<string>,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	
	// Generate micro-benchmarks (single function performance)
	tests.push(...generateMicroBenchmarks(signature, inputs))
	
	// Generate comparison benchmarks (different approaches)
	if (patterns.includes('curried-function') || patterns.includes('composition')) {
		tests.push(...generateComparisonBenchmarks(signature, patterns, inputs))
	}
	
	// Generate complexity benchmarks (algorithmic complexity validation)
	if (patterns.includes('array-operation') || patterns.includes('string-operation')) {
		tests.push(...generateComplexityBenchmarks(signature, patterns, inputs))
	}
	
	// Pattern-specific benchmarks
	if (patterns.includes('array-map')) {
		tests.push(...generateArrayMapBenchmarks(signature, inputs))
	}
	
	if (patterns.includes('math-operation')) {
		tests.push(...generateMathBenchmarks(signature, inputs))
	}
	
	if (patterns.includes('string-operation')) {
		tests.push(...generateStringBenchmarks(signature, inputs))
	}
	
	return tests
}

/**
 * Generate benchmarks specific to array map operations
 */
function generateArrayMapBenchmarks(
	signature: FunctionSignature,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	// Simple transformation benchmark
	tests.push({
		name: `${functionName} - simple transformation`,
		category: 'micro',
		inputSize: 'medium',
		setup: `
			const arr = ${JSON.stringify(inputs.medium[0])}
			const double = (x) => x * 2
		`,
		benchmark: `${functionName}(double)(arr)`
	})
	
	// Complex transformation benchmark
	tests.push({
		name: `${functionName} - complex transformation`,
		category: 'micro',
		inputSize: 'medium',
		setup: `
			const arr = ${JSON.stringify(inputs.medium[0])}
			const complexFn = (x) => Math.sqrt(x * x + 1)
		`,
		benchmark: `${functionName}(complexFn)(arr)`
	})
	
	return tests
}

/**
 * Generate benchmarks for mathematical operations
 */
function generateMathBenchmarks(
	signature: FunctionSignature,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	// Integer operations
	tests.push({
		name: `${functionName} - integer operations`,
		category: 'micro',
		inputSize: 'small',
		setup: `const a = 42; const b = 13`,
		benchmark: signature.isCurried 
			? `${functionName}(a)(b)`
			: `${functionName}(a, b)`
	})
	
	// Floating point operations  
	tests.push({
		name: `${functionName} - floating point operations`,
		category: 'micro',
		inputSize: 'small',
		setup: `const a = Math.PI; const b = Math.E`,
		benchmark: signature.isCurried 
			? `${functionName}(a)(b)`
			: `${functionName}(a, b)`
	})
	
	// Large number operations
	tests.push({
		name: `${functionName} - large number operations`,
		category: 'micro',
		inputSize: 'large',
		setup: `const a = 1000000; const b = 999999`,
		benchmark: signature.isCurried 
			? `${functionName}(a)(b)`
			: `${functionName}(a, b)`
	})
	
	return tests
}

/**
 * Generate benchmarks for string operations
 */
function generateStringBenchmarks(
	signature: FunctionSignature,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	for (const [sizeKey, sizeInputs] of Object.entries(inputs)) {
		if (sizeKey === 'scaled' || sizeKey === 'realistic') continue
		
		const stringInput = sizeInputs.find(input => typeof input === 'string')
		if (stringInput) {
			tests.push({
				name: `${functionName} - ${sizeKey} string`,
				category: 'micro',
				inputSize: sizeKey as 'small' | 'medium' | 'large',
				setup: `const str = ${JSON.stringify(stringInput)}`,
				benchmark: `${functionName}(str)`
			})
		}
	}
	
	return tests
}