/**
 * Generate micro-benchmarks for individual function performance
 */

import type { FunctionSignature, BenchmarkTest, BenchmarkInputSet } from "../../types/index.ts"

/**
 * Generate micro-benchmarks that test single function calls
 * @param signature Function signature
 * @param inputs Input sets for different sizes
 * @returns Array of micro-benchmark tests
 */
export default function generateMicroBenchmarks(
	signature: FunctionSignature,
	inputs: BenchmarkInputSet
): Array<BenchmarkTest> {
	const tests: Array<BenchmarkTest> = []
	const functionName = signature.name
	
	// Micro-benchmarks for each input size
	const sizes: Array<keyof BenchmarkInputSet> = ['small', 'medium', 'large']
	
	for (const size of sizes) {
		const sizeInputs = inputs[size]
		if (!sizeInputs || sizeInputs.length === 0) continue
		
		// Use the first input for basic benchmark
		const input = sizeInputs[0]
		
		tests.push({
			name: `${functionName} - ${size} input baseline`,
			category: 'micro',
			inputSize: size,
			setup: generateSetupCode(signature, input),
			benchmark: generateBenchmarkCode(signature, input)
		})
		
		// If we have multiple inputs, benchmark different data patterns
		if (sizeInputs.length > 1) {
			for (let i = 1; i < Math.min(sizeInputs.length, 4); i++) {
				const altInput = sizeInputs[i]
				tests.push({
					name: `${functionName} - ${size} input variant ${i}`,
					category: 'micro',
					inputSize: size,
					setup: generateSetupCode(signature, altInput),
					benchmark: generateBenchmarkCode(signature, altInput)
				})
			}
		}
	}
	
	// Special micro-benchmark for realistic inputs
	if (inputs.realistic && inputs.realistic.length > 0) {
		const realisticInput = inputs.realistic[0]
		tests.push({
			name: `${functionName} - realistic usage`,
			category: 'micro',
			inputSize: 'medium', // Assume realistic is medium-sized
			setup: generateSetupCode(signature, realisticInput),
			benchmark: generateBenchmarkCode(signature, realisticInput)
		})
	}
	
	return tests
}

/**
 * Generate setup code for benchmark
 */
function generateSetupCode(signature: FunctionSignature, input: unknown): string {
	const lines: Array<string> = []
	
	// Generate input variables
	if (signature.parameters.length === 0) {
		// No parameters
		return '// No setup required'
	} else if (signature.parameters.length === 1) {
		lines.push(`const input = ${valueToCode(input)}`)
	} else {
		// Multiple parameters - assume input is array or use default values
		if (Array.isArray(input)) {
			for (let i = 0; i < signature.parameters.length && i < input.length; i++) {
				lines.push(`const param${i} = ${valueToCode(input[i])}`)
			}
		} else {
			lines.push(`const input = ${valueToCode(input)}`)
			// Generate default values for remaining parameters
			for (let i = 1; i < signature.parameters.length; i++) {
				lines.push(`const param${i} = ${getDefaultValue(signature.parameters[i].type.raw)}`)
			}
		}
	}
	
	// Add function reference if needed for complex operations
	if (signature.parameters.some(p => p.type.raw.includes('=>'))) {
		lines.push('const fn = (x) => x * 2') // Simple transformation function
	}
	
	return lines.join('\n\t\t\t')
}

/**
 * Generate benchmark code (the actual function call)
 */
function generateBenchmarkCode(signature: FunctionSignature, input: unknown): string {
	const functionName = signature.name
	
	if (signature.parameters.length === 0) {
		return `${functionName}()`
	} else if (signature.parameters.length === 1) {
		if (signature.isCurried && signature.parameters[0].type.raw.includes('=>')) {
			// Curried function taking a function - assume it returns another function
			return `${functionName}(fn)(input)`
		} else {
			return `${functionName}(input)`
		}
	} else {
		// Multiple parameters
		if (signature.isCurried) {
			const params = Array.from({ length: signature.parameters.length }, (_, i) => 
				i === 0 && Array.isArray(input) ? valueToCode(input[i]) : `param${i}`
			)
			// Chain curried calls
			return params.reduce((call, param) => `${call}(${param})`, functionName)
		} else {
			// Regular function call
			const params = Array.from({ length: signature.parameters.length }, (_, i) =>
				i === 0 ? 'input' : `param${i}`
			)
			return `${functionName}(${params.join(', ')})`
		}
	}
}

/**
 * Convert a value to executable code string
 */
function valueToCode(value: unknown): string {
	if (value === null) return 'null'
	if (value === undefined) return 'undefined'
	if (typeof value === 'string') return JSON.stringify(value)
	if (typeof value === 'number') return String(value)
	if (typeof value === 'boolean') return String(value)
	if (typeof value === 'function') return value.toString()
	if (Array.isArray(value)) {
		return `[${value.map(v => valueToCode(v)).join(', ')}]`
	}
	if (typeof value === 'object') {
		return JSON.stringify(value)
	}
	return String(value)
}

/**
 * Get default value for a type
 */
function getDefaultValue(type: string): string {
	if (type === 'number') return '1'
	if (type === 'string') return '"test"'
	if (type === 'boolean') return 'true'
	if (type.includes('Array')) return '[]'
	if (type === 'object') return '{}'
	if (type.includes('=>')) return '(x) => x'
	return 'null'
}