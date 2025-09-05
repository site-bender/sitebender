/**
 * Generate comparison benchmarks between different approaches
 */

import type { FunctionSignature, BenchmarkTest, BenchmarkInputSet } from "../../types/index.ts"

/**
 * Generate comparison benchmarks that compare different implementations
 * @param signature Function signature
 * @param patterns Detected patterns
 * @param inputs Input sets
 * @returns Array of comparison benchmark tests
 */
export default function generateComparisonBenchmarks(
	signature: FunctionSignature,
	patterns: Array<string>,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	// Curried vs uncurried comparison
	if (patterns.includes('curried-function')) {
		tests.push(...generateCurriedComparisons(signature, inputs))
	}
	
	// Composition vs direct calls
	if (patterns.includes('composition')) {
		tests.push(...generateCompositionComparisons(signature, inputs))
	}
	
	// Array method comparisons
	if (patterns.includes('array-operation')) {
		tests.push(...generateArrayMethodComparisons(signature, inputs))
	}
	
	// Math operation comparisons
	if (patterns.includes('math-operation')) {
		tests.push(...generateMathOperationComparisons(signature, inputs))
	}
	
	return tests
}

/**
 * Generate curried vs uncurried comparison benchmarks
 */
function generateCurriedComparisons(
	signature: FunctionSignature,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	if (!signature.isCurried || signature.parameters.length < 2) {
		return tests
	}
	
	const mediumInput = inputs.medium[0]
	
	// Partial application vs full application
	tests.push({
		name: `${functionName} - partial application`,
		category: 'comparison',
		inputSize: 'medium',
		setup: `
			const input = ${JSON.stringify(mediumInput)}
			const partialFn = ${functionName}(input)
		`,
		benchmark: `partialFn(42)`,
		comparedTo: 'full-application'
	})
	
	tests.push({
		name: `${functionName} - full application`,
		category: 'comparison', 
		inputSize: 'medium',
		setup: `const input = ${JSON.stringify(mediumInput)}`,
		benchmark: `${functionName}(input)(42)`,
		comparedTo: 'partial-application'
	})
	
	// Reused partial vs fresh calls
	tests.push({
		name: `${functionName} - reused partial function`,
		category: 'comparison',
		inputSize: 'medium',
		setup: `
			const input = ${JSON.stringify(mediumInput)}
			const reusedFn = ${functionName}(input)
		`,
		benchmark: `
			reusedFn(1)
			reusedFn(2)
			reusedFn(3)
			reusedFn(4)
			reusedFn(5)
		`,
		comparedTo: 'fresh-calls'
	})
	
	tests.push({
		name: `${functionName} - fresh curried calls`,
		category: 'comparison',
		inputSize: 'medium',
		setup: `const input = ${JSON.stringify(mediumInput)}`,
		benchmark: `
			${functionName}(input)(1)
			${functionName}(input)(2)
			${functionName}(input)(3)
			${functionName}(input)(4)
			${functionName}(input)(5)
		`,
		comparedTo: 'reused-partial'
	})
	
	return tests
}

/**
 * Generate composition comparison benchmarks
 */
function generateCompositionComparisons(
	signature: FunctionSignature,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	if (functionName !== 'pipe' && functionName !== 'compose') {
		return tests
	}
	
	const input = inputs.medium[0] || 42
	
	// Short composition vs direct calls
	tests.push({
		name: `${functionName} - short composition (2 functions)`,
		category: 'comparison',
		inputSize: 'medium',
		setup: `
			const input = ${JSON.stringify(input)}
			const double = (x) => x * 2
			const addOne = (x) => x + 1
		`,
		benchmark: `${functionName}([double, addOne])(input)`,
		comparedTo: 'direct-calls-short'
	})
	
	tests.push({
		name: `${functionName} - direct calls (2 functions)`,
		category: 'comparison',
		inputSize: 'medium',
		setup: `
			const input = ${JSON.stringify(input)}
			const double = (x) => x * 2
			const addOne = (x) => x + 1
		`,
		benchmark: `addOne(double(input))`,
		comparedTo: 'short-composition'
	})
	
	// Long composition vs direct calls
	tests.push({
		name: `${functionName} - long composition (5 functions)`,
		category: 'comparison',
		inputSize: 'medium',
		setup: `
			const input = ${JSON.stringify(input)}
			const fns = [
				(x) => x * 2,
				(x) => x + 1,
				(x) => x / 3,
				(x) => Math.floor(x),
				(x) => x * x
			]
		`,
		benchmark: `${functionName}(fns)(input)`,
		comparedTo: 'direct-calls-long'
	})
	
	tests.push({
		name: `${functionName} - direct calls (5 functions)`,
		category: 'comparison',
		inputSize: 'medium',
		setup: `const input = ${JSON.stringify(input)}`,
		benchmark: `
			const step1 = input * 2
			const step2 = step1 + 1
			const step3 = step2 / 3
			const step4 = Math.floor(step3)
			const result = step4 * step4
		`,
		comparedTo: 'long-composition'
	})
	
	return tests
}

/**
 * Generate array method comparison benchmarks
 */
function generateArrayMethodComparisons(
	signature: FunctionSignature,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	// Only for array operations
	if (!functionName.includes('map') && !functionName.includes('filter')) {
		return tests
	}
	
	const arrayInput = inputs.medium.find(input => Array.isArray(input)) as Array<number>
	if (!arrayInput) return tests
	
	// Custom implementation vs native method
	if (functionName.includes('map')) {
		tests.push({
			name: `${functionName} - custom implementation`,
			category: 'comparison',
			inputSize: 'medium',
			setup: `
				const arr = ${JSON.stringify(arrayInput)}
				const double = (x) => x * 2
			`,
			benchmark: `${functionName}(double)(arr)`,
			comparedTo: 'native-map'
		})
		
		tests.push({
			name: `native map - Array.prototype.map`,
			category: 'comparison',
			inputSize: 'medium',
			setup: `
				const arr = ${JSON.stringify(arrayInput)}
				const double = (x) => x * 2
			`,
			benchmark: `arr.map(double)`,
			comparedTo: 'custom-map'
		})
	}
	
	return tests
}

/**
 * Generate math operation comparison benchmarks
 */
function generateMathOperationComparisons(
	signature: FunctionSignature,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	// Compare with native operators where applicable
	if (functionName === 'add') {
		tests.push({
			name: `${functionName} - custom add function`,
			category: 'comparison',
			inputSize: 'small',
			setup: 'const a = 42; const b = 13',
			benchmark: signature.isCurried ? `${functionName}(a)(b)` : `${functionName}(a, b)`,
			comparedTo: 'native-add'
		})
		
		tests.push({
			name: `native add - + operator`,
			category: 'comparison',
			inputSize: 'small',
			setup: 'const a = 42; const b = 13',
			benchmark: `a + b`,
			comparedTo: 'custom-add'
		})
	}
	
	if (functionName === 'multiply') {
		tests.push({
			name: `${functionName} - custom multiply function`,
			category: 'comparison',
			inputSize: 'small',
			setup: 'const a = 42; const b = 13',
			benchmark: signature.isCurried ? `${functionName}(a)(b)` : `${functionName}(a, b)`,
			comparedTo: 'native-multiply'
		})
		
		tests.push({
			name: `native multiply - * operator`,
			category: 'comparison',
			inputSize: 'small',
			setup: 'const a = 42; const b = 13',
			benchmark: `a * b`,
			comparedTo: 'custom-multiply'
		})
	}
	
	return tests
}