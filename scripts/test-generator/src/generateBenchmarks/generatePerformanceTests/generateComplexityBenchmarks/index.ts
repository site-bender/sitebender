/**
 * Generate complexity benchmarks to validate algorithmic performance
 */

import type { FunctionSignature, BenchmarkTest, BenchmarkInputSet } from "../../types/index.ts"

/**
 * Generate complexity benchmarks that test algorithmic scaling
 * @param signature Function signature
 * @param patterns Detected patterns
 * @param inputs Input sets
 * @returns Array of complexity benchmark tests
 */
export default function generateComplexityBenchmarks(
	signature: FunctionSignature,
	patterns: Array<string>,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	// Only generate complexity benchmarks for operations that scale
	if (!patterns.includes('array-operation') && !patterns.includes('string-operation')) {
		return tests
	}
	
	// Use scaled inputs to test complexity
	if (inputs.scaled && inputs.scaled.length > 2) {
		tests.push(...generateScalingBenchmarks(signature, inputs.scaled))
	}
	
	// Generate specific complexity patterns
	if (patterns.includes('array-map') || patterns.includes('array-filter')) {
		tests.push(...generateLinearComplexityBenchmarks(signature, inputs))
	}
	
	if (patterns.includes('array-sort')) {
		tests.push(...generateSortComplexityBenchmarks(signature, inputs))
	}
	
	if (patterns.includes('nested-operation')) {
		tests.push(...generateQuadraticComplexityBenchmarks(signature, inputs))
	}
	
	return tests
}

/**
 * Generate benchmarks that test scaling across different input sizes
 */
function generateScalingBenchmarks(
	signature: FunctionSignature,
	scaledInputs: Array<{ size: number, input: unknown }>
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	// Generate benchmark for each size
	for (const { size, input } of scaledInputs) {
		tests.push({
			name: `${functionName} - complexity test (n=${size})`,
			category: 'complexity',
			inputSize: 'scaled',
			setup: generateComplexitySetup(signature, input),
			benchmark: generateComplexityBenchmark(signature, input),
			expectedTime: estimateExpectedTime(signature, size)
		})
	}
	
	return tests
}

/**
 * Generate benchmarks for linear complexity operations (O(n))
 */
function generateLinearComplexityBenchmarks(
	signature: FunctionSignature,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	const sizes = ['small', 'medium', 'large'] as const
	
	for (const size of sizes) {
		const sizeInputs = inputs[size]
		const arrayInput = sizeInputs?.find(input => Array.isArray(input)) as Array<unknown>
		
		if (arrayInput) {
			tests.push({
				name: `${functionName} - linear complexity (${size} = n=${arrayInput.length})`,
				category: 'complexity',
				inputSize: size,
				setup: `
					const arr = ${JSON.stringify(arrayInput)}
					const fn = (x) => x * 2
				`,
				benchmark: signature.isCurried && signature.parameters[0]?.type.raw.includes('=>')
					? `${functionName}(fn)(arr)`
					: `${functionName}(arr)`,
				expectedTime: arrayInput.length * 0.001 // 1ns per element estimate
			})
		}
	}
	
	return tests
}

/**
 * Generate benchmarks for sorting operations (O(n log n))
 */
function generateSortComplexityBenchmarks(
	signature: FunctionSignature,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	// Test different array patterns that affect sorting performance
	const testPatterns = [
		{ name: 'sorted', generator: (n: number) => Array.from({ length: n }, (_, i) => i) },
		{ name: 'reverse sorted', generator: (n: number) => Array.from({ length: n }, (_, i) => n - i - 1) },
		{ name: 'random', generator: (n: number) => Array.from({ length: n }, () => Math.floor(Math.random() * n)) },
		{ name: 'mostly sorted', generator: (n: number) => {
			const arr = Array.from({ length: n }, (_, i) => i)
			// Swap 10% of elements randomly
			for (let i = 0; i < n * 0.1; i++) {
				const j = Math.floor(Math.random() * n)
				const k = Math.floor(Math.random() * n)
				;[arr[j], arr[k]] = [arr[k], arr[j]]
			}
			return arr
		}}
	]
	
	const sizes = [100, 1000, 5000] // Different sizes for complexity testing
	
	for (const pattern of testPatterns) {
		for (const size of sizes) {
			const testArray = pattern.generator(size)
			
			tests.push({
				name: `${functionName} - sort complexity (${pattern.name}, n=${size})`,
				category: 'complexity',
				inputSize: size > 2000 ? 'large' : size > 500 ? 'medium' : 'small',
				setup: `
					const arr = ${JSON.stringify(testArray)}
					const compare = (a, b) => a - b
				`,
				benchmark: signature.parameters.length > 1 
					? `${functionName}(compare)(arr)`
					: `${functionName}(arr)`,
				expectedTime: size * Math.log2(size) * 0.001 // O(n log n) estimate
			})
		}
	}
	
	return tests
}

/**
 * Generate benchmarks for quadratic complexity operations (O(n²))
 */
function generateQuadraticComplexityBenchmarks(
	signature: FunctionSignature,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	// Test with smaller sizes since quadratic operations can be expensive
	const sizes = [10, 50, 100, 200]
	
	for (const size of sizes) {
		const testInput = Array.from({ length: size }, (_, i) => i)
		
		tests.push({
			name: `${functionName} - quadratic complexity (n=${size})`,
			category: 'complexity',
			inputSize: size > 100 ? 'large' : size > 50 ? 'medium' : 'small',
			setup: `const arr = ${JSON.stringify(testInput)}`,
			benchmark: `${functionName}(arr)`,
			expectedTime: size * size * 0.001 // O(n²) estimate
		})
	}
	
	return tests
}

/**
 * Generate setup code for complexity benchmarks
 */
function generateComplexitySetup(signature: FunctionSignature, input: unknown): string {
	const lines: Array<string> = []
	
	lines.push(`const input = ${JSON.stringify(input)}`)
	
	// Add helper functions if needed
	if (signature.parameters.some(p => p.type.raw.includes('=>'))) {
		if (signature.name.includes('map')) {
			lines.push('const transformFn = (x) => x * 2')
		} else if (signature.name.includes('filter')) {
			lines.push('const predicateFn = (x) => x % 2 === 0')
		} else if (signature.name.includes('reduce')) {
			lines.push('const reducerFn = (acc, x) => acc + x')
			lines.push('const initialValue = 0')
		} else if (signature.name.includes('sort')) {
			lines.push('const compareFn = (a, b) => a - b')
		} else {
			lines.push('const fn = (x) => x')
		}
	}
	
	return lines.join('\n\t\t\t')
}

/**
 * Generate benchmark code for complexity tests
 */
function generateComplexityBenchmark(signature: FunctionSignature, input: unknown): string {
	const functionName = signature.name
	
	if (signature.isCurried && signature.parameters.length > 1) {
		// Curried function with multiple parameters
		if (signature.parameters[0]?.type.raw.includes('=>')) {
			if (functionName.includes('reduce')) {
				return `${functionName}(reducerFn)(initialValue)(input)`
			} else {
				return `${functionName}(fn)(input)`
			}
		} else {
			return `${functionName}(input)(fn)`
		}
	} else if (signature.parameters.length === 1) {
		return `${functionName}(input)`
	} else {
		// Multiple parameter function
		if (functionName.includes('reduce')) {
			return `${functionName}(reducerFn, initialValue, input)`
		} else if (signature.parameters[0]?.type.raw.includes('=>')) {
			return `${functionName}(fn, input)`
		} else {
			return `${functionName}(input, fn)`
		}
	}
}

/**
 * Estimate expected time based on input size and complexity
 */
function estimateExpectedTime(signature: FunctionSignature, size: number): number {
	const functionName = signature.name
	
	// Base time per operation (in milliseconds)
	const baseTime = 0.001
	
	if (functionName.includes('sort')) {
		return size * Math.log2(size) * baseTime // O(n log n)
	} else if (functionName.includes('map') || functionName.includes('filter')) {
		return size * baseTime // O(n)
	} else if (functionName.includes('find')) {
		return size * baseTime * 0.5 // O(n) average case
	} else {
		return size * baseTime // Default to linear
	}
}