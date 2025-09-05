/**
 * Generate performance benchmark tests for functions
 */

import type { FunctionSignature, BenchmarkSuite } from "./types/index.ts"
import detectBenchmarkPatterns from "./detectBenchmarkPatterns/index.ts"
import generatePerformanceTests from "./generatePerformanceTests/index.ts"
import createBenchmarkInputs from "./createBenchmarkInputs/index.ts"
import formatBenchmarkOutput from "./formatBenchmarkOutput/index.ts"

/**
 * Generate comprehensive performance benchmarks for a function
 * @param signature Function signature to benchmark
 * @param sourceCode Source code for complexity analysis
 * @returns Complete benchmark suite
 */
export default function generateBenchmarks(
	signature: FunctionSignature,
	sourceCode: string
): BenchmarkSuite {
	// Detect what types of benchmarks are appropriate
	const patterns = detectBenchmarkPatterns(signature, sourceCode)
	
	// Generate different scales of inputs for testing
	const inputs = createBenchmarkInputs(signature, patterns)
	
	// Generate the actual benchmark tests
	const tests = generatePerformanceTests(signature, patterns, inputs)
	
	// Format for output (Deno.bench compatible)
	const formattedOutput = formatBenchmarkOutput(signature.name, tests)
	
	return {
		functionName: signature.name,
		patterns,
		inputs,
		tests,
		benchmarkCode: formattedOutput,
		expectedComplexity: inferComplexity(signature, patterns),
		thresholds: calculateThresholds(signature, patterns)
	}
}

/**
 * Infer expected algorithmic complexity from signature and patterns
 */
function inferComplexity(
	signature: FunctionSignature,
	patterns: Array<string>
): string {
	// Array operations
	if (patterns.includes('array-operation')) {
		if (signature.name.includes('map') || signature.name.includes('filter')) {
			return 'O(n)'
		}
		if (signature.name.includes('sort')) {
			return 'O(n log n)'
		}
		if (signature.name.includes('find')) {
			return 'O(n)' // worst case
		}
	}
	
	// Mathematical operations
	if (patterns.includes('math-operation')) {
		return 'O(1)' // Most math operations are constant time
	}
	
	// String operations
	if (patterns.includes('string-operation')) {
		if (signature.name.includes('replace') || signature.name.includes('split')) {
			return 'O(n)'
		}
	}
	
	// Nested loops or recursive patterns
	if (patterns.includes('nested-operation')) {
		return 'O(n²)'
	}
	
	// Default assumption
	return 'O(n)'
}

/**
 * Calculate performance thresholds based on expected complexity
 */
function calculateThresholds(
	signature: FunctionSignature,
	patterns: Array<string>
): Record<string, number> {
	const baseThreshold = 1000 // 1ms base threshold
	
	// Adjust based on operation type
	let multiplier = 1
	if (patterns.includes('math-operation')) multiplier = 0.1 // Very fast
	if (patterns.includes('string-operation')) multiplier = 2   // Moderate
	if (patterns.includes('array-operation')) multiplier = 5   // Depends on size
	if (patterns.includes('nested-operation')) multiplier = 10  // Potentially slow
	
	return {
		small: baseThreshold * multiplier,      // < 100 items
		medium: baseThreshold * multiplier * 5, // < 1000 items
		large: baseThreshold * multiplier * 10  // < 10000 items
	}
}