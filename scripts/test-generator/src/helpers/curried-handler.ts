/**
 * Helper for handling curried function test generation
 */

import type { FunctionSignature, TestCase } from "../types/index.ts"

export class CurriedFunctionHandler {
	/**
	 * Determines if a function needs curried handling based on its signature
	 */
	static needsCurriedHandling(signature: FunctionSignature): boolean {
		// Check if function is curried and returns another function
		return signature.isCurried && 
			   signature.returnType.raw.includes("=>") &&
			   signature.returnType.kind !== "number" &&
			   signature.returnType.kind !== "string" &&
			   signature.returnType.kind !== "boolean"
	}
	
	/**
	 * Generate appropriate test inputs for a curried function
	 */
	static generateCurriedInputs(
		baseInput: unknown[], 
		signature: FunctionSignature
	): unknown[] {
		if (!this.needsCurriedHandling(signature)) {
			return baseInput
		}
		
		// For curried functions, we need to provide inputs for all stages
		// Extract the number of curry levels from the return type
		const curryLevels = this.countCurryLevels(signature.returnType.raw)
		
		// If we only have one input, add dummy values for remaining parameters
		while (baseInput.length <= curryLevels) {
			baseInput.push(this.getDefaultValueForLevel(baseInput.length, signature))
		}
		
		return baseInput
	}
	
	/**
	 * Count the number of curry levels in a function type
	 */
	static countCurryLevels(returnType: string): number {
		// Count the number of '=>' in the return type
		const matches = returnType.match(/=>/g)
		return matches ? matches.length : 0
	}
	
	/**
	 * Get a default value for a curry level
	 */
	static getDefaultValueForLevel(level: number, signature: FunctionSignature): unknown {
		// Try to infer from the return type what kind of value is expected
		const returnType = signature.returnType.raw
		
		// For numeric functions, use a small number
		if (returnType.includes("number")) {
			return 1
		}
		
		// For string functions, use a simple string
		if (returnType.includes("string")) {
			return "test"
		}
		
		// For array functions, use a small array
		if (returnType.includes("Array")) {
			return [1, 2, 3]
		}
		
		// Default to 1 for simplicity
		return 1
	}
	
	/**
	 * Generate the correct function call syntax for tests
	 */
	static generateFunctionCall(
		functionName: string,
		inputs: unknown[],
		signature: FunctionSignature
	): string {
		// For curried functions, always chain the calls
		if (signature.isCurried) {
			let call = functionName
			for (const input of inputs) {
				call = `${call}(${this.formatValue(input)})`
			}
			return call
		}
		
		// Non-curried functions
		if (inputs.length === 1) {
			return `${functionName}(${this.formatValue(inputs[0])})`
		}
		return `${functionName}(${inputs.map(i => this.formatValue(i)).join(", ")})`
	}
	
	/**
	 * Format a value for use in test code
	 */
	static formatValue(value: unknown): string {
		if (value === null) return "null"
		if (value === undefined) return "undefined"
		if (typeof value === "string") return `"${value}"`
		if (typeof value === "number") return String(value)
		if (typeof value === "boolean") return String(value)
		if (Array.isArray(value)) {
			return `[${value.map(v => this.formatValue(v)).join(", ")}]`
		}
		if (typeof value === "object") {
			const entries = Object.entries(value).map(
				([k, v]) => `${k}: ${this.formatValue(v)}`
			)
			return `{ ${entries.join(", ")} }`
		}
		return String(value)
	}
	
	/**
	 * Determine expected output for invalid inputs to curried functions
	 */
	static getExpectedOutputForInvalid(signature: FunctionSignature): unknown {
		// Most toolkit functions return NaN for invalid numeric inputs
		if (signature.returnType.raw.includes("number") || 
		    signature.name.includes("add") ||
		    signature.name.includes("multiply") ||
		    signature.name.includes("subtract") ||
		    signature.name.includes("divide")) {
			return NaN
		}
		
		// Some functions might return undefined
		return undefined
	}
	
	/**
	 * Transform a test case for curried function handling
	 */
	static transformTestCase(testCase: TestCase, signature: FunctionSignature): TestCase {
		if (!this.needsCurriedHandling(signature)) {
			return testCase
		}
		
		// Ensure we have enough inputs for all curry levels
		const transformedInputs = this.generateCurriedInputs([...testCase.input], signature)
		
		return {
			...testCase,
			input: transformedInputs,
			// Update expected output if needed
			expectedOutput: testCase.expectedOutput ?? this.getExpectedOutputForInvalid(signature)
		}
	}
}